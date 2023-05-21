import {
    Select
} from 'base-app'
import React from 'react'
import { useIntl } from 'react-intl'
import FormGroup from 'reactstrap/lib/FormGroup'
import { getKeyLang } from '../../../../configs/supplement-app'
import { selectErrorStyles, selectNormalStyles } from './utility'

const SelectSentGroup = ({options , values , placeholder , setFieldValue ,  fieldName , setState , getFieldMeta , errors , touched , isEdit}) => {
    const intl = useIntl()
    return (
      <div style={isEdit ? {
        pointerEvents: "none",
        opacity: 0.7,
          } : null}>
           <FormGroup className={`mt-2`}>
           <Select
             readOnly
             isMulti
             closeMenuOnSelect={true}
             errors={errors}
             touched={touched}
             notRequired
             className={`find-partner`}
             classNamePrefix='select mt-1'
             onChange={(original) => { 
               const valueFilter = original !== null ? original.map((sendTo) =>{
                 const valueSendToConvert = sendTo.value.replace(`_${sendTo.type}` ,'')
                 return {id :valueSendToConvert , type : sendTo.type }
               }) : null
              const sendToValue = original !== null ? original.map((sendTo) =>{
                return sendTo.value
              }).join() : null
              setState(sendToValue)
              setFieldValue(fieldName ,valueFilter === null ? '' : JSON.stringify(valueFilter))
             }}
             options={options}
             maxMenuHeight={120}
             value={values}
             placeholder={
               intl.formatMessage({
                 id: getKeyLang(
                   `${placeholder}`
                 )
               })
             }
             isClearable={true}
             styles={getFieldMeta(fieldName).error ? selectErrorStyles : selectNormalStyles}
           />
           <div
             style={{
               marginTop: '5px'
             }}
             className='text-danger'
           >
             {getFieldMeta(`${fieldName}`).error}
           </div>
    </FormGroup>
      </div>
       
    )
}

export default SelectSentGroup
