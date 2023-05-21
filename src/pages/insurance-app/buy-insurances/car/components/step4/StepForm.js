import React from 'react'
import { FormattedMessage } from 'base-app'
import DropzoneAccept from '../../../../../../components/insurance-app/buy-insurance-car/DropzoneAccept'
import BuyInsuranceCarServ from '../../../../../../services/insurance-app/buyInsuranceCar'
import { FICO_MANAGER_ID, getKeyLang } from '../../../../../../configs/insurance-app'
import { KEY_VEHICLE_STATUS, VEHICLE_STATUS_NEW, VEHICLE_STATUS_ROLLOVER } from '../step1/formikConfig'
import { useSelector } from 'react-redux'
import { KEY_IS_FICO_USER } from './formikConfig'

const StepForm = ({ className, contractId, usersDTO, stepInfo, formik }) => {
    const { setFieldValue, getFieldProps } = formik
    const { [KEY_VEHICLE_STATUS]: vehicleStatusValue } = stepInfo
    const {user} = useSelector((state) => state.auth)


    const updateAvatar = async (file, type) => {
        const formData = new FormData()
        formData.append(
            'fileInfo',
            new Blob([JSON.stringify({
                'contractId': contractId,
                'docType': type,
                'userId': usersDTO.id
            })], {
                type: 'application/json'
            })
        )
        formData.append('file', file)

        const res = await BuyInsuranceCarServ.uploadFile(formData)
        if (res && res.status === 200) {
            formik.setFieldValue(type, URL.createObjectURL(file))
        }
    }

    React.useEffect(() => {
        setFieldValue(KEY_VEHICLE_STATUS, vehicleStatusValue)
    }, [vehicleStatusValue])

    React.useEffect(() => {
      setFieldValue(KEY_IS_FICO_USER, user.managerId === FICO_MANAGER_ID)
    }, [])

    const render = () => {
        if ((vehicleStatusValue === VEHICLE_STATUS_NEW || vehicleStatusValue === VEHICLE_STATUS_ROLLOVER) && user.managerId !== FICO_MANAGER_ID) {
            return (
                <>
                    <DropzoneAccept
                        formik={formik} fieldName='uploadRegisterCar'
                        title={<FormattedMessage id={getKeyLang(`UploadRegisterCar`)} />}
                        updateAvatar={updateAvatar}
                    />

                    <DropzoneAccept
                        formik={formik} fieldName='uploadTemCar'
                        title={<FormattedMessage id={getKeyLang(`UploadTemCar`)} />}
                        updateAvatar={updateAvatar}
                    />

                    <DropzoneAccept
                        formik={formik} fieldName='uploadChassisNumber'
                        title={<FormattedMessage id={getKeyLang(`ChassisNumber`)} />}
                        updateAvatar={updateAvatar}
                    />
                </>
            )
        }
        return (
            <>
                <DropzoneAccept formik={formik} fieldName='uploadRegisterCar'
                    title={<FormattedMessage id={getKeyLang(`UploadRegisterCar`)} />}
                    updateAvatar={updateAvatar}
                />

                <DropzoneAccept formik={formik} fieldName='uploadTemCar'
                    title={<FormattedMessage id={getKeyLang("UploadTemCar")} />}
                    updateAvatar={updateAvatar}
                />

                <DropzoneAccept formik={formik} fieldName='uploadChassisNumber'
                    title={<FormattedMessage id={getKeyLang("ChassisNumber")} />}
                    updateAvatar={updateAvatar}
                />

                <DropzoneAccept formik={formik} fieldName='uploadBeforeMainSeatCar'
                    title={<FormattedMessage id={getKeyLang("UploadBeforeMainSeatCar")} />}
                    updateAvatar={updateAvatar}
                />

                <DropzoneAccept formik={formik} fieldName='uploadBeforeSubSeatCar'
                    title={<FormattedMessage id={getKeyLang("UploadBeforeSubSeatCar")} />}
                    updateAvatar={updateAvatar}
                />

                <DropzoneAccept formik={formik} fieldName='uploadAfterMainSeatCar'
                    title={<FormattedMessage id={getKeyLang("UploadAfterMainSeatCar")} />}
                    updateAvatar={updateAvatar}
                />

                <DropzoneAccept formik={formik} fieldName='uploadAfterSubSeatCar'
                    title={<FormattedMessage id={getKeyLang("UploadAfterSubSeatCar")} />}
                    updateAvatar={updateAvatar}
                />
            </>
        )
    }

    return (
        <div className={className}>
            {render()}
        </div>
    )
}
export default StepForm
