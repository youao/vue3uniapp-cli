<script>
export default {
  globalData: {
    popupZIndex: 999
  },
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods: {
    usePopupZIndex() {
      return ++this.globalData.popupZIndex;
    }
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
@use "./static/styles/base.scss";
@use "./static/styles/ui.scss";
</style>
