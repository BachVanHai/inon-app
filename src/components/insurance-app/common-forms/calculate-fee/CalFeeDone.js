
import React, { useState, useEffect } from 'react'
import { useDeviceDetect, } from 'base-app'
import BaseComp from "./BaseComp"
import MobileComp from "./MobileComp"
import { COMPANIES } from "../../../../configs/insurance-app"
import { intlConvertToVnd, isArrayEmpty } from "../../../../ultity"
import { useIntl } from "react-intl"
import { KEY_TOTAL_FEE_VAT } from '../../buy-insurances-page/formik-config'

export const KEY_TOTAL_FEE = KEY_TOTAL_FEE_VAT

const getDataFees = (dataFees) => {
    const defaultDataFee = [
        {
            companyId: "01",
            companyName: "BSH",
            totalFee: 0
        }
    ]

    if (!isArrayEmpty(dataFees)) {
        return dataFees
    }
    return defaultDataFee
}
/**
 * @description
 *  - dataFees: []
 *  - companyId : "01"
 *  - assignCompanyId : (companyId) => { }
 *  - popoverFeeAction : (companyDataFee) => { }
 * @example
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

    const assignCompanyId = (__companyId) => {
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
 */
const CalFeeDone = ({ className, dataFees, companyId, assignCompanyId, popoverFeeAction = (companyDataFee) => { } }) => {
    const intl = useIntl()
    const { isMobile } = useDeviceDetect()
    const _dataFees = getDataFees(dataFees)
    const isNeedRadio = _dataFees.length > 1

    const _calDataFeeAction = (companyDataFee) => {
        const _arrDataFees = popoverFeeAction(companyDataFee)
        if (!isArrayEmpty(_arrDataFees)) {
            let totalFeeVAT = {}
            totalFeeVAT.name = "totalFeeVAT fee"
            totalFeeVAT.id = KEY_TOTAL_FEE
            totalFeeVAT.value = intlConvertToVnd(
                companyDataFee.totalFeeVAT || companyDataFee.totalFee,
                intl
            )
            if (!_arrDataFees.find(elt => elt.id === KEY_TOTAL_FEE)) {
                _arrDataFees.push(totalFeeVAT)
            }
            return _arrDataFees
        }
        return [{
            id: KEY_TOTAL_FEE,
            name: "totalFeeVAT fee",
            value: "0",
        }]
    }

    const getInsurenceCompanyMap = (key) => {
        const foundCompany = COMPANIES.find(company => company.name === key)

        if (!foundCompany) { /* the key now maybe is a companyId */
            const _foundCompany = COMPANIES.find(company => company.id === key)
            if (!_foundCompany) return COMPANIES[0]
            return _foundCompany
        }
        return foundCompany
    }

    const [popovers, setPopovers] = useState(_dataFees.map(elt => (
        {
            isOpen: false,
            companyName: elt.companyName
        })))

    const [checks, setChecked] = useState(_dataFees.map((elt, index) => {
        if (index === 0) {
            return (
                {
                    isChecked: true,
                    companyName: elt.companyName
                }
            )
        }
        return (
            {
                isChecked: false,
                companyName: elt.companyName
            }
        )
    }))

    const togglePopover = (companyName) => {
        setPopovers(prePops => {
            let found = prePops.find(pop => pop.companyName === companyName)
            if (found.isOpen) {
                found.isOpen = false
            } else {
                found.isOpen = true
            }
            for (let item of prePops) {
                if (item.companyName !== found.companyName) {
                    item.isOpen = false
                }
            }
            return [...prePops]
        })
    }

    const handleRadioClick = function (dataFee) {
        return function () {
            setChecked((preCheckes) => {
                let found = preCheckes.find(check => check.companyName === dataFee.companyName)
                found.isChecked = true
                for (let item of preCheckes) {
                    if (item.companyName !== found.companyName) {
                        item.isChecked = false
                    }
                }
                return [...preCheckes]
            })

            assignCompanyId && assignCompanyId(dataFee.companyId)
        }
    }

    useEffect(() => {
        if (!companyId) return

        setChecked((checkState) => {
            const found = checkState.find(elt => elt.companyName === getInsurenceCompanyMap(companyId).companyName)
            if (found) {
                checkState.forEach(check => {
                    check.isChecked = false
                })
                found.isChecked = true
                return [...checkState]
            }
            return checkState
        })
    }, [companyId])

    if (isMobile) {
        return (
            <MobileComp
                handleRadioClick={handleRadioClick} togglePopover={togglePopover}
                getDetailFeeInfo={_calDataFeeAction} dataFees={_dataFees} isNeedRadio={isNeedRadio}
                checks={checks} getInsurenceCompanyMap={getInsurenceCompanyMap} popovers={popovers}
                className={className}
            />
        )
    }

    return (
        <BaseComp
            handleRadioClick={handleRadioClick} togglePopover={togglePopover}
            getDetailFeeInfo={_calDataFeeAction} dataFees={_dataFees} isNeedRadio={isNeedRadio}
            checks={checks} getInsurenceCompanyMap={getInsurenceCompanyMap} popovers={popovers}
            className={className}
        />
    )
}

export default CalFeeDone