import {
  Button,
  FormattedMessage,
  goBackHomePage,
  showConfirmAlert
} from 'base-app'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import 'react-table/react-table.css'
import { AD, ASSURANCE_COMPENSATION, CUSTOMER_SERVICE, DOING, DONE, FEEDBACK, GROUP_ID_CODE, OTHER, PAYMENT, PRODUCT, TECHNOLOGY, TODO } from '../utility'
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row
} from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../configs/app-no1'
import { actionGetAllRequest } from '../../../../redux/actions/app-no1/supportManagement'
import ListRequestMobile from '../components/ListRequestMobile'
import useColumns from './requestTable'
import DropdownListFilter from '../components/DropdownListFilter'
import { useHistory } from 'react-router'
import '../../../../assets/scss/app-no1/support.scss';
import { isArrayEmpty } from '../../../../ultity'
import { getAllPermission } from '../../../../redux/actions/app-no1/permissionManagement'
import SupportService from '../../../../services/app-no1/support'
const TableStyled = styled.div`
  .rt-th:last-child {
    display: ${props => props.user === GROUP_ID_CODE ? "block" : "none"};
  }
  .rt-td:last-child {
    display: ${props => props.user === GROUP_ID_CODE ? "block" : "none"}
  }
`

const ManagementRequest = () => {
  const { user } = useSelector(state => state.auth)
  const { availablePermission } = useSelector(
    (state) => state.app.permissionManagement
  )
  const checkIsUserPermissonRequestion = availablePermission.filter(_elt => {
    if (Number(_elt?.userId) === user?.id) {
      return true
    }
  })
  const codeInOn = user?.groupId !== undefined ? user?.groupId.substr(user?.groupId.length - 2) : null
  const { availableRequest } = useSelector(
    (state) => state.app.supportManangement
  )
  const history = useHistory()
  const handleReaderMessage = (id,roomId) =>{
    history.push(`/app/support/chat/${id}`)
    const message ={
      "roomId" : roomId,
      "userId" : user?.id
   }
  SupportService.readerMessage(message)
  }
  const getTypeRequest = (type) => {
    switch (type) {
      case PRODUCT:
        return {
          component: (
            <div>
              <FormattedMessage
                id={getKeyLang('support.create.radio.product')}
              />
            </div>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`support.create.radio.product`)
          })
        }
      case PAYMENT:
        return {
          component: (
            <div>
              <FormattedMessage
                id={getKeyLang('support.create.radio.payment')}
              />
            </div>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`support.create.radio.payment`)
          })
        }
      case TECHNOLOGY:
        return {
          component: (
            <div>
              <FormattedMessage id={getKeyLang('support.create.radio.skill')} />
            </div>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`support.create.radio.skill`)
          })
        }
      case ASSURANCE_COMPENSATION:
        return {
          component: (
            <div>
              <FormattedMessage
                id={getKeyLang('support.create.radio.insurance')}
              />
            </div>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`support.create.radio.insurance`)
          })
        }
      case CUSTOMER_SERVICE:
        return {
          component: (
            <div>
              <FormattedMessage
                id={getKeyLang('support.create.radio.serviceCustomer')}
              />
            </div>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`support.create.radio.serviceCustomer`)
          })
        }
      case FEEDBACK:
        return {
          component: (
            <div>
              <FormattedMessage
                id={getKeyLang('support.create.radio.report')}
              />
            </div>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`support.create.radio.report`)
          })
        }
      case OTHER:
        return {
          component: (
            <div>
              <FormattedMessage
                id={getKeyLang('support.create.radio.other')}
              />
            </div>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`support.create.radio.other`)
          })
        }
      default:
        return null
    }
  }

  const getStatusRequest = (status) => {
    switch (status) {
      case TODO:
        return {
          component: (
            <Badge color='danger'>
              <FormattedMessage
                id={getKeyLang('support.management.status.todo')}
              />
            </Badge>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`support.management.status.todo`)
          })
        }
      case DOING:
        return {
          component: (
            <Badge color='warning'>
              <FormattedMessage
                id={getKeyLang('support.management.status.doing')}
              />
            </Badge>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`support.management.status.doing`)
          })
        }
      case DONE:
        return {
          component: (
            <Badge color='primary'>
              <FormattedMessage
                id={getKeyLang('support.management.status.done')}
              />
            </Badge>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`support.management.status.done`)
          })
        }
      default:
        return null
    }
  }

  const { Table, columns } = useColumns(reActiveLoadApi, getTypeRequest, getStatusRequest , handleReaderMessage)
  const [dispatchDependency, setDispatchAcitive] = useState(0)
  const intl = useIntl()

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

  const TreeTable = treeTableHOC(ReactTable)
  const dispatch = useDispatch()
  const [searchKey, setSearchKey] = useState('')
  const [requestDefault, setRequestDefault] = useState([]);
  const dependencies = [
    availableRequest.length,
    history.location.pathname,
    dispatchDependency
  ]
  function reActiveLoadApi() {
    setDispatchAcitive((pre) => ++pre)
  }

  useEffect(() => {
    dispatch(actionGetAllRequest(user))
    dispatch(getAllPermission())
    try {
      const sortPrioritize = {
        'MEDIUM' : 2,
        'DROP' :1,
        'HIGH' : 3
      }
      const sortStatus = {
        'TODO' : 2,
        'DOING' :3,
        'DONE' : 1
      }
      const avaitlabelRequestFilter = availableRequest.map(_elt =>{
        return {
          ..._elt , 
          updatedDate : new Date(_elt?.updatedDate)
        }
      })
      const requestSortByDate = avaitlabelRequestFilter.sort((a,b) =>{
        if (sortStatus[a.status] - sortStatus[b.status]) {
          return sortStatus[b.status] - sortStatus[a.status] 
        }
        if (sortPrioritize[b.priority] - sortPrioritize[a.priority]) {
          return sortPrioritize[b.priority] - sortPrioritize[a.priority]
        }
      })
      setRequestDefault(requestSortByDate)
    } catch (error) {
      console.log(error)
    }
  }, [...dependencies, JSON.stringify(availableRequest)])

  return (
    <>
      <div className="management-question">
        <ListRequestMobile
          title='support.management.title'
          data={requestDefault}
          getStatusRequest={getStatusRequest}
          availableData={availableRequest}
          setRequestDefault={setRequestDefault}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          showFilter={true}
          handleReaderMessage={handleReaderMessage}
          availablePermission={availablePermission}
        />
        <Card>
          <CardHeader className='d-flex justify-content-between align-items-center'>
            <div>
              <CardTitle className='text-uppercase'>
                <FormattedMessage id={getKeyLang('support.management.title')} />
              </CardTitle>
            </div>
            <div>
              {
                checkIsUserPermissonRequestion.length !== 0 || user?.groupId === AD ? <DropdownListFilter data={requestDefault} setRequest={setRequestDefault} availableData={availableRequest} availablePermission={availablePermission}/> : null
              }
            </div>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <TableStyled user={codeInOn}>
                  <TreeTable
                    className='nested-table -striped -highlight'
                    previousText={intl.formatMessage({
                      id: 'common.table.previous'
                    })}
                    nextText={intl.formatMessage({ id: 'common.table.next' })}
                    noDataText={intl.formatMessage({
                      id: 'common.table.noData'
                    })}
                    pageText={intl.formatMessage({ id: 'common.table.page' })}
                    ofText={intl.formatMessage({ id: 'common.table.of' })}
                    rowsText={intl.formatMessage({ id: 'common.table.rows' })}
                    getTdProps={() => ({
                      style: {
                        height: '50px',
                        lineHeight: '35px'
                      }
                    })}
                    data={requestDefault}
                    columns={columns}
                    defaultPageSize={10}
                    SubComponent={(row) => {
                      return (
                        <div style={{ padding: '10px' }}>
                          <Table data={row.original} />
                        </div>
                      )
                    }}
                  />
                </TableStyled>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <div className='d-flex justify-content-end'>
              <Button.Ripple
                color='secondary'
                className=''
                onClick={onClickBackHome}
              >
                <FormattedMessage id='common.home' />
              </Button.Ripple>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default ManagementRequest