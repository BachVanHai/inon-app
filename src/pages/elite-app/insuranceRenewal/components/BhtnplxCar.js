import React from 'react'
import TaiNanInsurCar from '../../../insurance-app/buy-insurances/car/components/step2/insur-components/TaiNanInsurCar'

const BhtnplxCar = ({ errors, values, touched, setFieldValue, getFieldMeta, disableContinueBtn }) => {
  return (
    <TaiNanInsurCar errors={errors} values={values} touched={touched} setFieldValue={setFieldValue} getFieldMeta={getFieldMeta} disableContinueBtn={disableContinueBtn}/>
  )
}

export default BhtnplxCar