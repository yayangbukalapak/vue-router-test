import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResources from 'vue-resource';
import BaseTemplate from './components/base.vue';

// Install Module into Vue class
Vue.use(VueRouter);
Vue.use(VueResources);

// Declare Page Component
const Home      = resolve => require.ensure([], () => resolve(require('./components/home.vue')),    '/');
const About     = resolve => require.ensure([], () => resolve(require('./components/about.vue')),   '/about');
const FAQ       = resolve => require.ensure([], () => resolve(require('./components/faqs.vue')),     '/faq');
const Items     = resolve => require.ensure([], () => resolve(require('./components/items.vue')),   '/items');

// Declare Router
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {path: "/",             component: Home},
        {path: "/about",        component: About},
        {path: "/faq",          component: FAQ},
        {path: "/items",        component: Items}
    ]
});

// Declare Main App
new Vue({
    router,
    render: h => h(BaseTemplate)
}).$mount("#app");