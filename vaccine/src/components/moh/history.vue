<template>
    <MOH_header />
      <!--panel-->
  <div id="moh_panel" class="jumbotron">
    <div class="row">
      <div class="col-md-11" style="margin:0 auto;">
         <table class="table table-responsive">
  <thead class="table-dark">
    <tr>
        <td>name</td>
        <td>email</td>
        <td>city</td>
        <td>nationality</td>
        <td>address</td>
        <td>Key</td>
        <td>Current State</td>
        <td>Citizen ID</td>
        <td>Organization ID</td>
        <td>Process ID</td>
        <td>Type</td>
        <td>Vaccine Key</td>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in list">
        <td>{{item.name}}</td>
        <td>{{item.email}}</td>
        <td>{{item.city}}</td>
        <td>{{item.nationality}}</td>
        <td>{{item.address}}</td>
        <td>{{item.key}}</td>
        <td>{{item.currentState}}</td>
        <td>{{item.citizenID}}</td>
        <td>{{item.orgID}}</td>
        <td>{{item.processID}}</td>
        <td>{{item.type}}</td>
        <td>{{item.vaccineKey}}</td>
    </tr>
  </tbody>
</table>
      </div>
    </div>
  </div>
</template>
<script>
import MOH_header from '../moh/moh_header.vue'
export default{
    name: 'history',
    data(){
        return{
            list: []
        }
    },
    mounted() {
        fetch('http://localhost:8081/queryAllProcess')
        .then(res => res.json())
        .then(data => this.list = data)
        .catch(err => console.log(err.message));
    },
    components:{
        MOH_header
     }
}
</script>
<style>
</style>