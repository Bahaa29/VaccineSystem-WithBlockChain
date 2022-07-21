<template>
      <nav class="navbar navbar-expand-lg navbar_style bg-gradient-danger  fixed-top">
      <div class="container">
        <router-link class="navbar-brand" id="nav-logo" to="/moh/panel"><img src="../../assets/vaccine.png" />MOH Panel</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/moh/panel">HOME</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/moh/viewall">VIEW ALL</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/moh/history">HISTORY</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/moh/track">TRACK</router-link>
            </li>
             <li class="nav-item">
              <router-link class="nav-link" to="/moh/batch">BATCH</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/">LOG OUT</router-link>
            </li>
          </ul>
        </div>
      </div>
  </nav>
</template>
<script>
export default  {
    name: "MOH_header",
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