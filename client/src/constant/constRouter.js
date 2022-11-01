export const HOME = {
    ROOT_PATH: "/",
    ROOT_NAME: "home",
}

export const AUTH = {
    ROOT_PATH: "/auth",
    ROOT_NAME: "auth",

    SIGN_IN_PATH: "login",
    SIGN_IN_NAME: "login",

    SIGN_UP_PATH: "signup",
    SIGN_UP_NAME: "signup"
}

export const ACCOUNT = {
    ROOT_PATH: "/account",
    ROOT_NAME: "account",

    PROFILE_PATH: "profile",
    PROFILE_NAME: "profile",

    DASHBOARD_PATH: "dashboard",
    DASHBOARD_NAME: "dashboard",
}

export const EMPLOYEE = {
    ROOT_PATH: "employee/:id?",
    ROOT_NAME: "employee",

    LIST_PATH: "list/:page?",
    LIST_NAME: "list",

    ADD_PATH: "add",
    ADD_NAME: "add",
}

export const NOT_FOUND = {
    ROOT_PATH: "/:catchAll(.*)",
    ROOT_NAME: "404",
}