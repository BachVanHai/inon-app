import React from 'react'
import Original from '../../../../../../../components/insurance-app/common-forms/addresses-row/FullAddressRowComp'
import { KEY_ADDRESS, KEY_ADDTIONAL_ADDRESSES, KEY_CITY, KEY_DISTRICT, KEY_WARD } from '../formikConfig'

const AddtionalAddress = ({ index, ...p }) => {
    const keyCity = `${KEY_ADDTIONAL_ADDRESSES}.${index}.${KEY_CITY}`
    const keyDistrict = `${KEY_ADDTIONAL_ADDRESSES}.${index}.${KEY_DISTRICT}`
    const keyWard = `${KEY_ADDTIONAL_ADDRESSES}.${index}.${KEY_WARD}`
    const keyAddress = `${KEY_ADDTIONAL_ADDRESSES}.${index}.${KEY_ADDRESS}`

    return (
        <div {...p}>
            <Original
                keysMap={{
                    KEY_CITY: keyCity,
                    KEY_DISTRICT: keyDistrict,
                    KEY_WARD: keyWard,
                    KEY_ADDRESS: keyAddress
                }}
            />
        </div>
    )
}

export default AddtionalAddress
