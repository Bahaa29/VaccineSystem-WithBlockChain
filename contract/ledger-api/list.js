'use strict';
const State = require('./state.js');
const LOCATION = {
    SEURM_VACCINE: 'SEURM_VACCINE',//SV
    TRANSPORTATION_CAR: 'TRANSPORTATION_CAR',//NULL
    HOSPITAL: 'HOSPITAL',//H
    CITIZEN: 'CITIZEN'//C

};
class List {
    constructor(ctx, listName) {
        this.ctx = ctx;
        this.name = listName;
        this.supportedClasses = {};
    }

    // 1
    async addState(state) {
        let key = this.ctx.stub.createCompositeKey(this.name, state.getSplitKey());
        console.log(key)
        let data = State.serialize(state);
        await this.ctx.stub.putState(key, data);
    }

    /**
     * Get a state from the list using supplied keys. Form composite
     * keys to retrieve state from world state. State data is deserialized
     * into JSON object before being returned.
     */
    // 2
    async getState(key) {

        let ledgerKey = this.ctx.stub.createCompositeKey(this.name, State.splitKey(key));
        let data = await this.ctx.stub.getState(ledgerKey);
        if (data && data.toString('utf8')) {
            let state = State.deserialize(data, this.supportedClasses);
            return state;
        } else {
            return null;
        }
    }
    async IsExist(key) {

        let ledgerKey = this.ctx.stub.createCompositeKey(this.name, State.splitKey(key));
        let data = await this.ctx.stub.getState(ledgerKey);
        if (data && data.toString('utf8')) {
            //let state = State.deserialize(data, this.supportedClasses);
            return true;
        } else {
            return false;
        }
    }
    

    /**
     * Update a state in the list. Puts the new state in world state with
     * appropriate composite key.  Note that state defines its own key.
     * A state is serialized before writing. Logic is very similar to
     * addState() but kept separate becuase it is semantically distinct.
     */
    // 3
    async updateState(state) {
        let key = this.ctx.stub.createCompositeKey(this.name, state.getSplitKey());
        let data = State.serialize(state);
        await this.ctx.stub.putState(key, data);
    }
   

    // 7
    async queryKeyByCitizen(CitizenID) // get All Vaccines for {user} 
    {

        let self = this;
        if (arguments.length < 1) {
            throw new Error('Incorrect number of arguments. Expecting owner name.');
        }
        let queryString = {};
        queryString.selector = {};
        queryString.selector.citizenid = CitizenID;
        let method = self.getQueryResultForQueryString
        let queryResults = await method(this.ctx, self, JSON.stringify(queryString));
        return queryResults;
    }


    /**
    * queryKeyByOwner hospital
    * @param {String} hospitalID hospital blood bags
    */
    async queryKeyByHospital(hospitalID) {

        let self = this;
        if (arguments.length < 1) {
            throw new Error('Incorrect number of arguments. Expecting owner name.');
        }
        let queryString = {};
        queryString.selector = {};
        //  queryString.selector.docType = 'indexOwnerDoc';
        queryString.selector.owner = hospitalID;
        // set to (eg)  '{selector:{owner:MagnetoCorp}}'
        let method = self.getQueryResultForQueryString;
        let queryResults = await method(this.ctx, self, JSON.stringify(queryString));
        return queryResults;
    }
    async queryKeyByHospitalCondition(hospitalID,Status) {

        let self = this;
        if (arguments.length < 1) {
            throw new Error('Incorrect number of arguments. Expecting owner name.');
        }
        let queryString = {};
        queryString.selector = {};
        queryString.selector.owner = hospitalID;
        queryString.selector.currentState=Status
        let method = self.getQueryResultForQueryString;
        let queryResults = await method(this.ctx, self, JSON.stringify(queryString));
        return queryResults;
    }
    async queryKeyHospitalPocess(orgID,type) {

        let self = this;
        if (arguments.length < 1) {
            throw new Error('Incorrect number of arguments. Expecting owner name.');
        }
        let queryString = {};
        queryString.selector = {};
        //  queryString.selector.docType = 'indexOwnerDoc';
        queryString.selector.orgID = orgID;
        queryString.selector.currentState = type;
        // set to (eg)  '{selector:{owner:MagnetoCorp}}'
        let method = self.getQueryResultForQueryString;
        let queryResults = await method(this.ctx, self, JSON.stringify(queryString));
        return queryResults;
    } 
    async queryKeyUserPocess(user) {
        let self = this;
        if (arguments.length < 1) {
            throw new Error('Incorrect number of arguments. Expecting owner name.');
        }
        let queryString = {};
        queryString.selector = {};
        queryString.selector.citizenID = user;
        let method = self.getQueryResultForQueryString;
        let queryResults = await method(this.ctx, self, JSON.stringify(queryString));
        return queryResults;
    }
    async queryKeyBySerumAndVaccine(serumandvaccineID) {

        let self = this;
        if (arguments.length < 1) {
            throw new Error('Incorrect number of arguments. Expecting owner name.');
        }
        let queryString = {};
        queryString.selector = {};
        queryString.selector.owner = serumandvaccineID;
        let method = self.getQueryResultForQueryString;
        let queryResults = await method(this.ctx, self, JSON.stringify(queryString));
        return queryResults;
    }

    async getHistory(key) {
        let ledgerKey = await this.ctx.stub.createCompositeKey(this.name, State.splitKey(key));
        const resultsIterator = await this.ctx.stub.getHistoryForKey(ledgerKey);
        let results = await this.getAllResults(resultsIterator, true);
        return results;
    }

    async getAllResults(iterator, isHistory) {
        let allResults = [];
        let res = { done: false, value: null };
    
        while (true) {
            res = await iterator.next();
            let jsonRes = {};
            if (res.value && res.value.value.toString()) {
                if (isHistory && isHistory === true) {
                    //jsonRes.TxId = res.value.tx_id;
                    jsonRes.TxId = res.value.txId;
                    jsonRes.Timestamp = res.value.timestamp;
                    jsonRes.Timestamp = new Date((res.value.timestamp.seconds.low * 1000));
                    let ms = res.value.timestamp.nanos / 1000000;
                    jsonRes.Timestamp.setMilliseconds(ms);
                    if (res.value.is_delete) {
                        jsonRes.IsDelete = res.value.is_delete.toString();
                    } else {
                        try {
                            jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
    
                        } catch (err) {
                            console.log(err);
                            jsonRes.Value = res.value.value.toString('utf8');
                        }
                    }
                } else { // non history query ..
                    //jsonRes.Key = res.value.key;
                    try {
                        jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                         console.log(err);
                        jsonRes.Record = res.value.value.toString('utf8');
                    }
                }
                allResults.push(jsonRes);
            }
            // check to see if we have reached the end
            if (res.done) {
                // explicitly close the iterator 
                console.log('iterator is done');
                await iterator.close();
                return allResults;
            }
    
        }  // while true
    }
    // 6
    async getQueryResultForQueryString(ctx, self, queryString) {
        const resultsIterator = await ctx.stub.getQueryResult(queryString);
        let results = await self.getAllResults(resultsIterator, false);

        return results;

    }
    async queryKeyByCure(cure) // RETURN ALL VACIINE BELONGE TO CUURENT TYPE{user} 
    {

        let self = this;
        if (arguments.length < 1) {
            throw new Error('Incorrect number of arguments. Expecting owner name.');
        }

        let queryString = {};
        queryString.selector = {};
        queryString.selector.cure = cure;
        let method = self.getQueryResultForQueryString;
        let queryResults = await method(this.ctx, self, JSON.stringify(queryString));
        return queryResults;
    }
    async queryKeyByBatch(batchid) 
    {

        let self = this;
        if (arguments.length < 1) {
            throw new Error('Incorrect number of arguments. Expecting company name.');
        }

        let queryString = {};
        queryString.selector = {};
        queryString.selector.batchnum = batchid;
        let method = self.getQueryResultForQueryString;
        let queryResults = await method(this.ctx, self, JSON.stringify(queryString));
        return queryResults;
    }
    async queryByCompany(company) // RETURN ALL VACIINE BELONGE TO CUURENT company{MOH} 
    {

        let self = this;
        if (arguments.length < 1) {
            throw new Error('Incorrect number of arguments. Expecting company name.');
        }

        let queryString = {};
        queryString.selector = {};
        queryString.selector.company = company;
        let method = self.getQueryResultForQueryString;
        let queryResults = await method(this.ctx, self, JSON.stringify(queryString));
        return queryResults;
    }
   
    async getStates() {
        return await this.query({});
    }
    async query(query){
        var stub = this.ctx.stub;
        if (!query.selector) {
            query.selector = {};
        }
        query.selector._id = {
            $regex: "." + this.name + ".",
        };
        var iterator = await stub.getQueryResult(JSON.stringify(query));
        var value = (await iterator.next()).value;
        var states = [];
        while (value) {
            var state = State.deserialize(value.value.toString('utf8'), this.supportedClasses);
            console.log(JSON.stringify(state));
            states.push(state);
            var next = await iterator.next();
            value = next.value;
        }
        return states;
    }    
    async getAssetHistory(VID, Vname) {

        let ledgerKey = await this.ctx.stub.createCompositeKey(this.name, [VID, Vname]);
        const resultsIterator = await this.ctx.stub.getHistoryForKey(ledgerKey);
        let results = await this.getAllResults(resultsIterator, true);

        return results;
    }
    use(stateClass) {
        this.supportedClasses[stateClass.getClass()] = stateClass;
    }
}
module.exports = List