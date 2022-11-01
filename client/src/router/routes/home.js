import {HOME} from '@/constant/constRouter.js'
import Home from '@/views/Home.vue'

let home = {
    path: HOME.ROOT_PATH,
    name: HOME.ROOT_NAME,
    component: Home,
    meta: {
        title: 'home'
    }
};

export default home;