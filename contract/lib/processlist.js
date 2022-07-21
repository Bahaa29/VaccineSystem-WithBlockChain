'use strict';

// Utility class for collections of ledger states --  a state list
const List = require('../ledger-api/list');

const Process = require('./process.js');

class ProcessList extends List {

    constructor(ctx) {
        super(ctx, 'org.processlist');
        this.use(Process);
    }

    async addProcess(process) {
        return this.addState(process);
    }

    async getProcess(processKey) {
        return this.getState(processKey);
    }

    async updateProcess(process) {
        return this.updateState(process);
    }
    async getProcesses() {
        return this.getStates();
    }
    async processExists(processKey) {
        return this.IsExist(processKey);
    }
    async queryHospitalProcess(orgID,type) {
        return this.queryKeyHospitalPocess(orgID,type);
    }
    async queryUserProcess(user) {
        return this.queryKeyUserPocess(user);
    }


}
module.exports = ProcessList;