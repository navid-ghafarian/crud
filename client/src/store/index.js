import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import userData from "@/store/modules/userData.js";

export default createStore({
    modules: {
        userData,
    },
    plugins: [createPersistedState()]
});
