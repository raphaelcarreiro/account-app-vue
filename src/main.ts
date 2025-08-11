import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
import ElementPlus from 'element-plus';
import ptBR from 'element-plus/es/locale/lang/pt-br';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './styles/discord.css';
import './styles/global.css';

const app = createApp(App);

app.use(router);
app.use(ElementPlus, { locale: ptBR, size: 'large' });

app.mount('#app');
