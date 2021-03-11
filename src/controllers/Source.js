const { sources } = require("../globals");
/**
 * Represents source
 * @property {string} type - Type of source. See {@link constants.md/#sources}
 * @property {Object} config - Config for source. See {@link sourceConfig.md}
 */
class Source {
	type = "";
	config = {};

	/**
	 * @param {string} type - Type of source. See {@link constants.md/#sources}
	 * @param {object} config - Source configuration. See {@link sourceConfig.md}
	 */
	constructor(type, config) {
		// if (!sources[type]) throw new Error("There is no such type of source");
		this.type = type;
		this.config = config;
	}
}

module.exports = Source;
