<template>
  <nav class="navbar navbar-expand-lg bg-light fixed-top">
      <div class="container">
        <a class="navbar-brand" id="nav-logo" href="#"><img src="../assets/vaccine.png" /><img style="width:210px;height:50px;" src="../assets/site_title.png" /></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#Home">HOME</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#About">ABOUT US</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#Team">OUR TEAM</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#Login">LOGIN</a>
            </li>
          </ul>
        </div>
      </div>
  </nav>
  <!-- Home -->
  <div class="jumbotron" id="Home">
    <div class="container">
        <h2 style="font-size: 50px;">Welcome to <span style="color:#64b564;">Vacchain</span></h2>
        <h2 style="font-size: 40px;margin-top: -15px;">Blockchain System</h2>
        <p class="home_lead">Here you can apply for a vaccine, also track your vaccination</p> 
        <p class="home_lead Home_lead2">process and track your application for vaccination</p>
        <router-link class="btn btn-success" id="signup_btn" to="/signup">Sign Up</router-link>
    </div>
  </div>
  <!-- Login -->
  <div id="Login" class="jumbotron">
      <h2>Login</h2>
      <div class="container">
      <div class="row">
        <div class="col-md-3 card-section" >
          <img src="../assets/moh_icon.png" alt=""/>
          <h4>Ministry Of Health</h4>
          <p>Log in as the Ministry of Health to track the vaccine and user processes without any restrictions</p>
          <router-link class="btn btn-success login_btn" to="/login">Log In</router-link>
        </div>
        <div class="col-md-3 card-section">
          <img src="../assets/org_icon.png" alt=""/>
          <h4>Organization</h4>
          <p>Log in as a hospital to confirm delivery of the vaccine and administer the vaccine to the user</p>
          <router-link class="btn btn-success login_btn" to="/login">Log In</router-link>
        </div>
        <div class="col-md-3 card-section">
          <img src="../assets/user_icon.png" alt=""/>
          <h4>User</h4>
          <p>log in as a user to be enable to apply for a vaccine and track the process of request</p>
          <router-link class="btn btn-success login_btn" to="/login">Log In</router-link>
        </div>
        <div class="col-md-3 card-section">
          <img src="../assets/serum_img.png" alt=""/>
          <h4>Serum</h4>
          <p>Log in as a serum to create the vaccine and transport the vaccine to hospitals</p>
          <router-link class="btn btn-success login_btn" to="/login">Log In</router-link>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Our Team-->
  <div id="Team" class="jumbotron">
     <img src="../assets/team.png" />
      <h2><span class="reverse-color">Our</span>Team</h2>
      <div class="container">
      <div class="row">
        <div class="col-md-2 card-section" >
          <img src="../assets/george.jpg" alt=""/>
          <h4>George</h4>
          <p class="lead">Backend Developer</p>
        </div>
        <div class="col-md-2 card-section">
          <img src="../assets/habiba.jpeg" alt=""/>
          <h4>Habiba</h4>
          <p class="lead">Blockchain Developer</p>
        </div>
        <div class="col-md-4 card-section">
          <img src="../assets/bahaa.jpg" alt=""/>
          <h4>Bahaa</h4>
          <p class="lead">Blockchain Developer</p>
          <p class="lead">Team Leader</p>
        </div>
        <div class="col-md-2 card-section">
          <img src="../assets/framer.jpeg" alt=""/>
          <h4>Farmawey</h4>
          <p class="lead">Blockchain Developer</p>
        </div>
        <div class="col-md-2 card-section">
          <img src="../assets/mohamed.jpg" alt=""/>
          <h4>Mohamed</h4>
          <p class="lead">Frontend Developer</p>
        </div>
      </div>
    </div>
  </div>
  <!-- About-->
   <div id="About" class="jumbotron">
      <img src="../assets/about_icon.png" />
      <h2>About</h2>
      <p id="ptitle">It's vaccine system is based on a blockchain system a private hyper ledger fabric network To:</p>
      <div class="container">
      <div class="row">
        <div class="col-md-3 card-section" >
          <img src="../assets/apply.png" alt=""/>
          <h4>Apply for Vaccine</h4>
        </div>
        <div class="col-md-3 card-section">
          <img src="../assets/track_vaccine.png" alt=""/>
          <h4>Track Vaccine</h4>
        </div>
        <div class="col-md-3 card-section">
          <img src="../assets/search_vaccine.png" alt=""/>
          <h4>Search for Vaccine</h4>
        </div>
        <div class="col-md-3 card-section">
          <img src="../assets/add_vaccine.png" alt=""/>
          <h4>Add Vaccine</h4>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
export default{
  name:'Home',
  components:{
   
  }
}
</script>
<style>
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/ubuntu/v20/4iCv6KVjbNBYlgoCxCvjsGyN.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
#nav-logo img{
    width: 90px;
    height: 45px;
}
*{
  font-family: 'Ubuntu' !important;
}
#Home{
  font-weight: bold;
  background-image: url('../assets/bg.webp');
  background-size: cover;
  background-position: center;
  height: 500px;
}
.Home_lead{
    font-size: 22px !important; 
    font-weight: bold !important;
}
.Home_lead2{
  margin-top: -17px;
}
#Login p{
  color:#00000094;
  margin-bottom: 30px;
}
.login_btn{
  position: absolute;
    bottom: 0;
    left: 0;
    width: 285px;
    margin-top: 10px;
}

#Home .container{
   position: relative;
    top: 80px;
    padding: 15px;
    border-radius: 15px;
    color: #565656;
    right: 60px;
    text-align: left;
}
#signup_btn{
    width: 150px;
    font-size: 18px;
    border-radius: 0px;
}
#nav-logo{
    color: #4e8f4e;
    position: relative;
    right: 60px;
}
.nav-link{
    font-size: 15px;
    color: #565656;
}
.nav-link:hover{
  color: #64b564;
}
#logo-init{
    color: #09ff09;
    font-size: 33px;
}
.jumbotron{
  margin-bottom: auto !important;
}
#About #ptitle{
    font-size: 19px;
    color: #000000c7;
}
#site-logo{
    width: 250px;
    height: 125px;
    background-color: #cfcfcfa1;
    border-radius: 48px;
    padding: 19px;
}
.navbar-fixed-top.scrolled {
  background-color: #fff !important;
  transition: background-color 200ms linear;
}
#Login{
  background-color: #ddd;
}
.card-section{
    background-color: azure;
    padding-top: 25px;
    box-shadow: -5px 7px 10px 2px #ababa7;
    border-radius: 11px;
    padding-bottom: 20px;
}
.card-section img{
    width: 120px;
    height: 100px;
    margin: 15px;
    border-radius: 48px;
}
.jumbotron h4{
  font-weight: bold;
}
.jumbotron h2{
  font-weight: bold;
  margin-bottom: 15px;
}
.reverse-color{
  color:#40c140;
  font-weight: bold;
}
#Team .card-section{
  background-color: #f1f1f1;
}
</style>
