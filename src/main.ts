import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import ptBR from 'element-plus/es/locale/lang/pt-br';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './styles/discord.css';
import './styles/global.css';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);

app.use(router);
app.use(ElementPlus, { locale: ptBR, size: 'large' });

for (const [name, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, component);
}

app.mount('#app');
