import moment from 'moment'
import React from 'react'
import { KEY_DATE_INSUR_FROM_MOTOR, KEY_DATE_INSUR_TO_MOTOR, KEY_DURATION, KEY_TIME_INSUR_FROM_MOTOR, KEY_TIME_INSUR_TO_MOTOR } from '../formikConfig'
import SliderRow from '../../../../components/insurance-app/common-forms/slider-row';
import { sliderInfo } from '../utility';
import { DATE_FORMAT } from '../../../../components/insurance-app/buy-insurances-page/formik-config';
const BBtndsMotor = ({ setFieldValue, getFieldMeta}) => {
  return (
    <SliderRow
      sliderValue={getFieldMeta(KEY_DURATION).value}
      sliderInfo={sliderInfo}
      sliderOnChange={(value) => {
        // revertCalFeeStatus && revertCalFeeStatus()

        setFieldValue(KEY_DURATION, value)
        setFieldValue(KEY_DATE_INSUR_TO_MOTOR,
          moment(getFieldMeta(KEY_DATE_INSUR_FROM_MOTOR).value)
            .add(value, 'M')
            .format(DATE_FORMAT)
        )
      }}
      keyNames={{
        KEY_DURATION: KEY_DURATION,
        KEY_DATE_INSUR_FROM: KEY_DATE_INSUR_FROM_MOTOR,
        KEY_TIME_INSUR_FROM: KEY_TIME_INSUR_FROM_MOTOR,
        KEY_DATE_INSUR_TO: KEY_DATE_INSUR_TO_MOTOR,
        KEY_TIME_INSUR_TO: KEY_TIME_INSUR_TO_MOTOR,
      }}
    />
  )
}

export default BBtndsMotor