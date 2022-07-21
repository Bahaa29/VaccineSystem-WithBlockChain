<template>
    <MOH_header />
      <!--panel-->
  <div id="moh_panel" class="jumbotron">
     <table class="table table-responsive table-hover">
  <thead class="table-dark">
    <tr>
        <td>Batch num</td>
        <td>Citizen ID</td>
        <td>Company</td>
        <td>Cure</td>
        <td>Current Date</td>
        <td>Current State</td>
        <td>Date</td>
        <td>Expired</td>
        <td>Key</td>
        <td>Location</td>
        <td>Owner</td>
        <td>Status</td>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in records">
        <td>{{item.batchnum}}</td>
        <td>{{item.citizenid}}</td>
        <td>{{item.company}}</td>
        <td>{{item.cure}}</td>
        <td>{{item.currentDate}}</td>
        <td>{{item.currentState}}</td>
        <td>{{item.date}}</td>
        <td>{{item.expired}}</td>
        <td>{{item.key}}</td>
        <td>{{item.location}}</td>
        <td>{{item.owner}}</td>
        <td>{{item.status}}</td>
    </tr>
  </tbody>
</table>
  </div>
</template>
<script>
import MOH_header from '../moh/moh_header.vue'

export default{
    name: 'view_all',
    data(){
        return{
            records: []
        }
    },
    mounted(){
      fetch('http://localhost:8081/queryALL')
        .then(res => res.json())
        .then(data => this.records = data)
        .catch(err => console.log(err.message));
    },
    components:{
        MOH_header
     }
}
</script>
<style>
</style>