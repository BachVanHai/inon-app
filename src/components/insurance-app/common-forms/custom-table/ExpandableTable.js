
import "../../../../assets/scss/insurance-app/common/react-tables.scss"
import '../../../../assets/scss/insurance-app/buy-insurance/account.scss'
import '../../../../assets/scss/insurance-app/buy-insurance/buy-insurance-car.scss'
import 'react-table/react-table.css'
import React from 'react'
import { Table } from 'reactstrap'
import styled from 'styled-components'

const TableStyled = styled(Table)`

`

const Title = styled.div`
    padding-top: .8rem;
    padding-bottom: .8rem;
    padding-left: .8rem;
    
    @media (min-width : 1024px) {
        & {
            width: 300px;
            white-space: nowrap; 
            text-overflow: ellipsis;
            overflow: visible;
        }
    }
`

/** @example
    const rows = [
        {
            msgField: "Something",
            content: "Something"
        },
    ]
    return (
        <div style={{ padding: '4px' }}>
            <ExpandableTable
                rows={rows}
            />
        </div>
    )
 */

const ExpandableTable = ({ rows }) => {
    return (
        <TableStyled responsive bordered className="insurance-manage-list expandable-table">
            <tbody>
                {
                    rows.map((elt, index) => {
                        const { title } = elt
                        if (title) {
                            return (
                                <Title key={index}>
                                    {title}
                                </Title>
                            )
                        }
                        return (
                            <tr key={index}>
                                <td className='table-detail-header'>
                                    {
                                        elt.msgField
                                    }
                                </td>
                                <td>
                                    {
                                        elt.content
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </TableStyled>
    )
}

export default ExpandableTable