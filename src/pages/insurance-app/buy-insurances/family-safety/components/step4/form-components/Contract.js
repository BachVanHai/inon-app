import React, { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import moment from 'moment'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import { DATE_FORMAT, KEY_TOTAL_FEE_VAT, TEXT_NO_VALUE } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { intlConvertToVnd, isObjEmpty } from '../../../../../../../ultity'
import ContractPart from "../../../../../../../components/insurance-app/common-forms/contract"
import { useDispatch } from 'react-redux'
import { updateProps } from '../../../../../../../redux/actions/insurance-app/buyInsurancesFamilySafety'
import { KEY_TOTAL_FEE } from '../../../../../../../redux/reducers/insurance-app/buyInsurancesFamilySafety'

const Contract = ({ stepInfo, toggleAgreeTermOfService, agreedTermOfServicesStatus, dataFee , handleRadioPaymentTypeClick }) => {
    const dispatch = useDispatch()
    const intl = useIntl()

    if (isObjEmpty(stepInfo) ||
        !stepInfo.hasOwnProperty("contract") ||
        !stepInfo.hasOwnProperty("beneficiaries") ||
        !stepInfo.hasOwnProperty("owner")
    ) {
        stepInfo = {
            owner: TEXT_NO_VALUE,
            contract: [
                {
                    insurances: [{
                        startValueDate: "",
                        endValueDate: "",
                    }],
                    contractCode: "",
                }
            ],
            companyName: TEXT_NO_VALUE,
            beneficiaries: [
                {
                    fullName: TEXT_NO_VALUE
                }
            ],
        }
    }

    const { owner, contract, companyName, beneficiaries , paymentType } = stepInfo
    const { insurances, contractCode } = contract[0]
   
    const titleRow_1 = {
        titles: [
            {
                msgField: <FormattedMessage id={getKeyLang(`contractCode`)} />,
                content: contractCode || TEXT_NO_VALUE
            },
            {
                msgField: <FormattedMessage id={getKeyLang(`InsuranceProduct`)} />,
                content: companyName || TEXT_NO_VALUE
            },
        ],
        subTitle: <FormattedMessage id={getKeyLang(`insuranceBuyerInfo`)} /> || TEXT_NO_VALUE,
    }

    const titleRow_2 = {
        isContractTitleHide: true,
        subTitle: <FormattedMessage id={getKeyLang(`insuranceInfo`)} /> || TEXT_NO_VALUE,
    }

    const infoCols_1 = [
        {
            msgField: <FormattedMessage id={getKeyLang(`fullName`)} />,
            content: owner && owner[0].fullName || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`idPers`)} />,
            content: owner[0].icNo || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`PartnerPhone`)} />,
            content: owner[0].phoneNumber || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`Email`)} />,
            content: owner[0].email || TEXT_NO_VALUE
        },
    ]

    const getCustomerNames = () => {
        return beneficiaries.map((elt, index) => {
            return ({
                msgField: `${intl.formatMessage({ id: getKeyLang(`CustomerName`) })} ${index + 1}`,
                content: elt.fullName || TEXT_NO_VALUE
            })
        })
    }
    const infoCols_2 = [
        ...getCustomerNames(),
        {
            msgField: <FormattedMessage id={getKeyLang(`insurance.companyName`)} />,
            content: companyName[0] || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`insuranceApplyFrom`)} />,
            content: moment(insurances[0]?.startValueDate).utc(false).format(DATE_FORMAT) || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`insuranceApplyTo`)} />,
            content: moment(insurances[0]?.endValueDate).utc(false).format(DATE_FORMAT) || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`familyInsuranceFee`)} />,
            content: intlConvertToVnd(
                dataFee["feeInsurance"], intl
            ) + " VND" || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`serviceInsuranceFee`)} />,
            content: intlConvertToVnd(
                dataFee["paymentFee"], intl
            ) + " VND" || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`voucherApplied`)} />,
            content: contract[0]?.couponCode || "0 VND"
        },
    ]

    const feeRows = [
        {
            isTotalFee: true,
            msgField: <FormattedMessage id={getKeyLang(`FeeTotal`)} />,
            content: intlConvertToVnd(
                dataFee[KEY_TOTAL_FEE_VAT], intl
            ) + " VND" || "0 VND"
        },
    ]

    const toggleAgree = ({
        agreedTermOfServicesStatus: agreedTermOfServicesStatus,
        toggleAgreeCallback: toggleAgreeTermOfService
    })

    useEffect(() => {
        dispatch(
            updateProps([
                {
                    prop: KEY_TOTAL_FEE,
                    value: dataFee[KEY_TOTAL_FEE_VAT]
                },
            ])
        )
    }, [])

    return (
        <>
            <ContractPart
                titleRow={titleRow_1}
                infoCols={infoCols_1}
            />
            <ContractPart
                titleRow={titleRow_2}
                infoCols={infoCols_2}
                feeRows={feeRows}
                toggleAgree={toggleAgree}
            />
             
        </>
    )
}

export default Contract
