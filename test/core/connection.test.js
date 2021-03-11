const { ManyCam } = require("../../index");
const { settings } = require("../../privates");
beforeAll(() => {}, 0);

afterAll(() => {}, 0);
describe("connect", () => {
	test("should return true - successful connection", async () => {
		let manyCam = new ManyCam(settings);
		await expect(manyCam.connect()).resolves.toBeTruthy();
		manyCam.close();
	});
});

describe("connected state", () => {
	test("should check if manycam state is connected", async () => {
		let manyCam = new ManyCam(settings);
		await manyCam.connect();
		expect(manyCam.connected()).toBeTruthy();
		manyCam.close();
	});
});
