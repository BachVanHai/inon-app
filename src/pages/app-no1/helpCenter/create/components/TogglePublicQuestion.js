import React from 'react'
import Toggle from 'react-toggle'
import { PARTNER } from '../utility'

const TogglePublicQuestion = ({getFieldMeta , setFieldValue}) => {
    return (
        <Toggle
        checked={getFieldMeta("public").value}
          onClick={(e) => {
            setFieldValue('public', e.target.checked)
            if(e.target.checked){
              setFieldValue('applyFor', null)
              setFieldValue('sendTo', null)
            }
            else{
              setFieldValue('applyFor', PARTNER)
            }
          }}
        />
    )
}

export default TogglePublicQuestion
