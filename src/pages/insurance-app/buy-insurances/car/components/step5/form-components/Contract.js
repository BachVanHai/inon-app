import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { TEXT_NO_VALUE } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import Original from '../../../../../../../components/insurance-app/common-forms/contract'
import { getCompanyById, getKeyLang } from '../../../../../../../configs/insurance-app'
import { getCalculatedFees, updateProps } from '../../../../../../../redux/actions/insurance-app/buyInsurancesCar'
import { formatingISOStringDate, intlConvertToVnd, isArrayEmpty, isObjEmpty } from '../../../../../../../ultity'
import { KEY_TOTAL_FEE } from '../../../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import {
    KEY_BRAND_NAME, KEY_CHASSIS_NUMBER, KEY_ENGINE_NUMBER, KEY_MANUFACTURER_NAME,
    KEY_NUMBER_PLATE, KEY_VEHICLE_TYPE
} from '../../step1/formikConfig'

const Contract = ({ companyId, stepInfo, agreedTermOfServicesStatus, toggleAgreeCallback, dispatch }) => {
    const intl = useIntl()
    let { contractInfo, paymentType } = stepInfo

    if (isArrayEmpty(contractInfo["vehicles"])) {
        contractInfo["vehicles"] = [
            {
                [KEY_VEHICLE_TYPE]: { name: TEXT_NO_VALUE },
                [KEY_NUMBER_PLATE]: TEXT_NO_VALUE,
                [KEY_MANUFACTURER_NAME]: TEXT_NO_VALUE,
                [KEY_CHASSIS_NUMBER]: TEXT_NO_VALUE,
                [KEY_BRAND_NAME]: TEXT_NO_VALUE,
                [KEY_ENGINE_NUMBER]: TEXT_NO_VALUE,
            }
        ]
    }
    if (isObjEmpty(contractInfo["owner"])) {
        contractInfo["owner"] = [
            {
                fullName: TEXT_NO_VALUE,
                email: TEXT_NO_VALUE
            }
        ]
    }
    if (isArrayEmpty(contractInfo["insurances"])) {
        contractInfo["insurances"] = [
            {
                insuranceCode: TEXT_NO_VALUE
            }
        ]
    }

    const titleRow = {
        msgField: <FormattedMessage id={getKeyLang(`contractCode`)} />,
        content: contractInfo["contractCode"] || TEXT_NO_VALUE,
        subTitle: getCompanyById(contractInfo["companyId"] || companyId).title || TEXT_NO_VALUE,
    }

    const infoCols = [
        {
            msgField: <FormattedMessage id={getKeyLang(`OwnerName`)} />,
            content: contractInfo["owner"]["fullName"] || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`TypeVihicle`)} />,
            content: contractInfo["vehicles"][0][KEY_VEHICLE_TYPE]["name"] || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`LicensePlate`)} />,
            content: contractInfo["vehicles"][0][KEY_NUMBER_PLATE] || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`Email`)} />,
            content: contractInfo["owner"]["email"] || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`BrandVehicle`)} />,
            content: contractInfo["vehicles"][0][KEY_MANUFACTURER_NAME]
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`LineVehicle`)} />,
            content: contractInfo["vehicles"][0][KEY_BRAND_NAME]
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`FrameNumber`)} />,
            content: contractInfo["vehicles"][0][KEY_CHASSIS_NUMBER]
        },
       
        {
            msgField: <FormattedMessage id={getKeyLang(`EngineNumber`)} />,
            content: contractInfo["vehicles"][0][KEY_ENGINE_NUMBER]
        },
    ]

    const fee_infoRows = contractInfo["insurances"].map((elt) => {
        if (!elt.isEnable) return null

        switch (elt.insuranceCode) {
            case "CAR_TNDS":
                return ({
                    msgField: <FormattedMessage id={getKeyLang(`FeeInsBBTNDSCar`)} />,
                    content: `${intlConvertToVnd(elt.fee, intl) || 0} VND`,
                    details: [
                        {
                            msgField: <FormattedMessage id={getKeyLang(`DateEffFrom`)} />,
                            content: formatingISOStringDate(elt["startValueDate"])[0],
                        },
                        {
                            msgField: <FormattedMessage id={getKeyLang(`DateEffTo`)} />,
                            content: formatingISOStringDate(elt["endValueDate"])[0],
                        },
                    ]
                })
            case "CAR_TNDS_TN":
                return ({
                    msgField: <FormattedMessage id={getKeyLang(`FeeInsBBTNDSTNCar`)} />,
                    content: `${intlConvertToVnd(elt.fee, intl) || 0} VND`,
                    details: [
                        {
                            msgField: <FormattedMessage id={getKeyLang(`DateEffFrom`)} />,
                            content: formatingISOStringDate(elt["startValueDate"])[0],
                        },
                        {
                            msgField: <FormattedMessage id={getKeyLang(`DateEffTo`)} />,
                            content: formatingISOStringDate(elt["endValueDate"])[0],
                        },
                    ]
                })

            case "CAR_VATCHAT":
                return ({
                    msgField: <FormattedMessage id={getKeyLang(`FeeInsMaterialCar`)} />,
                    content: `${intlConvertToVnd(elt.fee, intl) || 0} VND`,
                    details: [
                        {
                            msgField: <FormattedMessage id={getKeyLang(`DateEffFrom`)} />,
                            content: formatingISOStringDate(elt["startValueDate"])[0],
                        },
                        {
                            msgField: <FormattedMessage id={getKeyLang(`DateEffTo`)} />,
                            content: formatingISOStringDate(elt["endValueDate"])[0],
                        },
                    ],
                    detailRows: contractInfo["insuranceAddons"],
                })

            case "CAR_CONNGUOI":
                return ({
                    msgField: <FormattedMessage id={getKeyLang(`FeeInsBHTNLPXNTX`)} />,
                    content: `${intlConvertToVnd(elt.fee, intl) || 0} VND`,
                })

            case "CAR_HANGHOA":
                return ({
                    msgField: <FormattedMessage id={getKeyLang(`FeeInsCommodity`)} />,
                    content: `${intlConvertToVnd(elt.fee, intl) || 0} VND`,
                })
        }
    })

    const infoRows = [
        ...fee_infoRows,
    ]

    const [totalFeeInclVAT, feeVAT] = React.useMemo(() => getCalculatedFees(contractInfo, paymentType), [JSON.stringify(contractInfo), paymentType])

    const feeRows = [
        {
            msgField: <FormattedMessage id={getKeyLang(`feeInsurance`)} />,
            content: `${intlConvertToVnd(contractInfo["totalFee"], intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`InsVatFee`)} />,
            content: `${intlConvertToVnd(feeVAT, intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`voucherApplied`)} />,
            content: `${intlConvertToVnd( contractInfo["discountValue"] !== null ? contractInfo["discountValue"] : 0 , intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`FeeTotal`)} />,
            content: `${contractInfo['discountValue'] !== null ? intlConvertToVnd(totalFeeInclVAT - contractInfo['discountValue'], intl) : intlConvertToVnd(totalFeeInclVAT, intl)} VND`,
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
                    prop: KEY_TOTAL_FEE,
                    value: totalFeeInclVAT
                }
            ])
        )
    }, [JSON.stringify(contractInfo), paymentType])

    return (
        <Original
            titleRow={titleRow}
            infoCols={infoCols}
            infoRows={infoRows}
            feeRows={feeRows}
            toggleAgree={toggleAgree}
        />
    )
}

export default Contract
