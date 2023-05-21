import React, { useState } from "react"
import { HttpClient, BaseAppUltils, FormattedMessage } from 'base-app'
import {
    getKeyLang, API_OCR_VEHICLE_REGISTRATION, API_OCR_VEHICLE_INSPECTOR, API_OCR_ID_PERSON,
    // IMAGE_RESIZE_CONFIG
} from "../../../../configs/insurance-app"
import UploadInput from "./UploadInput"
// import { readAndCompressImage } from 'browser-image-resizer'
import { isObjEmpty } from "../../../../ultity"

export const OCR_TYPE_VEHICLE_REGISTRATION = "OCR_TYPE_VEHICLE_REGISTRATION"
export const OCR_TYPE_VEHICLE_INSPECTOR = "OCR_TYPE_VEHICLE_INSPECTOR"
export const OCR_TYPE_ID_PERSON = "OCR_TYPE_ID_PERSON"
/**
 * @description
 * There are 3 type of ocr which are:
 * + "OCR_TYPE_VEHICLE_REGISTRATION"
 * + "OCR_TYPE_VEHICLE_INSPECTOR"
 * + "OCR_TYPE_ID_PERSON"
  @example
    const registrationImageCompleted = (brand, model, chassis, engine, plate, year_of_manufacture, name, address) => {
        const strTrim = (str) => {
            return str.replace(/\s+/g, '')
        }
        const _values = { ...values }
        _values[KEY_FULLNAME] = name
        _values[KEY_ADDRESS] = address
        _values[KEY_NUMBER_PLATE] = strTrim(plate)
        _values[KEY_LINE_VEHICLE] = strTrim(model)
        _values[KEY_MANUFACTURER_VEHICLE] = brand

        _values[KEY_FRAME_NUMBER] = chassis
        _values[KEY_MACHINE_NUMBER] = engine
        setValues(_values)
    }

  return (
    <div className="ocr-input-wrapper w-100">
        <OCRinputCustom
            ocrType={"OCR_TYPE_VEHICLE_REGISTRATION"}
            idKeylangBtnName={getKeyLang(`vehicleRegistrationOcr`)}
            completedCallback={registrationImageCompleted}
            className="mb-1 mr-1 ocr-input"
            uploadedImgUrl={uploadedImg}                    // can omitted
            handleImageChangeCallback={setUploadImg}        // can omitted
        />
    </div>
  )
 
 */
export const OcrInput = ({
    idKeylangBtnName = getKeyLang(`vehicleRegistrationOcr`),
    ocrType = "OCR_TYPE_VEHICLE_REGISTRATION",
    uploadedImgUrl = "",
    handleImageChangeCallback = (e_target_files0) => { },
    completedCallback = () => { },
    className = "",
}) => {
    const [_uploadedImg, _setUploadImg] = useState({ name: "dumbName" })

    const failCallback = () => {
        BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`photoFormat.error`)} />)
    }
    const submit = (API, _file) => {
        const bodyFormData = new FormData()
        bodyFormData.append('img', _file)
        // bodyFormData.append('img2', file)
        return HttpClient.post(API, bodyFormData)
    }

    const idSubmit = async (file) => {
        const res = await submit(API_OCR_ID_PERSON, file)
        if (!res || !res.data || !res.data.data[0]) {
            return
        }
        const rawData = res.data.data[0]
        const errorCode = res.data.errorCode
        const errorMessage = res.data.errorMessage
        if (rawData[0].info && errorMessage === 'Success' && res.status === 200) {
            const { name, id, dob, address } = rawData[0].info
            completedCallback(name, id, dob, address)
            return
        }
        failCallback()
    }

    const inspectorSubmit = async (file) => {
        const res = await submit(API_OCR_VEHICLE_INSPECTOR, file)
        if (!res || !res.data || !res.data.data) {
            return
        }
        const rawData = res.data.data
        const errorCode = res.data.errorCode
        if (rawData && rawData.info && Number(errorCode) === 0 && res.status === 200) {
            const { chassis_number, engine_number, manufactured_year,
                manufactured_country, mark, model_code,
                registration_number } = rawData.info

            completedCallback(
                chassis_number, engine_number, manufactured_year,
                manufactured_country, mark, model_code,
                registration_number
            )
            return
        }
        failCallback()
    }

    const registrationSubmit = async (file) => {
        const res = await submit(API_OCR_VEHICLE_REGISTRATION, file)
        if (!res || !res.data || !res.data.data) {
            return
        }

        const rawData = res.data.data
        const errorCode = res.data.errorCode
        if (rawData && rawData.info && Number(errorCode) === 0 && res.status === 200) {
            let { brand, model, chassis, engine, plate, year_of_manufacture, name, address , sit ,issued_at ,first_issue_date , capacity } = rawData.info
            completedCallback(brand, model, chassis, engine, plate, year_of_manufacture, name, address , sit ,issued_at ,first_issue_date , capacity )
            return
        }
        failCallback()
    }

    const handleImageChange = (e) => {
        if (isObjEmpty(e.target) || isObjEmpty(e.target.files)) { return }

        const file = e.target.files[0]
        // const resizedImage = await readAndCompressImage(file, IMAGE_RESIZE_CONFIG)
        _setUploadImg(file || { name: "dumbName" })
        handleImageChangeCallback(file || { name: "dumbName" })

        switch (ocrType) {
            case OCR_TYPE_ID_PERSON:
                idSubmit(file)
                break
            case OCR_TYPE_VEHICLE_INSPECTOR:
                inspectorSubmit(file)
                break
            case OCR_TYPE_VEHICLE_REGISTRATION:
                registrationSubmit(file)
                break
            default:
                break
        }
    }

    return (
        <UploadInput
            className={className}
            uploadedImg={_uploadedImg} uploadedImgUrl={uploadedImgUrl}
            handleImageChange={handleImageChange}
            idKeylangBtnName={idKeylangBtnName}
        />
    )
}
