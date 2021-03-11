/**
 * Represents subscription
 * @property {string} expires Expiring date
 * @property {string} id Id of subscription
 * @property {string} info information about subscription
 * @property {string} name Name of subscription
 * @property {string} owner Owner of subscription
 * @property {boolean} shared
 */
class Subscription {
	expires = "";
	id = "";
	info = "";
	name = "";
	owner = "";
	shared = false;

	constructor(props) {
		if (props) Object.assign(this, props);
	}
}
module.exports = Subscription;
