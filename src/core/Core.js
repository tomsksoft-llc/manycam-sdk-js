//@ts-check
"use strict";
const EventEmitter = require("events");
const WebSocket = require("ws");

const {
	events,
	commands,
	commandTypes,
	notifications,
	readyState,
} = require("../globals");
const QueryBuilder = require("./QueryBuilder");

/**
 * @ignore
 */
class Core extends EventEmitter {
	/**
	 * @param {Object} settings - Settings
	 * @param {string} settings.host - Host
	 * @param {string} settings.port - Port
	 * @param {string} settings.access_key - Access Key provided by ManyCam
	 */
	constructor(settings) {
		super();
		/**
		 * @property {string} _sessionToken fvfvokfv
		 */
		this._sessionToken = "";
		this.settings = settings;
		this.status = readyState.closed;

		this._ws = new WebSocket(`${settings.host}:${settings.port}`);

		this._ws.onerror = (error) => {
			this.emit(events.error, error);
		};
		this._ws.onclose = () => {
			this.status = readyState.closed;
		};
		this._ws.onopen = () => {
			this.emit(events.opened);
			this.status = readyState.opened;
		};
		this._ws.onmessage = (message) => {
			let answer = JSON.parse(message.data);
			let data = answer.data;
			let status = answer.status;
			let command = answer.command;
			let type = answer.type;
			let commandArr = command.split("_");
			let commandType = command.split("_")[0];
			// console.log(answer);
			if (command === "notification") {
				// Notify all
				this.emitEvent(notifications.notification, true, data);

				// Notify by notification type
				if (notifications[type]) this.emitEvent(type, true, data);
				else throw new Error("There is no such notification");
			} else if (status === "success")
				switch (commandType) {
					case commandTypes.request: {
						this._sessionToken = answer.session_token;
						this.emitEvent(command, true);
						break;
					}
					case commandTypes.get: {
						this.emitEvent(command, true, data);
						break;
					}
					default: {
						this.emitEvent(command, true);
						break;
					}
				}
			else {
				let errorMsg = `Command "${command}" failed: ${answer.error_message}`;
				this.emitEvent(command, false, errorMsg);
			}
		};
	}

	get sessionToken() {
		return this._sessionToken;
	}
	/**
	 * @param {string} event
	 * @param {boolean} isSuccessful
	 * @param {object} data
	 */
	emitEvent(event, isSuccessful, data = false) {
		if (this.listenerCount(event) !== 0)
			this.emit(event, { isSuccessful, data });
	}

	query(query) {
		return new Promise((resolve, reject) => {
			if (!query.sessionToken && this._sessionToken)
				query.setSessionToken(this._sessionToken);

			this.once(query.event, (data) => {
				if (data.isSuccessful) {
					if (data.data) resolve(data.data);
					else resolve(true);
				} else reject(new Error(data.data));
			});
			this._ws.send(query.commandObjectJSON);
		});
	}
	/**
	 * @param {string} command
	 * @param {object} [data]
	 */
	makeQuery(command, data) {
		return new QueryBuilder(command, this._sessionToken)
			.setData(data)
			.build();
	}
	/**
	 * @param {string} command
	 * @param {object} [data]
	 */
	async makeQueryAndSend(command, data) {
		let query = this.makeQuery(command, data);
		return await this.query(query);
	}
	close() {
		this._ws.close();
	}
	opened() {
		return this.status === readyState.opened;
	}
	connected() {
		return this.status === readyState.connected;
	}
}
module.exports = Core;
