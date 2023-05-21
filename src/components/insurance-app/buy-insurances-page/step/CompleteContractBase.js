import 'react-toggle/style.css'
import icInOn from "../../../../assets/images/insurance-app/buy-insurance/ic_inon.png"
import React from 'react'
import { Row, Col, } from "reactstrap"
import { FormattedMessage, Select, BaseFormGroup } from 'base-app'
import Toggle from "react-toggle"
import SuccessPaymentComponent from '../../../../components/insurance-app/buy-insurance-car/SuccessPaymentComponent'
import WaitingPaymentComponent from '../../../../components/insurance-app/buy-insurance-car/WaitingPaymentComponent'
import FailPaymentComponent from '../../../../components/insurance-app/buy-insurance-car/FailPaymentComponent'
import {
    PAID_FAIL,
    PAID_SUCCESS,
    PAID_WAITING,
    getKeyLang,
    PAID_DEBT_SUCCESS,
    PAID_BONUS_SUCCESS
} from '../../../../configs/insurance-app'
import InvoiceTypeInsurBuyer from './invoice-components/InvoiceTypeInsurBuyer'
import InvoiceTypePers from './invoice-components/InvoiceTypePers'
import InvoiceTypeCops from './invoice-components/InvoiceTypeCops'
import { isObjEmpty } from '../../../../ultity'
import { useFormikContext } from 'formik'

export const INVOICE_TYPE_INSUR_BUYER = "OWNER"
export const INVOICE_TYPE_PERS = "OTHER_INV"
export const INVOICE_TYPE_COPR = "OTHER_ORG"
export const INVOICE_TYPE_NONE = "NONE"
/**
 @example
    // formikConfig start
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
            [invoiceTypeInsurBuyer.KEY_NAME]: "buyuer",
            [invoiceTypeInsurBuyer.KEY_ADDRESS]: "buyuer",
            [invoiceTypeInsurBuyer.KEY_PHONE_NUMBER]: "buyuer",
            [invoiceTypeInsurBuyer.KEY_EMAIL]: "buyuer",
            [invoiceTypeInsurBuyer.KEY_IC_NO]: "buyuer",

            [invoiceTypePers.KEY_ID_PERSON_TYPE]: ID_TYPE_CMND,
            [invoiceTypePers.KEY_IC_NO]: "invoiceTypePers",
            [invoiceTypePers.KEY_ADDRESS]: "invoiceTypePers",
            [invoiceTypePers.KEY_PHONE_NUMBER]: "invoiceTypePers",
            [invoiceTypePers.KEY_EMAIL]: "invoiceTypePers",
            [invoiceTypePers.KEY_NAME]: "invoiceTypePers",

            [invoiceTypeCops.KEY_TAX_ID]: "invoiceTypeCops",
            [invoiceTypeCops.KEY_NAME_COPR]: "invoiceTypeCops",
            [invoiceTypeCops.KEY_ADDRESS]: "invoiceTypeCops",
            [invoiceTypeCops.KEY_PHONE_NUMBER]: "invoiceTypeCops",
            [invoiceTypeCops.KEY_EMAIL]: "invoiceTypeCops",

            [KEY_INVOICE_TYPE]: INVOICE_TYPE_NONE,
            [KEY_IS_SAVE_TEMPLATE]: false
        })

        export const validate = (values) => {
            return sleepingFor().then(() => {
                let errors = {}
                return errors
            })
        }

        export const validationSchema = Yup.object().shape({

        })

        // formikConfig end
    const _keys = {
            invoiceTypeInsurBuyer: {
                KEY_NAME: "KEY_NAME",
                KEY_ADDRESS: "KEY_ADDRESS",
                KEY_PHONE_NUMBER: "KEY_PHONE_NUMBER",
                KEY_EMAIL: "KEY_EMAIL",
                KEY_IC_NO: "KEY_IC_NO",
            },
            invoiceTypePers: {
                KEY_ID_PERSON_TYPE: "KEY_ID_PERSON_TYPE",
                KEY_IC_NO: "KEY_IC_NO",
                KEY_ADDRESS: "KEY_ADDRESS",
                KEY_PHONE_NUMBER: "KEY_PHONE_NUMBER",
                KEY_EMAIL: "KEY_EMAIL",
                KEY_NAME: "KEY_NAME",
            },
            invoiceTypeCops: {
                KEY_TAX_ID: "KEY_TAX_ID",
                KEY_NAME_COPR: "KEY_NAME_COPR",
                KEY_ADDRESS: "KEY_ADDRESS",
                KEY_PHONE_NUMBER: "KEY_PHONE_NUMBER",
                KEY_EMAIL: "KEY_EMAIL",
            },
            KEY_INVOICE_TYPE : INVOICE_TYPE_NONE,
            KEY_IS_SAVE_TEMPLATE : "KEY_IS_SAVE_TEMPLATE",
            KEY_TEMPLATE_NAME: "KEY_TEMPLATE_NAME",
    }
    <CompleteContractBase
        payContractStatus={payContractStatus} keys={_keys} // keys can omitted
    />
 */
const Completed = ({ payContractStatus, keys, reduxName, ...p }) => {
    let _keys = keys
    if (isObjEmpty(keys)) {
        _keys = {
            invoiceTypeInsurBuyer: {
                KEY_NAME: "KEY_NAME",
                KEY_ADDRESS: "KEY_ADDRESS",
                KEY_PHONE_NUMBER: "KEY_PHONE_NUMBER",
                KEY_EMAIL: "KEY_EMAIL",
                KEY_IC_NO: "icNo",
            },
            invoiceTypePers: {
                KEY_ID_PERSON_TYPE: "KEY_ID_PERSON_TYPE",
                KEY_IC_NO: "KEY_IC_NO",
                KEY_ADDRESS: "KEY_ADDRESS",
                KEY_PHONE_NUMBER: "KEY_PHONE_NUMBER",
                KEY_EMAIL: "KEY_EMAIL",
                KEY_NAME: "KEY_NAME",
            },
            invoiceTypeCops: {
                KEY_TAX_ID: "KEY_TAX_ID",
                KEY_NAME_COPR: "KEY_NAME_COPR",
                KEY_ADDRESS: "KEY_ADDRESS",
                KEY_PHONE_NUMBER: "KEY_PHONE_NUMBER",
                KEY_EMAIL: "KEY_EMAIL",
            },
            KEY_INVOICE_TYPE: "KEY_INVOICE_TYPE",
            KEY_IS_SAVE_TEMPLATE: "KEY_IS_SAVE_TEMPLATE",
            KEY_TEMPLATE_NAME: "templateName"
        }
    }
    const { invoiceTypeInsurBuyer, invoiceTypePers, invoiceTypeCops, KEY_INVOICE_TYPE, KEY_IS_SAVE_TEMPLATE, KEY_TEMPLATE_NAME } = _keys
    const { getFieldMeta, setFieldValue, errors, touched } = useFormikContext()

    const payContractStatusComponents = [
        {
            value: PAID_FAIL,
            bodyComponent: <FailPaymentComponent />,
        },
        {
            value: PAID_WAITING,
            bodyComponent: <WaitingPaymentComponent />,
        },
        {
            value: PAID_SUCCESS,
            bodyComponent: <SuccessPaymentComponent />
        },
        {
            value: PAID_DEBT_SUCCESS,
            bodyComponent: <SuccessPaymentComponent msgField={<FormattedMessage id={getKeyLang(`paymentDebtSuccess`)} />} />
        },
        {
            value: PAID_BONUS_SUCCESS,
            bodyComponent: <SuccessPaymentComponent msgField={<FormattedMessage id={getKeyLang(`paymentBonusSuccess`)} />} />
        }
    ]

    const getPayContractStatusComponents = (value) => {
        switch (value) {
            case PAID_BONUS_SUCCESS:
                return payContractStatusComponents[4].bodyComponent
            case PAID_DEBT_SUCCESS:
                return payContractStatusComponents[3].bodyComponent
            case PAID_SUCCESS:
                return payContractStatusComponents[2].bodyComponent
            case PAID_WAITING:
                return payContractStatusComponents[1].bodyComponent
            case PAID_FAIL:
                return payContractStatusComponents[0].bodyComponent
            default:
                return payContractStatusComponents[1].bodyComponent
        }
    }

    const sugg_InvoiceVAT = [
        {
            value: INVOICE_TYPE_NONE,
            content: "khong xuat hoa don",
            bodyComponent: null,
            label: <FormattedMessage id={getKeyLang(`NoInvoice`)} />
        },
        {
            value: INVOICE_TYPE_INSUR_BUYER,
            content: "Xuat hoa don cho ben mua bao hiem",
            bodyComponent: <InvoiceTypeInsurBuyer
                KEYS={{
                    KEY_NAME: invoiceTypeInsurBuyer.KEY_NAME,
                    KEY_ADDRESS: invoiceTypeInsurBuyer.KEY_ADDRESS,
                    KEY_PHONE_NUMBER: invoiceTypeInsurBuyer.KEY_PHONE_NUMBER,
                    KEY_EMAIL: invoiceTypeInsurBuyer.KEY_EMAIL,
                    KEY_IC_NO: invoiceTypeInsurBuyer.KEY_IC_NO,
                }}
            />,
            label: <FormattedMessage id={getKeyLang(`insuranceBuyerInvoice`)} />
        },
        {
            value: INVOICE_TYPE_PERS,
            content: "Xuat hoa don cho ca nhan khac",
            bodyComponent: <InvoiceTypePers
                KEYS={{
                    KEY_ID_PERSON_TYPE: invoiceTypePers.KEY_ID_PERSON_TYPE,
                    KEY_IC_NO: invoiceTypePers.KEY_IC_NO,
                    KEY_NAME: invoiceTypePers.KEY_NAME,
                    KEY_ADDRESS: invoiceTypePers.KEY_ADDRESS,
                    KEY_PHONE_NUMBER: invoiceTypePers.KEY_PHONE_NUMBER,
                    KEY_EMAIL: invoiceTypePers.KEY_EMAIL,
                }}
            />,
            label: <FormattedMessage id={getKeyLang(`OtherPersInvoice`)} />
        },
        {
            value: INVOICE_TYPE_COPR,
            content: "Xuat hoa don cho to chuc khac",
            bodyComponent: <InvoiceTypeCops
                KEYS={{
                    KEY_TAX_ID: invoiceTypeCops.KEY_TAX_ID,
                    KEY_NAME_COPR: invoiceTypeCops.KEY_NAME_COPR,
                    KEY_ADDRESS: invoiceTypeCops.KEY_ADDRESS,
                    KEY_PHONE_NUMBER: invoiceTypeCops.KEY_PHONE_NUMBER,
                    KEY_EMAIL: invoiceTypeCops.KEY_EMAIL,
                }}
            />,
            label: <FormattedMessage id={getKeyLang(`OtherCoprInvoice`)} />
        }
    ]

    const getInvoiceVATTypeComponent = (strType) => {
        switch (strType) {
            case INVOICE_TYPE_NONE:
                return sugg_InvoiceVAT[0]
            case INVOICE_TYPE_INSUR_BUYER:
                return sugg_InvoiceVAT[1]
            case INVOICE_TYPE_PERS:
                return sugg_InvoiceVAT[2]
            case INVOICE_TYPE_COPR:
                return sugg_InvoiceVAT[3]
            default:
                return sugg_InvoiceVAT[0]
        }
    }

    const renderInvoice = () => {
        if (isObjEmpty(keys)) {
            return null
        }
        return (
            <>
                <Row className="mt-1 mb-2">
                    <Col sm="12" >
                        <Select
                            id="invoiceOption"
                            options={sugg_InvoiceVAT}
                            className="React custom-zindex9"
                            value={sugg_InvoiceVAT.find(item => item.value === getFieldMeta(KEY_INVOICE_TYPE).value)}
                            placeholder={<FormattedMessage id={getKeyLang("VATTitle")} />}
                            classNamePrefix="select"
                            onChange={({ value }) => {
                                setFieldValue(KEY_INVOICE_TYPE, value)
                            }}
                        />
                    </Col>
                </Row>
                {
                    getInvoiceVATTypeComponent(getFieldMeta(KEY_INVOICE_TYPE).value).bodyComponent
                }
            </>
        )
    }

    return (
        <div {...p}>
            <Row>
                {
                    getPayContractStatusComponents(payContractStatus)
                }
            </Row>

            {renderInvoice()}

            <Row className="mt-2 mb-2">
                <Col sm="12">
                    <div className="d-flex">
                        <div className="d-flex align-items-center cursor-pointer mr-5">
                            <img
                                className="rounded-circle mr-50"
                                src={icInOn}
                                alt="ic"
                            />
                            <span className="align-middle font-medium-1 text-title-color letter-uppercase">
                                <b><FormattedMessage id={getKeyLang(`SaveTemplate`)} /></b>
                            </span>
                        </div>

                        <label className="react-toggle-wrapper d-inline-block align-middle">
                            <Toggle
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setFieldValue(KEY_IS_SAVE_TEMPLATE, e.target.checked)
                                        return
                                    }
                                    setFieldValue(KEY_IS_SAVE_TEMPLATE, e.target.checked)
                                }}
                                className="switch-danger-primary"
                                defaultChecked={getFieldMeta(KEY_IS_SAVE_TEMPLATE).value}
                            />
                        </label>
                    </div>
                </Col>
            </Row>

            {
                getFieldMeta(KEY_IS_SAVE_TEMPLATE).value &&
                <Row className="mt-1">
                    <Col xs={12} md={12}>
                        <BaseFormGroup
                            fieldName={KEY_TEMPLATE_NAME}
                            errors={errors} touched={touched}
                            messageId={getKeyLang("templateName")}
                        />
                    </Col>
                </Row>
            }
        </div>
    )
}

export default Completed