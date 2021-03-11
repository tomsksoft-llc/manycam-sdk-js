class Query {
	// TODO оператор расширения?
	constructor(command, commandType, event, sessionToken, data, accessKey) {
		this.sessionToken = sessionToken;
		this.command = command;
		this.commandType = commandType;
		this.event = event;
		this.data = data;
		this.accessKey = accessKey;
	}

	get commandObject() {
		return {
			session_token: this.sessionToken,
			command: this.command,
			data: this.data,
			access_key: this.accessKey,
		};
	}
	get commandObjectJSON() {
		return JSON.stringify(this.commandObject);
	}
	setSessionToken(token) {
		this.sessionToken = token;
	}
}
module.exports = Query;
