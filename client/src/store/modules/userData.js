const state = {
    userInfo: {
        username: "",
        password: "",
        nationalCode: "",
        jobTitle: "",
        jobSkills: "",
        fullName: "",
        gender: "",
        education: "",
        email: "",
        phone: "",
        birthDate: "",
    },
};

const mutations = {
    setUserInfo(state, { currentUser }) {
        state.userInfo = currentUser;
    }
};

export default {
    state,
    mutations,
}