import React from 'react'
import { useIntl } from 'react-intl'
import Original from '../../../../../../../components/insurance-app/common-forms/calculate-fee-simplify'
import { COMPANIES, getKeyLang } from '../../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../../redux/actions/insurance-app/buyInsurancesCar'
import { intlConvertToVnd } from '../../../../../../../ultity'
import { useDispatch } from 'react-redux'
import { BASE } from '../../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'

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
        if (dataFee["CAR_TNDS"] !== undefined) {
            let feeTNDS = {}
            feeTNDS.name = intl.formatMessage({ id: getKeyLang("FeeInsBBTNDSCar") })
            feeTNDS.value = intlConvertToVnd(dataFee["CAR_TNDS"], intl) + " VND"
            data.push(feeTNDS)
        }
        if (dataFee["CAR_CONNGUOI"] !== undefined) {
            let feeConnguoi = {}
            feeConnguoi.name = intl.formatMessage({ id: getKeyLang("FeeInsBHTNLPXNTX") })
            feeConnguoi.value = intlConvertToVnd(dataFee["CAR_CONNGUOI"], intl) + " VND"
            data.push(feeConnguoi)
        }

        return data
    }

    const assignCompanyId = async (__companyId) => {
        // const conpRes = await renewalService.updateCompanies(
        //     getDefault_updateCompanyIdObj(contractId, __companyId)
        //   )
        //   if (conpRes.status === 200) {
        //     dispatch(updatePropsCompanyId(__companyId))
        //   }
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