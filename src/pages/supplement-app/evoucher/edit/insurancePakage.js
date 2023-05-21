import { Select } from 'base-app'
import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Col, Row } from 'reactstrap'
import { getKeyLang } from '../../../../configs/supplement-app'
import { selectErrorStyles, selectNormalStyles } from './utility'
const InsurancePakage = ({ setFieldValue , touched , errors ,  configTemplateRes , nameInsurance , initialValues , getFieldMeta , configDefault }) => {
  const [insuranPackageId, setInsuranPackageId] = useState({});
  const intl = useIntl()
  const [durationSelect, setDurationSelect] = useState({});
  const onChangeInsuranPackage = (values , name) => {
    const key = name;
    const _partners = values !== null ? values.map(elt => {
        return elt.value
    }) : []
    setInsuranPackageId( Array.isArray(_partners) ? {...insuranPackageId  ,[key] : _partners }   : [])
    setFieldValue(name , _partners.length === 0 ? '' :  _partners.toString())
}
useEffect(() => {
  let config
  for (let value of configDefault) {
    config = {...config ,[value.name] : value.value}
    setFieldValue(value.name , value.value)
    if (value.name === 'duration') {
      setDurationSelect({value : value.name , label : `${value.value} Tháng`})
    }
  }
  setInsuranPackageId(config)
}, []);
  return (
    <div>
      <span className='font-weight-bold mb-2 text-uppercase'>
      {configTemplateRes !== undefined ? <span>
        <FormattedMessage id={' '}/>
        {nameInsurance}
      </span>  : null}
      </span>
      <Row className="mt-2">
      {configTemplateRes !== undefined ? configTemplateRes.map((config,index)=>(
        <Col md={4} className="mt-1" key={index}>
         <Select
          closeMenuOnSelect={true}
          notRequired
          touched={touched}
          errors={errors}
          classNamePrefix='select mt-1'
          onChange={(e) => {
            if(config.name === 'duration'){
              setDurationSelect(e)
              setFieldValue('duration', e === null ? null : e.value)
              return
            }else{
            onChangeInsuranPackage(e , config.name)
            }
          }}
          value={config.name === 'duration' ?  durationSelect  : insuranPackageId[config.name]}
          options={JSON.parse(config.suggestionValues)}
          placeholder={intl.formatMessage({ id: config.description})}
          isClearable={true}
          isMulti={config.name === 'duration' ? false :  true}
          styles={getFieldMeta(config.name).error ? selectErrorStyles : selectNormalStyles}
          />
        </Col>
      )) : null}
      </Row>
      <div className='d-flex mt-2'>
        <span
          className='font-weight-bold mb-2'
          style={{
            marginTop: '10px'
          }}
        >
          <FormattedMessage
            id={getKeyLang('evoucher.create.insurances.minimumContractFee')}
          />
        </span>
      </div>
     
    </div>
  )
}

export default InsurancePakage
