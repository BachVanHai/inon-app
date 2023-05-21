import React from 'react'
import { HttpClient } from 'base-app'
import { API_FILE_BUY_CAR_INSURANCE, API_UPLOAD_EXCEL_VEHICLE, getKeyLang, INSURANCE_TYPE_CAR, NAME_BUY_INSURANCES_CARS, URL_RESOURCES } from '../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesCars'
import { BASE, KEY_CONTRACT_GROUP_ID, KEY_UPLOADED_COUNT } from '../../../../../../redux/reducers/insurance-app/buyInsurancesCars'
import { downloadFile, hasRequestFail, isArrayEmpty } from '../../../../../../ultity'
import { BaseAppUltils } from 'base-app'
import { FormattedMessage } from 'react-intl'

export const getDefault_createCarsContract = (vehicleCarExcels) => {
    if (isArrayEmpty(vehicleCarExcels)) return ({ "vehicleCarExcels": []})

    let _vehicleCarExcels = vehicleCarExcels.map(elt => {
        const {
            numberPlate,
            vehicleStatus,
            vehicleType,
            manufactureName,
            branchName,
            usage,
            frameNo,
            machineNo,
            initValue,
            issPlace,
            issDate,
            duration,
            startValueDate,
            people,
            asset,
            passenger,
            mountOfPeople,
            load,
            vehicleCode,
            mtnTgT,
        } = elt

        return (
            {
                "numberPlate": numberPlate || "",
                "vehicleStatus": vehicleStatus || "NEW",
                "vehicleType": vehicleType || "CAR",
                "manufactureName": manufactureName || "BMW",
                "branchName": branchName || "760li",
                "usage": "KKD",
                "frameNo": frameNo || "123456",
                "machineNo": machineNo || "12345",
                "initValue": initValue || 0,
                "issPlace": issPlace || "VIETNAM",
                "issDate": issDate || "16/03/2022",
                "duration": duration || "0",
                "startValueDate": startValueDate || "2022-03-16T17:00:00Z",
                "people": people || 0,
                "asset": asset || 0,
                "passenger": passenger || 0,
                "mountOfPeople": mountOfPeople || 0,
                "load": 0,
                "vehicleCode": vehicleCode || 1,
                "mtnTgT": mtnTgT || 0
            }
        )
    })

    let _customerCarExcels = vehicleCarExcels.map(elt => {
        const {
            numberPlate,
            fullName,
            icType,
            icNo,
            telephone,
            email,
            address,
        } = elt

        return (
            {
                "numberPlate": numberPlate || "",
                "fullName": fullName || "",
                "icType": icType || "CCCD",
                "icNo": icNo || "",
                "telephone": telephone || "",
                "email": email || "",
                "address": address || ""
            }
        )
    })

    return (
        {
            "vehicleCarExcels": [
                ..._vehicleCarExcels
            ],
            "customerCarExcels": [
                ..._customerCarExcels
            ]
        }
    )
}

export const createCarsContract = (info) => {
    return async (dispatch) => {
        try {
            const res = await HttpClient.post(`${API_FILE_BUY_CAR_INSURANCE}?contractType=${INSURANCE_TYPE_CAR}`, info)
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

/** 
 * @example
 * downloadExelFile("car", "car") || downloadExelFile("owner", "owner")
 */
export const downloadExelFile = (fileName, _type) => {
    let _name = fileName + "_example"
    if (_type === "car") {
        downloadFile(`${URL_RESOURCES}/CAR-TEMPLATE.xlsx`, _name)
        return
    }
    downloadFile(`${URL_RESOURCES}/OWNER-CAR-template.xlsx`, _name)
}

export const uploadFile = (file, _type) => {
    // return console.log(`file`, file)
    return async (dispatch, getState) => {
        const formData = new FormData()
        formData.append("file", file)
        try {
            const res = await HttpClient({
                method: "post",
                url: `${API_UPLOAD_EXCEL_VEHICLE}?excelType=${_type === "car" ? INSURANCE_TYPE_CAR : "OWNER"}`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })

            if (hasRequestFail(res.status)) return

            const { [KEY_UPLOADED_COUNT]: uploadedCount,
                [BASE.KEY_STEP_1]: step_1,
            } = getState()["app"][NAME_BUY_INSURANCES_CARS]
            const { returnCarUploaded, returnOwnerUploaded } = step_1

            if (_type === "car") {
                dispatch(updateProps([
                    {
                        prop: BASE.KEY_STEP_1,
                        value: ({ returnOwnerUploaded, returnCarUploaded: res.data })
                    },
                    {
                        prop: KEY_UPLOADED_COUNT,
                        value: uploadedCount + 1
                    },
                ]))
                return
            }

            dispatch(updateProps([
                {
                    prop: BASE.KEY_STEP_1,
                    value: ({ returnCarUploaded, returnOwnerUploaded: res.data })
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