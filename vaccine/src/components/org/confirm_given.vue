<template>
    <Org_header />
      <!--panel-->
   <div id="org_panel" class="jumbotron">
     <table class="table table-responsive" >
  <thead class="table-dark">
    <tr>
        <td>Name</td>
        <td>Email</td>
        <td>Citizen ID</td>
        <td>Org ID</td>
        <td>Process ID</td>
        <td>Type</td>
        <td>Vaccine Key</td>
        <td>City</td>
        <td>Address</td>
        <td>Nationality</td>
        <td></td>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in records">
        <td>{{item.Record.name}}</td>
        <td>{{item.Record.email}}</td>
        <td>{{item.Record.citizenID}}</td>
        <td>{{item.Record.orgID}}</td>
        <td>{{item.Record.processID}}</td>
        <td>{{item.Record.type}}</td>
        <td>{{item.Record.vaccineKey}}</td>
        <td>{{item.Record.city}}</td>
        <td>{{item.Record.address}}</td>
        <td>{{item.Record.nationality}}</td>
        <td><button @click="useVaccine(item.Record.vaccineKey,item.Record.citizenID,item.Record.processID , item.Record.type)" class="btn btn-success">Used</button></td>
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
            records: []
        }
    },
    mounted(){
        const url = 'http://localhost:8081/HospitalProcesses/' + sessionStorage.getItem("user_name");
            axios.get(url).then(response => {
                            this.records = response.data;
                        }).catch(err => console.log(err.message));
    },
    methods:{
      useVaccine(v_key,c_id,pid,type){
        const t_stamp = prompt("Enter TimeStamp");
        const processNUM = pid + ':' + type;
        axios.patch('http://localhost:8081/usedVaccine',{
          "vaccineNum": v_key,
          "citizenID" : c_id,
          "timeStamp" : t_stamp,
          "processNUM" : processNUM
        })
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