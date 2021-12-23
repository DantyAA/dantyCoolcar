/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: Promise<WechatMiniprogram.UserInfo|undefined>,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
  resolveUserInfo(userInfo: WechatMiniprogram.UserInfo): void;
}