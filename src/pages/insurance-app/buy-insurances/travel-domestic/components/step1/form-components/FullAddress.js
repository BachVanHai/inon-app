import React from 'react'
import Original from '../../../../../../../components/insurance-app/common-forms/addresses-row/FullAddressRowComp'
/**
    @example
 <FullAddtionalAddress
    zIndex = "custom-zindex5"
    keysMap={{
         KEY_CITY: keyCity,
         KEY_DISTRICT: keyDistrict,
         KEY_WARD: keyWard,
         KEY_ADDRESS: keyAddress
     }}
/>
 */
const FullAddress = ({
    keyMaps = {
        KEY_CITY: "city",
        KEY_DISTRICT: "district",
        KEY_WARD: "ward",
        KEY_ADDRESS: "address",
    },
    ...p
}) => {
    const { KEY_CITY: keyCity, KEY_DISTRICT: keyDistrict, KEY_WARD: keyWard, KEY_ADDRESS: keyAddress } = keyMaps

    return (
        <Original
            keysMap={{
                KEY_CITY: keyCity,
                KEY_DISTRICT: keyDistrict,
                KEY_WARD: keyWard,
                // KEY_ADDRESS: keyAddress
            }}
            required={true}
            {...p}
        />
    )
}

export default FullAddress
