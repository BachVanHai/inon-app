import React, { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import Contract from '../../../../../../components/insurance-app/common-forms/contract/Contract'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { houseTypes } from '../step1/formikConfig'
import { suggCoverage } from '../step2/formikConfig'
import { getRightPaymentVATFee, intlConvertToVnd } from '../../../../../../ultity'
import { TEXT_NO_VALUE } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { formatingDate } from '../../../../../../ultity'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesPersonalHome'
import { useDispatch } from 'react-redux'
import { KEY_TOTAL_FEE } from '../../../../../../redux/reducers/insurance-app/buyInsurancesPersonalHome'

const StepForm = ({ toggleAgree, stepInfo, dataFee }) => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const { contractInfo, paymentType } = stepInfo

    const {
        detail, beneficiaryName, email, houseType, icNo, city, district, ward, contractCode,
        insuranceCompanyName, startDate, endDate, phoneNumber, issuedPlace, issuedDate,
        ["ASSET-BASIC"]: assetBasic, ["MATERIAL-BASIC"]: materialBasic,
        ["ASSET-OVERVIEW"]: assetOverview, ["MATERIAL-OVERVIEW"]: materialOverview
    } = contractInfo
    if (!dataFee) {
        dataFee = {
            feeMaterial: 0,
            feeAsset: 0,

            paymentFee: 0,
            reduceFee: 0,
            allFeeInsurance: 0,
            totalFeeVAT: 0,
        }
    }

    const titleRow = {
        msgField: <FormattedMessage id={getKeyLang(`contractCode`)} />,
        content: contractCode || TEXT_NO_VALUE,
        subTitle: insuranceCompanyName || TEXT_NO_VALUE,
    }

    const infoCols = [
        {
            msgField: <FormattedMessage id={getKeyLang(`ValueDateStart`)} />,
            content: formatingDate(startDate) || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`ValueDateEnd`)} />,
            content: formatingDate(endDate) || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`insuredPerson`)} />,
            content: beneficiaryName || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`IDPers`)} />,
            content: icNo || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`IdDate`)} />,
            content: formatingDate(issuedDate) || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`IdPlace`)} />,
            content: issuedPlace || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`PartnerPhone`)} />,
            content: phoneNumber || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`Email`)} />,
            content: email || TEXT_NO_VALUE
        },
    ]

    const getAddonInfo = (basicAddon, overviewAddon) => {
        if (basicAddon) {
            return ({
                title: suggCoverage[0].label,
                value: `${intlConvertToVnd(basicAddon, intl)} VND`,
            })
        }
        if (overviewAddon) {
            return ({
                title: suggCoverage[1].label,
                value: `${intlConvertToVnd(overviewAddon, intl)} VND`
            })
        }
        return ({
            title: TEXT_NO_VALUE,
            value: "0 VND",
        })
    }

    const houseMaterialFeeRow = {
        msgField: <FormattedMessage id={getKeyLang(`contract.personalHome.houseMaterialFee`)} />,
        content: `${intlConvertToVnd(dataFee.feeMaterial, intl) || 0} VND`,
        details: [
            {
                msgField: <FormattedMessage id={getKeyLang(`contract.personalHome.limitCompensated`)} />,
                content: getAddonInfo(materialBasic, materialOverview).value
            },
            {
                msgField: <FormattedMessage id={getKeyLang(`contract.personalHome.coverage`)} />,
                content: getAddonInfo(materialBasic, materialOverview).title
            },
        ]
    }
    const houseAssestsFeeRow = {
        msgField: <FormattedMessage id={getKeyLang(`contract.personalHome.houseAssestsFee`)} />,
        content: `${intlConvertToVnd(dataFee.feeAsset, intl) || 0} VND`,
        details: [
            {
                msgField: <FormattedMessage id={getKeyLang(`contract.personalHome.limitCompensated`)} />,
                content: getAddonInfo(assetBasic, assetOverview).value
            },
            {
                msgField: <FormattedMessage id={getKeyLang(`contract.personalHome.coverage`)} />,
                content: getAddonInfo(assetBasic, assetOverview).title
            },
        ]
    }

    const getAddonComponent = () => {
        const arr = [materialBasic || 0, materialOverview || 0, assetBasic || 0, assetOverview || 0]
        let hashSet = []
        for (let i = 0; i < arr.length; ++i) {
            if (i <= 1 && arr[i]) {
                hashSet.push(houseMaterialFeeRow)
                i = 1
            } else if (arr[i]) {
                hashSet.push(houseAssestsFeeRow)
                break
            }
        }
        return hashSet
    }

    const infoRows = [
        {
            msgField: <FormattedMessage id={getKeyLang(`contract.personalHome.houseAddress`)} />,
            content: city && `${detail && detail} (${ward}, ${district}, ${city})` || detail || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`contract.personalHome.houseType`)} />,
            content: houseType && houseTypes.find(elt => elt.content === houseType).label || TEXT_NO_VALUE
        },
        ...getAddonComponent()
    ]

    const _right = getRightPaymentVATFee(paymentType, dataFee)
    const _totalFee = _right + +dataFee.feeInsurance

    const feeRows = [
        {
            msgField: <FormattedMessage id={getKeyLang(`InsVatFee`)} />,
            content: `${intlConvertToVnd(_right, intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`ValueGiftCode`)} />,
            content: `${intlConvertToVnd(dataFee.reduceFee, intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`FeeTotal`)} />,
            content: `${intlConvertToVnd(_totalFee, intl)} VND`,
            isTotalFee: true
        },
    ]

    useEffect(() => {
        dispatch(
            updateProps([
                {
                    prop: KEY_TOTAL_FEE,
                    value: _totalFee
                }
            ])
        )
    }, [_right])

    return (
        <Contract
            titleRow={titleRow}
            infoCols={infoCols}
            infoRows={infoRows}
            feeRows={feeRows}
            toggleAgree={toggleAgree}
        />
    )
}

export default StepForm
