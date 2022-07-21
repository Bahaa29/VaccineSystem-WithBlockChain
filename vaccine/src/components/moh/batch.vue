<template>
    <Moh_header />
      <!--panel-->
  <div id="org_panel" class="jumbotron">
  <div class="row">
    <div class="col-md-10" style="margin:0 auto;margin-top:20px;">
        <form @submit.prevent="createPost" id="MOH_Track_FORM">
            <input class="form-control" type="text" v-model="formData.batch_no" placeholder="Enter Batch Number"/>
            <input class="btn btn-success" type="submit" value="GET"/>
        </form>
          <table class="table" >
  <thead class="table-dark">
    <tr>
        <td>V-ID</td>
        <td>Name</td>
        <td>Batch num</td>
        <td>Citizen ID</td>
        <td>Company</td>
        <td>Cure</td>
        <td>Current Date</td>
        <td>Date</td>
        <td>Expired</td>
        <td>Owner</td>
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
        <td>{{item.Record.date}}</td>
        <td>{{item.Record.expired}}</td>
        <td>{{item.Record.owner}}</td>
    </tr>
  </tbody>
</table>
    </div>
    </div>

  </div>
</template>
<script>
import Moh_header from './moh_header.vue';
import axios from "axios"

export default{
    name: 'batch',
    data(){
        return{
             formData: {
                batch_no: ''
            },
            records: []
        }
    },
    methods:{
        createPost(e){
            const url = 'http://localhost:8081/queryBatch/' + this.formData.batch_no ;
            axios.get(url).then(response => {
                            this.records = response.data;
                        }).catch(err => console.log(err.message));
            }
    },
    components:{
        Moh_header
     }
}
</script>
<style>
#MOH_Track_FORM{
  display: inline-flex;
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>