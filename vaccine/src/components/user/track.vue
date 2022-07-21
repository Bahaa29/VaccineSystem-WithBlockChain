<template>
    <User_header />
      <!--panel-->
  <div id="org_panel" class="jumbotron">
  <div class="row">
    <div class="col-md-6" style="margin:0 auto;margin-top:20px;">
        <form @submit.prevent="createPost" id="MOH_Track_FORM">
            <input class="form-control txtbox" type="text" v-model="formData.id" placeholder="Vaccine ID"/>
            <input class="form-control txtbox" type="text" v-model="formData.name" placeholder="Vaccine Name"/>
            <input class="btn btn-success" type="submit" value="GET"/>
        </form>
    </div>
    </div>
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
        <td>{{item.Value.VID}}</td>
        <td>{{item.Value.Vname}}</td>
        <td>{{item.Value.batchnum}}</td>
        <td>{{item.Value.citizenid}}</td>
        <td>{{item.Value.company}}</td>
        <td>{{item.Value.cure}}</td>
        <td>{{item.Value.currentDate}}</td>
        <td>{{item.Value.currentState}}</td>
        <td>{{item.Value.date}}</td>
        <td>{{item.Value.expired}}</td>
        <td>{{item.Value.location}}</td>
        <td>{{item.Value.owner}}</td>
        <td>{{item.Value.status}}</td>
    </tr>
  </tbody>
</table>
  </div>
</template>
<script>
import User_header from './user_header.vue';
import axios from "axios"

export default{
    name: 'track',
    data(){
        return{
             formData: {
                id: '',
                name: ''
            },
            records: []
        }
    },
    methods:{
        createPost(e){
            const url = 'http://localhost:8081/queryHistory/' + this.formData.id + '/' + this.formData.name;
            axios.get(url).then(response => {
                            this.records = response.data;
                        }).catch(err => console.log(err.message));
            }
    },
    components:{
        User_header
     }
}
</script>
<style>
#MOH_Track_FORM{
  display: inline-flex;
  margin-bottom: 20px;
  margin-top: 10px;
}
.txtbox{
    margin-right: 10px;
}
</style>