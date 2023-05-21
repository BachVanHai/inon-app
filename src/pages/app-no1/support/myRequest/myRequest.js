import { Button, FormattedMessage, goBackHomePage, showConfirmAlert } from 'base-app'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import 'react-table/react-table.css'
import { Badge, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import styled from 'styled-components'
import '../../../../assets/scss/app-no1/support.scss'
import { getKeyLang } from '../../../../configs/app-no1'
import { actionGetAllMyRequest } from '../../../../redux/actions/app-no1/myRequestManagement'
import { getAllPermission } from '../../../../redux/actions/app-no1/permissionManagement'
import SupportService from '../../../../services/app-no1/support'
import ListRequestMobile from '../components/ListRequestMobile'
import { ASSURANCE_COMPENSATION, CUSTOMER_SERVICE, DOING, DONE, FEEDBACK, GROUP_ID_CODE, OTHER, PAYMENT, PRODUCT, TECHNOLOGY, TODO } from '../utility'
import useColumns from './requestTable'

const TableStyled = styled.div`
.rt-th:last-child {
  visibility: ${props =>props.user === GROUP_ID_CODE ? "visible" : "hidden"};
  }
  .rt-td:last-child {
    visibility: ${props =>props.user === GROUP_ID_CODE ? "visible" : "hidden"};
  }
`
const MyRequest = () => {
  const {user} = useSelector(state => state.auth)
  const codeInOn = user.groupId !== undefined ?  user.groupId.substr(user.groupId.length - 2) : null
  const history = useHistory()
  const {availableMyRequest} = useSelector(state => state.app.myRequestManagement)
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
                id={getKeyLang('support.create.radio.other')}
              />
            </div>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`support.create.radio.other`)
          })
        }
        case OTHER:
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
      default:
        return null
    }
  }
  const getStatusRequest = (status) =>{
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
  const { Table, columns } = useColumns(reActiveLoadApi ,getTypeRequest, getStatusRequest , handleReaderMessage)
  const [dispatchDependency, setDispatchAcitive] = useState(0)
  const [myRequestDefault, setMyRequestDefault] = useState();
  const dependencies = [
    availableMyRequest.length,
    history.location.pathname,
    dispatchDependency
  ]
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
  const [searchKey, setSearchKey] = useState('')
  const TreeTable = treeTableHOC(ReactTable)
  const dispatch = useDispatch()
  function reActiveLoadApi() {
    setDispatchAcitive(pre => ++pre)
  }
  useEffect(() => {
    dispatch(actionGetAllMyRequest(user))
    dispatch(getAllPermission())
    setMyRequestDefault(availableMyRequest)
  }, [...dependencies, JSON.stringify(availableMyRequest)]);
  return (
    <>
      <div className="management-question">
        <ListRequestMobile title="support.myrequest.title" data={myRequestDefault} getTypeRequest={getTypeRequest} getStatusRequest={getStatusRequest} setRequestDefault={setMyRequestDefault} availableData={availableMyRequest}  searchKey={searchKey} setSearchKey={setSearchKey} showFilter={false} handleReaderMessage={handleReaderMessage}/>
        <Card>
        <CardHeader className='d-flex justify-content-between align-items-center'>
            <div>
              <CardTitle className='text-uppercase'>
                <FormattedMessage id={getKeyLang('support.myrequest.title')} />
              </CardTitle>
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
                    data={myRequestDefault}
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

export default MyRequest
