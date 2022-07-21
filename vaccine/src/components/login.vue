<template>
<img class="logo" src="../assets/vaccine.png">
<h1 id="header">Sign In</h1>
<div class="register">
  <form @submit.prevent="createPost">
    <input type="text" v-model="formData.email" placeholder="Enter Email">
    <input type="password" v-model="formData.password" placeholder="Enter password">
    <input type="submit" class="btn btn-success btnsubmit" value="Log in"/>
  </form>
  
</div>
</template>
<script>
import axios from "axios"
export default{
  name:'LogIn',
   data(){
        return{
            formData: {
              email:'',
              password:''
            },
            userdata:[]
        }
    },
    methods:{
        async createPost() {
            const url ="http://localhost:8081/api/v1/users/login";
            const response = await axios.post(url, this.formData, {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    }
                });
          const status = response.data.status;
          console.log(status);
          if(status == 'success'){
              const token = response.data.token;
              const role = response.data.data.user.role;
              const userid = response.data.data.user._id;
              const username = response.data.data.user.name;

              sessionStorage.setItem("user_token",token);
              sessionStorage.setItem("user_role",role);
              sessionStorage.setItem("user_id",userid);
              sessionStorage.setItem("user_name",username);
              sessionStorage.setItem("user_email" , this.formData.email);

              sessionStorage.setItem("login_status",true);

              switch(role){
                case 'user':
                  window.location.replace('/user/panel');
                  break;
                case 'org':
                  window.location.replace('/org/panel');
                  break;
                case 'moh':
                  window.location.replace('/moh/panel');
                  break;
                case 'serum':
                  window.location.replace('/serum/panel');
                  break;    
              }
          }else{
            alert("Username or password not correct");
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
     margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
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
    width: 300px;
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
