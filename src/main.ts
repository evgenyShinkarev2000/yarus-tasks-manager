import VCalendar from 'v-calendar';
import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import { IServices } from './services/IServices';
import { RemoveServices } from './services/RemoteServices';
import { Services } from './services/services';

const isRemoteMode = true;
export const services: IServices = isRemoteMode ? new RemoveServices() : new Services();
const app = createApp(App);
app.use(VCalendar, {}).use(router);
if (isRemoteMode)
{
  app.use(VueAxios, (services as RemoveServices).serverApi.getConfiguredAxios());
}
app.mount("#app");




