import App from './App.vue'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { aliases, fa } from 'vuetify/iconsets/fa-svg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas) // Include needed solid icons
library.add(far) // Include needed regular icons

const vuetify = createVuetify({
    icons: {
        defaultSet: 'fa',
        aliases,
        sets: {
            fa,
        },
    },
    components,
    directives
})

app.use(vuetify)

app.mount('#app')