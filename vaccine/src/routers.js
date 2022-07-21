import home from './components/home.vue';

import SignUp from './components/SignUp.vue';
import LogIn from './components/login.vue';

import MOH_panel from './components/moh/moh_panel.vue';
import MOH_viewAll from './components/moh/view_all.vue';
import MOH_history from './components/moh/history.vue';
import MOH_track from './components/moh/track.vue';
import MOH_batch from './components/moh/batch.vue';


import Serum_panel from './components/serum/serum_panel.vue';
import New_Vaccine from './components/serum/new_vaccine.vue';
import Serum_Transport from './components/serum/transport.vue'
import Serum_track from './components/serum/track.vue'

import Org_panel from './components/org/org_panel.vue';
import Org_viewAll from './components/org/view_all.vue';
import Org_confirmReceived from './components/org/confirm_received.vue';
import Org_confirmGiven from './components/org/confirm_given.vue';
import Org_track from './components/org/track.vue';

import User_panel from './components/user/user_panel.vue';
import User_apply from './components/user/apply.vue';
import User_citizen from './components/user/citizen.vue';
import User_history from './components/user/history.vue';
import User_track from './components/user/track.vue';

import {createRouter,createWebHistory} from 'vue-router';

const routes =[
  {
    name: "home",
    component: home,
    path: "/"
  },
  {
    name: "SignUp",
    component: SignUp,
    path: "/signup"
  },
  {
    name: "LogIn",
    component: LogIn,
    path: "/login"
  },
  {
    name: "MOH_Panel",
    component: MOH_panel,
    path: "/MOH/panel"
  },
  {
    name: "view_all",
    component: MOH_viewAll,
    path: "/MOH/viewall"
  },
  {
    name: "history",
    component: MOH_history,
    path: "/MOH/history"
  },
  {
    name: "track",
    component: MOH_track,
    path: "/MOH/track"
  },
  {
    name: "batch",
    component: MOH_batch,
    path: "/MOH/batch"
  },
  {
    name: "Serum_Panel",
    component: Serum_panel,
    path: "/Serum/panel"
  },
  {
    name: "New_Vaccine",
    component: New_Vaccine,
    path: "/Serum/new_vaccine"
  },
  {
    name: "Serum_Transport",
    component: Serum_Transport,
    path: "/Serum/transport"
  },
  {
    name: "Serum_Track",
    component: Serum_track,
    path: "/Serum/track"
  },
  {
    name: "Org_panel",
    component: Org_panel,
    path: "/org/panel"
  },
  {
    name: "Org_viewAll",
    component: Org_viewAll,
    path: "/org/viewall"
  },
  {
    name: "Org_confirmReceived",
    component: Org_confirmReceived,
    path: "/org/confirmReceived"
  },
  {
    name: "Org_confirmGiven",
    component: Org_confirmGiven,
    path: "/org/confirmGiven"
  },
  {
    name: "Org_track",
    component: Org_track,
    path: "/org/track"
  },
  {
    name: "User_panel",
    component: User_panel,
    path: "/user/panel"
  },
  {
    name: "User_apply",
    component: User_apply,
    path: "/user/apply"
  },
  {
    name: "User_citizen",
    component: User_citizen,
    path: "/user/citizen"
  },
  {
    name: "User_history",
    component: User_history,
    path: "/user/history"
  },
  {
    name: "User_track",
    component: User_track,
    path: "/user/track"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
