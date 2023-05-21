import { BaseAppUltils, FormattedMessage, Radio, Select, showConfirmAlert } from 'base-app'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row
} from 'reactstrap'
import { getKeyLang } from '../../../../../configs/app-no1'
import {
  actionGetALlAccount,
  actionGetUserGroup
} from '../../../../../redux/actions/app-no1/supportCreate'
import SupportService from '../../../../../services/app-no1/support'
import { isArrayEmpty } from '../../../../../ultity'
import {
  ADMIN,
  AD_OP,
  LIST_DEPARTMENT,
  LIST_TYPE_REQUEST,
  MAJOR,
  OPERATE
} from '../../utility'
import TablePermission from './TablePermission'

const EditPermission = () => {
  const history = useHistory()
  const [userIdSelect, setUserIdSelect] = useState('')
  const [permissionType, setPermissionType] = useState(AD_OP)
  const [typeRequest, setTypeRequest] = useState(OPERATE)
  const { id } = useParams()
  const intl = useIntl()
  const [permissionInfo, setPermissionInfo] = useState({})
  const { availableAccount, availableUserGroup } = useSelector(
    (state) => state.app.supportCreate
  )
  const handleUpdatePermission =  () => {
    dispatch(
        showConfirmAlert({
          title: <FormattedMessage id={getKeyLang("support.permission.edit.update")} />,
          isShow: true,
          content: <FormattedMessage id={getKeyLang("support.permission.edit.updatePermission")} />,
          onConfirm: async () => {
            const newData = {
                id: id,
                userId: userIdSelect,
                decentralization: permissionType,
                department: typeRequest
              }
              const res = await SupportService.updatePermission(id, newData)
              if (res.status === 200) {
                BaseAppUltils.toastSuccess(
                  intl.formatMessage({
                    id: getKeyLang('helpcenter.management.action.success')
                  })
                )
                history.push('/app/support/permission-request')
              }
          }
        })
      )
  }
  const [userFilterSuggesstion, setUserFilterSuggesstion] = useState([])
  const [userSelect, setUserSelect] = useState(
    intl.formatMessage({ id: getKeyLang('home.chart.unit.ACCOUNTS') })
  )
  const [permissionSelect, setPermissionSelect] = useState(
    intl.formatMessage({ id: getKeyLang('support.permission.uerGroup') })
  )
  const [typeRequestSelect, setTypeRequestSelect] = useState(
    intl.formatMessage({ id: getKeyLang('support.myrequest.table.classify') })
  )
  const userGroupSuggestion = !isArrayEmpty(availableUserGroup)
    ? availableUserGroup.map((elt) => {
        return {
          label: `${elt.name} - ${elt.description}`,
          value: elt.code
        }
      })
    : []
  const availableUserGroupSuggestion = availableAccount.map((user) => {
    return {
      label: `${user.userCode} - ${user.fullName}`,
      type: user.groupId,
      value: user.id
    }
  })
  const handleFilterTypeUser = (type) => {
    const filter = availableUserGroupSuggestion.filter((_elt) => {
      return _elt.type === type
    })
    setUserFilterSuggesstion(filter)
  }
  const decs = [availableAccount.length, history.location.pathname]
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionGetALlAccount())
    dispatch(actionGetUserGroup())
    const getPermission = async () => {
      const res = await SupportService.getPermissionById(id)
      if (res.status === 200) {
        let type = res.data.department
        setPermissionInfo(res.data)
        const departmentFilter = LIST_DEPARTMENT.filter((_elt) => {
          return _elt.value === type
        })
        setUserIdSelect(res.data.userId)
        setPermissionType(res.data.decentralization)
        setTypeRequestSelect(departmentFilter[0])
      }
    }
    getPermission()
  }, [...decs])
  useEffect(() => {
    const filter = availableAccount.filter((_elt) => {
      return _elt.id === Number(permissionInfo.userId)
    })
    const userDefault = filter.map((_elt) => {
      return {
        label: `${_elt.userCode} - ${_elt.fullName}`,
        type: _elt.groupId,
        value: _elt.id
      }
    })
    setUserSelect(userDefault)
  }, [permissionInfo])
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardBody>
        <div>
          <Row className='mt-4 mb-2'>
            <Col md='12' lg='6' xs='12'>
              <Select
                isMulti={false}
                value={permissionSelect}
                options={userGroupSuggestion}
                placeholder={intl.formatMessage({
                  id: getKeyLang('support.permission.uerGroup')
                })}
                onChange={(original) => {
                  handleFilterTypeUser(original.value)
                  setPermissionSelect(original)
                }}
              />
            </Col>
            <Col md='12' lg='6' xs='12'>
              <Select
                options={userFilterSuggesstion}
                value={userSelect}
                placeholder={intl.formatMessage({
                  id: getKeyLang('home.chart.unit.ACCOUNTS')
                })}
                onChange={(original) => {
                  setUserIdSelect(original.value)
                  setUserSelect(original)
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col md='12' lg='6' xs='12'>
              <div
                className='d-flex justify-content-start align-items-lg-center flex-wrap'
                style={{ marginTop: '7px' }}
              >
                <div className='mb-sm-2'>
                  <FormattedMessage
                    id={getKeyLang('support.permission.selectPermission')}
                  />
                </div>
                <div className='d-flex justify-content-between flex-wrap ml-lg-3 ml-md-3 mb-2'>
                  <div className='d-flex align-items-center mr-2'>
                    <Radio
                      checked={permissionType === AD_OP}
                      onClick={() => setPermissionType(AD_OP)}
                    />
                    <FormattedMessage
                      id={getKeyLang(
                        'support.permission.selectPermission.admin'
                      )}
                    />
                  </div>
                  <div className='d-flex align-items-center mr-2'>
                    <Radio
                      checked={permissionType === MAJOR}
                      onClick={() => setPermissionType(MAJOR)}
                    />
                    <FormattedMessage
                      id={getKeyLang(
                        'support.permission.selectPermission.major'
                      )}
                    />
                  </div>
                </div>
              </div>
            </Col>
            {permissionType !== AD_OP ? (
              <Col md='12' lg='6' xs='12'>
                <Select
                  options={LIST_DEPARTMENT}
                  value={typeRequestSelect}
                  placeholder={intl.formatMessage({
                    id: getKeyLang('support.detail.type')
                  })}
                  onChange={(original) => {
                    setTypeRequestSelect(original)
                    setTypeRequest(original.value)
                  }}
                />
              </Col>
            ) : null}
          </Row>
          <TablePermission />
        </div>
      </CardBody>
      <CardFooter>
        <div className="d-flex justify-content-end">
          <Button color="primary" className="mr-2" onClick={() => handleUpdatePermission()}>
            <FormattedMessage id={'Cập nhật'} />
          </Button>
          <Button onClick={() => history.push("/app/support/permission-request")}>
            <FormattedMessage id={getKeyLang('button.goback')} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default EditPermission
