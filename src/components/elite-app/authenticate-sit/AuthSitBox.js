import React from 'react'
import { BaseAppUltils, BaseFormGroup } from "base-app"
import { useFormik, FormikProvider } from 'formik'
import { initialValues, KEY_IS_OPEN, KEY_PASSWORD, KEY_SESSION_AUTH_DATA, KEY_USER_NAME, validate } from './formikConfig'
import Modal from 'reactstrap/lib/Modal'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'
import ModalFooter from 'reactstrap/lib/ModalFooter'
import { Button } from 'reactstrap'
import * as Service from './service'
import { hasRequestFail, useGetUserSignIn, APP_TYPE, NODE_ENV_TYPE_PRODUCTION } from '../../../ultity'
import { getKeyLang } from '../../../configs/elite-app'
import { FormattedMessage } from 'react-intl/lib'
import useSessionStorage from './session-storage-hook/useSessionStorage'

const AuthSitBox = () => {
    const user = useGetUserSignIn()
    const [sessionAuthData, setSessionAuthData] = useSessionStorage(KEY_SESSION_AUTH_DATA, "")
    const [isValidateOnChange, setValidateOnChange] = React.useState(false)

    const shouldOpen = () => {
        /* we should open the authenticate modal to protect sit-developing features from other strange people */
        if (process.env.NODE_ENV === NODE_ENV_TYPE_PRODUCTION
            && !sessionAuthData
            && user?.username === "temp-user"
            && APP_TYPE === "web-develop-sit")
            return true
        return false
    }
    initialValues[KEY_IS_OPEN] = shouldOpen()

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validate: validate,
        onSubmit: login,
    })

    async function login(values) {
        const { [KEY_USER_NAME]: userName, [KEY_PASSWORD]: password } = values
        const res = await Service.authSit(userName, password)
        if (hasRequestFail(res.status)) {
            BaseAppUltils.toastError("Mật khẩu hoặc tên đăng nhập không đúng")
            formik.setValues(initialValues)
            return
        }
        setSessionAuthData(userName)
        formik.setFieldValue(KEY_IS_OPEN, false)
    }

    const handleSubmit = () => {
        setValidateOnChange(true)
        formik.handleSubmit()
    }

    const handleKeyPress = (e) => {
        setValidateOnChange(true)
        const potentialEnterKey = e.charCode;
        if (potentialEnterKey === 13) {
            formik.handleSubmit()
        }
    }

    return (
        <Modal isOpen={formik.values[KEY_IS_OPEN]} onKeyPress={handleKeyPress}>
            <ModalHeader >
                <FormattedMessage id={getKeyLang("internalLoginRequired")} />
            </ModalHeader>

            <FormikProvider value={formik}>
                <ModalBody>
                    <BaseFormGroup
                        fieldName={KEY_USER_NAME}
                        errors={formik.errors}
                        touched={formik.touched}
                        messageId={getKeyLang("userName")}
                        className="mt-1"
                    />
                    <BaseFormGroup
                        fieldName={KEY_PASSWORD}
                        errors={formik.errors}
                        touched={formik.touched}
                        type="password"
                        messageId={getKeyLang("password")}
                    />
                </ModalBody>
            </FormikProvider>

            <ModalFooter>
                <Button onClick={handleSubmit} color="primary">
                    <FormattedMessage id={getKeyLang("insurance.step.login")} />
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default AuthSitBox