import os from '@/utils/os';
import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/views/Login';
import App from '@/views/App';
import Order from '@/views/Order';
import Pc from '@/views/Pc';

import Index from '@/components/app/index/Index.tsx';
import Pay from '@/components/app/pay/Pay.tsx';
import Profile from '@/components/app/profile/Profile.tsx';
import Setting from '@/components/app/profile/Setting';
import ResetPassword from '@/components/app/profile/ResetPassword';

import PcOrder from '@/components/pc/PcOrder.tsx';

import { VueRouter } from 'vue-router/types/router';
export const ROUTER_NAME = {
  LOGIN: 'login',
  QR_LOGIN: 'qrlogin',
  APP_ORDER: 'order',
  APP: 'app',
  APP_INDEX: 'index',
  APP_PAY: 'pay',
  APP_PROFILE: 'profile',
  APP_SETTING: 'setting',
  APP_RESET_PSW: 'resetpsw',
  APP_SPECIAL_ORDER: 'appSpecialOrder',
  PC: 'pc',
  PC_ORDER: 'pcOrder',
  ADMIN: 'admin',
  ADMIN_LOGIN: 'adminLogin',
  ADMIN_IMPORT: 'adminImport',
  ADMIN_OUTPUT: 'adminOutput',
  ADMIN_BREAKFAST: 'adminBreakfast',
  ADMIN_EDIT: 'adminEdit',
  ADMIN_SWITCH: 'adminSwitch',
  ADMIN_USER: 'adminUser',
  ADMIN_DINING: 'adminDining',
};
Vue.use(Router);

const router: VueRouter = new Router({
  mode: 'hash',
  base: '/admin',
  routes: [
    {
      path: '/login',
      name: ROUTER_NAME.LOGIN,
      component: Login,
      meta: {
        stop: true,
        noAnimation: true,
      },
    },
    {
      path: '/order',
      name: ROUTER_NAME.APP_ORDER,
      component: Order,
      meta: {
        rightIn: true,
        rightOut: true,
      },
    },
    {
      path: '/special/order',
      name: ROUTER_NAME.APP_SPECIAL_ORDER,
      component: Order,
      meta: {
        isSpecial: true,
        rightIn: true,
        rightOut: true,
      },
    },
    {
      path: '/app',
      name: ROUTER_NAME.APP,
      component: App,
      children: [
        { path: '', component: Index, name: ROUTER_NAME.APP_INDEX },
        { path: 'pay', component: Pay, name: ROUTER_NAME.APP_PAY },
        { path: 'profile', component: Profile, name: ROUTER_NAME.APP_PROFILE },
      ],
    },
    {
      path: '/setting',
      component: Setting,
      name: ROUTER_NAME.APP_SETTING,
      meta: {
        rightIn: true,
        rightOut: true,
      },
    },
    {
      path: '/resetpsw',
      component: ResetPassword,
      name: ROUTER_NAME.APP_RESET_PSW,
      meta: {
        rightIn: true,
        rightOut: true,
      },
    },
    {
      path: '/pc',
      name: 'pc',
      component: Pc,
      children: [
        {
          path: 'order',
          name: ROUTER_NAME.PC_ORDER,
          component: PcOrder,
          meta: {
            stop: true,
          },
        },
      ],
    },
  ],
});
/*========= start ========*/
/*========= ⚠ warning️: this is a hack method for ios========*/
let isEventCall: boolean = false;

/**
 * @description router is called by event or not
 */
export function isEvent() {
  return isEventCall;
}
const methods = ['push', 'go', 'replace', 'forward', 'back'];
methods.forEach((key) => {
  const method = (router as any)[key].bind(router);
  (router as any)[key] = (...args: any[]) => {
    isEventCall = true;
    method.apply(null, args);
  };
});
router.afterEach(() => {
  setTimeout(() => {
    isEventCall = false;
  }, 100);
});
/*========= ⚠ warning️: this is a hack method for ios ========*/
/*========= END ========*/

export default router;
