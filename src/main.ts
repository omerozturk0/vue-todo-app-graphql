import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';

Vue.use(VueApollo);

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'http://localhost:8085/v1/graphql',
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  router,
  store,
  provide: apolloProvider.provide(),
  render: (h) => h(App),
}).$mount('#app');
