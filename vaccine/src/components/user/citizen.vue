<template>
    <User_header />
      <!--panel-->
  <div id="org_panel" class="jumbotron">
    <div class="row">
      <div class="col-md-11" style="margin:0 auto;">
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
    </tr>
  </tbody>
</table>
      </div>
    </div>
  </div>
</template>
<script>
import User_header from './user_header.vue';
import axios from 'axios';

export default{
    name: 'citizen',
    data(){
        return{
            records: []
        }
    },
    mounted(){
       const url ="http://localhost:8081/queryCitizen";
            const token = sessionStorage.getItem("user_token");
            axios.get(url, {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': `Bearer ${token}` 
                    }
                })
                .then(({data}) => {
                    this.records = data;
                }).catch(error => console.log(error));
    },
    components:{
        User_header
     }
}
</script>
<style>
</style>