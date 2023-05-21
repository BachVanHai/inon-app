import React, { useCallback, useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  CardFooter, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import {
  FormattedMessage,
  AppId,
  Select,
  showConfirmAlert,
  Button, BaseAppConfigs, Checkbox
} from 'base-app'
import { useDispatch, useSelector } from 'react-redux'
import {
  exportReport,
  loadListAccount,
  loadListSuggestion
} from '../../../../redux/actions/app-no1/account'
import 'react-table/react-table.css'
import '../../../../assets/scss/app-no1/account.scss'
import { addAppContextPath, getKeyLang } from '../../../../configs/app-no1'
import { useHistory } from 'react-router-dom'
import Tree from '../../../../components/app-no1/Tree'
import { loadUserGroup } from '../../../../redux/actions/app-no1/userGroup'


const CHECKBOXS = [
  {
    key: "partnerCodeLevel1",
    checked: true,
    label: <FormattedMessage id={getKeyLang('account.exportReportOption.partnerCodeLevel1')} />
  },
  {
    key: "managerId",
    checked: true,
    label: <FormattedMessage id={getKeyLang('account.exportReportOption.managerCode')} />
  },
  {
    key: "userCode",
    checked: true,
    label: <FormattedMessage id={getKeyLang('account.accountCode')} />,
  },
  {
    key: "fullName",
    checked: true,
    label: <FormattedMessage id={getKeyLang('account.exportReportOption.fullName')} />
  },
  {
    key: "icType",
    checked: true,
    label: <FormattedMessage id={getKeyLang('account.exportReportOption.icType')} />,
  },
  {
    key: "createdDate",
    checked: true,
    label: <FormattedMessage id={getKeyLang('account.exportReportOption.createdDate')} />
  },
  {
    key: "phoneNumber",
    checked: true,
    label: <FormattedMessage id={getKeyLang('account.exportReportOption.phoneNumber')} />
  },
  {
    key: "status",
    checked: true,
    label: <FormattedMessage id={getKeyLang('account.exportReportOption.status')} />
  },
  {
    key: "email",
    checked: true,
    label: <FormattedMessage id={getKeyLang('account.exportReportOption.email')} />
  },
  {
    key: "level",
    checked: true,
    label: <FormattedMessage id={getKeyLang('account.exportReportOption.partnerLevel')} />
  },
  {
    key: "dateOfBirth",
    checked: true,
    label: <FormattedMessage id={getKeyLang('account.exportReportOption.dateOfBirth')} />
  },
  {
    key: "address",
    checked: true,
    label: <FormattedMessage id={getKeyLang('account.exportReportOption.address')} />
  },
];

const AccountList = ({ isWaitingApprove }) => {
  const { list, suggestions, totalCount } = useSelector(
    (state) => state.app.account
  )
  const { paging } = useSelector(
    (state) => state.app.account
  )
  const { userGroups } = useSelector(
    (state) => state.app.userGroup
  )
  const { username, groupId } = useSelector(
    (state) => state.auth.user
  )
  const [levels, setLevels] = useState([])
  const [modal, setModal] = useState(false)
  const [checkboxes, setCheckboxes] = useState([...CHECKBOXS])
  const toggle = () => setModal(!modal)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(loadListSuggestion(isWaitingApprove))
    dispatch(loadListAccount(isWaitingApprove))
  }, [isWaitingApprove])

  useEffect(() => {
    if (username === 'admin') {
      dispatch(loadUserGroup())
      if (userGroups.length > 0) {
        let levels = userGroups.map(item => (
          { label: item.description, value: item.code }
        ))
        setLevels(levels)
      }
    }
  }, [userGroups.length === 0])

  useEffect(() => {
    if(groupId !== 'AD.IO') {
      const checkboxesAlt = [...checkboxes].filter(item => !['level', 'partnerCodeLevel1'].includes(item.key));
      setCheckboxes(checkboxesAlt);
    }
  }, [])


  const onSearchAccount = (values) => {
    values = values || []

    const newPaging = {
      ...paging,
      pageNumber: 0,
      searchIds: values.map((item) => item.value).join()
    }
    dispatch(loadListAccount(isWaitingApprove, newPaging))
  }

  const onSearchAccountByUserGroup = (values) => {
    values = values || []
    const newPaging = {
      ...paging,
      pageNumber: 0,
      searchGroupIds: values.map((item) => item.value).join()
    }
    dispatch(loadListAccount(isWaitingApprove, newPaging))
  }

  const onClickBackHome = () => {
    dispatch(
      showConfirmAlert({
        title: <FormattedMessage id='common.home' />,
        isShow: true,
        content: <FormattedMessage id='common.backHome.confirmMessage' />,
        onConfirm: () => {
          history.push(addAppContextPath('/home'))
        }
      })
    )
  }

  const onClickExportReport = () => {

    const exportFields = checkboxes.filter(item => item.checked).map(item => item.key);
    dispatch(exportReport(exportFields))
    toggle()
  }

  const toggleCheckbox = (key) => {
    const index = checkboxes.findIndex(item => item.key === key);
    const checkbox = checkboxes[index];
    const checkboxesAlt = [...checkboxes]
    checkboxesAlt[index].checked = !checkbox.checked;
    setCheckboxes(checkboxesAlt);
  }

  return (
    <>
      <Card className='account-list'>
        <CardHeader>
          <CardTitle className='text-uppercase'>
            <FormattedMessage id='menu.accountManagement' />
          </CardTitle>
        </CardHeader>
        <CardBody className='approve-lg-content'>
          <Row className='mb-2'>
            <Col xs={12} md={6} className='d-flex align-items-center'>
              <h3>
                <FormattedMessage id={getKeyLang('account.totalAccount')} />
                {': ' + list.length}
              </h3>
            </Col>
            <Col xs={12} md={6}>
              <Button onClick={() => toggle()}>
                <FormattedMessage id={getKeyLang('account.exportReport')} />
              </Button>
            </Col>
          </Row>
          <Row>

            {
              groupId === BaseAppConfigs.USER_ROLE.ADMIN
              || groupId === BaseAppConfigs.USER_ROLE.HTKD ? (
                <Col sm='12' md='6'>
                  <FormattedMessage
                    id={`${AppId.APP_NO1}.partner.account.group`}
                  >
                    {(msg) => (
                      <Select
                        isMulti
                        options={levels}
                        value={paging.searchGroupIds}
                        onChange={onSearchAccountByUserGroup}
                        className='React'
                        classNamePrefix='select'
                        placeholder={msg}
                        isClearable={true}
                      />
                    )}
                  </FormattedMessage>
                </Col>
              ) : null
            }

            <Col sm='12' md='6'>
              <FormattedMessage
                id={`${AppId.APP_NO1}.partner.account.searchInput`}
              >
                {(msg) => (
                  <Select
                    isMulti
                    options={suggestions}
                    value={paging.searchIds}
                    onChange={onSearchAccount}
                    className='React'
                    classNamePrefix='select'
                    placeholder={msg}
                    isClearable={true}
                  />
                )}
              </FormattedMessage>

            </Col>
          </Row>
          <div className='d-block d-md-flex justify-content-center account-state-note my-1 border-bottom'>
            <div className='d-flex align-items-center mb-1 mr-2 w-135px'>
              <div className='account-state-note-icon bg-secondary'></div>
              <div className='ml-1 account-state-note-text'>
                <FormattedMessage id={getKeyLang('partner.account.waitingApproval')} />
              </div>
            </div>
            <div className='d-flex align-items-center mb-1 mr-2 w-135px'>
              <div className='account-state-note-icon bg-success'></div>
              <div className='ml-1 account-state-note-text'>
                <FormattedMessage id={getKeyLang('partner.account.active')} />
              </div>
            </div>
            <div className='d-flex align-items-center mb-1 w-135px'>
              <div className='account-state-note-icon bg-danger'></div>
              <div className='ml-1 account-state-note-text'>
                <FormattedMessage id={getKeyLang('partner.account.lock')} />
              </div>
            </div>
          </div>
          <Row className='account-list-main'>
            <Col sm='12'>
              {list.length > 0 && <Tree list={list} />}
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <div className='d-flex justify-content-end'>
            <Button.Ripple color='secondary' className='mr-2' onClick={onClickBackHome}>
              <FormattedMessage id='common.home' />
            </Button.Ripple>
          </div>
        </CardFooter>
      </Card>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <FormattedMessage id={getKeyLang('account.exportReportOption')} />
        </ModalHeader>
        <ModalBody>
          <Row className="mb-1">
            {
              checkboxes.map(item => (
                <Col xs={6} className="mb-1">
                  <div className="d-flex align-items-center">
                    <Checkbox checked={item.checked} onClick={() => toggleCheckbox(item.key)}/>
                    <div>
                      {item.label}
                    </div>
                  </div>
                </Col>
              ))
            }
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={onClickExportReport}>
            <FormattedMessage id={getKeyLang("account.confirmOk")} />
          </Button>
          <Button color='secondary' onClick={toggle}>
            <FormattedMessage id={getKeyLang("account.confirmCancel")} />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default AccountList
