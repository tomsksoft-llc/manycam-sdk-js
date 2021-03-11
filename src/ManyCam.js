//@ts-check
"use strict";
const md5 = require("md5");
const Core = require("./core/Core");
const Preset = require("./controllers/Preset");
const Source = require("./controllers/Source");
const {
	commands,
	sources,
	notifications,
	commandTypes,
	events,
	readyState,
} = require("./globals");
const Subscription = require("./controllers/Subscription");
const Layer = require("./controllers/Layer");
const Resolution = require("./controllers/Resolution");
const QueryBuilder = require("./core/QueryBuilder");

/**
 * Main class containing control methods
 */
class ManyCam extends Core {
	/**
	 * @param {Object} settings - Settings
	 * @param {string} settings.host - Host
	 * @param {string} settings.port - Port
	 * @param {string} settings.access_key - Access Key provided by ManyCam
	 */
	constructor(settings) {
		super(settings);
	}
	/**
	 * Connects to ManyCam API
	 * @returns {Promise<boolean>} Success of the command
	 */
	connect() {
		return new Promise((resolve, reject) => {
			const md5Hash = md5(this.settings.access_key);
			let query = new QueryBuilder(commands.request_for_access)
				.setAccessKey(md5Hash)
				.build();

			if (this.opened()) {
				this.query(query).then((data) => {
					this.status = readyState.connected;
					resolve(data);
				});
			} else {
				this.on(events.opened, () => {
					this.query(query).then((data) => {
						this.status = readyState.connected;
						resolve(data);
					});
				});
			}
		});
	}

	/* FACTORY METHODS*/
	/**
	 * Creates a Preset instance
	 * @param {Object} props - Preset props
	 * @param {number} [props.index] - Index
	 * @param {string} [props.name] - Name
	 * @param {string} [props.type] - Type. See {@link constants.md#presetTypes}
	 * @returns {Preset} New Preset instance
	 */
	createPresetInstance({ name, index, type }) {
		let presetFields = { name, index, type };
		return new Preset(presetFields, this);
	}
	/**
	 * Creates a Layer instance
	 * @param {Object} props - Preset props
	 * @param {number} props.index - Index of preset
	 * @param {number} props.pip_number - Pip number of layer (Id)
	 * @param {number} [props.x] - X value
	 * @param {number} [props.y] - Y value
	 * @param {number} [props.width] - Width of layer
	 * @param {number} [props.height] - Height of layer
	 * @param {string} [props.order] - Order in preset
	 * @returns {Layer} New Layer instance
	 */
	createLayerInstance({
		index,
		pip_number,
		x = 0,
		y = 0,
		width = 720,
		height = 1280,
		order = "front",
	}) {
		let layerFields = { index, pip_number, x, y, width, height, order };
		return new Layer(layerFields, this);
	}

	/* LOGIN/LOGOUT/EXIT */
	/**
	 * Login into account
	 * @param {string} account - Your email
	 * @param {string} password - Your password
	 * @returns {Promise<boolean>} Success of the command
	 */
	async login(account, password) {
		let data = { account: account, password: password };
		return await this.makeQueryAndSend(commands.login, data);
	}
	/**
	 * Logout from account
	 * @returns {Promise<boolean>} Success of the command
	 */
	async logout() {
		return await this.makeQueryAndSend(commands.logout);
	}
	/**
	 * Exit from ManyCam
	 * @returns {Promise<boolean>} Success of the command
	 */
	async exitApp() {
		return await this.makeQueryAndSend(commands.exit_application);
	}

	/* NOTIFICATIONS */
	/**
	 * The callback that handles events in ManyCam
	 * @callback notificationCallback
	 * @param {Object} message Message from ManyCam
	 */

	/**
	 * All notifications listener
	 * @param {notificationCallback} callback
	 */
	onNotification(callback) {
		this.on(notifications.notification, callback);
	}
	/**
	 * Motion detection listener
	 * @param {notificationCallback} callback
	 */
	onMotionDetected(callback) {
		this.on(notifications.motion_detected, callback);
	}
	/**
	 * Subscriptions listener
	 * @param {notificationCallback} callback
	 */
	onSubscriptionChanged(callback) {
		this.on(notifications.subscription_state_changed, callback);
	}
	/**
	 * Authentication listener
	 * @param {notificationCallback} callback
	 */
	onAuthChanged(callback) {
		this.on(notifications.authorization_state_changed, callback);
	}
	/**
	 * Preset change listener
	 * @param {notificationCallback} callback
	 */
	onPresetChanged(callback) {
		this.on(notifications.presets_state_changed, callback);
	}
	/**
	 * Error listener
	 * @param {notificationCallback} callback
	 */
	onError(callback) {
		this.on(events.error, callback);
	}

	/* SUBSCRIPTION*/
	/**
	 * Activate proper subscription
	 * @param {Subscription | string } subscription - Class or id of subscription
	 * @returns {Promise<boolean>} Success of the command
	 */
	async activateSubscription(subscription) {
		let data = {
			id:
				subscription instanceof Subscription
					? subscription.id
					: subscription,
		};
		if (!data.id) throw Error("Subscription ID should be defined");
		if (!(typeof data.id === "string"))
			throw Error("Subscription id should be string");
		return await this.makeQueryAndSend(
			commands.activate_subscription,
			data
		);
	}
	/**
	 * Deactivate proper subscription
	 * @param {Subscription | string } subscription - Class or id of subscription
	 * @returns {Promise<boolean>} Success of the command
	 */
	async deactivateSubscription(subscription) {
		let data = {
			id:
				subscription instanceof Subscription
					? subscription.id
					: subscription,
		};
		if (!data.id) throw Error("Subscription id should be defined");
		if (!(typeof data.id === "string"))
			throw Error("Subscription id should be string");

		return await this.makeQueryAndSend(
			commands.deactivate_subscription,
			data
		);
	}

	/* GET METHODS */

	/**
	 * Gets available subscriptions
	 * @returns {Promise<Array<Subscription>>} Array of Subscriptions
	 */
	async getSubscriptions() {
		let response = await this.makeQueryAndSend(commands.get_subscriptions);

		return response.subscriptions
			? response.subscriptions.map((item) => new Subscription(item))
			: [];
	}
	/**
	 * Gets available webcams
	 * @returns {Promise<Source>} Array of webcam Sources
	 */
	async getAvailableWebcams() {
		let response = await this.makeQueryAndSend(
			commands.get_available_webcams
		);

		return response.cameras
			? response.cameras.map((item) => new Source(sources.webcam, item))
			: [];
	}
	/**
	 * Gets available application sources
	 * @returns {Promise<Source[]>} Array of Sources
	 */
	async getApplicationSources() {
		let response = await this.makeQueryAndSend(
			commands.get_application_sources
		);
		return response.applications
			? response.applications.map((item) => {
					item.area = "application";
					return new Source(sources.desktop, item);
			  })
			: [];
	}
	/**
	 * Gets UI state
	 * @returns {Promise<boolean>} True - hidden, false - expanded
	 */
	async getUiState() {
		let response = await this.makeQueryAndSend(commands.get_ui_state);
		return !!response.is_hidden;
	}
	/**
	 * Gets state of preset
	 * @param {Preset | number} preset - Preset instance or index
	 * @returns {Promise<Preset>} Preset
	 */
	async getPresetState(preset) {
		preset = this._parsePresetIndex(preset);
		let presetState = await this.makeQueryAndSend(
			commands.get_preset_state,
			{ index: preset }
		);
		return new Preset(presetState, this);
	}
	/**
	 * Gets available video resolutions
	 * @returns {Promise<Resolution[]>} Array of Resolutions
	 */
	async getVideoResolutions() {
		let response = await this.makeQueryAndSend(
			commands.get_video_resolutions
		);
		return response.resolutions
			? response.resolutions.map((item) => {
					return new Resolution(item);
			  })
			: [];
	}
	/**
	 * Gets current resolution
	 * @returns {Promise<Resolution>} Resolution
	 */
	async getCurrentResolution() {
		let response = await this.makeQueryAndSend(
			commands.get_current_resolution
		);
		return new Resolution(response);
	}

	/**
	 * Gets current preset
	 * @returns {Promise<Preset>} Preset
	 */
	async getCurrentPreset() {
		let index = await this.getCurrentPresetIndex();
		return await this.getPresetState(index);
	}
	/**
	 * Gets current preset index
	 * @returns {Promise<number>} Index of preset
	 */
	async getCurrentPresetIndex() {
		let response = await this.makeQueryAndSend(commands.get_current_preset);
		return response.index;
	}

	/* PRESET MANAGEMENT */

	/**
	 * Checks if preset or object is valid
	 * @param {Preset} preset - Preset instance
	 * @ignore
	 */
	_verifyPreset(preset) {
		this._validateNumberParam(preset.index);
	}

	/**
	 * Checks if index is valid
	 * @param {number} index - Index of preset
	 * @param {string} [paramName]
	 * @ignore
	 */
	_validateNumberParam(index, paramName = "Index") {
		if (typeof index === "undefined")
			throw new Error(`${paramName} is required`);
		if (typeof index !== "number")
			throw new Error(`${paramName} should be a number`);
		if (Number.isNaN(index))
			throw new Error(`${paramName} should not be NaN`);
	}
	/**
	 * Query command edit_preset
	 * @param {Preset} preset - {@link Preset.md} instance
	 * @returns {Promise<boolean>} Success of the command
	 * @ignore
	 */
	async _editPreset(preset) {
		this._verifyPreset(preset);
		return await this.makeQueryAndSend(commands.edit_preset, preset);
	}
	/**
	 * Query command clear_preset
	 * @param {number} index - Index of preset
	 * @param {number} [pipNumber] - Pip number of layer
	 * @returns {Promise<boolean>} Success of the command
	 * @ignore
	 */
	async _clearPresetOrLayer(index, pipNumber) {
		this._validateNumberParam(index);
		let data = { index, pip_number: pipNumber };
		return await this.makeQueryAndSend(commands.clear_preset, data);
	}
	/**
	 * Edits chosen preset or create new one if not exist
	 * @param {Preset} preset - {@link Preset.md} instance
	 * @returns {Promise<boolean>} Success of the command
	 */
	async editPreset(preset) {
		return await this._editPreset(preset);
	}

	/**
	 * Creates chosen preset or edit existing preset
	 * @param {Preset} preset - {@link Preset.md} instance
	 * @returns {Promise<boolean>} Success of the command
	 */
	async createPreset(preset) {
		return await this._editPreset(preset);
	}

	/**
	 * Gets index from preset or object
	 * @param {Preset | number} preset - {@link Preset.md} instance
	 * @returns {number} Index of preset
	 * @ignore
	 */
	_parsePresetIndex(preset) {
		let index = typeof preset === "number" ? preset : preset.index;
		this._validateNumberParam(index);
		return index;
	}
	/**
	 * Deletes chosen preset
	 * @param {Preset | number} preset - {@link Preset.md} instance or index of preset
	 * @returns {Promise<boolean>} Success of the command
	 */
	async deletePreset(preset) {
		let index = this._parsePresetIndex(preset);
		return await this.makeQueryAndSend(commands.delete_preset, { index });
	}
	/**
	 * Clears chosen preset
	 * @param {Preset | number} preset - {@link Preset.md} instance or index of preset
	 * @returns {Promise<boolean>} Success of the command
	 */
	async clearPreset(preset) {
		let index = this._parsePresetIndex(preset);
		return await this._clearPresetOrLayer(index);
	}

	/**
	 * Makes chosen preset active
	 * @param {Preset | number} preset - {@link Preset.md} instance or index of preset
	 * @param {boolean} transiently - If true transition is smooth, false by default
	 * @returns {Promise<boolean>} Success of the command
	 */
	async makePresetActive(preset, transiently = false) {
		let data = {
			index: this._parsePresetIndex(preset),
			effect_type: transiently ? "trans" : "cut",
		};

		return await this.makeQueryAndSend(commands.make_preset_active, data);
	}
	/**
	 * Enables motion detection on chosen preset
	 * @param {Preset| number} preset - Preset or preset index
	 * @returns {Promise<boolean>} Success of the command
	 */
	async enableMotionDetection(preset) {
		let index = this._parsePresetIndex(preset);
		return await this.makeQueryAndSend(commands.set_motion_detection, {
			index,
			enabled: 1,
		});
	}
	/**
	 * Disables motion detection on chosen preset
	 * @param {Preset| number} preset - Preset or preset index
	 * @returns {Promise<boolean>} Success of the command
	 */
	async disableMotionDetection(preset) {
		let index = this._parsePresetIndex(preset);

		return await this.makeQueryAndSend(commands.set_motion_detection, {
			index,
			enabled: 0,
		});
	}
	/**
	 * Enables auto switch to preset on motion detected
	 * @param {Preset| number} preset - Preset or preset index
	 * @returns {Promise<boolean>} Success of the command
	 */
	async enableSwitchOnMotion(preset) {
		let index = this._parsePresetIndex(preset);

		return await this.makeQueryAndSend(
			commands.set_motion_detection_switch,
			{
				index,
				enabled: 1,
			}
		);
	}
	/**
	 * Disables auto switch to preset on motion detected
	 * @param {Preset| number} preset - Preset or preset index
	 * @returns {Promise<boolean>} Success of the command
	 */
	async disableSwitchOnMotion(preset) {
		let index = this._parsePresetIndex(preset);

		return await this.makeQueryAndSend(
			commands.set_motion_detection_switch,
			{
				index,
				enabled: 0,
			}
		);
	}
	/**
	 * Saves last motion detected image
	 * @param {Preset | number} preset - Preset or preset index
	 * @param {string} path - Save folder path
	 * @returns {Promise<boolean>} Success of the command
	 */
	async saveLastImageOnMotionDetected(preset, path) {
		let index = this._parsePresetIndex(preset);

		return await this.makeQueryAndSend(
			commands.save_motion_detected_image,
			{
				index,
				path: path,
			}
		);
	}
	/**
	 * Saves snapshot of chosen preset
	 * @param {Preset | number} preset - Preset or preset index
	 * @param {string} path - Save folder path
	 * @returns {Promise<boolean>} Success of the command
	 */
	async saveSnapshot(preset, path) {
		let index = this._parsePresetIndex(preset);

		return await this.makeQueryAndSend(commands.save_image, {
			index,
			path: path,
		});
	}

	/* LAYER MANAGEMENT */
	_validateLayer(layer) {
		this._validateNumberParam(layer.index);
		this._validateNumberParam(layer.pip_number, "Pip number");
	}
	/**
	 * Edits or create layer
	 * @param {Layer} layer - {@link Layer.md} instance
	 * @returns {Promise<boolean>} Success of the command
	 * @ignore
	 */
	async _editLayer(layer) {
		this._validateLayer(layer);
		return await this.makeQueryAndSend(commands.edit_layer, layer);
	}
	/**
	 * Edits layer
	 *@param {Layer} layer - {@link Layer.md} instance
	 * @returns {Promise<boolean>} Success of the command
	 */
	async editLayer(layer) {
		return this._editLayer(layer);
	}
	/**
	 * Creates layer
	 * @param {Layer} layer - {@link Layer.md} instance
	 * @returns {Promise<boolean>} Success of the command
	 */
	async createLayer(layer) {
		return this._editLayer(layer);
	}
	/**
	 * Deletes layer
	 * @param {Layer} layer - {@link Layer.md} instance or object
	 * @param {number} layer.index Index of preset
	 * @param {number} layer.pip_number Pip number of layer
	 * @returns {Promise<boolean>} Success of the command
	 */
	async deleteLayer(layer) {
		this._validateLayer(layer);
		let { index, pip_number } = layer;
		return await this.makeQueryAndSend(commands.delete_layer, {
			index,
			pip_number,
		});
	}
	/**
	 * Clears layer
	 * @param {Layer} layer - {@link Layer.md} instance or object
	 * @param {number} layer.index Index of preset
	 * @param {number} layer.pip_number Pip number of layer
	 * @returns {Promise<boolean>} Success of the command
	 */
	async clearLayer(layer) {
		this._validateLayer(layer);
		return await this._clearPresetOrLayer(layer.index, layer.pip_number);
	}

	/*UI*/
	/**
	 * Shows UI
	 * @returns {Promise<boolean>} Success of the command
	 */
	async showUI() {
		return await this.makeQueryAndSend(commands.hide_or_show_ui, {
			is_hidden: 0,
		});
	}

	/**
	 * Hides UI
	 * @returns {Promise<boolean>} Success of the command
	 */
	async hideUI() {
		return await this.makeQueryAndSend(commands.hide_or_show_ui, {
			is_hidden: 1,
		});
	}

	/**
	 * Sets transition
	 * @param {number} duration Duration of transition in `milliseconds`.
	 * @param {string} type - Transition type. See {@link constants.md#transitionTypes}
	 * @returns {Promise<boolean>} Success of the command
	 */
	async setTransition(duration, type) {
		return await this.makeQueryAndSend(commands.set_transition_type, {
			duration: duration,
			type: type,
		});
	}
	/**
	 * Sets video resolution
	 * @param {string} resolution
	 * @returns {Promise<boolean>} Success of the command
	 */
	async setVideoResolution(resolution) {
		return await this.makeQueryAndSend(commands.set_video_resolution, {
			resolution: resolution,
		});
	}
	/**
	 * Sets auto launch game option
	 * @param {boolean} isAuto - True by default
	 * @returns {Promise<boolean>} Success of the command
	 */
	async autoLaunchGame(isAuto = true) {
		return await this.makeQueryAndSend(commands.set_game_launch, {
			is_auto: +isAuto,
		});
	}
}

module.exports = ManyCam;
