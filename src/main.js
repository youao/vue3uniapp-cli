import "uno.css";

import { createSSRApp } from "vue";
import App from "./App.vue";

import UiPage from "./components/page/Page.vue";
import UiIcon from "./components/icon/Icon.vue";

export function createApp() {
  const app = createSSRApp(App);

  app.component("ui-page", UiPage);
  app.component("ui-icon", UiIcon);

  return {
    app
  };
}
