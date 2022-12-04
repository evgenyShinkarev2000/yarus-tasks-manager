import { createApp, InjectionKey } from 'vue'
import App from './App.vue'
import router from './router'
import { Services } from './services';
import { ILocalStorageService } from './services/local-storage/ILocalStorageService';
import { LocalStorageService } from './services/local-storage/LocalStorageService';
import { IPermissionService } from './services/permission/IPermissionService'
import { PermissionService } from './services/permission/PermissionService';
import VCalendar from 'v-calendar';


export const PERMISSION_SERVICE_TOKEN = Symbol() as InjectionKey<IPermissionService>;
export const LOCAL_STORAGE_SERVICE_TOKEN = Symbol() as InjectionKey<ILocalStorageService>;
export const services = new Services();

createApp(App)
.use(VCalendar, {})
.use(router)
.mount('#app');

