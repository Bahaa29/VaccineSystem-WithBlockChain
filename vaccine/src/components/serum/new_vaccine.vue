<template>
  <Serum_header />
  <!--panel-->
  <div id="vaccineForm" class="jumbotron">
      <h2>Create New Vaccine</h2>
      <div class="row">
          <div class="col-md-6" style="margin:0 auto;margin-top:20px;">
              <form @submit.prevent="createPost">
                    <div class="alert alert-danger" id="div_error" style="display:none;" role="alert"></div>
                    <input type="text" class="form-control mytxtbox" v-model="formData.VID" placeholder="Enter Vaccine ID">
                    <input type="text" class="form-control mytxtbox" v-model="formData.Vname" placeholder="Enter Vaccine Name">
                    <input type="text" class="form-control mytxtbox" v-model="formData.company" placeholder="Enter Company Name">
                    <input type="text" class="form-control mytxtbox" v-model="formData.cure" placeholder="Enter Cure">
                    <label class="mylbl">Date</label>
                    <input type="date" class="form-control mytxtbox" v-model="formData.date">
                    <label class="mylbl">Expired</label>
                    <input type="date" class="form-control mytxtbox" v-model="formData.expired">
                    <label class="mylbl">Current</label>
                    <input type="date" class="form-control mytxtbox" v-model="formData.currentDate">
                    <select class="form-control mytxtbox" v-model="formData.status">
                        <option value="" disabled selected>Select the Status</option>
                        <option value="mandatory">Mandatory</option>
                        <option value="optional">Optional</option>
                    </select>
                    <input type="text" class="form-control mytxtbox" v-model="formData.batchnum" placeholder="Enter Batch Num">
                    <input type="submit" class="btn btn-success btnsubmit" value="Submit"/>
              </form>
          </div>
      </div>
  </div>    
</template>
<script>
import Serum_header from './serum_header.vue'
import axios from "axios"

export default {
    name: 'new_vaccine',
    data(){
        return{
            formData: {
                VID: '',
                Vname: '',
                company: '',
                cure:'',
                date: '',
                expired: '',
                currentDate: '',
                owner: '',
                status: '',
                batchnum: ''
            }
        }
    },
    methods:{
        createPost(e) {
            this.formData.owner = sessionStorage.getItem("user_name");
            const url = "http://localhost:8081/createVaccine";
            axios.post(url, this.formData, {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    }
                })
                .then(({data}) => {
                    if(data.error == null){
                        window.location.replace("/serum/panel");
                    }else{
                        document.getElementById("div_error").innerText = data.error;
                        document.getElementById("div_error").style.display = "block";
                        }
                });
        }
    },
    components:{
        Serum_header
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