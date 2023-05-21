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
import { KEY_ADDRESS, KEY_ADDTIONAL_PEOPLE, KEY_CITY, KEY_DATE_BIRTH, KEY_DISTRICT, KEY_EMAIL, KEY_FULLNAME, KEY_IC_NO, KEY_IC_NO_BENEFICIARY, KEY_NAME_BENEFICIARY, KEY_PHONE_NUMBER, KEY_WARD } from '../../step1/formikConfig'
import { getInsuranceFeeBy, KEY_DURATION_SELECTED, KEY_PACKAGE_SELECTED, KEY_PRODUCT_CODE, packages } from '../../step2/formikConfig'
import { updateProps } from '../../../../../../../redux/actions/insurance-app/buyInsurancesHealthCareAdvanced'
import { BASE } from '../../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareAdvanced'
import { getDefault_updatePaymentContractObj, updateContract } from '../utility'
import ContractInfoCols from '../../../../../../../components/insurance-app/common-forms/contract/InfoCols'
import { ARR_COMPANIES, _PACKAGE_INSURANCES, _RANGE } from '../../step2/utility'
import { Col, Row } from 'reactstrap'
import { _RELATIONSHIPS } from '../../step1/utility'

const Contract = ({ contractInfo = {}, contractCode, contractId, dataFee,
    agreedTermOfServicesStatus, paymentType, toggleAgreeCallback, companyId, stepInfo, insuranceInfo }) => {
    let { owner, beneficiaries } = contractInfo
    const intl = useIntl()
    const dispatch = useDispatch()    
    console.log("stepInfo" , stepInfo);
  
    const {} = stepInfo

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
        const { startValueDate, duration, endValueDate } = insuranceInfo
    const titleRow2 = {
        subTitle: <FormattedMessage id={getKeyLang(`insuranceBuyerInfo`)} /> || TEXT_NO_VALUE,
        isContractTitleHide: true
    }
    const addtionPeople = (stepInfo[KEY_ADDTIONAL_PEOPLE] || [{}])[0]

     const headRow = [
        {
            msgField: "Họ và tên",
            content : stepInfo[KEY_FULLNAME]
        },
        {
            msgField: "Số giấy tờ tuỳ thân",
            content :  stepInfo[KEY_IC_NO]
        },
        {
            msgField: "Năm sinh",
            content : moment(stepInfo[KEY_DATE_BIRTH]).utc(true).format(DATE_FORMAT)
        },
        {
            msgField: "Số điện thoại",
            content : stepInfo[KEY_PHONE_NUMBER]
        },
        {
            msgField: "Email",
            content :stepInfo[KEY_EMAIL]
        },
        {
            msgField: "Địa chỉ",
            content :  stepInfo[KEY_ADDRESS] === "" && stepInfo[KEY_CITY] === "" ? stepInfo[KEY_ADDRESS] + stepInfo[KEY_WARD] + stepInfo[KEY_DISTRICT] + stepInfo[KEY_CITY] : stepInfo[KEY_ADDRESS]
        }
    ]


    const tableHead = [
        {
            msgField: "Họ và tên",
            content : addtionPeople.fullname
        },
        {
            msgField: "Giới tính",
            content :  addtionPeople.icNo
        },
        {
            msgField: "Năm sinh",
            content : moment(addtionPeople.dateOfBirth).utc(true).format(DATE_FORMAT)
        },
        {
            msgField: "CCCD/GKS",
            content : addtionPeople.phoneNumber
        },
        {
            msgField: "Quan hệ với BMBH",
            content : addtionPeople.email
        }
    ]

    const titleRow3 = {
        subTitle: <FormattedMessage id={getKeyLang(`insuranceBeneInfo`)} /> || TEXT_NO_VALUE,
        isContractTitleHide: true
    }


    const titleRow4 = {
        subTitle: <FormattedMessage id={getKeyLang(`antin.beneficiaryInformation`)} /> || TEXT_NO_VALUE,
        isContractTitleHide: true
    }

    const headRow4 = [
        {
            msgField: "Họ và tên",
            content : stepInfo[KEY_NAME_BENEFICIARY]
        },
        {
            msgField: "Số giấy tờ tuỳ thân",
            content :  stepInfo[KEY_IC_NO_BENEFICIARY]
        }
    ]

    const bodyRows = stepInfo[KEY_ADDTIONAL_PEOPLE].map((person, index) => {
        const { fullname, icNo, dateOfBirth, phoneNumber, email , relationship } = person
        return ({
            contents: [
                { content: fullname },
                { content: icNo },
                { content: moment(dateOfBirth).utc(true).format(DATE_FORMAT) },
                { content: icNo },
                { content: _RELATIONSHIPS.find(_elt => _elt.content === person.relationship)?.label}
            ]
        })
    })
    const vanillaRows = [
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


    const vanillaRows1 = [
        {
            msgField: <CustomTable headRow={tableHead} bodyRows={bodyRows} />,
        },
    ]
    console.log("dataFee" , dataFee);
    const rightPaymentVATFee = getRightPaymentVATFee(paymentType, dataFee)
    const totalFeeVAT = rightPaymentVATFee + (dataFee && dataFee.feeInsurance || 0)
    const feeRows = [
        {
            msgField: <FormattedMessage id={getKeyLang(`insurance.companyName`)} />,
            content: ARR_COMPANIES.find(_elt => _elt.id === "02" )?.nameDetail ,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`insurancePackage`)} />,
            content: stepInfo[KEY_PRODUCT_CODE] ? _PACKAGE_INSURANCES.find(elt => elt.value === stepInfo.productCode)?.packageSubtitleField : TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`coverage`)} />,
            content: <FormattedMessage id={getKeyLang(_RANGE.find(_elt => _elt.value === stepInfo[KEY_PACKAGE_SELECTED]).title)} />  || TEXT_NO_VALUE,
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
                    stepInfo[KEY_PRODUCT_CODE]
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
                titleRow={titleRow3}
                vanillaRows={vanillaRows1}
            />
              <Original
                titleRow={titleRow4}
                infoCols={headRow4}
            />
            <Original
                vanillaRows={vanillaRows}
                feeRows={feeRows}
                toggleAgree={toggleAgree}
            />
        </>
    )
}

export default Contract
