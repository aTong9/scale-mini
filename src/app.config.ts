export default {
  pages: ['pages/index/index', 'pages/user/Index'],
  subPackages: [
    {
      root: 'user',
      name: 'user',
      pages: ['order/Index', 'qs/index', 'qs/privacy', 'userInfo/index']
    }
    // {
    //   "root": "packageB",
    //   "name": "pack2",
    //   "pages": [
    //     "pages/apple",
    //     "pages/banana"
    //   ]
    // }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
  // tabBar: {
  //   custom: true,
  //   color: '#999',
  //   selectedColor: '#333',
  //   backgroundColor: '#fafafa',
  //   borderStyle: 'white',
  //   list: [
  //     {
  //       pagePath: 'pages/index/index',
  //       text: '首页',
  //       iconPath: './assets/imgs/tabBar/home.png'
  //     },
  //     {
  //       pagePath: 'pages/user/Index',
  //       text: '我的',
  //       iconPath: './assets/imgs/tabBar/user.png'
  //     }
  //   ]
  //   // usingComponents: {}
  // }
}
