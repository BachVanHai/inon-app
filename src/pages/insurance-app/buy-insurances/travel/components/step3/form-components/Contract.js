import moment from 'moment'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { DATE_FORMAT, TEXT_NO_VALUE } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import Original from '../../../../../../../components/insurance-app/common-forms/contract'
import PaymentType from '../../../../../../../components/insurance-app/common-forms/payment/PaymentType'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../../redux/actions/insurance-app/buyInsurancesTravel'
import { BASE } from '../../../../../../../redux/reducers/insurance-app/buyInsurancesTravel'
import { getRightPaymentVATFee, intlConvertToVnd, isArrayEmpty, isObjEmpty } from '../../../../../../../ultity'
import { KEY_ADDTIONAL_PEOPLE } from '../../step1/formikConfig'
import { KEY_DURATION, KEY_INSURANCE_MONEY, KEY_PACKAGE_SELECTED, packages } from '../../step2/formikConfig'
import { ARR_COMPANIES } from '../../step2/utility'
import { getDefault_updatePaymentContractObj, updateContract } from '../utility'
import CustomTable from './Table'

const Contract = ({ contractInfo = {}, contractCode, contractId, dataFee,
    agreedTermOfServicesStatus, paymentType, toggleAgreeCallback, companyId, stepInfo, insuranceInfo }) => {
    let { owner, beneficiaries } = contractInfo
    const intl = useIntl()
    const dispatch = useDispatch()
    const getGenderByType = (type) =>{
        switch (type) {
            case 'MALE':
                return  <FormattedMessage id={getKeyLang(`Male`)} />
            case 'FEMALE':
                return <FormattedMessage id={getKeyLang(`Female`)} />
            case 'OTHER':
                return <FormattedMessage id={getKeyLang(`Other`)} />
            default:
                break;
        }
    }
    if (isObjEmpty(owner)) {
        owner = {
            fullName: TEXT_NO_VALUE,
            icNo: TEXT_NO_VALUE,
            phoneNumber: TEXT_NO_VALUE,
            email: TEXT_NO_VALUE,
            addresses: [{ detail: TEXT_NO_VALUE }],
        }
    }
    if (isArrayEmpty(stepInfo.addtinalPeople)) {
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
    const { fullname, phoneNumber, email, city , district , ward , startValueDate , endValueDate } = stepInfo
    const titleRow1 = {
        msgField: <FormattedMessage id={getKeyLang(`contractCode`)} />,
        content: contractCode || TEXT_NO_VALUE,
        subTitle: <FormattedMessage id={getKeyLang(`insuranceBuyerInfo`)} /> || TEXT_NO_VALUE,
    }

    const infoCols = [
        {
            msgField: <FormattedMessage id={getKeyLang(`fullName`)} />,
            content: fullname || TEXT_NO_VALUE
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
            msgField: <FormattedMessage id={getKeyLang(`Ward`)} />,
            content: ward ||TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`District`)} />,
            content: district ||TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`City`)} />,
            content: city ||TEXT_NO_VALUE
        }
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
            msgField: "Số hộ chiếu",
            content :  addtionPeople.icNo
        },
        {
            msgField: "Năm sinh",
            content : moment(addtionPeople.dateOfBirth).utc(true).format(DATE_FORMAT)
        },
        {
            msgField: "Giới tính",
            content : 'Nam'
        },
        
    ]


    const bodyRows = stepInfo.addtinalPeople.map((person, index) => {
        const { fullname, icNo, dateOfBirth, gender } = person

        return ({
            contents: [
                { content: fullname },
                { content: icNo },
                { content: moment(dateOfBirth).utc(true).format(DATE_FORMAT) },
                { content: getGenderByType(gender) },
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
                            updateContract(
                                contractId ,
                                getDefault_updatePaymentContractObj(e.target.value, contractInfo) , e.target.value
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
    const totalFeeVAT = rightPaymentVATFee + dataFee.totalFeeInsurance
    const feeRows = [
        {
            msgField: <FormattedMessage id={getKeyLang(`insurance.companyName`)} />,
            content: <FormattedMessage id={getKeyLang(ARR_COMPANIES.find(_elt => _elt.id === companyId )?.nameDetail)} />  ,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`insurancePackage`)} />,
            content: stepInfo[KEY_PACKAGE_SELECTED] ? packages.find(elt => elt.value === stepInfo[KEY_PACKAGE_SELECTED]).packageSubtitleField : TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`FeeAmountInsurance`)} />,
            content: `${intlConvertToVnd(stepInfo[KEY_INSURANCE_MONEY], intl)} VNĐ` || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`RangeDate`)} />,
            content: `${stepInfo[KEY_DURATION]} ` + 'Ngày' || TEXT_NO_VALUE,
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
            content: `${intlConvertToVnd(dataFee.totalFeeInsurance , intl)
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
