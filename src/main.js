import { createApp,ref } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
// import ElementPlus from 'element-plus'
import ElementPlus from './plugins/element'

ElementPlus.useLang = (app, ref, locale) => {

    const template = (str, option) => {
        if (!str || !option) return str
        return str.replace(/\{(\w+)\}/g, (_, key) => {
            return option[key]
        })
    }

    // 注入全局属性,子组件都能通过inject获取
    app.provide('ElLocaleInjection', {
        lang: ref(locale.name),
        locale: ref(locale),
        t: (...args) => {
            const [path, option] = args
            let value
            const array = path.split('.')
            let current = locale
            for (let i = 0, j = array.length; i < j; i++) {
                const property = array[i]
                value = current[property]
                if (i === j - 1) return template(value, option)
                if (!value) return ''
                current = value
            }
        },
    })
}
const app = createApp(App)
ElementPlus.useLang(app, ref, zhLocale)
app.use(ElementPlus)

app.use(store).use(router).mount('#app')
