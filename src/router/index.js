import Vue from 'vue'
import VueRouter from 'vue-router'
import items from '../views/items.vue'
import loginScreen from '../components/loginScreen'
import home from '../views/home.vue'
import viewPaymentTXN from '../components/viewPaymentTXN'
import  newPayment from '../components/newPayment'
import customer from '../components/Customer'
import supplier from '../components/Supplier'
import newTXN from '../components/newTxn'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:"Home",
    component:home
  },
  {
    path:'/customers',
    name:"Customers",
    component:customer
  },
  {
    path:'/suppliers',
    name:"Suppliers",
    component:supplier
  },
  {
    
    path: '/items',
    name: 'items',
    component: items
  },
  {
    path: '/login',
    name: 'Login',
    component:loginScreen

    
  },
  {
    path: '/:type/:id',
    name: 'view-data-customer',
    component:viewPaymentTXN

    
  },
  {
    path: '/create/payment/:type',
    name: 'payment-create',
    component:newPayment

    
  },
  {
    path: '/create/txn/:type',
    name: 'txn-create',
    component:newTXN

    
  },
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
