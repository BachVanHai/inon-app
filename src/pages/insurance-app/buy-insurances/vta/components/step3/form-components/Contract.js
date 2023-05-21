import React from 'react'
import moment from 'moment'
import { FormattedMessage, useIntl } from 'react-intl'
import { DATE_FORMAT, TEXT_NO_VALUE } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import Original from '../../../../../../../components/insurance-app/common-forms/contract'
import { getCompanyById, getKeyLang } from '../../../../../../../configs/insurance-app'
import { getAddressesValue, getRightPaymentVATFee, intlConvertToVnd, isArrayEmpty } from '../../../../../../../ultity'
import PaymentType from '../../../../../../../components/insurance-app/common-forms/payment/PaymentType'
import CustomTable from './Table'
import { KEY_PAYMENT_TYPE } from '../../../../../../../redux/reducers/insurance-app/buyInsurancesVta'
import { getFee, updateProps } from '../../../../../../../redux/actions/insurance-app/buyInsurancesVta'
import { useDispatch } from 'react-redux'
import { KEY_ADDTIONAL_PEOPLE, KEY_DATE_BIRTH, KEY_EMAIL, KEY_IC_NO, KEY_PHONE_NUMBER, KEY_RELATIONSHIPS, relationships } from '../../step1/formikConfig'
import { getInsuranceFeeBy, KEY_DURATION_SELECTED, KEY_PACKAGE_SELECTED, packages } from '../../step2/formikConfig'

const Contract = ({ contractInfo = {}, contractCode, contractId, dataFee,
    agreedTermOfServicesStatus, paymentType, toggleAgreeCallback, companyId, stepInfo }) => {
    let { buyers, beneficiaries } = contractInfo
    const intl = useIntl()
    const dispatch = useDispatch()
    if (isArrayEmpty(buyers)) {
        buyers = [{
            buyer: {
                fullName: TEXT_NO_VALUE,
                icNo: TEXT_NO_VALUE,
                phoneNumber: TEXT_NO_VALUE,
                email: TEXT_NO_VALUE,
                addresses: [{ detail: TEXT_NO_VALUE }],
            }
        }]
    }
    if (isArrayEmpty(beneficiaries)) {
        beneficiaries = [{
            beneficiaryName: TEXT_NO_VALUE,
            duration: TEXT_NO_VALUE,
            endDate: TEXT_NO_VALUE,
            packageName: TEXT_NO_VALUE,
            id: TEXT_NO_VALUE,
            feeInsurance: TEXT_NO_VALUE,
            startDate: TEXT_NO_VALUE
        }]
    }
    const { fullName, icNo, phoneNumber, email, addresses } = buyers[0].buyer

    const titleRow1 = {
        msgField: <FormattedMessage id={getKeyLang(`contractCode`)} />,
        content: contractCode || TEXT_NO_VALUE,
        subTitle: <FormattedMessage id={getKeyLang(`insuranceBuyerInfo`)} /> || TEXT_NO_VALUE,
    }
    const infoCols = [
        {
            msgField: <FormattedMessage id={getKeyLang(`nameOrOrganization`)} />,
            content: fullName || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`idPers`)} />,
            content: icNo || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`PartnerPhone`)} />,
            content: phoneNumber || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`Email`)} />,
            content: email || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`Address`)} />,
            content: getAddressesValue(addresses)
        },
    ]

    const titleRow2 = {
        subTitle: <FormattedMessage id={getKeyLang(`insuranceBeneInfo`)} /> || TEXT_NO_VALUE,
        isContractTitleHide: true
    }

    const headRow = [
        {
            msgField: "Họ và tên",
        },
        {
            msgField: "Quan hệ với BMBH",
        },
        {
            msgField: "CMT / CCCD",
        },
        {
            msgField: "Năm sinh",
        },
        {
            msgField: "Số điện thoại",
        },
        {
            msgField: "Email",
        },
    ]

    const addtionPeople = stepInfo[KEY_ADDTIONAL_PEOPLE] || [{}]

    const bodyRows = beneficiaries.map((person, index) => {
        const { beneficiaryName } = person
        const { [KEY_RELATIONSHIPS]: relationshipVal,
            [KEY_IC_NO]: icNo, [KEY_DATE_BIRTH]: dateOfBirth,
            [KEY_PHONE_NUMBER]: phoneNumber, [KEY_EMAIL]: email,
        } = addtionPeople[index]
        return ({
            contents: [
                { content: beneficiaryName },
                { content: relationships.find(elt => elt.content === relationshipVal)?.label || TEXT_NO_VALUE },
                { content: icNo },
                { content: moment(dateOfBirth).utc(false).format(DATE_FORMAT) },
                { content: phoneNumber },
                { content: email }
            ]
        })
    })

    const vanillaRows = [
        {
            msgField: <CustomTable
                headRow={headRow} bodyRows={bodyRows}
            />,
        },
        {
            msgField: <PaymentType
                paymentType={paymentType}
                isHideIcon={true}
                keyNames={{ KEY_GIFT_CODE: "KEY_COUPON_CODE" }}
                callbacks={{
                    radioChange: (e) => {
                        dispatch(
                            updateProps([
                                {
                                    prop: KEY_PAYMENT_TYPE,
                                    value: e.target.value
                                }
                            ])
                        )
                        dispatch(getFee(contractId))
                    }
                }}
            />
        },
        {
            msgField: <div className='font-medium-4 font-weight-bold text-primary-highlight letter-uppercase mb-2' style={{ marginLeft: "-14px" }}>
                <FormattedMessage id={getKeyLang("Detail")} />
            </div>,
            isHideUnderLine: true,
        },
    ]

    const rightPaymentVATFee = getRightPaymentVATFee(paymentType, dataFee)
    const totalFeeVAT = rightPaymentVATFee + (dataFee && dataFee.feeInsurance || 0)

    const feeRows = [
        {
            msgField: <FormattedMessage id={getKeyLang(`insurance.companyName`)} />,
            content: getCompanyById(companyId).title,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`insurancePackage`)} />,
            content: stepInfo[KEY_PACKAGE_SELECTED] ? packages.find(elt => elt.value === stepInfo[KEY_PACKAGE_SELECTED]).content
                : TEXT_NO_VALUE,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`RangeDate`)} />,
            content: stepInfo[KEY_DURATION_SELECTED] + " " + intl.formatMessage({ id: getKeyLang("Month") }) || TEXT_NO_VALUE,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`FromDate`)} />,
            content: beneficiaries[0] ? moment(beneficiaries[0].startDate).utc(false).format(DATE_FORMAT) : TEXT_NO_VALUE,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`ToDate`)} />,
            content: beneficiaries[0] ? moment(beneficiaries[0].endDate).utc(false).format(DATE_FORMAT) : TEXT_NO_VALUE,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`feeInsurancePer`)} />,
            content: `${intlConvertToVnd(
                getInsuranceFeeBy(
                    stepInfo[KEY_DURATION_SELECTED],
                    stepInfo[KEY_PACKAGE_SELECTED]
                )
                , intl
            )
                } VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`insurancePersAmount`)} />,
            content: !isArrayEmpty(stepInfo[KEY_ADDTIONAL_PEOPLE]) ? stepInfo[KEY_ADDTIONAL_PEOPLE].length : TEXT_NO_VALUE,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`InsVatFee`)} />,
            content: `${intlConvertToVnd(rightPaymentVATFee, intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`voucherApplied`)} />,
            content: `${dataFee && dataFee.reduceFee ? "-" : ""}${intlConvertToVnd(dataFee && dataFee.reduceFee, intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`FeeTotal`)} />,
            content: `${intlConvertToVnd(totalFeeVAT, intl)} VND`,
            isTotalFee: true
        },
    ]

    const toggleAgree = {
        agreedTermOfServicesStatus: agreedTermOfServicesStatus,
        toggleAgreeCallback: toggleAgreeCallback
    }

    return (
        <>
            <Original
                titleRow={titleRow1}
                infoCols={infoCols}
            />
            <Original
                titleRow={titleRow2}
                vanillaRows={vanillaRows}
                feeRows={feeRows}
                toggleAgree={toggleAgree}
            />
        </>
    )
}

export default Contract