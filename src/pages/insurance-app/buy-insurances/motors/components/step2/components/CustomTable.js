import React from 'react'
import { FormattedMessage } from 'react-intl'
import TreeTable from '../../../../../../../components/insurance-app/common-forms/custom-table/TreeTable'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import ExpandableTable from '../../../../../../../components/insurance-app/common-forms/custom-table/ExpandableTable'
import { intlConvertToVnd, isArrayEmpty } from '../../../../../../../ultity'
import moment from 'moment'
import { useIntl } from 'react-intl'
import { DATE_FORMAT } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import styled from 'styled-components'
export const TreeTableStyled = styled.div`
  .rt-th:first-child {
    display: none;
  }
  .ReactTable .rt-tbody .rt-expandable {
    display: none;
  }
`
const CustomTable = ({ contracttInfo }) => {
  const intl = useIntl()
  let _data_for_columns = []
  if (!isArrayEmpty(contracttInfo)) {
    _data_for_columns = contracttInfo
  }

  const columns = [
    {
      Header: <FormattedMessage id={getKeyLang(`NumberPlate`)} />,
      id: 'vehicles',
      Cell: ({ original }) => {
        const { vehicles = [] } = original
        const { numberPlate } = vehicles[0]
        return <div>{numberPlate || ''}</div>
      }
    },
    {
      Header: <FormattedMessage id={getKeyLang('OwnerName')} />,
      accessor: `owner.fullName`
    },
    {
      Header: <FormattedMessage id={getKeyLang('RangeDate')} />,
      id: 'insurances',
      Cell: ({ original }) => {
        const { insurances = [] } = original
        const { duration } = insurances[0]
        return <div>{duration + ' tháng' || ''}</div>
      }
    },
    {
      Header: <FormattedMessage id={getKeyLang('feeInsurance')} />,
      id: `insurancesFee`,
      Cell: ({ original }) => {
        const { insurances = [] } = original
        const _val = insurances.reduce((preS, currVal) => {
          return preS + currVal.fee
        }, 0)

        return <div>{intlConvertToVnd(_val, intl) + ' VND'}</div>
      }
    },
    {
      Header: <FormattedMessage id={getKeyLang('FromDate')} />,
      id: 'insurances',
      Cell: ({ original }) => {
        return moment(original.startValueDate).utc(false).format(DATE_FORMAT)
      }
    },
    {
      Header: <FormattedMessage id={getKeyLang('ToDate')} />,
      id: 'insurances',
      Cell: ({ original }) => {
        return moment(original.endValueDate).utc(false).format(DATE_FORMAT)
      }
    }
  ]

  const SubComponent = ({ original: original_data_for_columns }) => {
    const { insurances = [] } = original_data_for_columns
    const { startValueDate, endValueDate } = insurances[0]

    const _rows = []

    return (
      <div style={{ padding: '4px' }}>
        <ExpandableTable rows={_rows} />
      </div>
    )
  }

  return (
    <TreeTableStyled>
      <TreeTable
        columns={columns}
        data={_data_for_columns}
        SubComponent={SubComponent}
      />
    </TreeTableStyled>
  )
}

export default CustomTable
