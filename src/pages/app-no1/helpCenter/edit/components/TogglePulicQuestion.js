import React from 'react'
import Toggle from 'react-toggle'
import { PARTNER } from '../utility'

const TogglePulicQuestion = ({getFieldMeta , setFieldValue ,setPermissionValues , setApplyForType}) => {
    return (
        <Toggle
        checked={getFieldMeta('public').value}
          onClick={(e) => {
            setFieldValue('public', e.target.checked)
            if(e.target.checked){
              const apply = getFieldMeta('applyFor').initialValue
              setFieldValue('sendTo' , null)
              setPermissionValues(null)
              setApplyForType([apply])
              }
              else{
                const sendToConvert = getFieldMeta('sendTo').initialValue
                setPermissionValues(sendToConvert)
                setFieldValue('sendTo' , sendToConvert )
                setFieldValue('applyFor' , PARTNER)
              }
          }}
        />
    )
}

export default TogglePulicQuestion
