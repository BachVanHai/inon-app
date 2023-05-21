import * as Yup from 'yup'
import { ALERT_EMPTY, getDefault_templateName, ID_TYPE_CMND } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { INVOICE_TYPE_COPR, INVOICE_TYPE_INSUR_BUYER, INVOICE_TYPE_NONE, INVOICE_TYPE_PERS } from '../../../../../../components/insurance-app/buy-insurances-page/step/CompleteContractBase'
import { sleepingFor } from '../../../../../../ultity'

export const invoiceTypeInsurBuyer = {
    KEY_NAME: "buyer_fullname",
    KEY_ADDRESS: "buyer_address",
    KEY_PHONE_NUMBER: "buyer_phoneNumber",
    KEY_EMAIL: "buyer_email",
    KEY_IC_NO: "buyer_icNo",
}

export const invoiceTypePers = {
    KEY_ID_PERSON_TYPE: "pers_icType",
    KEY_IC_NO: "pers_icNo",
    KEY_NAME: "pers_fullname",
    KEY_ADDRESS: "pers_address",
    KEY_PHONE_NUMBER: "pers_phoneNumber",
    KEY_EMAIL: "pers_email",
}

export const invoiceTypeCops = {
    KEY_TAX_ID: "copr_taxId",
    KEY_NAME_COPR: "copr_nameCopr",
    KEY_ADDRESS: "copr_address",
    KEY_PHONE_NUMBER: "copr_phoneNumber",
    KEY_EMAIL: "copr_email",
}

export const KEY_INVOICE_TYPE = "invoiceType"
export const KEY_IS_SAVE_TEMPLATE = "isSaveTemplate"
export const KEY_TEMPLATE_NAME = "templateName"

export const initialValues = ({
    [invoiceTypeInsurBuyer.KEY_NAME]: "",
    [invoiceTypeInsurBuyer.KEY_ADDRESS]: "",
    [invoiceTypeInsurBuyer.KEY_PHONE_NUMBER]: "",
    [invoiceTypeInsurBuyer.KEY_EMAIL]: "",
    [invoiceTypeInsurBuyer.KEY_IC_NO]: "",

    [invoiceTypePers.KEY_ID_PERSON_TYPE]: ID_TYPE_CMND,
    [invoiceTypePers.KEY_IC_NO]: "",
    [invoiceTypePers.KEY_ADDRESS]: "",
    [invoiceTypePers.KEY_PHONE_NUMBER]: "",
    [invoiceTypePers.KEY_EMAIL]: "",
    [invoiceTypePers.KEY_NAME]: "",

    [invoiceTypeCops.KEY_TAX_ID]: "",
    [invoiceTypeCops.KEY_NAME_COPR]: "",
    [invoiceTypeCops.KEY_ADDRESS]: "",
    [invoiceTypeCops.KEY_PHONE_NUMBER]: "",
    [invoiceTypeCops.KEY_EMAIL]: "",

    [KEY_INVOICE_TYPE]: INVOICE_TYPE_NONE,
    [KEY_TEMPLATE_NAME]: getDefault_templateName(),
    [KEY_IS_SAVE_TEMPLATE]: false
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
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value !== INVOICE_TYPE_NONE) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [invoiceTypeCops.KEY_ADDRESS]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_COPR) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [invoiceTypeCops.KEY_EMAIL]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_COPR) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [invoiceTypeCops.KEY_NAME_COPR]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_COPR) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [invoiceTypeCops.KEY_PHONE_NUMBER]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_COPR) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [invoiceTypeCops.KEY_TAX_ID]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_COPR) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,


    [invoiceTypeInsurBuyer.KEY_ADDRESS]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_INSUR_BUYER) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [invoiceTypeInsurBuyer.KEY_EMAIL]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_INSUR_BUYER) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [invoiceTypeInsurBuyer.KEY_IC_NO]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_INSUR_BUYER) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [invoiceTypeInsurBuyer.KEY_NAME]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_INSUR_BUYER) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [invoiceTypeInsurBuyer.KEY_PHONE_NUMBER]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_INSUR_BUYER) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,



    [invoiceTypePers.KEY_ADDRESS]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_PERS) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [invoiceTypePers.KEY_EMAIL]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_PERS) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [invoiceTypePers.KEY_IC_NO]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_PERS) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [invoiceTypePers.KEY_ID_PERSON_TYPE]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_PERS) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [invoiceTypePers.KEY_PHONE_NUMBER]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_PERS) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
    [invoiceTypePers.KEY_NAME]: Yup.string()
        .when(KEY_INVOICE_TYPE, (value) => {
            if (value === INVOICE_TYPE_PERS) {
                return Yup.string().required(ALERT_EMPTY)
            }
        })
    ,
})