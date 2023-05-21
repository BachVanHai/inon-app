import moment from 'moment'
import { isArrayEmpty } from '../../../../ultity'
/**@example
 
 */
export const idOcr_postImageCompleted = (
    setFieldValue,
    keysMap = { KEY_IC_NO: "", KEY_FULL_NAME: "", KEY_DATE_BIRTH: "", KEY_ADDRESS: "" },
    variablesMap = { name: "", id: "", dob: "", address: "" }
) => {
    const { KEY_IC_NO, KEY_FULL_NAME, KEY_DATE_BIRTH, KEY_ADDRESS } = keysMap
    const { id, name, dob, address } = variablesMap

    const formatDate = (str) => {
        // example: 19-10-1988 => 1988-10-19
        const dateArr = str.includes('-') ? str.split("-") : str.split("/")
        let finalArr = []
        while (dateArr.length > 0) {
            finalArr.push(dateArr.pop())
        }
        console.log(`date.formatted`, moment(finalArr.join("-")).utc(true).format('YYYY-MM-DD'))
        return moment(finalArr.join("-")).utc(true).format('YYYY-MM-DD')
    }
    KEY_IC_NO && setFieldValue(KEY_IC_NO, id)
    KEY_FULL_NAME && setFieldValue(KEY_FULL_NAME, name)
    KEY_DATE_BIRTH && setFieldValue(KEY_DATE_BIRTH, formatDate(dob))
    KEY_ADDRESS && setFieldValue(KEY_ADDRESS, address)
}
/**
 * @example
  const registrationImageCompleted = (brand, model, chassis, engine, plate, year_of_manufacture, name, address) => {
        registrationOcr_postImageCompleted(
            setFieldValue,
            {
                KEY_MANUFACTURER_NAME, 
                KEY_BRAND_NAME, 
                KEY_NUMBER_PLATE, 
                KEY_CHASSIS_NUMBER, 
                KEY_ENGINE_NUMBER, 
                KEY_YEAR_PRODUCT,
                KEY_NAME,
                KEY_ADDRESS
            },
            {
                setSugg_LineVehicle, 
                sugg_Automaker, brand, model, plate, 
                chassis, engine, year_of_manufacture,
                name, address
            }
        )
    }
    return (
          <OcrInput
            ocrType={OCR_TYPE_VEHICLE_REGISTRATION}
            idKeylangBtnName={getKeyLang(`vehicleRegistrationOcr`)}
            completedCallback={registrationImageCompleted}
            className="mb-1 mr-1 ocr-input"
          />
    )
 */
export const registrationOcr_postImageCompleted = (setFieldValue, keysMap = {}, variablesMap = {}) => {
    const { KEY_MANUFACTURER_NAME, KEY_BRAND_NAME, KEY_NUMBER_PLATE, KEY_CHASSIS_NUMBER,
        KEY_ENGINE_NUMBER, KEY_YEAR_PRODUCT, KEY_NAME, KEY_ADDRESS } = keysMap

    const { setSugg_LineVehicle, sugg_Automaker,
        brand, model, plate, chassis, engine,
        year_of_manufacture,
        name, address } = variablesMap

    const setManufactureAndBrandName = (brand, model) => {
        const foundManuFacArr = sugg_Automaker.filter(suggElt => brand.includes(suggElt.label))
        const foundManuFac = foundManuFacArr[0]
        if (foundManuFac) {
            setFieldValue(KEY_MANUFACTURER_NAME, foundManuFacArr[0].name)
            setSugg_LineVehicle(foundManuFac.brands)
            const modelReg = new RegExp(model?.toString()?.replace(/\s+/g, ".*?"), "ig")
            const foundModel = foundManuFac.brands.find(elt => elt.brand.match(modelReg))
            if (foundModel) {
                KEY_BRAND_NAME && setFieldValue(KEY_BRAND_NAME, foundModel.brand)
            }
        }
    }
    const strTrim = (str) => {
        return str.replace(/\s+/g, '')
    }

    setManufactureAndBrandName(brand, model)
    KEY_NAME && setFieldValue(KEY_NAME, name)
    KEY_ADDRESS && setFieldValue(KEY_ADDRESS, address)
    KEY_NUMBER_PLATE && setFieldValue(KEY_NUMBER_PLATE, strTrim(plate))
    KEY_CHASSIS_NUMBER && setFieldValue(KEY_CHASSIS_NUMBER, chassis)
    KEY_ENGINE_NUMBER && setFieldValue(KEY_ENGINE_NUMBER, engine)
    KEY_YEAR_PRODUCT && setFieldValue(KEY_YEAR_PRODUCT, moment(year_of_manufacture || "1990-01-01", 'YYYY-MM-DD').format("YYYY") + "-01-01")
}

/**
 * @example
  const inspectorImageCompleted = (chassis_number, engine_number, manufactured_year, manufactured_country, mark, model_code, registration_number) => {
        inspectorOcr_postImageCompleted(
            setFieldValue,
            {
                KEY_CHASSIS_NUMBER, KEY_ENGINE_NUMBER, KEY_MANUFACTURER_NAME, KEY_ORIGIN_PRODUCT, KEY_NUMBER_PLATE, KEY_YEAR_PRODUCT, KEY_BRAND_NAME
            },
            {
                setSugg_LineVehicle, sugg_Automaker, chassis_number, engine_number, mark, manufactured_country, registration_number, manufactured_year, model_code
            }
        )
    }
    return (
         <OcrInput
            ocrType={OCR_TYPE_VEHICLE_INSPECTOR}
            idKeylangBtnName={getKeyLang(`vehicleInspectionOcr`)}
            completedCallback={inspectorImageCompleted}
            className="ocr-input"
          />
    )
 */

export const inspectorOcr_postImageCompleted = (
    setFieldValue,
    keysMap = {
        KEY_CHASSIS_NUMBER: "", KEY_ENGINE_NUMBER: "", KEY_MANUFACTURER_NAME: "",
        KEY_ORIGIN_PRODUCT: "", KEY_NUMBER_PLATE: "", KEY_YEAR_PRODUCT: "", KEY_BRAND_NAME: ""
    },
    variablesMap = {
        setSugg_LineVehicle: [], sugg_Automaker: [], chassis_number: "", engine_number: "", mark: "",
        manufactured_country: "", registration_number: "", manufactured_year: "", model_code: ""
    }
) => {
    const { KEY_CHASSIS_NUMBER, KEY_ENGINE_NUMBER, KEY_MANUFACTURER_NAME, KEY_ORIGIN_PRODUCT, KEY_NUMBER_PLATE, KEY_YEAR_PRODUCT, KEY_BRAND_NAME } = keysMap
    const { setSugg_LineVehicle, sugg_Automaker, chassis_number, engine_number, mark, manufactured_country, registration_number, manufactured_year, model_code } = variablesMap

    const removeAccents = (str) => {
        var AccentsMap = [
            "aàảãáạăằẳẵắặâầẩẫấậ",
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
            "dđ", "DĐ",
            "eèẻẽéẹêềểễếệ",
            "EÈẺẼÉẸÊỀỂỄẾỆ",
            "iìỉĩíị",
            "IÌỈĨÍỊ",
            "oòỏõóọôồổỗốộơờởỡớợ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
            "uùủũúụưừửữứự",
            "UÙỦŨÚỤƯỪỬỮỨỰ",
            "yỳỷỹýỵ",
            "YỲỶỸÝỴ"
        ]
        for (var i = 0; i < AccentsMap.length; i++) {
            var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g')
            var char = AccentsMap[i][0]
            str = str.replace(re, char)
        }
        return str
    }

    const convertManufacturedCountry = (manufactured_country) => {
        const convertedManufacturedCountry = removeAccents(manufactured_country).toLowerCase()
        if (convertedManufacturedCountry === "viet nam" || convertedManufacturedCountry === "vietnam") {
            return "VIETNAM"
        }
        return "IMPORT"
    }

    const strTrim = (str) => {
        return str.replace(/\s+/g, '')
    }

    setFieldValue(KEY_CHASSIS_NUMBER, chassis_number)
    setFieldValue(KEY_ENGINE_NUMBER, engine_number)
    setFieldValue(KEY_MANUFACTURER_NAME, mark)
    setFieldValue(KEY_ORIGIN_PRODUCT, convertManufacturedCountry(manufactured_country))
    setFieldValue(KEY_NUMBER_PLATE, strTrim(registration_number))
    setFieldValue(KEY_YEAR_PRODUCT, moment(manufactured_year, 'YYYY-MM-DD').format("YYYY") + "-01-01")
    const foundManuFac = sugg_Automaker.find(suggElt => suggElt.label === mark)
    if (foundManuFac) {
        setSugg_LineVehicle(foundManuFac.brands)
    }
    const foundModel = foundManuFac.brands.find(elt => elt.label.search(model_code) >= 0 || model_code.search(elt.label) >= 0)
    if (foundModel) {
        setFieldValue(KEY_BRAND_NAME, foundModel.label)
    }
}