const {
	ManyCam,
	Preset,
	Source,
	Subscription,
	Resolution,
	presetTypes,
	transitionTypes,
} = require("../index");

const { settings } = require("../privates");

let manyCam = new ManyCam(settings);
let unrealIndex = 100;

beforeAll(async () => {
	manyCam.onError((error) => {
		console.log(error.message);
	});
	await manyCam.connect();
}, 0);

afterAll(() => {
	manyCam.close();
}, 0);
describe("ManyCam", () => {
	describe("Get methods", () => {
		test("getPresetState should throw Error on bad index", async () => {
			await expect(manyCam.getPresetState(45)).rejects.toThrow();
		});
		test("getPresetState should throw Error on non-number parameter", async () => {
			await expect(manyCam.getPresetState("dddd")).rejects.toThrow();
			await expect(manyCam.getPresetState("")).rejects.toThrow();
			await expect(manyCam.getPresetState(true)).rejects.toThrow();
			await expect(manyCam.getPresetState(false)).rejects.toThrow();
			await expect(manyCam.getPresetState(NaN)).rejects.toThrow();
			await expect(manyCam.getPresetState(null)).rejects.toThrow();
			await expect(
				manyCam.getPresetState({ infdex: 0 })
			).rejects.toThrow();
		});
		test("getCurrentPreset should return instance of Preset", async () => {
			let answer = await manyCam.getCurrentPreset();
			expect(answer).not.toBeUndefined();
			expect(answer).toBeInstanceOf(Preset);
		});
		test("getCurrentPresetIndex should return number", async () => {
			let answer = await manyCam.getCurrentPresetIndex();
			expect(answer).toBeDefined();
			expect(typeof answer).toBe("number");
		});
		test("getApplicationSources should return array of Source or []", async () => {
			let answer = await manyCam.getApplicationSources();
			expect(Array.isArray(answer)).toBeTruthy;
			answer.forEach((item) => {
				expect(item).toBeInstanceOf(Source);
			});
		});
		test("getSubscriptions should return array of Subscriptions or []", async () => {
			let answer = await manyCam.getSubscriptions();
			expect(Array.isArray(answer)).toBeTruthy;
			answer.forEach((item) => {
				expect(item).toBeInstanceOf(Subscription);
			});
		});
		test("getAvailableWebcams should return array of Webcams or []", async () => {
			let answer = await manyCam.getAvailableWebcams();
			expect(Array.isArray(answer)).toBeTruthy;
			answer.forEach((item) => {
				expect(item).toBeInstanceOf(Source);
			});
		});
		test("getVideoResolutions should return array of Resolutions or []", async () => {
			let answer = await manyCam.getVideoResolutions();
			expect(Array.isArray(answer)).toBeTruthy;
			answer.forEach((item) => {
				expect(item).toBeInstanceOf(Resolution);
			});
		});
		test("getCurrentResolution should return Resolution", async () => {
			let answer = await manyCam.getCurrentResolution();
			expect(answer).not.toBeUndefined();
			expect(answer instanceof Resolution).toBeTruthy();
		});
		test("getUiState should return {boolean} is_hidden", async () => {
			let answer = await manyCam.getUiState();
			expect(typeof answer).toBe("boolean");
		});
	});

	// BUG Doesnt work many times because of popup window
	// describe("Subscriptions management", () => {
	// 	test("deactivateSubscription should work with index {string} parameter", async () => {
	// 		let sub = (await manyCam.getSubscriptions())[0];
	// 		let answer = await manyCam.deactivateSubscription(sub.id);
	// 		expect(typeof answer).toBe("boolean");
	// 	});
	// 	test("deactivateSubscription should work with Subscription parameter", async () => {
	// 		let sub = (await manyCam.getSubscriptions())[0];
	// 		let answer = await manyCam.deactivateSubscription(sub);
	// 		expect(typeof answer).toBe("boolean");
	// 	});
	// 	test("activateSubscription should work with index {string} parameter", async () => {
	// 		let sub = (await manyCam.getSubscriptions())[0];
	// 		let answer = await manyCam.activateSubscription(sub.id);
	// 		expect(typeof answer).toBe("boolean");
	// 	});
	// 	test("activateSubscription should work with Subscription parameter", async () => {
	// 		let sub = (await manyCam.getSubscriptions())[0];
	// 		let answer = await manyCam.activateSubscription(sub);
	// 		expect(typeof answer).toBe("boolean");
	// 	});
	// });

	describe("Preset management", () => {
		describe("preset validation", () => {
			test("_validateNumberParam should throw on invalid param", () => {
				expect(() => manyCam._validateNumberParam("1")).toThrow(Error);
				expect(() => manyCam._validateNumberParam("preset")).toThrow(
					Error
				);
				expect(() => manyCam._validateNumberParam("")).toThrow(Error);
				expect(() => manyCam._validateNumberParam({})).toThrow(Error);
				expect(() => manyCam._validateNumberParam([])).toThrow(Error);
			});
			test("_verifyPreset should throw on invalid preset Instance", () => {
				let preset = manyCam.createPresetInstance({
					name: "New preset",
					index: "qer",
				});
				expect(() => manyCam._verifyPreset(preset)).toThrow(Error);

				preset.index = "33";
				expect(() => manyCam._verifyPreset(preset)).toThrow(Error);

				preset.index = {};
				expect(() => manyCam._verifyPreset(preset)).toThrow(Error);

				preset.index = "";
				expect(() => manyCam._verifyPreset(preset)).toThrow(Error);
			});
			test("_verifyPreset should throw on invalid preset object", () => {
				let preset = {
					name: "New preset",
					index: "qer",
				};
				expect(() => manyCam._verifyPreset(preset)).toThrow(Error);

				preset.index = "33";
				expect(() => manyCam._verifyPreset(preset)).toThrow(Error);

				preset.index = {};
				expect(() => manyCam._verifyPreset(preset)).toThrow(Error);

				preset.index = "";
				expect(() => manyCam._verifyPreset(preset)).toThrow(Error);
			});
		});
		describe("_editPreset method", () => {
			test("should return true on valid params without type", async () => {
				let preset = manyCam.createPresetInstance({
					name: "New my preset",
					index: 0,
				});
				let answer = await manyCam._editPreset(preset);
				expect(answer).toBeTruthy();
			});
			test("should return true with only index", async () => {
				let preset = manyCam.createPresetInstance({
					index: 1,
				});
				let answer = await manyCam._editPreset(preset);
				expect(answer).toBeTruthy();
			});
			test("should return true on valid types", async () => {
				expect.assertions(Object.keys(presetTypes).length + 1);
				let preset = manyCam.createPresetInstance({
					name: "New preset",
					index: 0,
				});
				for (let key in presetTypes) {
					let type = presetTypes[key];
					preset.type = type;
					expect(await manyCam._editPreset(preset)).toBeTruthy();
				}
				preset.type = presetTypes.free_pip;
				expect(await manyCam._editPreset(preset)).toBeTruthy();
			});

			//BUG returns true on invalid type param
			// test("should throw error on invalid types", async () => {
			// 	let preset = manyCam.createPresetInstance({
			// 		name: "New preset",
			// 		index: 0,
			// 		type: "blabla",
			// 	});
			// 	await expect(manyCam._editPreset(preset)).rejects.toThrow();
			// });
			test("should throw error on invalid index", async () => {
				await expect(
					manyCam._editPreset({ index: unrealIndex })
				).rejects.toThrow();
			});
		});
		describe("deletePreset", () => {
			test("should return true while preset exists and not focused", async () => {
				let preset = manyCam.createPresetInstance({ index: 9 });
				await manyCam.createPreset(preset);
				await expect(
					manyCam.deletePreset(preset)
				).resolves.toBeTruthy();
			});

			test("should trow while preset doesn't exist", async () => {
				await expect(
					manyCam.deletePreset(unrealIndex)
				).rejects.toThrow();
			});
		});
		describe("clearPreset", () => {
			test("should return true if preset exists", async () => {
				let preset = await manyCam.getCurrentPreset();
				await expect(manyCam.clearPreset(preset)).resolves.toBeTruthy();
			});

			test("should throw while preset doesn't exist", async () => {
				await expect(
					manyCam.clearPreset(unrealIndex)
				).rejects.toThrow();
			});
		});
		describe("makePresetActive", () => {
			test("should return true if preset exists", async () => {
				await expect(manyCam.makePresetActive(0)).resolves.toBeTruthy();
			});

			test("should should throw if preset doesn't exist", async () => {
				await expect(
					manyCam.makePresetActive(unrealIndex)
				).rejects.toThrow();
			});
		});
		describe("enableMotionDetection", () => {
			test("should return true if preset exists", async () => {
				let preset = await manyCam.getCurrentPreset();
				await expect(
					manyCam.enableMotionDetection(preset)
				).resolves.toBeTruthy();
			});
			test("should throw if preset doesn't exist", async () => {
				await expect(
					manyCam.enableMotionDetection(unrealIndex)
				).rejects.toThrow();
			});
		});
		describe("disableMotionDetection", () => {
			test("should return true ", async () => {
				let preset = await manyCam.getCurrentPreset();
				await expect(
					manyCam.disableMotionDetection(preset)
				).resolves.toBeTruthy();
			});
			test("should throw if preset doesn't exist", async () => {
				await expect(
					manyCam.disableMotionDetection(unrealIndex)
				).rejects.toThrow();
			});
		});
		describe("enableSwitchOnMotion", () => {
			test("should return true if preset exists", async () => {
				let preset = await manyCam.getCurrentPreset();
				await expect(
					manyCam.enableSwitchOnMotion(preset)
				).resolves.toBeTruthy();
			});
			test("should throw", async () => {
				await expect(
					manyCam.enableSwitchOnMotion(unrealIndex)
				).rejects.toThrow();
			});
		});
		describe("disableSwitchOnMotion", () => {
			test("should return true if preset exists", async () => {
				let preset = await manyCam.getCurrentPreset();
				await expect(
					manyCam.disableSwitchOnMotion(preset)
				).resolves.toBeTruthy();
			});
			test("should throw if preset doesn't exist", async () => {
				await expect(
					manyCam.disableSwitchOnMotion(unrealIndex)
				).rejects.toThrow();
			});
		});
		// may throw this error
		// Error: Command "save_motion_detected_image" failed: there is no detected image
		describe("saveLastImageOnMotionDetected", () => {
			test("should return true on correct param", async () => {
				let preset = await manyCam.getCurrentPreset();
				await expect(
					manyCam.saveLastImageOnMotionDetected(
						preset,
						"C:/Users/gleb/Pictures/ManyCam"
					)
				).resolves.toBeTruthy();
			});
			test("should throw if preset doesn't exist", async () => {
				await expect(
					manyCam.saveLastImageOnMotionDetected(
						unrealIndex,
						"C:/Users/gleb/Pictures/ManyCam"
					)
				).rejects.toThrow();
			});
			test("should throw if path doesn't exist", async () => {
				let preset = await manyCam.getCurrentPreset();
				await expect(
					manyCam.saveLastImageOnMotionDetected(
						preset,
						"C:hh/Users/gleb/Pictures/ManyCam"
					)
				).rejects.toThrow();
			});
		});
		describe("saveSnapshot", () => {
			test("should return true on correct params", async () => {
				let preset = await manyCam.getCurrentPreset();
				await expect(
					manyCam.saveSnapshot(
						preset,
						"C:/Users/gleb/Pictures/ManyCam"
					)
				).resolves.toBeTruthy();
			});
			test("should throw if preset doesn't exist", async () => {
				await expect(
					manyCam.saveSnapshot(
						unrealIndex,
						"C:/Users/gleb/Pictures/ManyCam"
					)
				).rejects.toThrow();
			});
			test("should throw if path doesn't exist", async () => {
				let preset = await manyCam.getCurrentPreset();
				await expect(
					manyCam.saveSnapshot(
						preset,
						"C:hh/Users/gleb/Pictures/ManyCam"
					)
				).rejects.toThrow();
			});
		});
	});

	describe("Layer management", () => {
		describe("_validateLayer", () => {
			test("should pass on valid params", async () => {
				let layer = manyCam.createLayerInstance({
					index: 5,
					pip_number: 2,
				});
				await expect(() => manyCam._validateLayer(layer)).not.toThrow();
			});
			test("should throw on invalid index", async () => {
				let layer = manyCam.createLayerInstance({
					index: "",
					pip_number: 2,
				});
				expect(() => manyCam._validateLayer(layer)).toThrow();
				layer.index = [];
				expect(() => manyCam._validateLayer(layer)).toThrow();
				layer.index = {};
				expect(() => manyCam._validateLayer(layer)).toThrow();
			});
			test("should throw on invalid pip_number", async () => {
				let layer = manyCam.createLayerInstance({
					index: 6,
					pip_number: "",
				});
				expect(() => manyCam._validateLayer(layer)).toThrow();
				layer.pip_number = [];
				expect(() => manyCam._validateLayer(layer)).toThrow();
				layer.pip_number = {};
				expect(() => manyCam._validateLayer(layer)).toThrow();
			});
		});

		describe("_editLayer method", () => {
			test("should return true on valid params without type", async () => {
				let preset = await manyCam.getCurrentPreset();
				let layer = manyCam.createLayerInstance({
					index: preset.index,
					pip_number: 0,
					height: 230,
					width: 444,
				});
				let answer = await manyCam._editLayer(layer);
				expect(answer).toBeTruthy();
			});
			test("should throw error on invalid index or pip_number", async () => {
				await expect(
					manyCam._editLayer({
						index: unrealIndex,
						pip_number: unrealIndex,
					})
				).rejects.toThrow();
			});
		});
		describe("deleteLayer", () => {
			test("should return true if layer exists", async () => {
				let preset = await manyCam.getCurrentPreset();
				let layer;
				if (!preset.layers[0]) {
					layer = manyCam.createLayerInstance({
						index: preset.index,
						pip_number: 3,
					});
					await manyCam.createLayer(layer);
				} else layer = preset.layers[0];
				await expect(manyCam.deleteLayer(layer)).resolves.toBeTruthy();
			});

			test("should throw while layer doesn't exist", async () => {
				await expect(
					manyCam.deleteLayer({
						index: unrealIndex,
						pip_number: unrealIndex,
					})
				).rejects.toThrow();
			});
		});
		describe("clearLayer", () => {
			test("should return true for existing layer", async () => {
				expect.assertions(1);
				let preset = await manyCam.getCurrentPreset();
				await expect(
					manyCam.clearLayer(preset.layers[0])
				).resolves.toBeTruthy();
			});
			test("should throw for nonexistent layer", async () => {
				expect.assertions(1);
				await expect(
					manyCam.clearLayer({
						index: unrealIndex,
						pip_number: unrealIndex,
					})
				).rejects.toThrow();
			});
		});
	});
	describe("UI", () => {
		describe("hideUI", () => {
			test("should return true", async () => {
				await expect(manyCam.hideUI()).resolves.toBeTruthy();
			});
		});
		describe("showUI", () => {
			test("should return true", async () => {
				await expect(manyCam.showUI()).resolves.toBeTruthy();
			});
		});

		describe("setTransition", () => {
			test("should return true on valid type param", async () => {
				expect.assertions(Object.keys(transitionTypes).length);
				for (let key in transitionTypes) {
					let type = transitionTypes[key];
					await expect(
						manyCam.setTransition(1, type)
					).resolves.toBeTruthy();
				}
			});
			let validType = transitionTypes[Object.keys(transitionTypes)[0]];

			//BUG strange window in manycam when go to another preset with transition after command with invalid type
			// test("should throw on invalid type", async () => {
			// 	await expect(
			// 		manyCam.setTransition(1, "someInvalidType")
			// 	).rejects.toThrow();
			// });

			test("should throw on invalid time param", async () => {
				//BUG returns true on invalid param
				// await expect(
				// 	manyCam.setTransition(-25, validType)
				// ).rejects.toThrow();
				//BUG manycam crash on invalid type of time param
				// await expect(
				// 	manyCam.setTransition("22", validType)
				// ).rejects.toThrow();
			});
		});
		describe("setVideoResolution", () => {
			test("should return true on valid resolutions", async () => {
				let resolutions = await manyCam.getVideoResolutions();
				if (resolutions.length === 0) return;
				expect.assertions(resolutions.length);

				for (res of resolutions) {
					await expect(
						manyCam.setVideoResolution(res.toString())
					).resolves.toBeTruthy();
				}
			});

			// BUG returns true on invalid resolution param
			// test("should throw on invalid resolution param", async () => {
			// 	await expect(
			// 		manyCam.setVideoResolution("unrealResolution")
			// 	).rejects.toThrow();
			// });
		});

		describe("autoLaunchGame", () => {
			test("should return true on valid param", async () => {
				await expect(
					manyCam.autoLaunchGame(true)
				).resolves.toBeTruthy();
				await expect(
					manyCam.autoLaunchGame(false)
				).resolves.toBeTruthy();
			});
		});
	});
});
