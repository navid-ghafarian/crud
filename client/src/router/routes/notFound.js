import {NOT_FOUND} from '@/constant/constRouter.js'
import NotFound from '@/views/NotFound.vue'

let notFound = {
    path: NOT_FOUND.ROOT_PATH,
    name: NOT_FOUND.ROOT_NAME,
    component: NotFound,
    meta: {
        title: '404'
    }
};

export default notFound;