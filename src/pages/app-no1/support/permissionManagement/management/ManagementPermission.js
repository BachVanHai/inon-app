import { FormattedMessage } from 'base-app'
import React from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router'
import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import 'react-table/react-table.css'
import { Card, CardBody, CardFooter } from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../../configs/app-no1'
import { ACCOUNTANT, AD_OP, MAJOR, OPERATE, TECHNOLOGY } from '../../utility'
import useColumns from './TablePermissionManagement'
const TableStyled = styled.div`
  .rt-th:first-child {
    display: none;
  }
  .rt-td:first-child {
    display: none;
  }
`
const ManagementPermission = ({ availablePermission, reActiveLoadApi }) => {
  const intl = useIntl()
  const history = useHistory()
  const getTypeRequest = (type) => {
    switch (type) {
      case OPERATE:
        return {
          component: (
            <div>
              <FormattedMessage id={getKeyLang('support.management.operate')} />
            </div>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`support.management.operate`)
          })
        }
      case ACCOUNTANT:
        return {
          component: (
            <div>
              <FormattedMessage
                id={getKeyLang('support.management.accountant')}
              />
            </div>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`support.management.accountant`)
          })
        }
      case TECHNOLOGY:
        return {
          component:  <FormattedMessage
          id={getKeyLang('support.management.technology')}
        />,
          content: <FormattedMessage
          id={getKeyLang('support.management.technology')}
        />
        }
      case null:
        return {
          component: "",
          content: ""
        }
      default:
        return null
    }
  }

  const getPermissionRequest = (type) => {
    switch (type) {
      case AD_OP:
        return {
          component: (
            <div>
              <FormattedMessage
                id={getKeyLang('support.permission.selectPermission.admin')}
              />
            </div>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`support.permission.selectPermission.admin`)
          })
        }
      case MAJOR:
        return {
          component: (
            <div>
              <FormattedMessage
                id={getKeyLang('support.permission.selectPermission.major')}
              />
            </div>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`support.permission.selectPermission.major`)
          })
        }
      case null:
        return {
          component: '',
          content: ''
        }
      default:
        return null
    }
  }
  const { Table, columns } = useColumns(
    reActiveLoadApi,
    getTypeRequest,
    getPermissionRequest
  )
  const TreeTable = treeTableHOC(ReactTable)
  return (
    <Card>
      <CardBody>
        <TableStyled>
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
            data={availablePermission}
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
      </CardBody>
    </Card>
  )
}

export default ManagementPermission
