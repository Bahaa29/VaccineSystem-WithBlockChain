<template>
    <Org_header />
      <!--panel-->
  <div id="org_panel" class="container">
      <div class="row">
          <div class="col-md-3 card" id="org_card1">
              <div class="details">
                <h3>Confirm Received</h3>
                <p class="lead">confirm received vaccince</p>
              </div>
              <router-link to="/org/confirmReceived" class="btn btn-success submit_btn">Confirm</router-link>
          </div>
          <div class="col-md-3 card" id="org_card2">
              <div class="details">
                <h3>Confirm Given</h3>
                 <p class="lead">Give the vaccine to the users</p>
              </div>
              <router-link to="/org/confirmGiven" class="btn btn-success submit_btn">Confirm</router-link>
          </div>
          <div class="col-md-3 card" id="org_card3">
            <div class="details">
                 <h3>View all Vaccines</h3>
              <p class="lead">View all hospital vaccines</p>
            </div>
             <router-link to="/org/viewall" class="btn btn-success submit_btn">View</router-link>
          </div>
          <div class="col-md-3 card" id="org_card4">
             <div class="details">
                 <h3>Track Vaccine</h3>
              <p class="lead">Track the certain vaccine</p>
             </div>
              <router-link to="/org/track" class="btn btn-success submit_btn">Track</router-link>
          </div>
      </div>
  </div>
</template>
<script>

import Org_header from './org_header.vue';

export default{
    name: 'Org_panel',
    created(){
        const status = sessionStorage.getItem("login_status");
        const role = sessionStorage.getItem("user_role");
        if(status == false || status == null){
            window.location.replace("/login");
        }else{
          if(role != 'org'){
            window.location.replace("/login");

          }
        }
    },
    components:{
        Org_header
     }
}
</script>
<style>
    body{
        background-color: #ddd !important;
    }
    #org_panel{
        padding-top: 50px !important;
    }
    .submit_btn{
        position: absolute;
        bottom: 5px;
        width: 250px;
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
        height: 500px !important;
    }
    .card h3{
        font-weight: bold;
        color: #505050;

    }
    .lead{
        color: #000000a1;
        font-size: 16px !important;
    }
    .details{
        position: absolute;
        bottom: 70px;
        text-align: left;
    }
    #org_card1{
        background-image: url('../../assets/org_confirmReceived.jpg') !important;
    }
    #org_card2{
        background-image: url('../../assets/org_confirmGiven.jpg') !important;
    }
    #org_card3{
        background-image: url('../../assets/org_viewall.jpg') !important;
    }
    #org_card4{
        background-image: url('../../assets/moh_track.jpg') !important;
    }
</style>