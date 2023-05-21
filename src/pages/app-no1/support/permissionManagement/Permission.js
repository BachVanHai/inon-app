import {
  BaseAppUltils,
  FormattedMessage,
  goBackHomePage,
  showConfirmAlert
} from 'base-app'
import classnames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap'
import { getKeyLang } from '../../../../configs/app-no1'
import { getAllPermission } from '../../../../redux/actions/app-no1/permissionManagement'
import SupportService from '../../../../services/app-no1/support'
import { AD_OP, OPERATE } from '../utility'
import CreatePermission from './create/CreatePermission'
import ManagementPermission from './management/ManagementPermission'

const Permission = () => {
  const intl = useIntl()
  const { availablePermission } = useSelector(
    (state) => state.app.permissionManagement
  )
  const history = useHistory()
  const [userIdSelect, setUserIdSelect] = useState({})
  const [permissionType, setPermissionType] = useState(AD_OP)
  const [btnCreateStatus, setBtnCreateStatus] = useState(true)
  const [typeRequest, setTypeRequest] = useState([])
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('1')
  //state create permission
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

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }
  const handleCreatePermission = async () => {
    typeRequest.forEach(async (_elt) => {
      const newData = {
        userId: userIdSelect.value,
        userInOnName : userIdSelect.label,
        decentralization: permissionType,
        department: _elt
      }
      const res = await SupportService.createPermission(newData)
      if (res.status === 201) {
        setUserIdSelect('')
        setPermissionType(AD_OP)
        reActiveLoadApi()
        BaseAppUltils.toastSuccess(
          intl.formatMessage({
            id: getKeyLang('helpcenter.management.action.success')
          })
        )
      }
    })
    setUserFilterSuggesstion([])
    setUserSelect(
      intl.formatMessage({ id: getKeyLang('home.chart.unit.ACCOUNTS') })
    )
    setPermissionSelect(
      intl.formatMessage({ id: getKeyLang('support.permission.uerGroup') })
    )
    setTypeRequestSelect(
      intl.formatMessage({ id: getKeyLang('support.myrequest.table.classify') })
    )
    setUserIdSelect('')
    setPermissionType(AD_OP)
  }
  const onClickBackHome = () => {
    dispatch(
      showConfirmAlert({
        title: <FormattedMessage id='common.home' />,
        isShow: true,
        content: <FormattedMessage id='common.backHome.confirmMessage' />,
        onConfirm: () => {
          dispatch(goBackHomePage())
        }
      })
    )
  }
  const [dispatchDependency, setDispatchAcitive] = useState(0)
  const dependencies = [
    availablePermission.length,
    history.location.pathname,
    dispatchDependency
  ]
  useEffect(() => {
    dispatch(getAllPermission())
  }, [...dependencies, JSON.stringify(availablePermission)])
  function reActiveLoadApi() {
    setDispatchAcitive((pre) => ++pre)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className='text-uppercase'>
            <FormattedMessage id={getKeyLang('support.permission.title')} />
          </span>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Nav tabs>
          <NavItem className='d-flex justify-content-around'>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                toggle('1')
                setBtnCreateStatus(true)
              }}
            >
              <FormattedMessage id={getKeyLang('helpcenter.create.title')} />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => {
                toggle('2')
                setBtnCreateStatus(false)
              }}
            >
              <FormattedMessage
                id={getKeyLang('support.permission.management')}
              />
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <CreatePermission
              permissionType={permissionType}
              setPermissionType={setPermissionType}
              setUserIdSelect={setUserIdSelect}
              setTypeRequest={setTypeRequest}
              userFilterSuggesstion={userFilterSuggesstion}
              setUserFilterSuggesstion={setUserFilterSuggesstion}
              userSelect={userSelect}
              setUserSelect={setUserSelect}
              permissionSelect={permissionSelect}
              setPermissionSelect={setPermissionSelect}
              typeRequestSelect={typeRequestSelect}
              setTypeRequestSelect={setTypeRequestSelect}
            />
          </TabPane>
          <TabPane tabId='2'>
            <ManagementPermission
              availablePermission={availablePermission}
              reActiveLoadApi={reActiveLoadApi}
            />
          </TabPane>
        </TabContent>
      </CardBody>
      <CardFooter
        className='d-flex justify-content-lg-end justify-content-md-end
               justify-content-sm-end justify-content-between flex-wrap'
      >
        {btnCreateStatus ? (
          <Button.Ripple
          disabled={typeRequest.length  === 0 || userIdSelect === '' ? true : false}
            color='primary'
            onClick={() => handleCreatePermission()}
            className='mr-lg-2'
          >
            <FormattedMessage id={getKeyLang('helpcenter.create.title')} />
          </Button.Ripple>
        ) : null}
        <Button.Ripple color='secondary' className='' onClick={onClickBackHome}>
          <FormattedMessage id='common.home' />
        </Button.Ripple>
      </CardFooter>
    </Card>
  )
}

export default Permission
