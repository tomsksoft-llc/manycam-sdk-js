const {
	ManyCam,
	Preset,
	Source,
	Subscription,
	Resolution,
	presetTypes,
	transitionTypes,
	colors,
	sources,
} = require("../../index");

const { settings } = require("../../privates");

let manyCam = new ManyCam(settings);
let unrealIndex = 100;

beforeAll(async () => {
	manyCam.onError((error) => {
		console.log(error.message);
	});
	await manyCam.connect();
	let preset = await manyCam.getCurrentPreset();
	preset.type = presetTypes.cross_splitted;
	await manyCam.editPreset(preset);
}, 0);

afterAll(() => {
	manyCam.close();
}, 0);

describe("Sources management", () => {
	describe("setColor", () => {
		test("should return true on valid color param", async () => {
			expect.assertions(Object.keys(colors).length);
			let preset = await manyCam.getCurrentPreset();
			let layer = preset.layers[0];
			for (let key in colors) {
				let color = colors[key];
				await expect(layer.setColor(color)).resolves.toBeTruthy();
			}
		});
		test("should throw on invalid color param", async () => {
			let preset = await manyCam.getCurrentPreset();
			let layer = preset.layers[0];
			let color = "unrealColor";
			await expect(layer.setColor(color)).resolves.toBeTruthy();
		});
	});

	describe("setDestop", () => {
		test("should return true on valid param", async () => {
			let preset = await manyCam.getCurrentPreset();
			let layer = preset.layers[0];
			await expect(layer.setDesktop(true)).resolves.toBeTruthy();
			await expect(layer.setDesktop(false)).resolves.toBeTruthy();
			await expect(layer.setDesktop()).resolves.toBeTruthy();
		});
	});

	describe("setSource", () => {
		describe("webcam", () => {
			test("should return true", async () => {
				let preset = await manyCam.getCurrentPreset();
				let layer = preset.layers[0];
				let webcams = await manyCam.getAvailableWebcams();
				let cam = webcams[0];
				if (webcams.length)
					await expect(layer.setSource(cam)).resolves.toBeTruthy();
				else return;
			});
		});
		describe("ipcam", () => {
			test("should return true", async () => {
				let preset = await manyCam.getCurrentPreset();
				let layer = preset.layers[0];
				let ipcam = new Source(sources.ipcam, {
					name: "Ipcam",
					url: "http://185.76.57.45/mjpg/video.mjpg",
				});
				await expect(layer.setSource(ipcam)).resolves.toBeTruthy();
			});
		});
		describe("mediafile", () => {
			test("should return true", async () => {
				let preset = await manyCam.getCurrentPreset();
				let layer = preset.layers[0];
				let mediafile = new Source(sources.mediafile, {
					path:
						"C:/Users/gleb/Pictures/Фоновые изображения рабочего стола/1. Черный кот с рыбкой.jpg",
				});
				await expect(layer.setSource(mediafile)).resolves.toBeTruthy();
			});
		});
		describe("yt", () => {
			test("should return true", async () => {
				let preset = await manyCam.getCurrentPreset();
				let layer = preset.layers[0];
				let yt = new Source(sources.youtube, {
					url:
						"https://www.youtube.com/watch?v=mllXxyHTzfg&ab_channel=WarnerBros.Pictures",
				});
				await expect(layer.setSource(yt)).resolves.toBeTruthy();
			});
		});
	});
});
