//@ts-check
const ManyCam = require("../ManyCam");
const { presetTypes } = require("../globals");
const BaseController = require("./Base");
const Layer = require("./Layer");

/**
 * Represents preset
 * @property {number} index - Index of preset
 * @property {number} [live] -
 * @property {string} [name] - Name of preset
 * @property {string} [pip_mode] - Pip mode
 * @property {string} [type=free_pip] - Type of preset. See {@link constants.md/#presetTypes.md}
 * @property {Array<Layer>} layers - Array of layers
 */

class Preset extends BaseController {
	index = NaN;
	live = NaN;
	name = "";
	type = "";
	pip_mode = "free_pip";
	/** @type {Array<Layer>} */
	layers = [];

	//TODO Validation in constructor
	//TODO Methods that can be called from, this class

	/**
	 * Creates a Preset instance
	 * @param {Object} props - Preset fields
	 * @param {number} props.index - Index of preset
	 * @param {string} [props.name] - Name of preset
	 * @param {string} [props.type] - Type of preset
	 * @param {ManyCam} manyCam ManyCam instance
	 */
	constructor(props, manyCam) {
		super(manyCam);
		Object.assign(this, props);
		this.layers = this._mapLayers(props, manyCam);
	}

	createLayer(layer) {
		//TODO Implement createLayer
	}

	_mapLayers(object, manyCam) {
		if (object.layers && Array.isArray(object.layers))
			return object.layers.map((item) => {
				item.index = this.index;
				return new Layer(item, manyCam);
			});
		else return [];
	}

	setType(value) {
		if (!presetTypes[value])
			throw new Error("Inappropriate type of preset");
		this.type = value;
	}

	/**
	 * Gets layer by pip_number
	 * @param {number} pip_number Pip number
	 * @returns {Layer} {@link Layer.md} instance
	 */
	getLayer(pip_number) {
		return this.layers.find((item) => item.pip_number === pip_number);
	}
}
module.exports = Preset;
