<template>
    <User_header />
      <!--panel-->
  <div id="org_panel" class="jumbotron">
    <div class="row">
    <div class="col-md-6" style="margin:0 auto;margin-top:20px;">
        <form @submit.prevent="createPost" id="MOH_Track_FORM">
          <select class="form-control" id="txt_process" v-model="FormData.VID" >
                        <option value="" disabled selected>Select Process ID</option>
                        <option v-for="item in processlist" :value="item.Record.processID">{{item.Record.vaccineKey + ' ->' + item.Record.type}}</option>
            </select>
            <input class="btn btn-success" type="submit" value="GET"/>
        </form>
    
    </div>
    </div>
      <table class="table">
        <thead class="table-dark">
            <tr>
                <td>Current State</td>
                <td>Org ID</td>
                <td>Process ID</td>
                <td>Type</td>
                <td>Vaccine Key</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in records">
                <td>{{item.Value.currentState}}</td>
                <td>{{item.Value.orgID}}</td>
                <td>{{item.Value.processID}}</td>
                <td>{{item.Value.type}}</td>
                <td>{{item.Value.vaccineKey}}</td>
            </tr>
        </tbody>
        </table>
  </div>
</template>
<script>
import User_header from './user_header.vue';
import axios from 'axios';

export default{
    name: 'history',
    data(){
        return{
            FormData:{
                VID:''
            },
            records: [],
            processlist:[]
        }
    },
    mounted(){
        const url = 'http://localhost:8081/UserProcesses/' + sessionStorage.getItem("user_id");
            axios.get(url).then(response => {
                            this.processlist = response.data;
            }).catch(err => console.log(err.message)); 
    },
    methods:{
        createPost(){
            const sel = document.getElementById("txt_process");
            const text= sel.options[sel.selectedIndex].text;
            const index = text.indexOf('>');
            const type = text.substring(index+1, text.length);
       const url ="http://localhost:8081/queryHistoryForProcess/" + this.FormData.VID + "/" + type;
           axios.get(url).then(response => {
                            this.records = response.data;
                            if(this.records == []){
                                console.log('empty');
                            }
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
