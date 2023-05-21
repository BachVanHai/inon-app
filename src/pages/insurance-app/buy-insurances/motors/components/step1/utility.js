import React from 'react'
import { HttpClient } from 'base-app'
import { API_FILE_BUY_CAR_INSURANCE, API_UPLOAD_EXCEL_VEHICLE, getKeyLang, INSURANCE_TYPE_MOTOR, NAME_BUY_INSURANCE_MOTORS, URL_RESOURCES } from '../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotors'
import { BASE, KEY_CONTRACT_GROUP_ID, KEY_UPLOADED_COUNT } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotors'
import { downloadFile, hasRequestFail, isArrayEmpty } from '../../../../../../ultity'
import { BaseAppUltils } from 'base-app'
import { FormattedMessage } from 'react-intl'

export const getDefault_createMotorContract = (values) => {
    if (isArrayEmpty(values)) return ({ "vehicleMotorExcels": [] })

    const arr = values.map(elt => {
        const { numberPlate, vehicleType,
            frameNo, machineNo,
            manufactureName,
            branchName, fullName,
            icType, icNo,
            telephone, email,
            address, duration,
            startValueDate,
            mountOfPeople,
            vehicleCode,
            mtnTgT
        } = elt

        return (
            {
                "numberPlate": numberPlate || "",
                "vehicleType": vehicleType || "MOTOR",
                "frameNo": frameNo || "",
                "machineNo": machineNo || "",
                "manufactureName": manufactureName || "",
                "branchName": branchName || "",
                "fullName": fullName || "",
                "icType": icType || "CCCD",
                "icNo": icNo || "",
                "telephone": telephone || "",
                "email": email || "",
                "address": address || "",
                "duration": duration || 12,
                "startValueDate": startValueDate || "",
                "mountOfPeople": mountOfPeople || "",
                "vehicleCode": vehicleCode || 19,
                "mtnTgT": mtnTgT || 0
            }
        )
    })

    return (
        {
            "vehicleMotorExcels": [
                ...arr
            ]
        }
    )
}

export const createMotorContract = (info) => {
    return async (dispatch) => {
        try {
            const res = await HttpClient.post(`${API_FILE_BUY_CAR_INSURANCE}?contractType=${INSURANCE_TYPE_MOTOR}`, info)
            if (hasRequestFail(res.status) || isArrayEmpty(res.data)) {
                BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`error.formatUpFile`)} />)
                return
            }

            dispatch(updateProps([
                {
                    prop: BASE.KEY_ACTIVE_STEP,
                    value: 2
                },
                {
                    prop: BASE.KEY_PAYMENT_TYPE,
                    value: res.data[0].paymentType
                },
                {
                    prop: BASE.KEY_CONTRACT_INFO,
                    value: res.data
                },
                {
                    prop: KEY_CONTRACT_GROUP_ID,
                    value: res.data[0].contractGroupId
                },
                {
                    prop: BASE.KEY_CONTRACT_ID,
                    value: res.data[0].contractGroupId
                },
                {
                    prop: BASE.KEY_COMPANY_ID,
                    value: res.data[0].companyId
                },
            ]))
        } catch (e) {
            console.log(e)
        }
    }
}

export const downloadExelFile = (fileName) => {
    let _name = fileName + "_example"
    downloadFile(`${URL_RESOURCES}/MOTOR-template.xlsx`, _name)
}

export const uploadFile = (file) => {
    // return console.log(`file`, file)
    return async (dispatch, getState) => {
        const formData = new FormData()
        formData.append("file", file)
        try {
            const res = await HttpClient({
                method: "post",
                url: `${API_UPLOAD_EXCEL_VEHICLE}?excelType=${INSURANCE_TYPE_MOTOR}`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            if (hasRequestFail(res.status)) return
            const { [KEY_UPLOADED_COUNT]: uploadedCount } = getState()["app"][NAME_BUY_INSURANCE_MOTORS]

            dispatch(updateProps([
                {
                    prop: BASE.KEY_STEP_1,
                    value: ({ returnUploaded: res.data })
                },
                {
                    prop: KEY_UPLOADED_COUNT,
                    value: uploadedCount + 1
                },
            ]))
        } catch (e) {
            console.log(e)
        }
    }
}