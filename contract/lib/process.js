'use strict';

// Utility class for ledger state
const State = require('./../ledger-api/state.js');
const STATE = {
    SENDTO: 'REQUEST',
    SENDFROM: 'CONFIRM',
}
class Process extends State {

    constructor(obj) {
        super(Process.getClass(), [obj.processID, obj.type]);
        Object.assign(this, obj);
    }

    static fromBuffer(buffer) {
        return Process.deserialize(Buffer.from(JSON.parse(buffer)));
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to process
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, Process);
    }

    /**
     * Factory method to create a process object
     */
    static createInstance(processID, vaccineKey, citizenID, orgID,type,name,email,city,address,nationality) {
        return new Process({processID, vaccineKey, citizenID, orgID, type,name,email,city,address,nationality,currentState: STATE.SENDTO});
    }

    static getClass() {
        return 'org.process';
    }
}

module.exports = Process;