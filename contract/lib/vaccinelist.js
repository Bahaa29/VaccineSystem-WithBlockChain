'use strict';

const List = require('../ledger-api/list');
const Vaccine = require('./vaccine');
class vaccinelist extends List {

    constructor(ctx) {
        super(ctx, 'org.vaccinelist');
        this.use(Vaccine)
    }
    async addVaccine(vaccineID) {
        return this.addState(vaccineID);
    }
    async getVaccine(vaccineID) {
        return this.getState(vaccineID);
    }
    async updateVaccine(vaccineID) {
        return this.updateState(vaccineID);
    }
    async vaccineExist(vaccineID) {
        return this.IsExist(vaccineID);
    }
    async queryByCitizen(citizenID) {
        return this.queryKeyByCitizen(citizenID);
    }
    async queryByHospital(hospitalID) {
        return this.queryKeyByHospital(hospitalID);
    }
    async queryByHospitalCondition(hospitalID,Status) {
        return this.queryKeyByHospitalCondition(hospitalID,Status);
    }
    async queryBySerumAndVaccine(serumID) {
        return this.queryKeyBySerumAndVaccine(serumID);
    }
    async queryStateHistory(VID,Vname){
         return this.getAssetHistory(VID,Vname)
     }
    async getVaccineHistory(vaccineID) {
        return this.getHistory(vaccineID)
    }
    async queryByCure(cureID) {
        return this.queryKeyByCure(cureID);
    }
    async queryByBatch(batchid) {
        return this.queryKeyByBatch(batchid)
    }
    async queryByCompany(companyID) {
        return this.queryByCompany(companyID)
    }
    async getvaccines(){
        return this.getStates();
    }
}
module.exports= vaccinelist;