
import React from 'react'
import { useIntl } from 'react-intl'
import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import 'react-table/react-table.css'
import useColumns from './ColumnsTable'

const TableData = ({data , isImportPage}) => {
  const intl = useIntl()
  const TreeTable = treeTableHOC(ReactTable)
  const { Table, columns } = useColumns(isImportPage)
  return (
    <TreeTable
      className='nested-table -striped -highlight'
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
      data={data}
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
  )
}

export default TableData
