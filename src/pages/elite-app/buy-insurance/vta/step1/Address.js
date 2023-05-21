import React, { useEffect } from 'react'
import { BaseAppConfigs, BaseFormGroupSelect, useCityList, useDistrictList, useWardList } from 'base-app'
import { Col, Row } from 'reactstrap'
import { getKeyLang } from '../../../../../configs/elite-app'

const Address = ({ values, setFieldValue, errors, touched, address,
                   city, district, ward, item, cityName, districtName, wardName
                 }) => {
  const { cities } = useCityList(BaseAppConfigs.VN_COUNTRY_CODE)
  const { districts, loadDitrictsByCity } = useDistrictList(null)
  const { wards, loadWardsByDistrict } = useWardList(null)

  useEffect(() => {
    item?.city && loadDitrictsByCity(item?.city).then()
    item?.district && loadWardsByDistrict(item?.district).then()
  }, [item.city])


  const onChangeCity = async (id, label) => {
    setTimeout(() => {
      loadDitrictsByCity(id).then()
      setFieldValue(district, '')
      setFieldValue(cityName, label)
    }, 500)
  }

  const onChangeDistrict = async (id, label) => {
    setTimeout(() => {
      loadWardsByDistrict(id).then()
      setFieldValue(ward, '')
      setFieldValue(districtName, label)
    }, 500)
  }

  const onChangeWard = async (id, label) => {
    setTimeout(() => {
      setFieldValue(wardName, label)
    }, 500)
  }

  // const mapDataToSelectOptions = (data) => {
  //   return data.map(item => ({...item, value : item.label}))
  // };

  return (
    <Row>
      <Col sm='12' md='4' className='mb-3'>
        <BaseFormGroupSelect
          messageId={values.address ? getKeyLang('insurance.city') : 'completeInformation.province'}
          fieldName={city}
          options={cities}
          isShowErrorMessage={false}
          onChange={({ id, label }) => onChangeCity(id, label)}
          errors={errors}
          touched={touched}
        />
      </Col>
      <Col sm='12' md='4' className='mb-3'>
        <BaseFormGroupSelect
          messageId={values.address ? getKeyLang('insurance.district') : 'completeInformation.district'}
          fieldName={district}
          options={districts}
          isShowErrorMessage={false}
          onChange={({ id, label }) => onChangeDistrict(id, label)}
          errors={errors}
          touched={touched}
        />
      </Col>
      <Col sm='12' md='4' className='mb-3'>
        <BaseFormGroupSelect
          messageId={values.address ? getKeyLang('insurance.ward') : 'completeInformation.ward'}
          fieldName={ward}
          options={wards}
          isShowErrorMessage={false}
          onChange={({id, label}) => onChangeWard(id, label)}
          errors={errors}
          touched={touched}
        />
      </Col>
    </Row>
  )
}

export default Address
