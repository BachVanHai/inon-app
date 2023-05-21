import { BaseAppConfigs, Button, goBackHomePage, Select, showConfirmAlert, usePageAuthorities } from 'base-app'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  NavLink,
  Table,
  Nav,
  TabContent,
  TabPane,
  NavItem,
  FormGroup,
  Col,
  Row
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedMessage, useIntl } from 'react-intl'
import * as moment from 'moment'
import { getKeyLang } from '../../../configs/supplement-app'
import {
  bonusApproval,
  loadListBonusApproval,
  loadListSuggestion
} from '../../../redux/actions/supplement-app/bonusApproval'
import * as Icon from 'react-feather'
import { Link } from 'react-router-dom'


const TreeTable = treeTableHOC(ReactTable)

const SelectMemo = React.memo((props) =>
  <Select {...props} />, (prevProps, nextProps) => prevProps.options === nextProps.options)

const ExpandableTable = ({ data }) => {


  return data.userId ? (
    <Table responsive bordered>
      <tbody>
      <tr>
        <td width='30%' className='table-detail-header'>
          <FormattedMessage id={getKeyLang('bonus.phoneNumber')} />
        </td>
        <td width='35%'>{data.phoneNumber}</td>
        <td width='35%' className='text-center'>
        </td>
      </tr>
      <tr>
        <td className='table-detail-header'>
          Email
        </td>
        <td>{data.email}</td>
        <td />
      </tr>
      <tr>
        <td className='table-detail-header'>
          <FormattedMessage id={getKeyLang('bonus.referralCode')} />
        </td>
        <td>{data.refByUser}</td>
        <td className='text-center'>
        </td>
      </tr>
      <tr>
        <td className='table-detail-header'>
          <FormattedMessage id={getKeyLang('bonus.createDate')} />
        </td>
        <td>{moment(data.createDate).format('DD/MM/YYYY')}</td>
        <td />
      </tr>
      </tbody>
    </Table>
  ) : ''
}

const BonusApproval = () => {

  const dispatch = useDispatch()
  const { list, suggestions } = useSelector(state => state.app.bonusApproval)
  const [insuranceCompany] = useState([{ id: 1, name: 'BSH' }])
  const [companySelected] = useState(insuranceCompany[0])
  const [activeTab] = useState(companySelected.id)
  const authorities = usePageAuthorities()
  const intl = useIntl()

  useEffect(() => {
    dispatch(loadListSuggestion())
    dispatch(loadListBonusApproval())
  }, [])

  const onClickApprove = (row) => {
    dispatch(
      showConfirmAlert({
        title: <FormattedMessage id={getKeyLang('bonus.bonusApproval.approve')} />,
        isShow: true,
        content: <FormattedMessage id={getKeyLang('bonus.bonusApproval.approve.confirmMessage')}
                                   values={{ name: <b style={{ color: 'red' }}>{row.fullName}</b> }} />,
        onConfirm: () => {
          dispatch(bonusApproval(row.id, true))
        }
      })
    )
  }

  const onClickReject = (row) => {
    dispatch(
      showConfirmAlert({
        title: <FormattedMessage id={getKeyLang('bonus.bonusApproval.reject')} />,
        isShow: true,
        content: <FormattedMessage id={getKeyLang('bonus.bonusApproval.reject.confirmMessage')}
                                   values={{ name: <b style={{ color: 'red' }}>{row.fullName}</b> }} />,
        onConfirm: () => {
          dispatch(bonusApproval(row.id, false))
        }
      })
    )
  }

  const isHasAuthority = (authority) => {
    return authorities.indexOf(authority.toUpperCase()) >= 0
  }

  const onChangePartner = (partnerSelected) => {
    dispatch(loadListBonusApproval(partnerSelected ? partnerSelected.map(item => item.id) : null))
  }

  const columns = [
    {
      Header: <FormattedMessage id={getKeyLang('bonus.userCode')} />,
      accessor: 'userCode'
    },
    {
      Header: <FormattedMessage id={getKeyLang('bonus.effectiveDate')} />,
      minWidth: 200,
      id: 'effectiveDate',
      Cell: ({ original }) => (
        <div>
          {moment(original.sessionDate).format('DD/MM/YYYY')}
        </div>
      )
    },
    {
      Header: <FormattedMessage id={getKeyLang('bonus.fullName')} />,
      minWidth: 200,
      accessor: 'fullName'
    },
    {
      Header: <FormattedMessage id={getKeyLang('bonus.historyStatus')} />,
      id: 'status',
      minWidth: 200,
      Cell: ({ original }) => (
        <div className='d-flex justify-content-between'>
          <div>
            <FormattedMessage id={getKeyLang(`bonus.status.${original.status}`)} />
          </div>
          <Link
            to={`/bonus/${original.type.toLowerCase()}?isDraft=true&id=${original.id}&userId=${original.userId}`}><FormattedMessage
            id={getKeyLang('bonus.detail')} /></Link>
        </div>
      )
    },
    {
      Header: <FormattedMessage id={getKeyLang('bonus.action')} />,
      id: 'action',
      sortable: false,
      filterable: false,
      minWidth: 200,
      Cell: ({ original }) => (
        isHasAuthority(BaseAppConfigs.AUTHORITIES.APPROVE) ||
        isHasAuthority('ALL') ? (
          <React.Fragment>
            <Button
              size='sm'
              onClick={() => onClickApprove(original)}
              className='btn-icon rounded-circle ml-2'
              color='flat-success'
            >
              <Icon.Check className='vx-icon' size={24} />
            </Button>
            <Button
              size='sm'
              onClick={() => onClickReject(original)}
              className='ml-2 btn-icon rounded-circle'
              color='flat-danger'
            >
              <Icon.X className='vx-icon' size={24} />
            </Button>
          </React.Fragment>
        ) : ''
      )

    }
  ]

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

  const getListDataDisplay = () => {
    return list.map(item => {
      let user = {}
      if (item.userId) {
        user = suggestions.find(value => String(value.id) === item.userId)
      } else {
        user.fullName = <FormattedMessage id={getKeyLang(`bonus.${item.type}`)} />
      }
      return { ...user, ...item }
    })
  }

  return <React.Fragment>
    <Card>
      <CardHeader>
        <CardTitle className='text-uppercase'>
          <FormattedMessage id='menu.bonusApproval' />
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Row className='mt-2'>
          <Col sm='8' md='6' lg='4'>
            <FormattedMessage
              id={getKeyLang('bonus.findPartner')}
            >
              {(msg) => (
                <FormGroup>
                  <SelectMemo
                    id='seach'
                    readOnly
                    isMulti
                    closeMenuOnSelect={true}
                    notRequired
                    onChange={onChangePartner}
                    options={suggestions}
                    className='React'
                    classNamePrefix='select mt-1'
                    placeholder={msg}
                    isClearable={true}
                  />
                </FormGroup>
              )}
            </FormattedMessage>
          </Col>
        </Row>
        <Nav tabs className='mt-2'>
          {insuranceCompany.map((item) => (
            <NavItem>
              <NavLink
                className={classNames({
                  active: activeTab === item.id
                })}
              >
                {item.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeTab}>
          {insuranceCompany.map((item) => (
            <TabPane tabId={item.id} key={item.id}>
              <TreeTable
                className='nested-table -striped -highlight'
                data={getListDataDisplay()}
                previousText={intl.formatMessage({ id: 'common.table.previous' })}
                nextText={intl.formatMessage({ id: 'common.table.next' })}
                noDataText={intl.formatMessage({ id: 'common.table.noData' })}
                pageText={intl.formatMessage({ id: 'common.table.page' })}
                ofText={intl.formatMessage({ id: 'common.table.of' })}
                rowsText={intl.formatMessage({ id: 'common.table.rows' })}
                getTdProps={() => ({
                  style: {
                    height: '40px'
                  }
                })}
                filterable
                columns={columns}
                defaultPageSize={10}
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
            </TabPane>
          ))}
        </TabContent>

      </CardBody>
      <CardFooter>
        <div className='d-flex justify-content-end'>
          <Button.Ripple color='secondary' className='mr-2' onClick={onClickBackHome}>
            <FormattedMessage id='common.home' />
          </Button.Ripple>
        </div>
      </CardFooter>
    </Card>
  </React.Fragment>
}

export default BonusApproval
