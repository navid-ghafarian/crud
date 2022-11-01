import {AUTH} from '@/constant/constRouter.js'
import Auth from '@/views/auth/Auth.vue'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'

let auth = {
    path: AUTH.ROOT_PATH,
    name: AUTH.ROOT_NAME,
    component: Auth,
    meta: {
        needToken: false,
    },
    children: [
        {
            path: AUTH.SIGN_IN_PATH,
            name: AUTH.SIGN_IN_NAME,
            component: Login,
            meta: {
                title: 'login'
            }
        },
        {
            path: AUTH.SIGN_UP_PATH,
            name: AUTH.SIGN_UP_NAME,
            component: Signup,
            meta: {
                title: 'signup'
            }
        },
    ]
};

export default auth;