import { FormattedMessage } from 'base-app'
import React from 'react'
import * as Icon from 'react-feather'
import { useIntl } from 'react-intl'
import { Table } from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../configs/app-no1'
import { TreeTable_filterMethod_noAccents } from '../../../../ultity'
import { convertDateISOstring, DROP, HIGH, LIST_STATUS_FILTER, LIST_TYPE_FILTER, MEDIUM } from '../utility'
const TdStyled = styled.td`
background-color: #c3c3c3;
color: white;
`
const RequestTable = (reActiveLoadApi ,getTypeRequest, getStatusRequest , handleReaderMessage) => {
  const intl = useIntl()
  return {
    Table: ({ data }) => {
      return (
        <Table size='sm' responsive bordered>
          <tbody>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('account.exportReportOption.createdDate')}
                />
              </TdStyled>
              <td className='text-left'>
                {convertDateISOstring(data.createdDate)}
              </td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('support.management.handlingStaff')}
                />
              </TdStyled>
              <td className='text-left'>
              {data.supporterInOnIdName}
              </td>
            </tr>
          </tbody>
        </Table>
      )
    },
    columns: [
      {
        Header: (
          <FormattedMessage
            id={getKeyLang('support.myrequest.table.requestCode')}
          />
        ),
        accessor: 'code',
        filterable: true,
        filterMethod : TreeTable_filterMethod_noAccents,
        Cell : ({original})=>{
          return <span className={`cursor-pointer ${!original.statusReader  ? "font-weight-bold" : ""}`} onClick={() => handleReaderMessage(original.id, original.roomId , original.hCUserId)} style={{color : "#0f5c4d"}}>{original.code}</span>
        }
      },
      {
        Header: (
          <FormattedMessage id={getKeyLang('support.myrequest.table.title')} />
        ),
        accessor: 'title',
        filterable: true,
        filterMethod : TreeTable_filterMethod_noAccents,
        Cell : ({original})=>{
          return <span className={`cursor-pointer ${!original.statusReader  ? "font-weight-bold" : ""}`} title={original.title}>{original.title}</span>
        }
      },
      {
        Header: (
          <FormattedMessage
            id={getKeyLang('support.myrequest.table.classify')}
          />
        ),
        accessor: 'type',
        filterable: true,
        Filter: ({ filter, onChange }) => {
          return (
            <select
              onChange={(e) => {
                onChange(e.target.value)
              }}
              style={{ width: '100%' }}
              value={filter ? filter.value : ''}
            >
              <option value=''>
                {intl.formatMessage({
                  id: getKeyLang('helpcenter.management.table.filter.all')
                })}
              </option>
              {LIST_TYPE_FILTER.map((item,index) => {
                return <option value={item.type} key={index}>{item.name}</option>
              })}
            </select>
          )
        },
        Cell : ({original}) =>{
          return <span className={`cursor-pointer ${!original.statusReader  ? "font-weight-bold" : ""}`}>{getTypeRequest(original.type).component}</span>
        }
      },
      {
        Header: (
          <FormattedMessage
            id={getKeyLang('support.management.table.status')}
          />
        ),
        accessor: 'status',
        filterable: true,
        Filter: ({ filter, onChange }) => {
          return (
            <select
              onChange={(e) => {
                onChange(e.target.value)
              }}
              style={{ width: '100%' }}
              value={filter ? filter.value : ''}
            >
              <option value=''>
                {intl.formatMessage({
                  id: getKeyLang('helpcenter.management.table.filter.all')
                })}
              </option>
              {LIST_STATUS_FILTER.map((item,index) => {
                return <option value={item.type} key={index}>{item.name}</option>
              })}
            </select>
          )
        },
        Cell : ({original}) =>{ return getStatusRequest(original.status).component}
      },
      {
        Header: "",
        accessor: 'priority',
        width : 50,
        Cell: ({ original }) => {
          return (
            <div>{original.priority === DROP ? "" : original.priority === MEDIUM ? <Icon.Star size="20" color="#ff9f43" fill="#ff9f43" /> : original.priority === HIGH ? <Icon.Star fill="#ea5455" size="20" color="#ea5455" /> : null}</div>
          )
        },
      }
    ]
  }
}

export default RequestTable
