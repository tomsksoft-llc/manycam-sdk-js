const Query = require("./Query");
const { events, commands, commandTypes } = require("../globals");

class QueryBuilder {
	constructor(command, sessionToken) {
		this.command = command;
		this.event = command;
		this.sessionToken = sessionToken;
		this.setCommandType();
	}
	setCommandType(commandType = this.command.split("_")[0]) {
		this.commandType = commandType;
		return this;
	}
	setEvent(event) {
		this.event = event;
		return this;
	}
	setData(data) {
		this.data = data;
		return this;
	}
	setAccessKey(accessKey) {
		this.accessKey = accessKey;
		return this;
	}
	build() {
		if (!commands[this.command]) throw new Error("No such command");
		// if (!commandTypes[this.commandType])
		//     throw new Error("No such command type");
		if (!commands[this.event]) throw new Error("No such event");

		return new Query(
			this.command,
			this.commandType,
			this.event,
			this.sessionToken,
			this.data,
			this.accessKey
		);
	}
}
module.exports = QueryBuilder;
