import Axios from 'axios'
import toastInstance from '../plugins/toast.singleton'

const axiosResponse = Axios.interceptors.request.use(async (config) => {
    config.headers.common['client_deb'] = 'client_deb';

    function waitUntil() {
        return new Promise(resolve => {
            const nIntervalId = setInterval(() => {
                online = JSON.parse(localStorage.getItem('online'))
                if (online) {
                    resolve(config);
                    clearInterval(nIntervalId);
                }
            }, 400);
        });
    }

    let online = JSON.parse(localStorage.getItem('online'));
    if (!online && online !== null) {
        const config = await waitUntil();
        return config;
    }
    return config;

}, (error) => {
    return Promise.reject(error);
});

const axiosRequest = Axios.interceptors.response.use((response) => {
    return response;
}, (error) => {

    if (!error.response.status) return;
    switch (error.response.status) {
        case 403:
            localStorage.removeItem("logged");
            router.replace({
                name: "login",
                query: { redirect: router.currentRoute.fullPath }
            });
            break;

        case 500:
            toastInstance.fire('هم‌اکنون ارتباط با سیستم برقرار نیست.', "error", "متوجه شدم.");
    }

    return Promise.reject(error.response.data.message);

});

export default {
    axiosResponse,
    axiosRequest
}