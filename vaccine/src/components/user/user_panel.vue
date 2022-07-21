<template>
    <User_header />
      <!--panel-->
  <div id="user_panel" class="container">
      <div class="row">
          <div class="col-md-3 card" id="user_card1">
             <div class="details">
                <h3>Apply</h3>
                <p class="lead">apply to take a certain vaccine</p>
              </div>
             <router-link to="/user/apply" class="btn btn-success submit_btn">Apply</router-link>
          </div>
          <div class="col-md-3 card" id="user_card2">
             <div class="details">
                <h3>View History</h3>
                <p class="lead">view all taken vaccine</p>
              </div>
               <router-link to="/user/citizen" class="btn btn-success submit_btn">View</router-link>
          </div>
          <div class="col-md-3 card" id="user_card3">
              <div class="details">
                <h3>View Process</h3>
                <p class="lead">track your process request</p>
              </div>
             <router-link to="/user/history" class="btn btn-success submit_btn">View</router-link>
          </div>
          <div class="col-md-3 card" id="user_card4">
             <div class="details">
                <h3>Track Vaccine</h3>
                <p class="lead">track a certain vaccine</p>
              </div>
            <router-link to="/user/track" class="btn btn-success submit_btn">Track</router-link>
          </div>
      </div>
  </div>
</template>
<script>
import User_header from '../user/user_header.vue';

export default{
    name: 'User_panel',
   data(){
        return{}
    },
    created(){
        const status = sessionStorage.getItem("login_status");
        const role = sessionStorage.getItem("user_role");
        if(status == false || status == null){
            window.location.replace("/login");
        }else{
          if(role != 'user'){
            window.location.replace("/login");

          }
        }
    },
    components:{
        User_header
     }
}
</script>
<style>
    body{
        background-color: #ddd !important;
    }
    #user_panel{
        padding-top: 30px;
    }
   .card{
        margin: 0 auto;
        background-color: white;
        border-radius: 15px;
        padding: 20px;        
        box-shadow: -5px 9px 9px 5px #d1d1d1;
        background-size: 280px 290px;
        background-position: top;
        background-repeat: no-repeat;
        height: 450px !important;
    }
    .card h3{
        font-weight: bold;
        color: #505050;

    }
    .lead{
        color: #000000a1;
        font-size: 16px !important;
    }
     .submit_btn{
        position: absolute;
        bottom: 5px;
        width: 250px;
    }
    .details{
        position: absolute;
        bottom: 60px;
        text-align: left;
    }
    .card img{
        width: 100% !important;
        margin-bottom: 15px !important;
    }
    #user_card1{
        background-image: url('../../assets/user_apply.jpg') !important;
    }
    #user_card2{
        background-image: url('../../assets/user_citizen.jpg') !important;
    }
    #user_card3{
        background-image: url('../../assets/user_history.jpg') !important;
    }
    #user_card4{
        background-image: url('../../assets/moh_batch.jpg') !important;
    }
</style>