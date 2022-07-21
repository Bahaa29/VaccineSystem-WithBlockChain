'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');

const Vaccine = require('./vaccine.js');
const ProcessList = require('./processlist.js');
const vaccinelist = require('./vaccinelist.js');
const Process = require('./process.js');


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
/**
 * A custom context provides easy access to list of all Vaccine and processes 
 */
class VaccineContext extends Context {

    constructor() {
        super();
        this.vaccinelist = new vaccinelist(this);
        this.processList = new ProcessList(this);
    }

}

/**
 * Define Vaccine smart contract by extending Fabric Contract class
 *
 */
class VaccineContract extends Contract {

    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.vaccine');
    }
    createContext() {
        return new VaccineContext();
    }

    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiate(ctx) {
        console.log('Instantiate the contract');
        console.log('============= ADD vaccines ===========');

        const vaccineArray = new Array();
        vaccineArray[0] = Vaccine.createInstance('V1', 'Sinovak', 'SinovakCompany', 'Covid19', '1/1/2021', '1/1/2030', '1/1/2022', 'SVCairo', 'mandatory', 'K900');
        vaccineArray[1] = Vaccine.createInstance('V2', 'Sinovak', 'SinovakCompany', 'Covid19', '1/1/2021', '1/1/2030', '1/1/2022', 'SVCairo', 'mandatory', 'K900');
        vaccineArray[2] = Vaccine.createInstance('V3', 'Sinovak', 'SinovakCompany', 'Covid19', '1/1/2021', '1/1/2030', '1/1/2022', 'SVCairo', 'mandatory', 'K900');
        vaccineArray[3] = Vaccine.createInstance('V4', 'Sinovak', 'SinovakCompany', 'Covid19', '1/1/2021', '1/1/2030', '1/1/2022', 'SVCairo', 'mandatory', 'K900');
        vaccineArray[4] = Vaccine.createInstance('V5', 'Sinovak', 'SinovakCompany', 'Covid19', '1/1/2021', '1/1/2030', '1/1/2022', 'SVCairo', 'mandatory', 'K900');
        vaccineArray[5] = Vaccine.createInstance('V6', 'Sinovak', 'SinovakCompany', 'Covid19', '1/1/2021', '1/1/2030', '1/1/2022', 'SVCairo', 'mandatory', 'K900');
        vaccineArray[6] = Vaccine.createInstance('V1', 'Taeetanus', 'Masr', 'Taeetanus', '1/1/2021', '1/1/2030', '1/1/2022', 'SVCairo', 'Optional', 'T900');
        vaccineArray[7] = Vaccine.createInstance('V2', 'Taeetanus', 'Masr', 'Taeetanus', '1/1/2021', '1/1/2030', '1/1/2022', 'SVCairo', 'Optional', 'T900');
        vaccineArray[8] = Vaccine.createInstance('V1', 'BCG', 'Masr', 'BCG', '1/1/2021', '1/1/2030', '1/1/2022', 'SVCairo', 'Optional', 'V900');
        vaccineArray[9] = Vaccine.createInstance('V2', 'BCG', 'Masr', 'BCG', '1/1/2021', '1/1/2030', '1/1/2022', 'SVCairo', 'Optional', 'V900');
        vaccineArray[10] = Vaccine.createInstance('V1', 'DTP', 'Masr', 'DTP', '1/1/2021', '1/1/2030', '1/1/2022', 'SVCairo', 'Optional', 'D900');
        vaccineArray[11] = Vaccine.createInstance('V2', 'DTP', 'Masr', 'DTP', '1/1/2021', '1/1/2030', '1/1/2022', 'SVCairo', 'Optional', 'D900');

        for (let i = 0; i < vaccineArray.length; i++) {
            await ctx.vaccinelist.addVaccine(vaccineArray[i]);
        }
        const processArray = new Array();

        processArray[0] = Process.createInstance('P4367', 'V1:Sinovak', 'C1', 'ORG1', 'COVID','Bahaa Elsayed','bahaaeldin@gmial.com','helwan','58 ra8b','egyption');
        processArray[1] = Process.createInstance('P4350', 'V3:Astraznka', 'C1', 'ORG1','VIRUS-C','george ibrahim','george@gmial.com','shobra','shobra street','egyption');
        processArray[2] = Process.createInstance('P4347', 'V2:Sinovak', 'C2', 'ORG1', 'KOLIRA','mohamed sayed','m.sayed@gmial.com','giza','harm','egyption');

        for (let i = 0; i < processArray.length; i++) {
            await ctx.processList.addProcess(processArray[i]);
        }
    }
    async instantiate2(ctx) {
        console.log('Instantiate the contract');
        console.log('============= ADD vaccine ===========');
        const wb = xlsx.readFile("./Data.xlsx", {cellDates:true});
        var ws_vaccine = wb.Sheets["vaccine"];
        console.log('read sheet');
        const vaccineData = xlsx.utils.sheet_to_json(ws_vaccine, {raw:false});
        console.log(vaccineData[0]);
        for (let i = 0; i < vaccineData.length; i++) {
            const timeStamp = vaccineData[i].date+ " " + vaccineData[i].time;
            const vaccine=Vaccine.createInstance(vaccineData[i].VID,vaccineData[i].Vname,vaccineData[i].company,vaccineData[i].cure,vaccineData[i].date,vaccineData[i].expired,timeStamp,vaccineData[i].owner,vaccineData[i].status,vaccineData[i].batchnum);
            await ctx.vaccinelist.addVaccine(vaccine);
            
        }
    }
    async createProcess(ctx, processID, vaccineKey, citizenID, orgID, type,name,email,city,address,nationality) {
        console.log('============= START : Create Process ===========');

        const processKey = processID + ":" + type;
        // Check if the process already exists
        if (await ctx.processList.processExists(processKey)) {
            let response = {};
            response.error = `Process with ID ${processKey} is already exist.`;
            return response;
        }
        if (!await ctx.vaccinelist.vaccineExist(vaccineKey)) {
            let response2 = {};
            response2.error = `Vaccine number with ID ${vaccineKey} doesn't exists.`;
            return response2;
        }
        let process = Process.createInstance(processID, vaccineKey, citizenID, orgID, type,name,email,city,address,nationality);
        await ctx.processList.addProcess(process);
        console.log('============= END : Add Process ===========');
        return process;
    }
    async createVaccine(ctx, VID, Vname, company, cure, date, expired, currentDate, owner, status, batchnum) {

        const vaccineKey = VID + ":" + Vname;
        // Check if the vaccine key already exists
        if (await ctx.vaccinelist.vaccineExist(vaccineKey)) {
            let response = {};
            response.error = `VACCINE KEY with ID ${vaccineKey} is already exist.`;
            return response;   
        }
        if (owner.startsWith("SV")) {
            let vaccine = Vaccine.createInstance(VID, Vname, company, cure, date, expired, currentDate, owner, status, batchnum);
            await ctx.vaccinelist.addVaccine(vaccine);
            console.log('============= END : Add Vaccine ===========');
            return vaccine;
        }
        else {
            let response2 = {};
            response2.error = `Error owner not vaild.`;
            return response2; 
        }
    }
    async underTransportVaccine(ctx, vaccineNum, timeStamp,new_owner) { 
        // Check whether the blood bag exists
        if (! await ctx.vaccinelist.vaccineExist(vaccineNum)) {
            let response = {};
            response.error = `VACCINE KEY with ID ${vaccineKey} is already exist.`;
            return response;  
        }
        const vaccine = await ctx.vaccinelist.getVaccine(vaccineNum);
        if (vaccine.location != LOCATION.SEURM_VACCINE) {
            let response2 = {};
            response2.error = `Error location is not valid.`;
            return response2; 
        }

        // If state is not equal to ready
        if (vaccine.currentState != STATE.READY) {
            let response3 = {};
            response3.error = `Error vaccine state is not valid.`;
            return response3;
        }
        // Change din state to "UNDER_TRANSPORTATION"
        vaccine.currentState = STATE.UNDER_TRANSPORTATION;
        vaccine.currentDate = timeStamp;
        vaccine.location = LOCATION.TRANSPORTATION_CAR;
        vaccine.owner = new_owner;
        // Update state in ledger
        await ctx.vaccinelist.updateVaccine(vaccine);
        ctx.stub.setEvent('UNER_TRANSPORTATION_Vaccine', vaccine.toBuffer());
        console.log('============= END : Vaccine Transportation ===========');
    }

    async delieveredVaccine(ctx, vaccineNum, timeStamp) {

        console.log('============= START : delieveredvaccine ===========');

        if (! await ctx.vaccinelist.vaccineExist(vaccineNum)) {
            let response = {};
            response.error = `VACCINE KEY with ID ${vaccineKey} is already exist.`;
            return response;   
        }
        const vaccine = await ctx.vaccinelist.getVaccine(vaccineNum);
        //check if location is transportation car
        if (vaccine.location != LOCATION.TRANSPORTATION_CAR) {
            let response2 = {};
            response2.error = `Error location is not valid.`;
            return response2; 
        }

        // If state is not equal to UNDER_TRANSPORTATION
        if (vaccine.currentState != STATE.UNDER_TRANSPORTATION) {
            let response3 = {};
            response3.error = `Error vaccine state is not valid.`;
            return response3;
        }
        // Set din state to "Delievered"
        vaccine.currentState = STATE.DELIEVERED;
        vaccine.currentDate = timeStamp;
        vaccine.location = LOCATION.HOSPITAL;
        // Update state in ledger
        await ctx.vaccinelist.updateVaccine(vaccine);
        ctx.stub.setEvent('VACCINE_DELIEVERED', vaccine.toBuffer());
        console.log('============= END : delievervaccine ===========');
    }

    async usedVaccine(ctx, vaccineNum, CitizenId, timeStamp,processNUM) {
        console.log('============= START : Usedvaccine ===========');

        if (! await ctx.vaccinelist.vaccineExist(vaccineNum)) {
            let response = {};
            response.error = `VACCINE KEY with ID ${vaccineKey} is already exist.`;
            return response;
        }
        const vaccine = await ctx.vaccinelist.getVaccine(vaccineNum);
        const process=await ctx.processList.getProcess(processNUM)
        timeStamp = new Date(timeStamp);
        let time = new Date(vaccine.expired);
        if (timeStamp.getTime() > time.getTime()) {
            throw new Error(`Vaccine is expired`);
        }
        //check if location is hospital
        if (vaccine.location != LOCATION.HOSPITAL) {
            let response2 = {};
            response2.error = `Error location is not valid.`;
            return response2; 
        }
        vaccine.citizenid = CitizenId;
        if (vaccine.currentState != STATE.DELIEVERED) {
            let response3 = {};
            response3.error = `Error vaccine state is not valid.`;
            return response3;
        }
        // Set din state to "USED"
        vaccine.currentState = STATE.USED;
        vaccine.currentDate = timeStamp;
        process.currentState='CONFIRM'
        await ctx.processList.updateProcess(process)
        // Update state in ledger
        await ctx.vaccinelist.updateVaccine(vaccine);
        ctx.stub.setEvent('VACCINE_USED', vaccine.toBuffer());
        console.log('============= END : usedVACCINE ===========');
    }
    async readVaccine(ctx, key) {
        return await ctx.vaccinelist.getVaccine(key)
    }
    async IsExist(ctx, key) {
        return await ctx.vaccinelist.vaccineExist(key);
    }
    async queryHistory(ctx, VID, Vname) {
        let results = await ctx.vaccinelist.getAssetHistory(VID, Vname);
        return results;
    }
    async queryHistoryForProcess(ctx, VID, Vname) {
        let results = await ctx.processList.getAssetHistory(VID, Vname);
        return results;
    }
    async queryALL(ctx) {
        let results = await ctx.vaccinelist.getvaccines(ctx);
        return results;
    }
    async queryCitizen(ctx, citizenID) {
        let results = await ctx.vaccinelist.queryByCitizen(citizenID);
        return results;
    }
    async queryHospital(ctx, hospitalID) {
        let results = await ctx.vaccinelist.queryByHospital(hospitalID);
        return results;
    }
    async queryHospitalByCondition(ctx, hospitalID) {
        let results = await ctx.vaccinelist.queryByHospitalCondition(hospitalID,'UNDER_TRANSPORTATION');
        return results;
    }
    async queryCure(ctx, cureID) {
        let results = await ctx.vaccinelist.queryByCure(cureID);
        return results;
    }
    async querySeurm(ctx, serumID) {
        let results = await ctx.vaccinelist.queryBySerumAndVaccine(serumID);
        return results;
    }
    async queryBatch(ctx, batchid) {
        let results = await ctx.vaccinelist.queryByBatch(batchid);
        return results;
    }
    /**
     * Query all processes
    * @param { Context } ctx smart contract transaction context
    */
    async queryAllProcess(ctx) {
        return await ctx.processList.getProcesses();
    }
    /**
     * Query a process by its number
     * @param { Context } ctx smart contract transaction context
     * @param { processNumber } process number to query
     */
    async queryProcess(ctx, processNumber) {
        // Check if the process exists
        if (!await ctx.processList.processExists(processNumber)) {
            let response = {};
            response.error = `Process with ID ${processNumber} doesn't exists.`;
            return response;
        }
        return await ctx.processList.getProcess(processNumber);
    }
    async HospitalProcesses(ctx, orgID) {
        let results = await ctx.processList.queryHospitalProcess(orgID,'REQUEST');
        return results;
    }
    async UserProcesses(ctx,User) {
        let results = await ctx.processList.queryUserProcess(User);
        return results;
    }
    
}

module.exports = VaccineContract;
