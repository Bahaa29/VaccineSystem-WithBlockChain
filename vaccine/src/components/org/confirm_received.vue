<template>
    <Org_header />
      <!--panel-->
  <div id="ConfirmForm" class="jumbotron">
      <h2>Confirm Received Vaccine</h2>
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
    <tr v-for="item in records">
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
        <td><button @click="deliverVaccine(item.Record.VID,item.Record.Vname)" class="btn btn-success">deliver</button></td>
    </tr>
  </tbody>
</table>
  </div>   
</template>
<script>
import axios from 'axios';
import Org_header from './org_header.vue';

export default{
    name: 'confirm_received',
    data(){
        return{
            formData: {
                vaccineNum: '',
                timeStamp: ''              
            },
            records:[]
        }
    },
   mounted(){
        const token = sessionStorage.getItem("user_token");
        const url = 'http://localhost:8081/queryHospitalByCondition';
        axios.get(url, {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': `Bearer ${token}` 
                    }
                }).then(response => {
                            this.records = response.data;
                        }).catch(err => console.log(err.message));
  },  
  methods:{
        deliverVaccine(vid,vname) {
            const vaccineNum = vid + ':' + vname;
            this.formData.vaccineNum = vaccineNum;
            const t_stamp = prompt("Enter TimeStamp");
            this.formData.timeStamp = t_stamp;
            axios.patch('http://localhost:8081/delieveredVaccine',this.formData)
            .then(window.location.replace('/org/panel'))
            .catch(error => console.log(error));
        }
    },
    components:{
        Org_header
     }
}
</script>
<style>
</style>