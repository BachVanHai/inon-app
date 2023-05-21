import React, { useEffect, useState } from 'react'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { useDispatch, useSelector } from 'react-redux'
import { downloadResultFile, importUsersExcel } from '../../../../redux/actions/app-no1/account'
import { useIntl } from 'react-intl'
import { Button, Checkbox, FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../../configs/app-no1'
import { Badge, Col, Input, Row, Table } from 'reactstrap'
import { Check } from 'react-feather'

const TreeTable = treeTableHOC(ReactTable)

const PAGING_DEFAULT = {
  pageSize: 10,
  pageNumber: 0,
  sort: 'fullName',
  filter: []
}

const ExpandableTable = ({ data }) => {

  const INSURANCE_TYPES = ['CAR_TNDS', 'CAR_TNDS_TN', 'CAR_VATCHAT', 'CAR_CONNGUOI', 'CAR_HANGHOA', 'MOTOR_TNDS', 'MOTOR_CONNGUOI', 'VTA',
    'ATG', 'PHC'
  ]
  const COMPANY_IDS = [
    '1', '3', '2', '4', '5'
  ]
  return (
    data.bonuses && data.bonuses.length > 0 ?
      <Table responsive bordered>
        <thead>
        <tr>
          <th>Loại bảo hiểm</th>
          <th>BSH</th>
          <th>VNI</th>
          <th>VBI</th>
          <th>XTI</th>
          <th>PTI</th>
        </tr>
        </thead>
        <tbody>
        {
          INSURANCE_TYPES.map(insuranceType => (
            <tr>
              <td width='30%'><FormattedMessage id={getKeyLang('users.excel.' + insuranceType)} /></td>
              {
                COMPANY_IDS.map(companyId => {
                  let item = data.bonuses.find(element => element.insuranceCompanyId === companyId && element.insuranceCode === insuranceType)
                  let errMessage
                  if (item) {
                    errMessage = item.error
                  }
                  return (
                    item ? <td>
                      <div
                        className={errMessage ? 'text-danger' : 'text-success'}>{item.value}</div>
                      {errMessage ? <Badge color='danger'>
                        Không hợp lệ
                      </Badge> : ''}
                    </td> : <td>''</td>
                  )
                })
              }
            </tr>
          ))
        }
        </tbody>
      </Table> : <div />
  )
}

const CreateMultipleAccountInfo = () => {

  const dispatch = useDispatch()
  const intl = useIntl()
  const { importExcelUsers } = useSelector(state => state.app.account)
  const [paging, setPaging] = useState({ ...PAGING_DEFAULT })
  const [dataDisplay, setDataDisplay] = useState([])
  const [isInOn, setIsInOn] = useState(false)

  useEffect(() => {
    if (importExcelUsers.length > 0) {
      setDataDisplay(importExcelUsers.slice(paging.pageNumber * paging.pageSize, paging.pageNumber * paging.pageSize + paging.pageSize - 1))
    }
  }, [importExcelUsers])

  const columns = [
    {
      Header: (
        <FormattedMessage id={getKeyLang('partner.account.accountCode')} />
      ),
      minWidth: 200,
      accessor: 'userCode',
      sortable: false,
      filterable: false
    },
    {
      Header: (
        <FormattedMessage id={getKeyLang('partner.account.fullName')} />
      ),
      minWidth: 200,
      accessor: 'fullName',
      sortable: false,
      filterable: false
    },
    {
      Header: (
        <FormattedMessage id={getKeyLang('partner.account.phoneNumber')} />
      ),
      minWidth: 200,
      id: 'phoneNumber',
      sortable: false,
      filterable: false,
      Cell: ({ original }) => renderPhoneNumber(original)
    },
    {
      Header: (
        <FormattedMessage id={getKeyLang('partner.account.email')} />
      ),
      minWidth: 200,
      id: 'email',
      sortable: false,
      filterable: false,
      Cell: ({ original }) => renderEmail(original)
    },
    {
      Header: (
        <FormattedMessage id={getKeyLang('partner.account.referCode')} />
      ),
      minWidth: 200,
      accessor: 'refByUser',
      sortable: false,
      filterable: false
    },
    {
      Header: (
        <FormattedMessage id={getKeyLang('account.accountType')} />
      ),
      minWidth: 200,
      accessor: 'userType',
      sortable: false,
      filterable: false
    },
    {
      Header: (
        <FormattedMessage id={getKeyLang('account.status')} />
      ),
      minWidth: 325,
      id: 'usersExcelErrorMessages',
      Cell: ({ original }) => renderUserStatus(original),
      sortable: false,
      filterable: false
    }
  ]

  const renderUserStatus = (row) => {
    if (row.usersExcelErrorMessages == null || row.usersExcelErrorMessages.length === 0) {
      return (
        <Badge color='success'>
          Thành công
        </Badge>
      )
    } else {
      let messageErr = []
      row.usersExcelErrorMessages.forEach(item => {
        switch (item) {
          case 'PHONE_ALREADY_EXISTS':
            messageErr.push('Số điện thoại đã tồn tại')
            break
          case 'PHONE_WRONG_FORMAT':
            messageErr.push('Số điện thoại sai định dạng')
            break
          case 'EMAIL_ALREADY_EXISTS':
            messageErr.push('Email đã tồn tại')
            break
          case 'REF_USER':
            messageErr.push('Mã giới thiệu không hợp lệ')
            break
          case 'USER_TYPE_INVALID':
            messageErr.push('Loại tài khoản không hợp lệ (Nhập KD hoặc HTKD)')
            break
          case 'BONUS_POINT_WRONG':
            messageErr.push('Điểm thưởng không hợp lệ')
            break
          default:
            break
        }
      })

      return (
        messageErr.map(item => (
          <div className='mr-1 text-danger'>
            {item}
          </div>
        ))
      )
    }
  }

  const renderPhoneNumber = (row) => {
    if (row.usersExcelErrorMessages != null && row.usersExcelErrorMessages.includes('PHONE_ALREADY_EXISTS')) {
      return <div className='text-danger'>{row.phoneNumber}</div>
    } else return <div>{row.phoneNumber}</div>
  }

  const renderEmail = (row) => {
    if (row.usersExcelErrorMessages != null && row.usersExcelErrorMessages.includes('EMAIL_ALREADY_EXISTS')) {
      return <div className='text-danger'>{row.email}</div>
    } else return <div>{row.email}</div>
  }

  const onFileChangeHandler = (e) => {
    e.preventDefault()
    dispatch(importUsersExcel(e.target.files, isInOn))
  }

  const onClickDownloadResultFile = (e) => {
    e.preventDefault()
    dispatch(downloadResultFile(importExcelUsers))
  }

  const onPageChange = (pageNumber) => {
    const newPaging = { ...paging, pageNumber }
    setPaging(newPaging)
    setDataDisplay(importExcelUsers.slice(pageNumber * paging.pageSize, pageNumber * paging.pageSize + paging.pageSize - 1))
  }

  const onPageSizeChange = (pageSize, pageNumber) => {
    const newPaging = { ...paging, pageSize, pageNumber }
    setPaging(newPaging)
    setDataDisplay(importExcelUsers.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize - 1))
  }

  return (
    <>
      <Row className='mb-1'>
        <Col className="col-sm-auto">
          <Button color='success'
                  onClick={() => window.open('https://sit2.inon.vn/resources/templates/Mau-Tao-Tai-Khoan.xlsx', '_self')}>Tải
            file mẫu
          </Button>
        </Col>
        <Col className="col-sm-auto">
          <Button tag='label' color='success'>
            <Input
              type='file'
              name='file'
              id='file'
              onChange={(e) => onFileChangeHandler(e)}
              onClick={(e) => e.target.value = ''}
              hidden
              accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            />
            Tải file của bạn lên
          </Button>
        </Col>
        {importExcelUsers.length > 0 ? <Col className="col-sm-auto">
          <Button tag='label' color='warning' onClick={(e) => onClickDownloadResultFile(e)}>
            Tải file kết quả
          </Button>
        </Col> : null}
      </Row>

      <TreeTable
        className='nested-table -striped -highlight mb-3'
        data={dataDisplay}
        previousText={intl.formatMessage({ id: 'common.table.previous' })}
        nextText={intl.formatMessage({ id: 'common.table.next' })}
        noDataText={intl.formatMessage({ id: 'common.table.noData' })}
        pageText={intl.formatMessage({ id: 'common.table.page' })}
        ofText={intl.formatMessage({ id: 'common.table.of' })}
        rowsText={intl.formatMessage({ id: 'common.table.rows' })}
        getTdProps={() => ({
          style: {
            height: 'auto'
          }
        })}
        filterable
        manual
        columns={columns}
        defaultPageSize={10}
        defaultSorted={[
          {
            id: 'userCode',
            desc: false
          }
        ]}
        pages={Math.ceil(importExcelUsers?.length / paging.pageSize)}
        pageSize={paging.pageSize}
        page={paging.pageNumber}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        SubComponent={(row) => {
          return (
            <div style={{ padding: '10px' }}>
              <ExpandableTable
                data={row.original}
              />
            </div>
          )
        }}
      />
    </>
  )
}

export default CreateMultipleAccountInfo