import React from 'react'
import { BaseFormGroup } from 'base-app'
import { Col, Row } from 'reactstrap'
import AddressesRow from './AddressesRowComp'
import { getKeyLang } from '../../../../configs/insurance-app'
import { useFormikContext } from 'formik'
/**
 * 
 * @example
 <FullAddressRowComp
    zIndex = "custom-zindex5"
    keysMap={{
         KEY_CITY: keyCity,
         KEY_DISTRICT: keyDistrict,
         KEY_WARD: keyWard,
         KEY_ADDRESS: keyAddress
     }}
/>
 */
const FullAddtionalAddress = ({
    zIndex = "custom-zindex5",
    required,
    keysMap = {
        KEY_CITY: "city",
        KEY_DISTRICT: "district",
        KEY_WARD: "ward",
        KEY_ADDRESS: "address",
    }, ...p }) => {
    const { KEY_CITY, KEY_DISTRICT, KEY_WARD, KEY_ADDRESS } = keysMap
    const { setFieldValue, getFieldMeta, errors, touched , values } = useFormikContext()
    return (
        <div {...p}>
            <AddressesRow
                formikSetFieldValue={setFieldValue} formikGetFieldMeta={getFieldMeta}
                keysMap={{
                    KEY_CITY: `${KEY_CITY}`,
                    KEY_DISTRICT: `${KEY_DISTRICT}`,
                    KEY_WARD: `${KEY_WARD}`
                }}
                zIndex={zIndex}
                className="mt-1"
                required={required}
            />
          
            <Row className="mt-2">
                <Col xs={12} md={12} >
                    {
                        React.useMemo(() => {
                            return (
                                    KEY_ADDRESS ? <BaseFormGroup
                                    fieldName={KEY_ADDRESS}
                                    errors={errors}
                                    touched={touched}
                                    messageId={getKeyLang(`AddressTitle`)}
                                /> : null                                
                            )
                        }, [getFieldMeta(KEY_ADDRESS).value, getFieldMeta(KEY_ADDRESS).error])
                    }
                </Col>
            </Row>
        </div>
    )
}

export default FullAddtionalAddress
