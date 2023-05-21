import React from 'react'
import { useIntl } from 'react-intl'
import Original from '../../../../../../../components/insurance-app/common-forms/calculate-fee'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import { intlConvertToVnd } from '../../../../../../../ultity'
import { useDispatch } from 'react-redux'
import { BASE } from '../../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'

const CalFeeDone = ({ dataFees, contractId, paymentType }) => {
    const dispatch = useDispatch()
    const intl = useIntl()
    /**
     '0': {
            MOTOR_TNDS: 66000,
            MOTOR_CONNGUOI: 10000,
            companyId: '01',
            totalFee: 76000,
            companyName: 'BSH'
         }
     */
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

    const assignCompanyId = (companyId) => {
        dispatch(
            updateProps([
                {
                    prop: BASE.KEY_COMPANY_ID,
                    value: companyId
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
        />
    )
}

export default CalFeeDone