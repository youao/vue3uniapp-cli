# vue3uniapp-cli

## unocss

- [unocss-preset-weapp](https://www.npmjs.com/package/unocss-preset-weapp)
- [unocss uniapp_vue3 examples](https://github.com/MellowCo/unocss-preset-weapp/tree/main/examples/uniapp_vue3)

#### 小程序不生效问题

- 原因是样式被编译到`app.css`而不是`app.wxss`
- 需要检查 uniapp 和 unocss 的版本，参考 `unocss-preset-weapp` 提供的例子
- 当前`unocss`固定`65.5.0`版本

## layers 页面z-index层级规范
- 999+ Popout 弹出层，用于承载弹窗通知、操作菜单、菜单、成功或加载中等状态的Toast，表单报错提示等弹出内容。
- 699+ Navigation 导航悬浮层，以Tabbar底部导航、header头部导航为基准，层级需要覆盖导航的悬浮固定层。
- 399+ Fixed 一般悬浮层，位于内容层之上。
- 99+ Content 内容层，承载页面主要内容。
- Popout、Navigation、Fixed、Content 层级由 page-hook 统一管理自动设置，0-99 层级平时手动控制。