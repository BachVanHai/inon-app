import React from 'react'
import moment from 'moment'
import CustomTable from './Table'
import { useDispatch } from 'react-redux'
import { FormattedMessage, useIntl } from 'react-intl'
import { DATE_FORMAT, TEXT_NO_VALUE } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import Original from '../../../../../../../components/insurance-app/common-forms/contract'
import { getCompanyById, getKeyLang } from '../../../../../../../configs/insurance-app'
import PaymentType from '../../../../../../../components/insurance-app/common-forms/payment/PaymentType'
import { getAddressesValue, getRightPaymentVATFee, intlConvertToVnd, isArrayEmpty, isObjEmpty } from '../../../../../../../ultity'
import { KEY_ADDTIONAL_PEOPLE } from '../../step1/formikConfig'
import { getInsuranceFeeBy, KEY_DURATION_SELECTED, KEY_PACKAGE_SELECTED, packages } from '../../step2/formikConfig'
import { updateProps } from '../../../../../../../redux/actions/insurance-app/buyInsurancesHealthCare'
import { BASE } from '../../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import { getDefault_updatePaymentContractObj, updateContract } from '../utility'
import ContractInfoCols from '../../../../../../../components/insurance-app/common-forms/contract/InfoCols'
import { ARR_COMPANIES } from '../../step2/utility'
import { Col, Row } from 'reactstrap'

const Contract = ({ contractInfo = {}, contractCode, contractId, dataFee,
    agreedTermOfServicesStatus, paymentType, toggleAgreeCallback, companyId, stepInfo, insuranceInfo }) => {
    let { owner, beneficiaries } = contractInfo
    const intl = useIntl()
    const dispatch = useDispatch()

    if (isObjEmpty(owner)) {
        owner = {
            fullName: TEXT_NO_VALUE,
            icNo: TEXT_NO_VALUE,
            phoneNumber: TEXT_NO_VALUE,
            email: TEXT_NO_VALUE,
            addresses: [{ detail: TEXT_NO_VALUE }],
        }
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
    if (Object.keys(insuranceInfo).length === 0) {
        insuranceInfo = [{
            startValueDate: TEXT_NO_VALUE,
            duration: TEXT_NO_VALUE,
            endValueDate: TEXT_NO_VALUE,
        }]
    }
    const { dateOfBirth, fullName, icNo, phoneNumber, email, addresses , gender } = owner
    const { startValueDate, duration, endValueDate } = insuranceInfo
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
            msgField: <FormattedMessage id={getKeyLang(`birthday`)} />,
            content: dateOfBirth || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`Sex`)} />,
            content: gender === 'MALE' ? 'Nam' : 'Nữ' || TEXT_NO_VALUE
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

    const addtionPeople = (stepInfo[KEY_ADDTIONAL_PEOPLE] || [{}])[0]

     const headRow = [
        {
            msgField: "Họ và tên",
            content : addtionPeople.fullname
        },
        {
            msgField: "Số giấy tờ tuỳ thân",
            content :  addtionPeople.icNo
        },
        {
            msgField: "Năm sinh",
            content : moment(addtionPeople.dateOfBirth).utc(true).format(DATE_FORMAT)
        },
        {
            msgField: "Số điện thoại",
            content : addtionPeople.phoneNumber
        },
        {
            msgField: "Email",
            content : addtionPeople.email
        },
        {
            msgField: "Địa chỉ",
            content :  addtionPeople.detail === "" ? addtionPeople.ward + addtionPeople.district + addtionPeople.city : addtionPeople.detail
        },
        {
            msgField: "Tên ngân hàng",
            content : addtionPeople.bank
        },
        {
            msgField: "Số tài khoản/Số thẻ",
            content : addtionPeople.accountNumber
        },
    ]


    const bodyRows = beneficiaries.map((person, index) => {
        const { fullName, icNo, dateOfBirth, phoneNumber, email } = person

        return ({
            contents: [
                { content: fullName },
                { content: icNo },
                { content: moment(dateOfBirth).utc(true).format(DATE_FORMAT) },
                { content: phoneNumber },
                { content: email }
            ]
        })
    })

    const vanillaRows = [
        // {
        //     msgField: <ContractInfoCols rowComponents={headRow} />,
        // },
        {
            msgField: <PaymentType
                paymentType={paymentType}
                isHideIcon={true}
                keyNames={{ KEY_GIFT_CODE: "KEY_COUPON_CODE" }}
                callbacks={{
                    radioChange: (e) => {
                        dispatch(
                            updateContract(
                                getDefault_updatePaymentContractObj(e.target.value, contractInfo)
                            )
                        )
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
    const totalFeeVAT = rightPaymentVATFee + (dataFee && dataFee.totalFeeInsurance || 0)

    const feeRows = [
        {
            msgField: <FormattedMessage id={getKeyLang(`insurance.companyName`)} />,
            content: ARR_COMPANIES.find(_elt => _elt.id === companyId )?.nameDetail ,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`insurancePackage`)} />,
            content: stepInfo[KEY_PACKAGE_SELECTED] ? packages.find(elt => elt.value === stepInfo[KEY_PACKAGE_SELECTED]).packageSubtitleField : TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`RangeDate`)} />,
            content: `${stepInfo[KEY_DURATION_SELECTED]} ` + intl.formatMessage({ id: getKeyLang("Month") }) || TEXT_NO_VALUE,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`FromDate`)} />,
            content: moment(startValueDate).utc(false).format(DATE_FORMAT) || TEXT_NO_VALUE,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`ToDate`)} />,
            content: moment(endValueDate).utc(false).format(DATE_FORMAT) || TEXT_NO_VALUE,
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

    React.useEffect(() => {
        dispatch(
            updateProps([
                {
                    prop: BASE.KEY_TOTAL_FEE,
                    value: totalFeeVAT
                }
            ])
        )
    }, [JSON.stringify(contractInfo), paymentType])

    return (
        <>
            <Row className="mt-1">
                <Col md={12}>
                    <span className="font-medium-1" >
                       <span className='text-bold-600 text-title-color'>
                       <FormattedMessage id={getKeyLang(`contractCode`)} />
                       </span>
                       <span>&nbsp;</span>
                        :
                        <span>&nbsp;</span>
                        <span className='font-weight-bold'>
                        {contractCode || TEXT_NO_VALUE}
                        </span>
                    </span>
                </Col>
            </Row>
            <Original
                titleRow={titleRow2}
                infoCols={headRow}
            />
            <Original
                // titleRow={titleRow2}
                vanillaRows={vanillaRows}
                feeRows={feeRows}
                toggleAgree={toggleAgree}
            />
        </>
    )
}

export default Contract
