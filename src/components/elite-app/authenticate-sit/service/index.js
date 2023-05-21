import { HttpClient } from "base-app"

export const API_LOGIN_SIT = "/nth/utilities/api/authenticate/login-sit"

export const authSit = (userName, password) => {
    return HttpClient.get(`${API_LOGIN_SIT}?userName=${userName}&password=${password}`)
}