import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    loadInsuranceList,
    updateInsuranceList
} from '../../../../../redux/actions/app-no1/account'
import InsuranceCard from "./InsuranceCard";


const CreateFeeAndBonus = ({
                               insuranceSettings,
                               setInsuranceSettings,
                               userId
                           }) => {
    const {insuranceList, insuranceListOrigin} = useSelector(
        (state) => state.app.account
    )
    const dispatch = useDispatch()

    useEffect(() => {
        if (!insuranceListOrigin.length) {
            dispatch(loadInsuranceList(1, insuranceSettings))
        } else {
            if (!insuranceSettings.length) {
                const settings = []
                insuranceListOrigin.forEach((item) => {
                    settings.push({
                        userId,
                        value: '',
                        isEnabled: true,
                        insuranceId: item.id
                    })
                })
                setInsuranceSettings(settings)
                dispatch(updateInsuranceList([...insuranceListOrigin], settings))
            }
        }
    }, [insuranceListOrigin])

    const onChangeStatusInsuranceItem = ({id, isEnabled}) => {
        const index = insuranceSettings.findIndex((v) => v.insuranceId === id)
        if (index >= 0) {
            insuranceSettings[index].isEnabled = isEnabled
            setInsuranceSettings(insuranceSettings)
        }
    }

    const onChangeValueInsuranceItem = ({id, value}) => {
        const index = insuranceSettings.findIndex((v) => v.insuranceId === id)
        if (index >= 0) {
            insuranceSettings[index].value = value
            setInsuranceSettings(insuranceSettings)
        }
    }

    return (
        <React.Fragment>
            {insuranceList.map((insurance) => (
                <InsuranceCard
                    key={insurance.id}
                    insurance={insurance}
                    userId={userId}
                    onChangeStatus={onChangeStatusInsuranceItem}
                    onChangeValue={onChangeValueInsuranceItem}
                    setInsuranceSettings={setInsuranceSettings}
                />
            ))}
        </React.Fragment>
    )
}

export default CreateFeeAndBonus
