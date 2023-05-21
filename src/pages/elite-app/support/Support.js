import { FormattedMessage } from 'base-app'
import React, { useState } from 'react'
import { getKeyLang } from '../../../configs/elite-app'
import FormCreateProblem from './FormCreateProblem'
import SelectTypeSupport from './SelectTypeSupport'
import '../../../assets/scss/elite-app/layouts/components.scss'
import '../../../assets/scss/elite-app/buy-insurance/buy-insurance.scss'
import styled from 'styled-components'
import '../../../assets/scss/elite-app/support/support.scss';
import { Card } from 'reactstrap'
const InputStyled = styled.div`
  input {
    border-radius: 16px;
    border : 1px solid #d9d9d9;
    padding : 0.6rem;
  }
  input:focus {
    color: #4e5154;
    background-color: #fff;
    border-color: #338955;
    outline: 0;
    box-shadow: 0 3px 10px 0 rgb(0 0 0 / 15%);
}
`
const Support = ({ setSideNavType }) => {
  const [isShowFormCreateProblem, setIsShowFormCreateProblem] = useState(false)
  return (
    <div className="pl-2 pr-2 pl-lg-2 pr-lg-1">
      <div className='d-flex justify-content-center justify-content-sm-start mt-2'>
        <h2
          className='mb-2 font-weight-bold'
          style={{ color: '#106D5A' }}
        >
          <FormattedMessage id={getKeyLang('support.sideNav.title')} />
        </h2>
      </div>
      {!isShowFormCreateProblem ? (
        <SelectTypeSupport
          setIsShowFormCreateProblem={setIsShowFormCreateProblem}
          setSideNavType={setSideNavType}
        />
      ) : (
        <InputStyled>
          <FormCreateProblem
            setIsShowFormCreateProblem={setIsShowFormCreateProblem}
          />
        </InputStyled>
      )}
    </div>
  )
}

export default Support