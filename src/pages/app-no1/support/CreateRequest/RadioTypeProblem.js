import { FormattedMessage, Radio } from 'base-app'
import React from 'react'
import { getKeyLang } from '../../../../configs/app-no1'

const RadioTypeProblem = ({type , typeChecked,setTypeChecked , label,isShowLabelDetail = true,labelDetail , setFieldValue}) => {
  return (
    <div className={`d-flex align-items-center flex-wrap `} style={{marginTop : !isShowLabelDetail ? "10px" : '' , height : "60px"}}>
      <Radio checked={type === typeChecked} onChange={()=>{
        setTypeChecked(typeChecked)
        setFieldValue(typeChecked)
        }}
        />
      <div style={{ marginTop: !isShowLabelDetail ? '' : '15px' }} >
        <span className='font-weight-bold' style={{color : "#106D5A"}}>
          <FormattedMessage id={getKeyLang(label)} />
        </span>
        {
            isShowLabelDetail ? <p>
          <FormattedMessage
            id={getKeyLang(labelDetail)}
          />
        </p> : null
        }
        
      </div>
    </div>
  )
}

export default RadioTypeProblem
