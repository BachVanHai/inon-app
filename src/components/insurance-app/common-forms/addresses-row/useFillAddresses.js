import React, { useEffect } from 'react'
import { BaseAppConfigs, useCityList, useDistrictList, useWardList } from 'base-app'

export const useFillAddresses = (setFieldValue, keysMap = { KEY_CITY: "city", KEY_DISTRICT: "district", KEY_WARD: "ward" }, getFieldMeta) => {
    const { cities } = useCityList(BaseAppConfigs.VN_COUNTRY_CODE)
    const { districts, loadDitrictsByCity } = useDistrictList(null)
    const { wards, loadWardsByDistrict } = useWardList(null)
    const { KEY_CITY, KEY_DISTRICT, KEY_WARD } = keysMap

    const autoSetFieldPlaceFor = (placesArr, placeProp, setFieldValue, loadPlaceCallback = (id) => { }) => {
        const found = placesArr.find((elt) => {
            return elt.label === getFieldMeta(placeProp).value
        })
        if (found) {
            setFieldValue(placeProp, found.label)
            loadPlaceCallback(found.id)
        }
    }

    useEffect(() => {
        autoSetFieldPlaceFor(cities, KEY_CITY, setFieldValue, loadDitrictsByCity)
    }, [cities.length, getFieldMeta(KEY_CITY).value])
    useEffect(() => {
        autoSetFieldPlaceFor(districts, KEY_DISTRICT, setFieldValue, loadWardsByDistrict)
    }, [districts.length, getFieldMeta(KEY_DISTRICT).value])

    useEffect(() => {
        autoSetFieldPlaceFor(wards, KEY_WARD, setFieldValue)
    }, [wards.length, getFieldMeta(KEY_WARD).value])

    return ({
        cities, districts, wards, loadDitrictsByCity, loadWardsByDistrict
    })
}
