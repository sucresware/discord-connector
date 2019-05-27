import Vue from 'vue'
import axios from 'axios'
import App from './App'
import {version} from '../../package.json';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

import {
  FontAwesomeIcon,
  FontAwesomeLayers
} from '@fortawesome/vue-fontawesome'

import {
  library
} from "@fortawesome/fontawesome-svg-core";
import {
  faAngleRight,
  faSync,
  faCheck,
  faCircle,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

library.add(faAngleRight);
library.add(faSync);
library.add(faCheck);
library.add(faCircle);
library.add(faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)

let config = {};

config.version = version;
config.server = (process.env.NODE_ENV !== 'production') ? '4sucres.localhost' : config.server = '4sucres.org';

Vue.mixin({
  data() {
    return {
      config: config,
    }
  }
});

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  template: '<App/>'
}).$mount('#app')