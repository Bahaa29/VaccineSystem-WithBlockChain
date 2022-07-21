<template>
  <User_header />
  <!--panel-->
  <div id="vaccineForm" class="jumbotron">
      <h2>Apply For New Vaccine</h2>
      <div class="row">
          <div class="col-md-6" style="margin:0 auto;margin-top:20px;">
              <form @submit.prevent="createPost">
                    <select @change="get_vaccine()" class="form-control mytxtbox" v-model="formData.orgID">
                        <option value="" disabled selected>Select Hospital Name</option>
                        <option v-for="item in records" :value="item.name">{{item.name}}</option>
                    </select>
                    <select class="form-control mytxtbox" v-model="formData.vaccineKey">
                        <option value="" disabled selected>Select Vaccine Key</option>
                        <option v-for="item in vaccines" :value="item.Record.VID + ':' + item.Record.Vname">{{item.Record.VID + ':' + item.Record.Vname}}</option>
                    </select>
                    <input type="text" class="form-control mytxtbox" v-model="formData.type" placeholder="Enter Vaccine Type">
                    <input type="text" class="form-control mytxtbox" v-model="formData.city" placeholder="Enter City">
                    <input type="text" class="form-control mytxtbox" v-model="formData.address" placeholder="Enter Address">
                    <input type="text" class="form-control mytxtbox" v-model="formData.nationality" placeholder="Enter Nationality">
                    <input type="submit" class="btn btn-success btnsubmit" value="Submit"/>
              </form>
          </div>
      </div>
  </div>    
</template>
<script>
import User_header from './user_header.vue'
import axios from "axios"

export default {
    name: 'apply',
    data(){
        return{
            records:[],
            vaccines:[],
            formData: {
                vaccineKey: '',
                orgID:'',
                type:'',
                name:'',
                email:'',
                city:'',
                address:'',
                nationality:''
            }
        }
    },
    mounted(){
         const url = 'http://localhost:8081/listhospital';
            axios.get(url).then(response => {
                            this.records = response.data;
            }).catch(err => console.log(err.message));
    },
    methods:{
        get_vaccine(){
            const url = 'http://localhost:8081/queryHospital/' + this.formData.orgID;
            axios.get(url).then(response => {
                            this.vaccines = response.data;
                            console.log(this.vaccines);
            }).catch(err => console.log(err.message));
        },
        createPost(e) {
            const url ="http://localhost:8081/createProcess";
            const token = sessionStorage.getItem("user_token");
            this.formData.name = sessionStorage.getItem("user_name");
            this.formData.email = sessionStorage.getItem("user_email");
            axios.post(url, this.formData, {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': `Bearer ${token}` 
                    }
                })
                .then(({data}) => {
                    alert('your processID: '+ data.processID);
                    window.location.replace('/user/panel');
                }).catch(error => console.log(error));
        }
    },
    components:{
        User_header
    }
}
</script>
<style>
.mytxtbox{
    margin-top: 10px;
    padding: 15px;
}
.mylbl{
    margin-top: 10px;
    font-weight: bold;
}
.btnsubmit{
    margin-top: 10px;
    padding: 10px !important;
}
</style>