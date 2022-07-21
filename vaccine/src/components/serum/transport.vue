<template>
    <Serum_header />
      <!--panel-->
  <div id="ConfirmForm" class="jumbotron">
      <h2>Transport Vaccine</h2>
    <select id="mytxtbox" class="form-control" v-model="formData.new_owner">
        <option value="" disabled selected>Select New Owner</option>
        <option v-for="item in hospitals" :value="item.name">{{item.name}}</option>
    </select>
<table class="table table-responsive">
  <thead class="table-dark">
    <tr>
        <td>V-ID</td>
        <td>Name</td>
        <td>Batch num</td>
        <td>Citizen ID</td>
        <td>Company</td>
        <td>Cure</td>
        <td>Current Date</td>
        <td>Current State</td>
        <td>Date</td>
        <td>Expired</td>
        <td>Location</td>
        <td>Owner</td>
        <td>Status</td>
        <td></td>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in record">
        <td>{{item.Record.VID}}</td>
        <td>{{item.Record.Vname}}</td>
        <td>{{item.Record.batchnum}}</td>
        <td>{{item.Record.citizenid}}</td>
        <td>{{item.Record.company}}</td>
        <td>{{item.Record.cure}}</td>
        <td>{{item.Record.currentDate}}</td>
        <td>{{item.Record.currentState}}</td>
        <td>{{item.Record.date}}</td>
        <td>{{item.Record.expired}}</td>
        <td>{{item.Record.location}}</td>
        <td>{{item.Record.owner}}</td>
        <td>{{item.Record.status}}</td>
        <td><button @click="transportVaccine(item.Record.VID,item.Record.Vname)" class="btn btn-success">Transport</button></td>
    </tr>
  </tbody>
</table>
  </div>   
</template>
<script>
import axios from 'axios';
import Serum_header from './serum_header.vue';

export default{
    name: 'confirm_received',
    data(){
        return{
            formData: {
                vaccineNum: '',
                timeStamp: '',
                new_owner:''
            },
            record:[],
            hospitals:[]
        }
    }, 
    mounted(){
         const url = 'http://localhost:8081/listhospital';
            axios.get(url).then(response => {
                            this.hospitals = response.data;
                            //console.log(this.records);
            }).catch(err => console.log(err.message));
            const url2 = 'http://localhost:8081/querySeurm/' + sessionStorage.getItem("user_name");
            console.log(url2);
            axios.get(url2).then(response => {
                            this.record = response.data;
            }).catch(err => console.log(err.message));   

    },
  methods:{
        transportVaccine(vid,vname) {
             const vaccineNum = vid + ':' + vname;
            this.formData.vaccineNum = vaccineNum;
            const t_stamp = prompt("Enter TimeStamp");
            this.formData.timeStamp = t_stamp;
            
            axios.patch('http://localhost:8081/underTransportVaccine',this.formData)
            .then(window.location.replace('/Serum/panel'))
            .catch(error => console.log(error));
        }
    },
    components:{
        Serum_header
     }
}
</script>
<style>
#mytxtbox{
  width: 300px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>