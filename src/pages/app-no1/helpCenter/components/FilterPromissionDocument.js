import { FormattedMessage, Select } from 'base-app'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl/lib'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import { getKeyLang } from '../../../../configs/app-no1'
import { loadUserGroupAuthenticate } from '../../../../redux/actions/app-no1/helpCenterCreate'
import { isArrayEmpty } from '../../../../ultity'
import { ALL, CHTG } from './utility'

const FilterPromissionDocument = ({
  type,
  total,
  data,
  setavaibleData,
}) => {
  const [userSelect, setUserSelect] = useState([])
  const { availableUserGroupAuthenticate } = useSelector(
    (state) => state.app.helpCenterCreate
  )
  const dispatch = useDispatch()
  const partNer = {
    label: 'Công khai - đối tác',
    value: 'PARTNER'
  }
  const individual =  {
    label: 'Công khai - KHCN',
    value: 'INDIVIDUAL'
  }
  const availableUserGroupAuthenticateFilter = availableUserGroupAuthenticate.map(
    (user) => {
      return {
        label: `${user.name} - ${user.description}`,
        value: user.code
      }
    }
  )
  const userSuggestion = [partNer , individual, ...availableUserGroupAuthenticateFilter]

  const handleFilterPermission = (users) => {
    setUserSelect(
      !isArrayEmpty(users) ? users.map((elt) => elt.value).join() : []
    )
    if (isArrayEmpty(users)) {
      setavaibleData(data)
      return
    }
    const dataFilter = data.filter((preElt) => {
      const str = users.map((elt) =>  elt.value).join()
        const reg = new RegExp(
          '(' + str.replace(/\s*,\s*/g, '|') + ')'
        )
        if (preElt.sendTo && preElt.sendTo.replace(/,/g, '').search(reg) > -1) {
          return true
        }
        if(preElt.applyFor && preElt.applyFor.replace(/,/g, '').search(reg) > -1 && preElt.sendTo === null || preElt.applyFor === ALL){
          return true
        }
      return false
    })
    setavaibleData(dataFilter)
  }
  const intl = useIntl()
  useEffect(() => {
    dispatch(loadUserGroupAuthenticate())
  }, [])
  return (
    <Row>
      <Col md='6'>
        <p className='font-weight-bold' style={{ marginTop: '7px' }}>
          <FormattedMessage
            id={
              type === CHTG
                ? getKeyLang('helpcente.management.totalQuestion')
                : getKeyLang('helpcente.management.totalDocument')
            }
          />
          <span>{total}</span>
        </p>
      </Col>
      <Col md='6'>
        <Select
          isMulti
          placeholder={intl.formatMessage({
            id: getKeyLang(`helpcente.management.showWith`)
          })}
          value={userSelect}
          onChange={handleFilterPermission}
          options={userSuggestion}
        />
      </Col>
    </Row>
  )
}

export default FilterPromissionDocument
