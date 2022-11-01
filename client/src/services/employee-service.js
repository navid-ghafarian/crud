import axios from "axios";

export async function login(username, password) {

    const response = await axios.put("/dataService", {
        username: username,
        password: password,
    });

    return response;

}

export async function signup(signupData, parent = 'idk') {

    const response = await axios.post("/dataService", {
        username: signupData.username,
        signupData,
        parent
    });

    return response;

}

export async function currentUser(username) {

    const response = await axios.get(`/dataService?id=${username}`);

    return response;

}

export async function editUser(signupData, parent = 'idk') {

    const response = await axios.put("/dataService", {
        username: signupData.username,
        signupData,
        parent
    });

    return response;

}

export async function allUser() {

    const response = await axios.get("/dataService");

    return response;

}

export async function logout() {

    const response = await axios.put("/userProfile/logout");

    return response;

}

export async function deleteUser(username) {

    const response = await axios.delete(`/dataService?id=${username}`);

    return response;

}

export default {
    login,
    signup,
    currentUser,
    editUser,
    allUser,
    logout,
    deleteUser,
};