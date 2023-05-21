import React from 'react'
import CompleteContractBase from '../../../../../../components/insurance-app/buy-insurances-page/step/CompleteContractBase'
import { invoiceTypeCops, invoiceTypeInsurBuyer, invoiceTypePers, KEY_INVOICE_TYPE, KEY_IS_SAVE_TEMPLATE, KEY_TEMPLATE_NAME } from './formikConfig'

const StepForm = ({ payContractStatus, className }) => {
    const _keys = {
        invoiceTypeInsurBuyer: {
            KEY_ID_PERSON_TYPE: invoiceTypeInsurBuyer.KEY_ID_PERSON_TYPE,
            KEY_NAME: invoiceTypeInsurBuyer.KEY_NAME,
            KEY_ADDRESS: invoiceTypeInsurBuyer.KEY_ADDRESS,
            KEY_PHONE_NUMBER: invoiceTypeInsurBuyer.KEY_PHONE_NUMBER,
            KEY_EMAIL: invoiceTypeInsurBuyer.KEY_EMAIL,
            KEY_IC_NO: invoiceTypeInsurBuyer.KEY_IC_NO,
        },
        invoiceTypePers: {
            KEY_ID_PERSON_TYPE: invoiceTypePers.KEY_ID_PERSON_TYPE,
            KEY_IC_NO: invoiceTypePers.KEY_IC_NO,
            KEY_ADDRESS: invoiceTypePers.KEY_ADDRESS,
            KEY_PHONE_NUMBER: invoiceTypePers.KEY_PHONE_NUMBER,
            KEY_EMAIL: invoiceTypePers.KEY_EMAIL,
            KEY_NAME: invoiceTypePers.KEY_NAME,
        },
        invoiceTypeCops: {
            KEY_TAX_ID: invoiceTypeCops.KEY_TAX_ID,
            KEY_NAME_COPR: invoiceTypeCops.KEY_NAME_COPR,
            KEY_ADDRESS: invoiceTypeCops.KEY_ADDRESS,
            KEY_PHONE_NUMBER: invoiceTypeCops.KEY_PHONE_NUMBER,
            KEY_EMAIL: invoiceTypeCops.KEY_EMAIL,
        },
        KEY_INVOICE_TYPE: KEY_INVOICE_TYPE,
        KEY_IS_SAVE_TEMPLATE: KEY_IS_SAVE_TEMPLATE,
        KEY_TEMPLATE_NAME: KEY_TEMPLATE_NAME,
    }

    return (
        <div className={className}>
            <CompleteContractBase
                payContractStatus={payContractStatus} keys={_keys}
            />
        </div >
    )
}

export default StepForm