import { FormattedMessage, Radio, Select } from 'base-app'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import { getKeyLang } from '../../../../../configs/app-no1'
import { getAllPermission } from '../../../../../redux/actions/app-no1/permissionManagement'
import { actionGetALlAccount, actionGetUserGroup } from '../../../../../redux/actions/app-no1/supportCreate'
import { isArrayEmpty } from '../../../../../ultity'
import { AD_OP, LIST_DEPARTMENT, MAJOR } from '../../utility'
import TablePermission from './TablePermission'

const CreatePermission = ({permissionType , setPermissionType, setUserIdSelect , setTypeRequest ,userFilterSuggesstion,setUserFilterSuggesstion,
  userSelect,
  setUserSelect,
  permissionSelect,
  setPermissionSelect,
  typeRequestSelect,
  setTypeRequestSelect
}) => {
  const intl = useIntl()
  const [disabledPermission, setDisabledPermission] = useState(false);
  const [departmentFullStatus, setDepartmentFullStatus] = useState(false)
  const { availablePermission } = useSelector(
    (state) => state.app.permissionManagement
  )
  const handleCheckDecentralization = (original) =>{
    setTypeRequestSelect('')
    const filterUserADOP =  availablePermission.filter(_elt =>{
    return Number(_elt.userId) === original.value && _elt.decentralization === AD_OP
    })
    const filterUserMAJOR =  availablePermission.filter(_elt =>{
      return Number(_elt.userId) === original.value && _elt.decentralization === MAJOR
      })
    const deparmentFilter = [...filterUserADOP , ...filterUserMAJOR]
    //if ad_op or major hash 
    if (filterUserADOP.length !== 0 || filterUserMAJOR.length !== 0 ) {
      setDisabledPermission(true)
      setPermissionType(filterUserADOP[0]?.decentralization.length > 0 ? filterUserADOP[0]?.decentralization : filterUserMAJOR[0]?.decentralization.length > 0 ? filterUserMAJOR[0]?.decentralization : AD_OP)
      const deparment = !isArrayEmpty(deparmentFilter) ?  deparmentFilter.map(_elt =>{
        return _elt.department
      }).join() : ""
      setTypeRequestSelect(deparment)
    }else{
      setDisabledPermission(false)
    }
    // user hash 3 department => disabled select deparment
    if (deparmentFilter.length === 3) {
      setDepartmentFullStatus(true)
    }else{
      setDepartmentFullStatus(false)
    }
  }
  const {availableAccount , availableUserGroup} = useSelector(state => state.app.supportCreate)
  const userGroupSuggestion = !isArrayEmpty(availableUserGroup) ? availableUserGroup.map(elt =>{
    return {
      label: `${elt.name} - ${elt.description}`,
      value: elt.code
    }
  }) : []
  const availableUserGroupSuggestion = availableAccount.map(user => {
    return {
      label: `${user.userCode} - ${user.fullName}`,
      type: user.groupId,
      value: user.id
    }
  })
  const handleFilterTypeUser = (type) =>{
    const filter = availableUserGroupSuggestion.filter(_elt => {
      return _elt.type === type
    })
    setUserFilterSuggesstion(filter);
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionGetALlAccount())
    dispatch(actionGetUserGroup())
    dispatch(getAllPermission())
  }, [])
  return (
    <div>
      <Row className="mt-4">
        <Col md='12' lg='6' xs="12">
          <Select isMulti={false} value={permissionSelect} options={userGroupSuggestion} placeholder={intl.formatMessage({id : getKeyLang("support.permission.uerGroup")})} onChange={(original) => {
            setUserSelect([])
            setTypeRequestSelect('')
            setDepartmentFullStatus(false)
            handleFilterTypeUser(original.value)
            setPermissionSelect(original)}} />
        </Col>
        <Col md='12' lg='6' xs="12">
          <Select options={userFilterSuggesstion} value={userSelect} placeholder={intl.formatMessage({id : getKeyLang("home.chart.unit.ACCOUNTS")})} onChange={(original) =>{
            handleCheckDecentralization(original)
            setUserIdSelect(original)
            setUserSelect(original)
          }}/>
        </Col>
      </Row>
      <Row style={{marginBottom : "20px"}}>
        <Col md='12' lg='6' xs="12" >
          <div className='d-flex justify-content-start align-items-lg-center flex-wrap' style={{marginTop : "7px"}}>
            <div className="mb-sm-2">
              <FormattedMessage
                id={getKeyLang('support.permission.selectPermission')}
              />
            </div>
            <div className='d-flex justify-content-between flex-wrap ml-lg-3 ml-md-3 mb-2'>
              <div className='d-flex align-items-center mr-2'>
                <Radio  disabled={disabledPermission} checked={permissionType === AD_OP} onChange={() => setPermissionType(AD_OP)}  />
                <FormattedMessage
                  id={getKeyLang('support.permission.selectPermission.admin')}
                />
              </div>
              <div className='d-flex align-items-center mr-2'>
                <Radio  disabled={disabledPermission} checked={permissionType === MAJOR} onChange={() => setPermissionType(MAJOR)}  />
                <FormattedMessage
                  id={getKeyLang('support.permission.selectPermission.major')}
                />
              </div>
            </div>
          </div>
        </Col>
          <Col md='12' lg='6' xs="12">
          <Select isMulti={true} disabled={departmentFullStatus} options={LIST_DEPARTMENT} value={typeRequestSelect} placeholder={intl.formatMessage({id : getKeyLang("support.detail.type")})} onChange={(original) =>{
            setTypeRequestSelect(!isArrayEmpty(original) ? original.map((elt) => elt.value).join() : [])
            setTypeRequest(!isArrayEmpty(original) ? original.map((elt) => elt.value) : [])
          }}
          />
        </Col>
      </Row>
      <TablePermission />
    </div>
  )
}

export default CreatePermission
