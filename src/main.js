import "uno.css";
import { createSSRApp } from "vue";
import App from "./App.vue";
import UiPage from './components/page/Page.vue'

export function createApp() {
  const app = createSSRApp(App);
  app.component('ui-page', UiPage)
  return {
    app
  };
}
