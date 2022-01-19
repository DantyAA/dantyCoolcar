

export interface IAppOption {
    globalData: {
      userInfo?: Promise<WechatMiniprogram.UserInfo|undefined>,
    }
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
    resolveUserInfo(userInfo: WechatMiniprogram.UserInfo): void;
  }