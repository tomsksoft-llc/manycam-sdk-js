const ManyCam = require("./src/ManyCam");
const Preset = require("./src/controllers/Preset");
const Layer = require("./src/controllers/Layer");
const Source = require("./src/controllers/Source");
const Subscription = require("./src/controllers/Subscription");
const Resolution = require("./src/controllers/Resolution");
const {
	sources,
	colors,
	transitionTypes,
	presetTypes,
} = require("./src/globals");

module.exports = {
	ManyCam,
	Preset,
	Source,
	Subscription,
	Layer,
	Resolution,
	sources,
	colors,
	transitionTypes,
	presetTypes,
};
