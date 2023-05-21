import * as Yup from 'yup'
import { ALERT_EMPTY, getDefault_templateName } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import {
    INVOICE_TYPE_COPR,
    INVOICE_TYPE_INSUR_BUYER,
    INVOICE_TYPE_NONE,
    INVOICE_TYPE_PERS
} from '../../../../../../components/insurance-app/buy-insurances-page/step/CompleteContractBase'
import { ID_TYPE_CMND } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { sleepingFor } from '../../../../../../ultity'
import * as copr from './formik-config/copr'
import * as insurBuyer from './formik-config/insurBuyer'
import * as pers from './formik-config/pers'

export const KEY_INVOICE_TYPE = "invoiceType"
export const KEY_IS_SAVE_TEMPLATE = "isSaveTemplate"
export const KEY_TEMPLATE_NAME = "templateName"

export const initialValues = ({
    [KEY_INVOICE_TYPE]: INVOICE_TYPE_NONE,
    [KEY_IS_SAVE_TEMPLATE]: false,
    [KEY_TEMPLATE_NAME]: getDefault_templateName(),

    [copr.KEY_ADDRESS]: "",
    [copr.KEY_EMAIL]: "",
    [copr.KEY_NAME_COPR]: "",
    [copr.KEY_PHONE_NUMBER]: "",
    [copr.KEY_TAX_ID]: "",

    [insurBuyer.KEY_ADDRESS]: "",
    [insurBuyer.KEY_EMAIL]: "",
    [insurBuyer.KEY_IC_NO]: "",
    [insurBuyer.KEY_NAME]: "",
    [insurBuyer.KEY_PHONE_NUMBER]: "",

    [pers.KEY_ADDRESS]: "",
    [pers.KEY_EMAIL]: "",
    [pers.KEY_IC_NO]: "",
    [pers.KEY_ID_PERSON_TYPE]: ID_TYPE_CMND,
    [pers.KEY_PHONE_NUMBER]: "",
    [pers.KEY_NAME]: "",
})

export const validate = (values) => {
    return sleepingFor().then(() => {
        let errors = {}
        return errors
    })
}

export const validationSchema = Yup.object().shape({
    [KEY_INVOICE_TYPE]: Yup.string()
    ,
    [KEY_TEMPLATE_NAME]: Yup.string()
        .required(ALERT_EMPTY)
    ,

    [copr.KEY_ADDRESS]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_COPR) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [copr.KEY_EMAIL]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_COPR) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [copr.KEY_NAME_COPR]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_COPR) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [copr.KEY_PHONE_NUMBER]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_COPR) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [copr.KEY_TAX_ID]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_COPR) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,


    [insurBuyer.KEY_ADDRESS]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_INSUR_BUYER) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [insurBuyer.KEY_EMAIL]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_INSUR_BUYER) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [insurBuyer.KEY_IC_NO]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_INSUR_BUYER) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [insurBuyer.KEY_NAME]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_INSUR_BUYER) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [insurBuyer.KEY_PHONE_NUMBER]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_INSUR_BUYER) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,



    [pers.KEY_ADDRESS]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_PERS) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [pers.KEY_EMAIL]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_PERS) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [pers.KEY_IC_NO]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_PERS) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [pers.KEY_ID_PERSON_TYPE]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_PERS) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [pers.KEY_PHONE_NUMBER]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_PERS) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [pers.KEY_NAME]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_PERS) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
})
