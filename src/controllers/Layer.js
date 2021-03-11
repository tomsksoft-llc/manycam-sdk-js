//@ts-check
const { commands, sources } = require("../globals");
const ManyCam = require("../ManyCam");
const BaseController = require("./Base");
const Source = require("./Source");

/**
 * Represents a layer in a preset
 * @property {number} index - Index of preset
 * @property {number} pip_number - Pip number of layer (Id)
 * @property {number} x - X value
 * @property {number} y - Y value
 * @property {number} width - Width of layer
 * @property {number} height - Height of layer
 * @property {string} order - Order in preset
 * @property {Array<Source>} sources - Array of sources
 */
class Layer extends BaseController {
	index = NaN;
	pip_number = NaN;
	height = NaN;
	width = NaN;
	x = NaN;
	y = NaN;
	order = "";
	/** @type {Array<Source>} */
	sources = [];

	//TODO Validation in constructor
	//TODO Methods that can be called fro, this class

	//TODO WebPage is not working
	/**
	 * Creates a Layer instance
	 * @param {Object} props - Layer fields
	 * @param {number} props.index - Index of preset
	 * @param {number} props.pip_number - Pip number of layer (Id)
	 * @param {number} props.x - X value
	 * @param {number} props.y - Y value
	 * @param {number} props.width - Width of layer
	 * @param {number} props.height - Height of layer
	 * @param {string} props.order - Order in preset
	 * @param {ManyCam} manyCam ManyCam instance
	 */
	constructor(props, manyCam) {
		super(manyCam);

		Object.assign(this, props);
		this.sources = this._mapSources(props);
	}

	_mapSources(object) {
		if (object.sources && Array.isArray(object.sources))
			return object.sources.map(
				(item) => new Source(item.type, item.config)
			);
		else return [];
	}

	/* SET SOURCE */
	/**
	 * Sets source
	 * @param {Source} source - Source instance
	 * @returns {Promise<boolean>} Success of the command
	 */
	async setSource(source) {
		if (!(source instanceof Source))
			throw new Error("Parameter should be a Source class");
		let data = {
			pip_number: this.pip_number,
			index: this.index,
		};
		Object.assign(data, source);
		return await this.manyCam.makeQueryAndSend(commands.set_source, data);
	}

	/**
	 * Sets desktop as a source
	 * @param {boolean} [isCursorArea=false] a - If true - sets only cursor area, false - fullscreen. False by default
	 * @returns {Promise<boolean>} Success of the command
	 */
	async setDesktop(isCursorArea = false) {
		let desktop = new Source(sources.desktop, {
			area: isCursorArea ? "cursor_area" : "fullscreen",
		});
		return await this.setSource(desktop);
	}

	/**
	 * Sets color as a source
	 * @param {string} color - Color of layer. See {@link constants.md/#colors}
	 * @returns {Promise<boolean>} Success of the command
	 */
	async setColor(color) {
		let blankImage = new Source(sources.blank_image, {
			color: color,
		});
		return await this.setSource(blankImage);
	}

	/* POSITIONING */
	/**
	 * Flips layer horizontally or vertically
	 * @param {boolean} [horizontally=false] - If true - flips horizontally, false - flips vertically. False by default
	 * @returns {Promise<boolean>} Success of the command
	 */
	async flip(horizontally = false) {
		let data = {
			pip_number: this.pip_number,
			index: this.index,
			type: horizontally ? "horizontally" : "vertically",
		};
		return await this.manyCam.makeQueryAndSend(commands.set_flip, data);
	}

	/**
	 * Rotates to direction
	 * @ignore
	 */
	async _rotate(direction) {
		let data = {
			index: this.index,
			pip_number: this.pip_number,
			type: direction,
		};
		return await this.manyCam.makeQueryAndSend(commands.set_rotate, data);
	}
	/**
	 * Rotates layer right
	 * @returns {Promise<boolean>} Success of the command
	 */
	async rotateRight() {
		return await this._rotate("right");
	}

	/**
	 * Rotates layer left
	 * @returns {Promise<boolean>} Success of the command
	 */
	async rotateLeft() {
		return await this._rotate("left");
	}

	/**
	 * Activates playlist
	 * @param {number} id - Id of playlist
	 * @returns {Promise<boolean>} Success of the command
	 */
	async activatePlaylistItem(id) {
		let data = {
			index: this.index,
			pip_number: this.pip_number,
			id: id,
		};
		return await this.manyCam.makeQueryAndSend(
			commands.activate_playlist_item,
			data
		);
	}
}
module.exports = Layer;
