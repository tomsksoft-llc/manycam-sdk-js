/**
 * Represents resolution
 * @property {string} resolution Video resolution
 */
class Resolution {
	resolution = "";
	/**
	 * @param {Object} props
	 * @param {string} resolution
	 */
	constructor(props) {
		if (props) Object.assign(this, props);
	}
	/**
	 * Convert resolution to string
	 * @returns {string} Resolution
	 */
	toString() {
		return this.resolution;
	}
}
module.exports = Resolution;
