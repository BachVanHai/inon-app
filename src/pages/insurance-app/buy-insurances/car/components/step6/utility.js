import { ID_TYPE_CMND } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { INVOICE_TYPE_PERS } from '../../../../../../components/insurance-app/buy-insurances-page/step/CompleteContractBase'
import { KEY_ID_CONTACT } from '../../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import { CUSTOMER_INV, CUSTOMER_ORG } from '../step3/formikConfig'
import * as copr from './formik-config/copr'
import * as insurBuyer from './formik-config/insurBuyer'
import * as pers from './formik-config/pers'
import { KEY_INVOICE_TYPE, KEY_IS_SAVE_TEMPLATE, KEY_TEMPLATE_NAME } from './formikConfig'

export const getDefault_insurBuyerObj = (values) => {
    return ({
        fullName: values[insurBuyer.KEY_NAME],
        phoneNumber: values[insurBuyer.KEY_PHONE_NUMBER],
        email: values[insurBuyer.KEY_EMAIL],
        address: values[insurBuyer.KEY_ADDRESS],
        icNo: values[insurBuyer.KEY_IC_NO],
        id: values[KEY_ID_CONTACT],
    })
}

export const getDefault_persOrCoprObj = (values) => {
    return ({
        icType: ID_TYPE_CMND,
        icNo: values[pers.KEY_IC_NO] || values[copr.KEY_TAX_ID],
        fullName: values[pers.KEY_NAME] || values[copr.KEY_NAME_COPR],
        phoneNumber: values[pers.KEY_PHONE_NUMBER] || values[copr.KEY_PHONE_NUMBER],
        email: values[pers.KEY_EMAIL] || values[copr.KEY_EMAIL],
        address: values[pers.KEY_ADDRESS] || values[copr.KEY_ADDRESS],
        type: values[KEY_INVOICE_TYPE] === INVOICE_TYPE_PERS ? CUSTOMER_INV : CUSTOMER_ORG
    })
}

export const getDefault_completeContractObj = (values, contractId) => {
    return ({
        id: contractId,
        taxInvoiceType: values[KEY_INVOICE_TYPE],
        taxInvoiceReceiverId: "",
        certReceiverId: "",
        isSaveTemplate: values[KEY_IS_SAVE_TEMPLATE],
        templateName: values[KEY_TEMPLATE_NAME],
    })
}
