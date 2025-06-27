export const TabbarConfig = {
  color: "#000",
  selectedColor: "#2492FF",
  backgroundColor: "#fff",
  fontSize: "12px",
  iconWidth: "28px",
  spacing: "2px",
  height: 64,
  list: [
    {
      pagePath: "pages/index/index",
      text: "首页",
      iconPath: "/static/images/home.svg",
      selectedIconPath: "/static/images/home-active.svg"
    },
    {
      pagePath: "pages/demo/color",
      text: "主题",
      iconPath: "/static/images/discover.svg",
      selectedIconPath: "/static/images/discover-active.svg"
    }
  ]
};
export const TabbarPathList = TabbarConfig.list.map((item) => item.pagePath);
