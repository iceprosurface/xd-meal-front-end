import './Profile.scss';
import { logoutApi } from '@/api/login';
import { ROUTER_NAME } from '@/router';
import { gotoLogin, loginOut } from '@/utils/common';
import { VNode } from 'vue';

import { Component, Vue } from 'vue-property-decorator';
import * as tsx from 'vue-tsx-support';

@Component
export default class Index extends tsx.Component<any> {
  protected render(): VNode {
    return (
      <div class='profile'>
        <div class='profile-wrap'>
          <div class='profile-name'>
            <div class='profile-name-title'>{this.name}</div>
            <div class='profile-name-desc'>在忙也要好好吃饭哟～</div>
          </div>
          {Boolean(this.avatar.trim()) && (
            <div class='profile-avatar'>
              <img src={this.avatar} alt='' />
            </div>
          )}
        </div>
        <div class='profile-context'>
          {[
            // {
            //   name: '商家收藏',
            //   target: 'profile',
            // },
            // {
            //   name: '商家收藏',
            //   target: 'profile',
            // },

            {
              name: '设置',
              target: ROUTER_NAME.APP_SETTING,
            },
            {
              name: '重设密码',
              target: ROUTER_NAME.APP_RESET_PSW,
            },
            {
              name: '退出登录',
              onClick: this.loginout.bind(this),
              class: {
                error: true,
              },
            },
          ].map((item) => (
            <div class='profile-context-item'>
              <div
                class={{
                  'profile-context-item-menu': true,
                  ...(item.class || {}),
                }}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  }
                  if (item.target) {
                    this.$router.push({
                      name: item.target,
                    });
                  }
                }}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  private loginout() {
    loginOut(this);
  }
  private get name() {
    return this.$store.state.user.username || '木得名字的宝宝';
  }
  private get avatar() {
    return this.$store.state.user.avatar;
  }
}
