import { Select } from 'base-app'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import { selectErrorStyles, selectNormalStyles } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesTravelDomestic'
import { KEY_CITIES } from '../../../../../../redux/reducers/insurance-app/buyInsurancesTravelDomestic'
import BuyInsuranceCar from '../../../../../../services/insurance-app/buyInsuranceCar'
import { REDUX_STATE_NAME } from '../stepsManager'
import {
  KEY_ARRIVE_POINT,
  KEY_END_POINT,
  KEY_START_POINT
} from './formikConfig'

const Address = ({ getFieldMeta, setFieldValue }) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const { [KEY_CITIES]: cities } = useSelector(
    (state) => state.app[REDUX_STATE_NAME]
  )
  const onChangeLocation = (fieldName, value) => {
    setFieldValue(fieldName, value)
  }
  useEffect(() => {
    const getCity = async () => {
      const res = await BuyInsuranceCar.getCity()
      const _newData = res.data.map((_elt) => {
        return {
          ..._elt,
          label: _elt.vn,
          value: _elt.code
        }
      })
      dispatch(
        updateProps([
          {
            prop: KEY_CITIES,
            value: _newData
          }
        ])
      )
    }
    getCity()
  }, [])

  return (
    <Row className='flex mb-2 mt-2'>
      <Col md='4' xs='12'>
        {/* ============== điểm đi ================== */}
        <Select
          value={cities.find(
            (_elt) => _elt.label === getFieldMeta(KEY_START_POINT).value
          )}
          options={cities}
          onChange={(value) => {
            onChangeLocation(KEY_START_POINT, value.label)
            if (getFieldMeta(KEY_END_POINT).value === '') {
              onChangeLocation(KEY_END_POINT, value.label)
            }
          }}
          placeholder={intl.formatMessage({
            id: getKeyLang('travel.domestic.pointOfDeparture')
          })}
          styles={getFieldMeta(KEY_START_POINT).error ? selectErrorStyles : selectNormalStyles}
        />
      </Col>
      <Col md='4' xs='12'>
        {/* ============== điểm đến ================== */}
        <Select
          value={cities.find(
            (_elt) => _elt.label === getFieldMeta(KEY_ARRIVE_POINT).value
          )}
          options={cities}
          onChange={(value) => onChangeLocation(KEY_ARRIVE_POINT, value.label)}
          placeholder={intl.formatMessage({
            id: getKeyLang('travel.domestic.destination')
          })}
          styles={getFieldMeta(KEY_ARRIVE_POINT).error ? selectErrorStyles : selectNormalStyles}
        />
      </Col>
      <Col md='4' xs='12'>
        {/* ============== điểm kết thúc ================== */}
        <Select
          options={cities}
          value={cities.find(
            (_elt) => _elt.label === getFieldMeta(KEY_END_POINT).value
          )}
          onChange={(value) => onChangeLocation(KEY_END_POINT, value.label)}
          placeholder={intl.formatMessage({
            id: getKeyLang('travel.domestic.ends')
          })}
          styles={getFieldMeta(KEY_END_POINT).error ? selectErrorStyles : selectNormalStyles}
        />
      </Col>
    </Row>
  )
}

export default Address
