import { createApp } from "vue";
import App from "./App.vue";
import Router from './router/index';
import { createPinia } from 'pinia'


// import "~/styles/element/index.scss";

// import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";
import "uno.css";

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";

const app = createApp(App);
const pinia = createPinia()
// app.use(ElementPlus);
app.use(Router);
app.use(pinia);

app.mount("#app");
