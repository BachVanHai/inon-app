import { FormattedMessage } from 'base-app'
import React from 'react'
import { useIntl } from 'react-intl'
import { useLocation } from 'react-router-dom'
import { Table } from 'reactstrap'
import styled from 'styled-components'
import { filterMethod, getKeyLang } from '../../../../configs/supplement-app'
import { TreeTable_filterMethod_noAccents } from '../../../../ultity'
import {
  convertISOtoDate,
  FILTER_EBANK_CHECK_INFO,
  FILTER_TYPE_ACCOUNT,
  PATH_MANAGMENT_PAGE
} from '../utility'
export const TdStyled = styled.td`
  background-color: #c3c3c3;
  color: white;
`
const ColumnsTable = () => {
  const intl = useIntl()
  const location = useLocation()
  const isManagementAccout = location.pathname === PATH_MANAGMENT_PAGE
  return {
    Table: ({ data }) => {
      return [
        <Table size='sm' responsive bordered>
          <tbody>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('accountProduct.numberTKFCC')}
                />
              </TdStyled>
              <td className='text-left'>{data?.accFccNo}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('accountProduct.KYCLevelEbank')}
                />
              </TdStyled>
              <td className='text-left'>{data?.kycLevelBank}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('accountProduct.reasonEbank')}
                />
              </TdStyled>
              <td className='text-left'>{data?.ebankDescription}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage id={getKeyLang('accountProduct.month')} />
              </TdStyled>
              <td className='text-left'>{data?.month}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage id={getKeyLang('accountProducts.codePresenter')} />
              </TdStyled>
              <td className='text-left'>{data?.ebankPresenterCode}</td>
            </tr>
          </tbody>
        </Table>
      ]
    },
    columns: [
      {
        Header: (
          <FormattedMessage id={getKeyLang('accountProduct.dateCIFFCC')} />
        ),
        accessor: 'cifFccOpenDate',
        Cell: ({ original }) => {
          return <div>{convertISOtoDate(original?.cifFccOpenDate)}</div>
        }
      },
      {
        Header: (
          <FormattedMessage id={getKeyLang('accountProduct.numberCIFFCC')} />
        ),
        accessor: 'cifFcc',
        filterable: isManagementAccout ? true : false,
        filterMethod: filterMethod
      },
      {
        Header: (
          <FormattedMessage id={getKeyLang('accountProduct.nameEbank')} />
        ),
        width: 180,
        accessor: 'ebankCustomerName',
        filterable: isManagementAccout ? true : false,
        filterMethod: TreeTable_filterMethod_noAccents,
        Filter: ({ filter, onChange }) => {
          return (
            <div style={{ position: 'relative' }}>
              <input
                onChange={(event) => onChange(event.target.value)}
                value={filter ? filter.value : ''}
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  color: '#222222',
                  textTransform: 'uppercase'
                }}
              />
            </div>
          )
        }
      },
      {
        Header: (
          <FormattedMessage id={getKeyLang('accountProduct.accountType')} />
        ),
        accessor: 'ebankAccType',
        filterable: isManagementAccout ? true : false,
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
                  id: getKeyLang('evoucher.management.table.filter.all')
                })}
              </option>
              {FILTER_TYPE_ACCOUNT.map((item, index) => {
                return (
                  <option key={index} value={item.type}>
                    {item.name}
                  </option>
                )
              })}
            </select>
          )
        }
      },
      {
        Header: (
          <FormattedMessage id={getKeyLang('accountProduct.codePartner')} />
        ),
        accessor: 'ebankPresenterCode',
        filterable: isManagementAccout ? true : false,
        filterMethod: TreeTable_filterMethod_noAccents,
        Cell: ({ original }) => {
          const ebankPresenterCodeCovert = original?.ebankPresenterCode?.substr(
            original?.ebankPresenterCode.length - 6
          )
          return <div>{ebankPresenterCodeCovert}</div>
        },
        Filter: ({ filter, onChange }) => {
          return (
            <div style={{ position: 'relative' }}>
              <input
                onChange={(event) => onChange(event.target.value)}
                value={filter ? filter.value : ''}
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  color: '#222222',
                  textTransform: 'uppercase'
                }}
              />
            </div>
          )
        }
      },
      {
        Header: (
          <FormattedMessage id={getKeyLang('accountProduct.postCheckEbank')} />
        ),
        accessor: 'ebankCheckInfo',
        filterable: isManagementAccout ? true : false,
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
                  id: getKeyLang('evoucher.management.table.filter.all')
                })}
              </option>
              {FILTER_EBANK_CHECK_INFO.map((item, index) => {
                return (
                  <option key={index} value={item.type}>
                    {item.name}
                  </option>
                )
              })}
            </select>
          )
        }
      }
    ]
  }
}

export default ColumnsTable
