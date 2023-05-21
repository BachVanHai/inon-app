import React, { useCallback, useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardFooter
} from 'reactstrap'
import {
  FormattedMessage,
  AppId,
  Select,
  showConfirmAlert,
  BaseFormGroup,
  usePageAuthorities,
  BaseAppConfigs
} from 'base-app'
import moment from 'moment'
import * as Icon from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import {
  approveAccount,
  approveWaitingPartner,
  changeAccountStatus,
  deleteAccount,
  loadListAccount,
  loadListSuggestion,
  rejectWaitingPartner,
  updatePartnerOG
} from '../../../../redux/actions/app-no1/account'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import AccountService from '../../../../services/app-no1/account'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import '../../../../assets/scss/app-no1/account.scss'
import { useIntl } from 'react-intl'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { getKeyLang } from '../../../../configs/app-no1'
import { useHistory } from 'react-router-dom'

const TreeTable = treeTableHOC(ReactTable)

const SelectMemo = React.memo((props) => <Select {...props} />, (prevProps, nextProps) => prevProps.options === nextProps.options)

const ExpandableTable = ({ data, isWaitingApprove }) => {
  const [isPhoneExist, setIsPhoneExist] = useState(false)
  const [isRefcodeExist, setIsRefcodeExist] = useState(false)
  const intl = useIntl()

  useEffect(() => {
    onCheckUserExist()
  }, [])

  const onCheckUserExist = async () => {
    if (isWaitingApprove) {
      const isPhoneExist = await AccountService.checkUserExistByPhoneNumber(
        data.phoneNumber
      )
      setIsPhoneExist(isPhoneExist)
    }
    if (data.refByUser) {
      const isRefcodeExist = await AccountService.checkUserExistByPhoneNumber(
        data.refByUser
      )
      setIsRefcodeExist(isRefcodeExist)
    }
  }

  const getChangeDescription = () => {
    let changeField = [];
    if (!data.oldValue) {
      return ''
    }
    if (data.status === 'ACTIVE' && data.oldValue.status === 'LOCK') {
      changeField.push(intl.formatMessage({ id: getKeyLang('account.unlockAccount') }))
    }
    if (data.status === 'LOCK' && data.oldValue.status === 'ACTIVE') {
      changeField.push(intl.formatMessage({ id: getKeyLang('account.lockAccount') }))
    }
    if (data.email !== data.oldValue.email) {
      changeField.push('Email')
    }
    if (data.fullName !== data.oldValue.fullName) {
      changeField.push(intl.formatMessage({ id: getKeyLang('account.fullName') }))
    }
    if (data.phoneNumber !== data.oldValue.phoneNumber) {
      changeField.push(intl.formatMessage({ id: getKeyLang('partner.account.phoneNumber') }))
    }
    return intl.formatMessage({ id: getKeyLang('account.changeDetail') }, { change: changeField.join(',') })
  }

  return (
    <Table responsive bordered>
      <tbody>
      <tr>
        <td width='30%' className='table-detail-header'>
          <FormattedMessage
            id={`${AppId.APP_NO1}.partner.account.phoneNumber`}
          />
        </td>
        <td width='35%'>{data.phoneNumber}</td>
        <td width='35%' className='text-center'>
          {isWaitingApprove ? (
            <div className={isPhoneExist ? 'text-danger' : 'text-success'}>
              <FormattedMessage
                id={`${AppId.APP_NO1}.partner.account.${isPhoneExist ? 'inValid' : 'valid'
                }`}
              />
            </div>
          ) : (
            ''
          )}
        </td>
      </tr>
      <tr>
        <td className='table-detail-header'>
          <FormattedMessage id={`${AppId.APP_NO1}.partner.account.email`} />
        </td>
        <td>{data.email}</td>
        <td></td>
      </tr>
      <tr>
        <td className='table-detail-header'>
          <FormattedMessage
            id={`${AppId.APP_NO1}.partner.account.referCode`}
          />
        </td>
        <td>{data.refByUser}</td>
        <td className='text-center'>
          <div
            className={
              isRefcodeExist || !data.refByUser ? 'text-success' : 'text-danger'
            }
            style={{ textAlign: 'center' }}
          >
            {data.refByUser ? (
              <FormattedMessage
                id={`${AppId.APP_NO1}.partner.account.${isRefcodeExist ? 'valid' : 'inValid'
                }`}
              />
            ) : (
              ''
            )}
          </div>
        </td>
      </tr>
      <tr>
        <td className='table-detail-header'>
          <FormattedMessage id={`${AppId.APP_NO1}.partner.account.created`} />
        </td>
        <td>{moment(isWaitingApprove ? data.createDate : data.createdDate).format('DD/MM/YYYY')}</td>
        <td></td>
      </tr>
      {
        !isWaitingApprove && data.isAwaitingApproval ? (<tr>
          <td className='table-detail-header'>
            <FormattedMessage id={`${AppId.APP_NO1}.partner.account.changeDescription`} />
          </td>
          <td colSpan='2'>{getChangeDescription()}</td>
        </tr>) : ''
      }
      </tbody>
    </Table>
  )
}

const PAGING_DEFAULT = {
  pageSize: 10,
  pageNumber: 0,
  sort: 'fullName',
  searchIds: null,
  filter: []
}

const ApproveAccountOpen = ({ isWaitingApprove }) => {
  const authorities = usePageAuthorities()
  const { list, suggestions, totalCount } = useSelector(
    (state) => state.app.account
  )
  const intl = useIntl()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [accountSelected, setAccountSelected] = useState({})
  const dispatch = useDispatch()
  const history = useHistory()

  const [paging, setPaging] = useState({ ...PAGING_DEFAULT })

  useEffect(() => {
    setPaging({ ...PAGING_DEFAULT })
    dispatch(loadListSuggestion(isWaitingApprove))
    dispatch(loadListAccount(isWaitingApprove, PAGING_DEFAULT))
  }, [isWaitingApprove])


  const toggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  const onClickApproveAccount = (account) => {
    const messageId = `${AppId.APP_NO1}.account.accountApproval`
    const onConfirm = () =>
      isWaitingApprove
        ? dispatch(approveWaitingPartner(account.id))
        : dispatch(approveAccount(account.username, true))
    const onCancel = () => { }
    showConfirmDialog(messageId, account, onConfirm, onCancel)
  }

  const onClickRejectAccount = (account) => {
    const messageId = `${AppId.APP_NO1}.account.refuseApproveAccount`
    const onConfirm = () =>
      isWaitingApprove
        ? dispatch(rejectWaitingPartner(account.id))
        : dispatch(approveAccount(account.username, false))
    const onCancel = () => { }
    showConfirmDialog(messageId, account, onConfirm, onCancel)
  }

  const onClickEditAccount = (account) => {
    const messageId = `${AppId.APP_NO1}.account.editAccount`
    const onConfirm = () => {
      if (isWaitingApprove) {
        setAccountSelected({ ...account })
        toggleModal()
      } else {
        history.push(`/accounts/create/${account.username}`)
      }
    }
    const onCancel = () => setAccountSelected({})
    showConfirmDialog(messageId, account, onConfirm, onCancel)
  }

  const onClickDeleteAccount = (account) => {
    const messageId = `${AppId.APP_NO1}.account.deleteAccount`
    const onConfirm = () => {
      dispatch(deleteAccount(account.id))
    }
    const onCancel = () => setAccountSelected({})
    showConfirmDialog(messageId, account, onConfirm, onCancel)
  }

  const onClickUnLockAccount = (account) => {
    const messageId = `${AppId.APP_NO1}.account.unlockAccount`
    const onConfirm = () => {
      dispatch(changeAccountStatus(account.username, 'ACTIVE'))
    }
    const onCancel = () => setAccountSelected({})
    showConfirmDialog(messageId, account, onConfirm, onCancel)
  }

  const onClickLockAccount = (account) => {
    const messageId = `${AppId.APP_NO1}.account.lockAccount`
    const onConfirm = () => {
      dispatch(changeAccountStatus(account.username, 'LOCK'))
    }
    const onCancel = () => setAccountSelected({})
    showConfirmDialog(messageId, account, onConfirm, onCancel)
  }

  const onPageChange = (pageNumber) => {
    const newPaging = { ...paging, pageNumber }
    dispatch(loadListAccount(isWaitingApprove, newPaging))
    setPaging(newPaging)
  }

  const onPageSizeChange = (pageSize, pageNumber) => {
    const newPaging = { ...paging, pageSize, pageNumber }
    dispatch(loadListAccount(isWaitingApprove, newPaging))
    setPaging(newPaging)
  }

  const onSortedChange = (newSort) => {
    const newPaging = {
      ...paging,
      sort: `${newSort[0].id},${newSort[0].desc ? 'desc' : 'asc'}`
    }
    dispatch(loadListAccount(isWaitingApprove, newPaging))
    setPaging(newPaging)
  }

  const onFilteredChange = (column) => {
    const newPaging = {
      ...paging,
      filter: [...column]
    }
    setPaging(newPaging)
  }

  const onSearchAccount = useCallback(async (values) => {
    values = values || []
    const newPaging = {
      ...paging,
      pageNumber: 0,
      searchIds: values.map((item) => item.value).join()
    }
    dispatch(loadListAccount(isWaitingApprove, newPaging))
    setPaging(newPaging)
  }, [])

  const onClickSavePartnerOG = (values) => {
    dispatch(updatePartnerOG(values, () => toggleModal()))
  }

  const isHasAuthority = (authority) => {
    return authorities.indexOf(authority.toUpperCase()) >= 0
  }

  const columns = [
    {
      Header: (
        <FormattedMessage id={`${AppId.APP_NO1}.partner.account.accountCode`} />
      ),
      minWidth: 200,
      accessor: 'userCode'
    },
    {
      Header: (
        <FormattedMessage id={`${AppId.APP_NO1}.partner.account.fullName`} />
      ),
      minWidth: 300,
      accessor: 'fullName'
    },
    {
      Header: (
        <FormattedMessage id={`${AppId.APP_NO1}.partner.account.status`} />
      ),
      id: 'statusDisplay',
      minWidth: 200,
      sortable: !isWaitingApprove,
      filterable: !isWaitingApprove,
      Cell: ({ original }) => (
        <div>
          <FormattedMessage
            id={`${AppId.APP_NO1}.partner.account.status.${original.isAwaitingApproval
              ? 'AWAITING_APPROVAL'
              : original.status
            }`}
          />
        </div>
      )
    },
    {
      Header: (
        <FormattedMessage id={`${AppId.APP_NO1}.partner.account.action`} />
      ),
      id: 'action',
      sortable: false,
      filterable: false,
      minWidth: 200,
      Cell: ({ original }) => renderTableButtons(original)
    }
  ]

  const renderTableButtons = (row) => {

    let buttons = '';

    switch (row.status) {
      case 'AWAITING_APPROVAL':
        buttons = '';
        break;
      case 'LOCK':
        buttons = isHasAuthority(BaseAppConfigs.AUTHORITIES.EDIT) ||
        isHasAuthority('ALL') ? <Button
          size='sm'
          onClick={() => onClickUnLockAccount(row)}
          className='ml-2 btn-icon rounded-circle'
          color='flat-success'
        >
          <Icon.Unlock className='vx-icon' size={24} />
        </Button> : ''
        break;
      case 'ACTIVE':
        buttons = isHasAuthority(BaseAppConfigs.AUTHORITIES.EDIT) ||
        isHasAuthority('ALL') ? <Button
          size='sm'
          onClick={() => onClickLockAccount(row)}
          className='ml-2 btn-icon rounded-circle'
          color='flat-danger'
        >
          <Icon.Lock className='vx-icon' size={24} />
        </Button> : ''
        break;
      case 'REJECTED':
        buttons = isHasAuthority(BaseAppConfigs.AUTHORITIES.EDIT) ||
        isHasAuthority('ALL') ? <Button
          size='sm'
          onClick={() => onClickDeleteAccount(row)}
          className='ml-2 btn-icon rounded-circle'
          color='flat-danger'
        >
          <Icon.X className='vx-icon' size={24} />
        </Button> : ''
        break;
    }

    return (
      <div className='pl-3 text-left'>
        {
          isHasAuthority(BaseAppConfigs.AUTHORITIES.EDIT) ||
          isHasAuthority('ALL') ? <Button
            size='sm'
            onClick={() => onClickEditAccount(row)}
            className='btn-icon rounded-circle'
            color='flat-primary'
          >
            <Icon.Edit3 className='vx-icon' size={24} />
          </Button> : ''
        }
        { isWaitingApprove || row.status === 'AWAITING_APPROVAL' || row.isAwaitingApproval ? (
          isHasAuthority(BaseAppConfigs.AUTHORITIES.APPROVE) ||
          isHasAuthority('ALL') ? (
            <React.Fragment>
              <Button
                size='sm'
                onClick={() => onClickApproveAccount(row)}
                className='btn-icon rounded-circle ml-2'
                color='flat-success'
              >
                <Icon.Check className='vx-icon' size={24} />
              </Button>
              <Button
                size='sm'
                onClick={() => onClickRejectAccount(row)}
                className='ml-2 btn-icon rounded-circle'
                color='flat-danger'
              >
                <Icon.X className='vx-icon' size={24} />
              </Button>
            </React.Fragment>
          ) : ''
        ) : (
          <React.Fragment>
            {buttons}
          </React.Fragment>
        )}
      </div>
    )
  }

  const getDisplayList = () => {
    const listDisplay = list.map(item => {
      item.statusDisplay = intl.formatMessage({
        id: `${AppId.APP_NO1}.partner.account.status.${item.status}`
      })
      return item;
    })
    return listDisplay.filter(item => {
      if (!paging.filter.length) {
        return true;
      }
      let result = true;
      for (const filter of paging.filter) {
        result = item[filter.id].toLowerCase().includes(filter.value.toLowerCase())
      }
      return result;
    })
  }

  const onClickBackHome = () => {
    dispatch(
      showConfirmAlert({
        title: <FormattedMessage id='common.home' />,
        isShow: true,
        content: <FormattedMessage id='common.backHome.confirmMessage' />,
        onConfirm: () => {
          history.push('/')
        }
      })
    )
  }

  const showConfirmDialog = (titleMessageId, account, onConfirm, onCancel) => {
    dispatch(
      showConfirmAlert({
        title: intl.formatMessage({
          id: titleMessageId
        }),
        isShow: true,
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage(
                {
                  id: `${titleMessageId}.confirmMessage`
                },
                { name: `<b class="text-danger">${account.fullName}</b>` }
              )
            }}
          />
        ),
        onConfirm: () => {
          onConfirm()
        },
        onCancel: () => {
          onCancel()
        }
      })
    )
  }

  const validationSchema = Yup.object().shape({
    userCode: Yup.string().required(
      <FormattedMessage
        id={`${AppId.APP_NO1}.partner.account.accountCode.required`}
      />
    ),
    fullName: Yup.string().required(
      intl.formatMessage(
        { id: 'commom.error.requireField' },
        {
          fieldName: (
            <FormattedMessage
              id={`${AppId.APP_NO1}.partner.account.fullName`}
            />
          )
        }
      )
    ),
    email: Yup.string()
      .required(<FormattedMessage id='register.email.required' />)
      .email(<FormattedMessage id='register.email.invalid' />),
    phoneNumber: Yup.string()
      .matches(BaseAppConfigs.PHONE_REGEX, () => (
        <FormattedMessage id='register.phoneNumber.invalid' />
      ))
      .required(<FormattedMessage id='register.phoneNumber.required' />),
    refByUser: Yup.string()
      .matches(BaseAppConfigs.PHONE_REGEX, () => (
        <FormattedMessage id={getKeyLang('partner.account.refByUser.invalid')} />
      ))
  })

  return (
    <React.Fragment>
      <Card className='account-list'>
        <CardHeader>
          <CardTitle className='text-uppercase'>
            {isWaitingApprove ? (
              <FormattedMessage id='menu.approveOpenAccount' />
            ) : (
              <FormattedMessage id='menu.accountManagement' />
            )}
          </CardTitle>
        </CardHeader>
        <CardBody className='approve-lg-content'>
          <Row>
            <Col sm='8' md='6' lg='4'>
              <FormattedMessage
                id={`${AppId.APP_NO1}.partner.account.searchInput`}
              >
                {(msg) => (
                  <SelectMemo
                    isMulti
                    options={suggestions}
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
          <Row>
            <Col sm='12'>
              <TreeTable
                className='nested-table -striped -highlight'
                data={getDisplayList()}
                previousText={intl.formatMessage({id : 'common.table.previous'})}
                nextText={intl.formatMessage({id : 'common.table.next'})}
                noDataText={intl.formatMessage({id : 'common.table.noData'})}
                pageText={intl.formatMessage({id : 'common.table.page'})}
                ofText={intl.formatMessage({id : 'common.table.of'})}
                rowsText={intl.formatMessage({id : 'common.table.rows'})}
                getTdProps={() => ({
                  style: {
                    height: '40px'
                  }
                })}
                filterable
                manual
                columns={columns}
                defaultPageSize={10}
                defaultSorted={[
                  {
                    id: "userCode",
                    desc: false
                  }
                ]}
                pages={Math.ceil(totalCount / paging.pageSize)}
                pageSize={paging.pageSize}
                page={paging.pageNumber}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
                onSortedChange={onSortedChange}
                onFilteredChange={onFilteredChange}
                SubComponent={(row) => {
                  return (
                    <div style={{ padding: '10px' }}>
                      <ExpandableTable
                        data={row.original}
                        isWaitingApprove={isWaitingApprove}
                      />
                    </div>
                  )
                }}
              />
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
      {isWaitingApprove ? (
        <Modal isOpen={isOpenModal} className='modal-dialog-centered'>
          <Formik
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={onClickSavePartnerOG}
            initialValues={{
              ...accountSelected
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <ModalHeader toggle={toggleModal}>
                  <FormattedMessage
                    id={`${AppId.APP_NO1}.account.editAccount`}
                  />{' '}
                  <b className='text-danger'>
                    {accountSelected.fullName || ''}
                  </b>
                </ModalHeader>
                <ModalBody className='modal-dialog-centered'>
                  <div className='w-100 mt-2'>
                    <Col sm='12'>
                      <BaseFormGroup
                        fieldName='userCode'
                        messageId={`${AppId.APP_NO1}.partner.account.accountCode`}
                        errors={errors}
                        touched={touched}
                      />
                    </Col>
                    <Col sm='12' className='mt-2'>
                      <BaseFormGroup
                        fieldName='fullName'
                        messageId={`${AppId.APP_NO1}.partner.account.fullName`}
                        errors={errors}
                        touched={touched}
                      />
                    </Col>
                    <Col sm='12' className='mt-2'>
                      <BaseFormGroup
                        fieldName='email'
                        messageId={`${AppId.APP_NO1}.partner.account.email`}
                        errors={errors}
                        touched={touched}
                      />
                    </Col>
                    <Col sm='12' className='mt-2'>
                      <BaseFormGroup
                        fieldName='phoneNumber'
                        messageId={`${AppId.APP_NO1}.partner.account.phoneNumber`}
                        errors={errors}
                        touched={touched}
                      />
                    </Col>
                    <Col sm='12' className='mt-2'>
                      <BaseFormGroup
                        fieldName='refByUser'
                        messageId={`${AppId.APP_NO1}.partner.account.referCode`}
                        errors={errors}
                        touched={touched}
                      />
                    </Col>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color='primary' type='submit'>
                    <FormattedMessage id={`${AppId.APP_NO1}.userGroup.save`} />
                  </Button>{' '}
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal>
      ) : (
        ''
      )}
    </React.Fragment>
  )
}

export default ApproveAccountOpen
