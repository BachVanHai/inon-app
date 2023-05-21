import { Checkbox, FormattedMessage, Radio } from 'base-app'
import React from 'react'
import { Check } from 'react-feather'
import { Table } from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../../configs/app-no1'

const TableStyled = styled(Table)`
.table-responsive{
  overflow-x: hidden;
}
  th {
    text-align: center;
  }
  td {
    text-align: center;
  }
`
const TablePermission = () => {
  return (
    <TableStyled responsive bordered>
      <thead>
        <tr>
          <th width='20%'>
            <FormattedMessage
              id={getKeyLang('support.permission.table.screen')}
            />
          </th>
          <th colSpan='2'>
            <FormattedMessage
              id={getKeyLang('support.permission.table.detail')}
            />
          </th>
          <th colSpan='2'>
            <FormattedMessage id={getKeyLang('support.permission.title')} />
          </th>
        </tr>
      </thead>
      {/* BODY  */}
      <tbody>
      <tr>
          <td>
          </td>
          <td colSpan="2">
          </td>
          <td>
            <div className='d-flex justify-content-center'>
            <FormattedMessage id={getKeyLang("support.detail.coordinator")} />
             
            </div>
          </td>
          <td>
            <div className='d-flex justify-content-center'>
            <FormattedMessage id={getKeyLang("support.detail.handle")} />
            </div>
          </td>
        </tr>
        <tr>
          <td rowSpan='2'>
            <FormattedMessage
              id={getKeyLang('support.permission.table.create')}
            />
          </td>
          <td colSpan='2'>
            <FormattedMessage
              id={getKeyLang('support.permission.table.detailRequest')}
            />
          </td>
          <td>
            <div className='d-flex justify-content-center'>
            <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
          <td>
            <div className='d-flex justify-content-center'>
            <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
        </tr>
        {/* =====row 1===== */}
        <tr>
          <td colSpan='2'>
            <FormattedMessage
              id={getKeyLang('support.permission.table.advance')}
            />
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
        </tr>
        {/* ======row 2 ==== */}
        <tr>
          <td rowSpan='10' height='400px'>
            <FormattedMessage
              id={getKeyLang('support.permission.table.managementRequest')}
            />
          </td>
          <td rowSpan='4'>
            <FormattedMessage
              id={getKeyLang('support.permission.table.viewList')}
            />
          </td>
          <td>
            <FormattedMessage
              id={getKeyLang('support.permission.table.myRequest')}
            />
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <FormattedMessage
              id={getKeyLang('support.permission.table.nominated')}
            />
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <FormattedMessage
              id={getKeyLang('support.permission.table.classified')}
            />
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <FormattedMessage
              id={getKeyLang('support.permission.table.viewAll')}
            />
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  disabled />
            </div>
          </td>
        </tr>
        {/* ====row 3 ====   */}
        <tr>
          <td rowSpan='2'>
            <FormattedMessage
              id={getKeyLang('support.permission.table.windowChat')}
            />
          </td>
          <td>
            <FormattedMessage
              id={getKeyLang('support.permission.table.guest')}
            />
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <FormattedMessage
              id={getKeyLang('support.permission.table.inon')}
            />
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
        </tr>
        {/* row 4 */}
        <tr>
          <td rowSpan='4'>
            <FormattedMessage
              id={getKeyLang('support.permission.table.action')}
            />
          </td>
          <td>
            <FormattedMessage
              id={getKeyLang('support.permission.table.updateStatus')}
            />
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <FormattedMessage
              id={getKeyLang('support.permission.table.point')}
            />
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <FormattedMessage
              id={getKeyLang('support.permission.table.addPeople')}
            />
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <FormattedMessage
              id={getKeyLang('support.permission.table.prioritized')}
            />
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan='3'>
            <FormattedMessage id={getKeyLang('support.permission.title')} />
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />}  checked disabled />
            </div>
          </td>
          <td>
            <div className='d-flex justify-content-center'>
              <Checkbox icon={<Check className='vx-icon' size={16} />} disabled />
            </div>
          </td>
        </tr>
      </tbody>
    </TableStyled>
  )
}

export default TablePermission
