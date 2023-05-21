import { BaseAppUltils, FormattedMessage, showConfirmAlert } from 'base-app'
import React from 'react'
import { useIntl } from 'react-intl'
import { getKeyLang } from '../../../../../configs/app-no1'
import {
  LIST_DEPARTMENT_FILTER,
  LIST_PERMISSION_FILTER,
  LIST_STATUS_FILTER,
  LIST_TYPE_FILTER
} from '../../utility'
import * as Icon from 'react-feather'
import { useHistory } from 'react-router'
import SupportService from '../../../../../services/app-no1/support'
import { useDispatch } from 'react-redux'
import { TreeTable_filterMethod_noAccents } from '../../../../../ultity'

const TablePermissionManagement = (
  reActiveLoadApi,
  getTypeRequest,
  getPermissionRequest
) => {
  const history = useHistory()
  const intl = useIntl()
  const dispatch = useDispatch()
  const handleDeletePermission = (original) => {
    dispatch(
      showConfirmAlert({
        title: (
          <FormattedMessage
            id={getKeyLang('support.permission.edit.deletePermission')}
          />
        ),
        isShow: true,
        content: (
          <FormattedMessage
            id={getKeyLang('support.permission.edit.deletePermission.content')}
          />
        ),
        onConfirm: async () => {
          const newPermission = {
            id: original.id,
            userId: original.userId,
            decentralization: original.decentralization,
            hcSupportType: original.hcSupportType,
            department: original.department,
            enable: false
          }
          const res = await SupportService.deletePermissionById(
            original.id,
            newPermission
          )
          if (res.status === 200) {
            reActiveLoadApi()
            BaseAppUltils.toastSuccess(
              intl.formatMessage({
                id: getKeyLang('helpcenter.management.action.success')
              })
            )
          } else {
            BaseAppUltils.toastSuccess(
              intl.formatMessage({
                id: getKeyLang('helpcenter.management.action.error')
              })
            )
          }
        }
      })
    )
  }
  return {
    columns: [
      {
        Header: (
          <FormattedMessage id={getKeyLang('home.chart.unit.ACCOUNTS')} />
        ),
        accessor: 'userInOnName',
        filterable: true,
        filterMethod: TreeTable_filterMethod_noAccents
      },
      {
        Header: (
          <FormattedMessage
            id={getKeyLang('support.myrequest.table.classify')}
          />
        ),
        accessor: 'department',
        filterable: true,
        filterMethod: TreeTable_filterMethod_noAccents,
        Cell: ({ original }) => {
          return getTypeRequest(original.department).component
        },
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
              {LIST_DEPARTMENT_FILTER.map((item, index) => {
                return (
                  <option value={item.type} key={index}>
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
          <FormattedMessage id={getKeyLang('support.permission.title')} />
        ),
        filterable: true,
        accessor: 'decentralization',
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
              {LIST_PERMISSION_FILTER.map((item, index) => {
                return (
                  <option value={item.type} key={index}>
                    {item.name}
                  </option>
                )
              })}
            </select>
          )
        },
        Cell: ({ original }) => {
          return getPermissionRequest(original.decentralization).component
        }
      },
      {
        Header: (
          <FormattedMessage
            id={getKeyLang('support.permission.table.action')}
          />
        ),
        Cell: ({ original }) => {
          return (
            <div>
              {/* <Icon.Edit3 color='#338955' className="cursor-pointer mr-2" size="
              20" onClick={()=> history.push(`/app/support/permission-request/edit/${original.id}`)} /> */}
              <Icon.X
                color='#ea5455'
                className='cursor-pointer mr-2'
                size='
              20'
                onClick={() => handleDeletePermission(original)}
              />
            </div>
          )
        }
      }
    ]
  }
}

export default TablePermissionManagement
