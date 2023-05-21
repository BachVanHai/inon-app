import React from 'react'
import Table from 'react-table'
import 'react-table/react-table.css'
import {useIntl} from "react-intl";

const ReactTable = (props) => {

    const intl = useIntl()
    return (
        <Table
            previousText={intl.formatMessage({id: 'common.table.previous'})}
            nextText={intl.formatMessage({id: 'common.table.next'})}
            noDataText={intl.formatMessage({id: 'common.table.noData'})}
            pageText={intl.formatMessage({id: 'common.table.page'})}
            ofText={intl.formatMessage({id: 'common.table.of'})}
            rowsText={intl.formatMessage({id: 'common.table.rows'})}
            {...props}
        />
    )
}

export default ReactTable
