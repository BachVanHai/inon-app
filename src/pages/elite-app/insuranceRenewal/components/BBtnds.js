import React from 'react'
import BBTNDSInsurCar from '../../../insurance-app/buy-insurances/car/components/step2/insur-components/BBTndsInsurCar'
const BBtnds = ({ errors, values, touched, setFieldValue, getFieldMeta, disableContinueBtn }) => {
    return (
        <BBTNDSInsurCar errors={errors} values={values} touched={touched} setFieldValue={setFieldValue} getFieldMeta={getFieldMeta} disableContinueBtn={disableContinueBtn}/>
    )
}

export default BBtnds