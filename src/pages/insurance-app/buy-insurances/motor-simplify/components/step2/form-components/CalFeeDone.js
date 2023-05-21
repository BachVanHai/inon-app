import React from 'react'
import { useIntl } from 'react-intl'
import Original from '../../../../../../../components/insurance-app/common-forms/calculate-fee-simplify'
import { COMPANIES, getKeyLang } from '../../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { intlConvertToVnd } from '../../../../../../../ultity'
import { useDispatch } from 'react-redux'
import Service from '../../../../../../../services/insurance-app/buyInsuranceMotor'
import { BASE } from '../../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { getDefault_updateCompanyIdObj } from '../utility'

const CalFeeDone = ({ companyId, dataFees, contractId, paymentType, className }) => {
    const intl = useIntl()
    const dispatch = useDispatch()

    const findValidCompany = () => {
        const foundCompany = dataFees.find(elt => elt.companyId === companyId)
        if (foundCompany) {
            return foundCompany.companyId
        }
        dispatch(updateProps([
            {
                prop: BASE.KEY_COMPANY_ID,
                value: COMPANIES[0].companyId
            }
        ]))
        return COMPANIES[0].companyId
    }

    const _companyId = findValidCompany()

    const popoverFeeAction = (dataFee) => {
        let data = []

        if (dataFee["MOTOR_TNDS"] !== undefined) {
            let feeInsurance = {}

            feeInsurance.name = intl.formatMessage({ id: getKeyLang(`FeeInsBBTNDSMotor`) })
            feeInsurance.value = intlConvertToVnd(dataFee["MOTOR_TNDS"], intl) + " VND"
            data.push(feeInsurance)
        }

        if (dataFee["MOTOR_CONNGUOI"] !== undefined) {
            let feeConnguoi = {}
            feeConnguoi.name = intl.formatMessage({ id: getKeyLang("FeeBHTNNNTXMTXM") })
            feeConnguoi.value = intlConvertToVnd(dataFee["MOTOR_CONNGUOI"], intl) + " VND"
            data.push(feeConnguoi)
        }

        return data
    }

    const assignCompanyId = async (__companyId) => {
        dispatch(
            updateProps([
                {
                    prop: BASE.KEY_COMPANY_ID,
                    value: __companyId
                },
            ])
        )
    }

    return (
        <Original
            dataFees={dataFees}
            contractId={contractId}
            paymentType={paymentType}
            popoverFeeAction={popoverFeeAction}
            assignCompanyId={assignCompanyId}
            companyId={_companyId}
            className={className}
        />
    )
}

export default CalFeeDone