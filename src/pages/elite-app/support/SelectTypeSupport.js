import { FormattedMessage } from 'base-app'
import React from 'react'
import * as Icon from 'react-feather'
import { Card, CardHeader } from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../configs/elite-app'
const CardStyled = styled.div`
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 40px 60px rgb(134 149 146 / 40%);
    cursor: pointer;
}
.card:hover .support-name{
  color : #73c14f !important;
}
.card:hover svg {
    width: 24;
    height: 24;
    fill: none;
    stroke: #73c14f;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}
`
const SelectTypeSupport = ({setIsShowFormCreateProblem, setSideNavType}) => {
  return (
    <CardStyled>
      <div className='d-flex justify-content-center'>
        <h3 className="text-center ">
          <FormattedMessage id={getKeyLang('support.wellCome')} />
        </h3>
      </div>
      <div className='d-flex justify-content-center justify-content-lg-between
      justify-content-md-between justify-content-sm-between justify-content-md-between flex-wrap mt-2 cursor-pointer'>
        <Card style={{width:  "300px", borderRadius :  "16px"}} onClick={()=>setSideNavType('helpcenter')}>
          <CardHeader className="p-3 text-center font-weight-bold" style={{height : "150px"}}>
            <FormattedMessage id={getKeyLang('support.card.helpcenter')} />
          </CardHeader>
          <div  className="d-flex justify-content-center align-items-center mb-2 cursor-pointer">
                <div className="font-weight-bold support-name" style={{color : "#113934"}}>
                <FormattedMessage id={getKeyLang("helpcenter")} />
                </div>
                <div className="ml-1">
                    <Icon.ArrowRight color="#113934" className="support-name" />
                </div>
          </div>
        </Card>
        <Card style={{width:  "300px", borderRadius :  "16px"}} onClick={()=>{setIsShowFormCreateProblem(true)
              
            }} >
          <CardHeader className="p-3 text-center" style={{height : "150px"}}>
            <div className="ml-4 cursor-point font-weight-bold" >
               <FormattedMessage id={getKeyLang('support.card.supportOnline')} />
            </div>
          </CardHeader>
          <div  className="d-flex justify-content-center align-items-center mb-2">
              <div className="cursor-pointer cursor-point font-weight-bold support-name" style={{color : "#113934"}}>
              <FormattedMessage id={getKeyLang("support.card.createSupport")} />              
              </div>
              <div style={{marginLeft : "3px"}}>
                  <Icon.ArrowRight color="#113934" /> 
              </div>
          </div>
        </Card>
      </div>
    </CardStyled>
  )
}

export default SelectTypeSupport
