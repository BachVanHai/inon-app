import React from 'react'
import { Table } from 'reactstrap'
import { intlConvertToVnd } from '../../../../../../../ultity'
import { convertTime } from '../../../utility'

const TableInfoData = ({ data, intl }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Nguời được bảo hiểm</th>
          <th>Địa chỉ ngôi nhà</th>
          <th>Thời hạn</th>
          <th>Từ ngày</th>
          <th>Đến ngày</th>
          <th>Phí bảo hiểm</th>
        </tr>
      </thead>
      <tbody>
        {data.map((_elt, index) => (
          <tr key={index}>
            <td scope='row'>{_elt?.contract?.owner?.fullName}</td>
            <td>{`${_elt?.houseAddressDTO?.detail} ${_elt?.houseAddressDTO?.ward} ${_elt?.houseAddressDTO?.district} ${_elt?.houseAddressDTO?.city}` }</td>
            <td>{_elt?.insurances[0]?.duration} tháng</td>
            <td>{convertTime(_elt?.contract?.insurances[0]?.startedDate)}</td>
            <td>{convertTime(_elt?.contract?.insurances[0]?.endDate)}</td>
            <td>
              {intlConvertToVnd(_elt?.feeInsurance?.feeInsurance, intl)} VNĐ
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TableInfoData
