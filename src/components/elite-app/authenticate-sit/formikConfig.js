import { sleepingFor } from "../../../ultity"
import { ALERT_EMPTY, nullStrRegex } from "../../insurance-app/buy-insurances-page/formik-config"

export const KEY_SESSION_AUTH_DATA = "sessionAuthData"
export const KEY_IS_OPEN = "isOpen"
export const KEY_USER_NAME = "userName"
export const KEY_PASSWORD = "password"

export const initialValues = ({
    [KEY_IS_OPEN]: true,
    [KEY_USER_NAME]: "",
    [KEY_PASSWORD]: "",
})

export const validate = (values) => {
    return sleepingFor().then(() => {
        const errors = {}
        
        const { [KEY_USER_NAME]: userName, [KEY_PASSWORD]: password } = values
        if (!userName || userName.match(nullStrRegex)) {
            errors[KEY_USER_NAME] = ALERT_EMPTY
        }
        if (!password || password.match(nullStrRegex)) {
            errors[KEY_PASSWORD] = ALERT_EMPTY
        }

        return errors
    })
}