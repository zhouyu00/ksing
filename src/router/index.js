import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import rcdBtn from '@/components/rcdBtn'
import recordComponent from "@/components/recordComponent"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recordComponent',
      component: recordComponent
    }
  ]
})
