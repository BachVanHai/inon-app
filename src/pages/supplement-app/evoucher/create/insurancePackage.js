import { Select } from 'base-app'
import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Col, Row } from 'reactstrap'
import { selectErrorStyles, selectNormalStyles } from './utility'
const InsurancePackage = ({ setFieldValue , touched , errors ,  configTemplateRes , nameInsurance ,initialValues , getFieldMeta}) => {
  const initialConfig = {packageName : initialValues.packageName , duration : initialValues.duration , applyFor : initialValues.applyFor , liability : initialValues.liability}
  const [insuranPackageId, setInsuranPackageId] = useState(initialConfig);
  const [durationSelect, setDurationSelect] = useState([]);
  const intl = useIntl()
  const onChangeInsuranPackage = (values , name) => {
    const key = name;
    const _partners = values !== null ? values.map(elt => {
        return elt.value
    }).join() : []
    setInsuranPackageId({...insuranPackageId  ,[key] : _partners } || [])
    setFieldValue(name , _partners.length === 0 ? '' :  _partners.toString())
}
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
         readOnly
          closeMenuOnSelect={true}
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
          styles={getFieldMeta(config.name).error ? selectErrorStyles : selectNormalStyles}
          isMulti={config.name === 'duration' ? false :  true}
          />
        </Col>
      )) : null}
      </Row>
    </div>
  )
}

export default InsurancePackage
