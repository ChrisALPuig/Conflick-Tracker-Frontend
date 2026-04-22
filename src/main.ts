import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router' // asegúrate que la ruta es correcta

const app = createApp(App)

app.use(createPinia())  // registra Pinia
app.use(router)         // registra Vue Router

app.mount('#app')