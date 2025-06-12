# vue3uniapp-cli

## unocss

- [unocss-preset-weapp](https://www.npmjs.com/package/unocss-preset-weapp)
- [unocss uniapp_vue3 examples](https://github.com/MellowCo/unocss-preset-weapp/tree/main/examples/uniapp_vue3)

#### 小程序不生效问题

- 原因是样式被编译到`app.css`而不是`app.wxss`
- 需要检查 uniapp 和 unocss 的版本，参考 `unocss-preset-weapp` 提供的例子
- 当前`unocss`固定`65.5.0`版本
