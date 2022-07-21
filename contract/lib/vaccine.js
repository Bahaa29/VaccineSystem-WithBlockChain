'use strict';
const State = require('./../ledger-api/state.js');

const STATE = {
    READY: 'READY',
    UNDER_TRANSPORTATION: 'UNDER_TRANSPORTATION',
    DELIEVERED: 'DELIEVERED',
    USED: 'USED',
};
const LOCATION = {
    SEURM_VACCINE: 'SEURM_VACCINE',//SV
    TRANSPORTATION_CAR: 'TRANSPORTATION_CAR',//NULL
    HOSPITAL: 'HOSPITAL',//H
    CITIZEN: 'CITIZEN'//C

};
class Vaccine extends State {
    constructor(obj) {
        super(Vaccine.getClass(), [obj.VID, obj.Vname]);
        Object.assign(this, obj);
    }
    static createInstance(VID, Vname, company, cure, date, expired, currentDate, owner, status, batchnum) {
        return new Vaccine({ VID, Vname, company, cure, date, expired, currentDate, owner, status, batchnum, citizenid: 'NONE', location: LOCATION.SEURM_VACCINE, currentState: STATE.READY });
    }

    static getClass() {
        return 'org.vaccine';
    }
    getKey() {
        return (this.VID + ":" + this.Vname);
    }

    getTimeStamp() {
        return this.currentDate;
    }

    setTimeStamp(newTimeStamp) {
        this.currentDate = newTimeStamp;
    }

    getOwner() { // the owner of vaccine 
        return this.owner;
    }

    setOwner(newowner) {
        this.owner = newowner;
    }

    getLocation() {
        return this.location;
    }

    setLocation(newLocation) {
        this.location = newLocation;
    }
    getCitizen() {
        return this.citizenid;
    }

    setStatus(Status) { // mandatory or optional 
        this.status = Status
    }

    getStatus() {
        return this.status
    }

    setCitizen(newCitizen) {
        this.citizenid = newCitizen;
    }

    setCompany(company) {
        this.company = company
    }

    getcompany() {
        return this.company
    }

    setReady() {
        this.currentState = STATE.READY;
    }
    setUnderTransportation() {
        this.currentState = STATE.UNDER_TRANPORTATION;
    }
    setDelievered() {
        this.currentState = STATE.DELIEVERED;
    }
    setUsed() {
        this.currentState = STATE.USED;
    }

    isReady() {
        return this.currentState === STATE.READY;
    }
    isUnderTransportation() {
        return this.currentState === STATE.UNDER_TRANPORTATION;
    }
    isDelievered() {
        return this.currentState === STATE.DELIEVERED;
    }
    isUsed() {
        return this.currentState === STATE.USED;
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }
    static deserialize(data) {
        return State.deserializeClass(data, Vaccine);
    }

}
module.exports = Vaccine;
