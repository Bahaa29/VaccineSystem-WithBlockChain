<template>
    <MOH_header />
      <!--panel-->
  <div id="moh_panel" class="container">
      <div class="row">
          <div id="moh_card1" class="col-md-3 card">
              <div class="details">
                <h3>View all Vaccines</h3>
                <p class="lead">Query all  vaccine in the Country</p>
              </div>
              <router-link to="/moh/viewall" class="btn btn-success submit_btn">View</router-link>
          </div>
          <div id="moh_card2" class="col-md-3 card">
              <div class="details">
                <h3>View all Process</h3>
                <p class="lead">Query all  processes for all users</p>
              </div>
              <router-link to="/moh/history" class="btn btn-success submit_btn">View</router-link>
          </div>
          <div id="moh_card3" class="col-md-3 card">
              <div class="details">
                <h3>Track Vaccine</h3>
                <p class="lead">Track the vaccine different states</p>
              </div>
              <router-link to="/moh/track" class="btn btn-success submit_btn">Track</router-link>
          </div>
          <div id="moh_card4" class="col-md-3 card">
              <div class="details">
                <h3>Query Batch</h3>
                <p class="lead">Query batch number for vaccines</p>
              </div>
              <router-link to="/moh/batch" class="btn btn-success submit_btn">Query</router-link>
          </div>
      </div>
  </div>
</template>
<script>
import MOH_header from '../moh/moh_header.vue'

export default{
    name: 'MOH_panel',
    created(){
        const status = sessionStorage.getItem("login_status");
        const role = sessionStorage.getItem("user_role");
        if(status == false || status == null){
            window.location.replace("/login");
        }else{
          if(role != 'moh'){
            window.location.replace("/login");

          }
        }
    },
    components:{
        MOH_header
     }
}
</script>
<style>
    body{
        background-color: #ddd !important;
    }
    #moh_panel{
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
    .details{
        position: absolute;
        bottom: 60px;
        text-align: left;
    }
    .card img{
        width: 100% !important;
        margin-bottom: 15px !important;
    }
    #moh_card1{
        background-image: url('../../assets/moh_viewall.jpg');
    }
    #moh_card2{
        background-image: url('../../assets/moh_allprocess.jpeg');
    }
    #moh_card3{
        background-image: url('../../assets/moh_track.jpg');
    }
    #moh_card4{
        background-image: url('../../assets/moh_batch.jpg');
    }
</style>