import React from 'react'
import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import { TreeTable_filterMethod } from '../../../../ultity'
import styled from 'styled-components'

const TreeTable = treeTableHOC(ReactTable)

const TreeTableStyle = styled(TreeTable)`
    .rt-td {
        text-align: center;
    }
    td {
        padding: .8rem;
    }
`

/** 
 *  @example
 *   const _data_for_columns = [
        {
            vehicleInfo: "vehicleInfo",
            ownAcctInfo: "ownAcctInfo",
            InsuaranceContent: "InsuaranceContent",
        },
    ]

    columns = [
        {
            Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.InsuranceNum`} />,
            accessor: `contractCode`
        },
        {
            Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.InsuranceStatus`} />,
            accessor: `latestApprovalStatus`,
            Cell: ({ original }) => {
                return (
                    <div>dang phe duyet</div>
                )
            },
            filterMethod: (filter, row) => {
                console.log(`filter,row`, filter, row)
            },
            Filter: ({ filter, onChange }) => (
                <select
                    onChange={event => onChange(event.target.value)}
                    className={`React custom-zindex9`}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : "all"}
                >
                    {
                        [].map(item =>
                            <option key={item.value} value={item.value}>{item.label}</option>
                        )
                    }
                </select>
            )
        },
        {
            Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.InsuranceCert`} />,
            filterable: false,
            Cell: ({ original }) => {
                return (
                    <div>dang phe duyet</div>
                )
            }
        },
    ]

    SubComponent = ({original : original_data_for_columns}) => {
        const _rows = [
            {
                msgField: <FormattedMessage id={getKeyLang("FrameNumber")} />,
                content: "35345345"
            },
        ]

        return (
            <div style={{ padding: '4px' }}>
                <ExpandableTableCarView
                     rows={_rows}
                />
            </div>
        )
    }
    return
        <TreeTable
            filterable
            columns={columns}
            data={_data_for_columns}
            SubComponent={SubComponent}
        />
*/
const Original = ({ filterable, data, columns, SubComponent, filterMethod , refByUser }) => {
    const decide = () => {
        if (filterMethod) {
            return filterMethod
        }
        return TreeTable_filterMethod
    }

    return (
        <TreeTableStyle
            data={data}
            columns={columns}
            defaultPageSize={10}
            filterable={filterable}
            SubComponent={SubComponent}
            defaultFilterMethod={decide()}
            className="dataTable-custom ReacttableIns"
        />
    )
}

export default Original