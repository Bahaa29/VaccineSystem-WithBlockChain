<template>
  <Serum_header />
  <!--panel-->
  <div id="serum_panel" class="container">
      <div class="row">
          <div id="serum_card1" class="col-md-4 serum_card">
              <div class="details">
                <h3>Add New Vaccine</h3>
              <p class="lead">Add vaccine to the store</p>
              </div>
              <router-link to="/serum/new_vaccine" class="btn btn-success submit_btn">Add</router-link>
          </div>
          <div id="serum_card2" class="col-md-4 serum_card">
            <div class="details">
                 <h3>Transport</h3>
              <p class="lead">transport certain vaccine to hospital</p>
            </div>
            <router-link to="/serum/transport" class="btn btn-success submit_btn">Transport</router-link>
          </div>
          <div id="serum_card3" class="col-md-4 serum_card">
              <div class="details">
                <h3>Track Vaccine</h3>
              <p class="lead">Track certain vaccine</p>
              </div>
              <router-link to="/serum/track" class="btn btn-success submit_btn">Track</router-link>
          </div>
      </div>
  </div>    
</template>
<script>
import Serum_header from './serum_header.vue'
export default {
    name: 'Serum_panel',
     created(){
        const status = sessionStorage.getItem("login_status");
        const role = sessionStorage.getItem("user_role");
        if(status == false || status == null){
            window.location.replace("/login");
        }else{
          if(role != 'serum'){
            window.location.replace("/login");

          }
        }
    },
    components:{
        Serum_header
    }
}
</script>
<style>
    body{
        background-color: #ddd !important;
    }
    #serum_panel{
        padding-top: 50px !important;
    }
    .serum_card .submit_btn{
        position: absolute;
        bottom: 10px;
        left: 60px;
        width: 240px;
    }
    .serum_card{
        margin: 0 auto;
        background-color: white;
        border-radius: 15px;
        padding: 20px;        
        box-shadow: -5px 9px 9px 5px #d1d1d1;
        background-size: 378px 290px;
        background-position: top;
        background-repeat: no-repeat;
        height: 450px !important;
    }
    .serum_card h3{
        font-weight: bold;
        color: #505050;

    }
    .serum_card .lead{
        color: #000000a1;
        font-size: 16px !important;
    }
    .serum_card .details{
        position: absolute;
        bottom: 60px;
        text-align: left;
    }
    #serum_card1{
        background-image: url('../../assets/slide2.jpg');
    }
    #serum_card2{
        background-image: url('../../assets/vaccine.webp');
    }
    #serum_card3{
        background-image: url('../../assets/10.jpg');
    }

</style>