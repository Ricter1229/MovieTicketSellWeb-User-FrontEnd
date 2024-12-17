import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router/router.js'
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
<<<<<<< HEAD

import { defineRule, configure } from 'vee-validate';
import { required, alpha_dash } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'; // 使用繁体中文
const config = configure({
   validateOnInput: true, // 調整為即時驗證
})

Object.keys(AllRules).forEach(rule => {
   defineRule(rule, AllRules[rule]);
});
configure({
    generateMessage: localize('zh_TW', zhTW),
    validateOnInput: true, // 在输入时立即验证
  });
  


=======
JSON.stringify(pinia)
>>>>>>> 44dd874842c775557ed1653842aa863be7f06ea3
createApp(App)
    .use(pinia)
    .use(router)
    .use(config)
    .mount('#app')

