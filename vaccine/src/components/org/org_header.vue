<template>
      <nav class="navbar navbar-expand-lg navbar_style bg-gradient-danger  fixed-top">
      <div class="container">
        <router-link class="navbar-brand" id="nav-logo" to="/org/panel"><img src="../../assets/vaccine.png" />Organization Panel</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/org/panel">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/org/confirmReceived">Confirm Received</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/org/confirmGiven">Confirm Given</router-link>
            </li>
           <li class="nav-item">
              <router-link class="nav-link" to="/org/viewall">View All</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/org/track">Track Vaccine</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/">Log out</router-link>
            </li>
          </ul>
        </div>
      </div>
  </nav>
</template>
<script>
export default  {
    name: "Org_header",
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
    }
}
</script>
<style>
#nav-logo img{
    width: 90px;
    height: 45px;
}
#nav-logo{
  color:#64b564;
}
.navbar_style{
    border-bottom: 1px solid #adadad;
    background-color: white;
    box-shadow: -4px 1px 5px 1px grey;
}
</style>