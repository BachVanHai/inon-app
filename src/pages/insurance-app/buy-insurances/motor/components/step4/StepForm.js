import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { TEXT_NO_VALUE } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import Contract from '../../../../../../components/insurance-app/common-forms/contract'
import { getCompanyById, getKeyLang } from '../../../../../../configs/insurance-app'
import { formatingISOStringDate, intlConvertToVnd, isArrayEmpty, isObjEmpty } from '../../../../../../ultity'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { BASE } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { getRightFee } from './utility'

const StepForm = ({ paymentType, dispatch, contractInfo = {}, toggleAgree, className }) => {
    const intl = useIntl()
    let {
        contractCode, companyId,
        // info with array alike
        owner, vehicles, insurances = [],
        // info of fees
        totalFeeInclVAT, totalFee, atmPayFee, qrPayFee, visaMasterPayFee, funTransferPayFee , discountValue
    } = contractInfo

    if (isObjEmpty(owner)) {
        owner = {
            fullName: TEXT_NO_VALUE
        }
    }
    if (isArrayEmpty(vehicles)) {
        vehicles = [
            {
                numberPlate: TEXT_NO_VALUE,
                frameNo: TEXT_NO_VALUE,
                machineNo: TEXT_NO_VALUE,
                vehicleType: TEXT_NO_VALUE,
            }
        ]
    }

    const { fullName } = owner
    const { numberPlate, frameNo, machineNo, vehicleType } = vehicles[0]


    const titleRow = {
        msgField: <FormattedMessage id={getKeyLang(`contractCode`)} />,
        content: contractCode || TEXT_NO_VALUE,
        subTitle: companyId && getCompanyById(companyId).title || TEXT_NO_VALUE,
    }

    const infoCols = [
        {
            msgField: <FormattedMessage id={getKeyLang(`OwnerName`)} />,
            content: fullName || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`TypeVihicle`)} />,
            content: vehicleType.name || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`NumberPlate`)} />,
            content: numberPlate || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`FrameNumber`)} />,
            content: frameNo || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`MachineNumber`)} />,
            content: machineNo || TEXT_NO_VALUE
        },
    ]

    const infoRows = insurances.map((elt) => {
        const { isEnable, insuranceCode, startValueDate, endValueDate, fee, count1 } = elt
        if (isEnable) {
            switch (insuranceCode) {
                case "MOTOR_TNDS":
                    return (
                        {
                            msgField: <FormattedMessage id={getKeyLang(`BHBBTNDSCCXMTXM`)} />,
                            content: intlConvertToVnd(fee, intl) + " VND",
                            details: [
                                {
                                    msgField: <FormattedMessage id={getKeyLang(`EffDateFrom`)} />,
                                    content: formatingISOStringDate(startValueDate)[0],
                                },
                                {
                                    msgField: <FormattedMessage id={getKeyLang(`EffDateTo`)} />,
                                    content: formatingISOStringDate(endValueDate)[0]
                                },
                            ]
                        }
                    )
                case "MOTOR_CONNGUOI":
                    return (
                        {
                            msgField: <FormattedMessage id={getKeyLang(`BHTNNNTXMTXM`)} />,
                            content: intlConvertToVnd(fee, intl) + " VND",
                            details: [
                                {
                                    msgField: <FormattedMessage id={getKeyLang(`NumInCar`)} />,
                                    content: count1,
                                },
                            ]
                        }
                    )
                default:
                    return undefined
            }

        }
        return undefined
    })

    const feeRows = [
        {
            msgField: <FormattedMessage id={getKeyLang(`insuranceFee`)} />,
            content: `${intlConvertToVnd(totalFee, intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`InsVatFee`)} />,
            content: `${intlConvertToVnd(getRightFee(atmPayFee, qrPayFee, visaMasterPayFee, funTransferPayFee, paymentType), intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`voucherApplied`)} />,
            content: `${intlConvertToVnd(discountValue, intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`FeeTotal`)} />,
            content: `${discountValue !== null ? intlConvertToVnd(
                totalFee + getRightFee(atmPayFee, qrPayFee, visaMasterPayFee, funTransferPayFee, paymentType) - discountValue,
                intl
            ) : intlConvertToVnd(
                totalFee + getRightFee(atmPayFee, qrPayFee, visaMasterPayFee, funTransferPayFee, paymentType),
                intl
            )} VND`,
            isTotalFee: true
        },
    ]

    const _toggleAgree = {
        agreedTermOfServicesStatus: toggleAgree.agreedTermOfServicesStatus,
        toggleAgreeCallback: toggleAgree.toggleAgreeCallback
    }

    React.useEffect(() => {
        dispatch(updateProps([
            {
                prop: BASE.KEY_TOTAL_FEE,
                value: totalFeeInclVAT
            }
        ]))
    }, [JSON.stringify(contractInfo)])

    return (
        <div className={className}>
            <Contract
                titleRow={titleRow}
                infoCols={infoCols}
                infoRows={infoRows}
                feeRows={feeRows}
                toggleAgree={_toggleAgree}
            />
        </div >
    )
}

export default StepForm