/**
 * @ignore
 */
class BaseController {
	_manyCam = {};

	/**
	 * @param {ManyCam} manyCam
	 * @param {string} index
	 */
	constructor(manyCam) {
		Object.defineProperty(this, "_manyCam", { value: manyCam });
	}
	get manyCam() {
		return this._manyCam;
	}
}
module.exports = BaseController;
