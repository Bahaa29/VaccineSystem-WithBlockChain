<template>
<img class="logo" src="../assets/vaccine.png">
<h1 id="header">Sign Up</h1>
<div class="register">
  <form @submit.prevent="createPost">
      <input type="text" placeholder="Enter Name" v-model="formData.name">
      <input type="text" placeholder="Enter Email" v-model="formData.email">
      <input type="password" placeholder="Enter password" v-model="formData.password">
      <input type="password" placeholder="Confirm password" v-model="formData.passwordConfirm">
      <input type="submit" class="btn btn-success btnsubmit" value="Sign Up"/>
  </form>
</div>
</template>
<script>
import axios from "axios"
export default{
  name:'SignUp',
   data(){
        return{
            formData: {
              name:'',
              email:'',
              password:'',
              passwordConfirm : ''
            }
        }
    },
    methods:{
        createPost() {
            if(this.formData.password != this.formData.passwordConfirm | this.formData.password.length <8){
              alert("Password not the same");
            }else{
              const url ="http://localhost:8081/api/v1/users/signup";
              axios.post(url, this.formData)
                  .then(({data}) => {
                      console.log(data);
                      window.location.replace("/login");
                  }).catch(error => console.log(error));;
            }
            
        }
    },
}
</script>
<style>
  .logo{
    width: 100px;
    height: 100px;
    background-color: #ddd;
    border-radius: 65px;
    padding: 5px;
  } 
  #header{
    font-size: 35px;
    color: #020202a6;
  }
  .register input{
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid #3cbf70;
    border-radius: 7px;
    font-size: 15px;
  }
  .register button{
    width: 325px;
    height: 40px;
    color: white;
    background-color: #3cbf70;
    border: 1px solid #3cbf70;
    border-radius: 7px;
    font-size: 16px;
  }
  body{
    background-color: #e5e5e5;
  }
</style>
