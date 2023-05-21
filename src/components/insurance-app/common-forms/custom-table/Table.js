import React from 'react'
import styled from 'styled-components'
import { isArrayEmpty } from '../../../../ultity'

const TableStyle = styled.table`
    border-collapse: collapse;
    width: 100%;
    td, th {
        border: 1px solid #dae8de;
        padding: 0.5rem;
        text-align: left;
    }
`

/** 
 * @example
 * const headRow = [
        {
            msgField: "title",  // can omitted
            title: "title",
            colSpan: 1,
            rowSpan: 1,
            className: "",
        },
    ]

   const headRow_test_2 = [
       [
           {
                msgField: "title", // can omitted
                title: "title",
                colSpan: 1,
                rowSpan: 1,
                className: "",
           }
       ],
       [
           {
                msgField: "title", // can omitted
                title: "title",
                colSpan: 1,
                rowSpan: 1,
                className: "",
           }
       ],
    ]

    const bodyRows = [
        {
            contents: [
                { 
                    content: "Hoang Nam" , // can omitted
                    title: "Hoang Nam" ,
                    className: "",
                },
            ]
        },
    ]

    return (
            <Origin
                headRow={headRow} bodyRows={bodyRows}
            />
    )
 */

const CustomTable = ({ headRow = [], bodyRows = [] }) => {
    const renderHeadRow = () => {
        if (isArrayEmpty(headRow)) return null

        if (Array.isArray(headRow[0])) {
            return headRow.map((eltArr, index) => {
                return (
                    <tr key={"tr " + index}>
                        {
                            eltArr.map((elt, _index) => {
                                return (
                                    <th key={"th " + _index}
                                        colSpan={elt.colSpan || 1} rowSpan={elt.rowSpan || 1}
                                        className={"font-medium-2 " + elt.className || ""}
                                    >
                                        {
                                            elt.msgField || elt.title
                                        }
                                    </th>
                                )
                            })
                        }
                    </tr>
                )

            })
        }

        return (
            <tr>
                {
                    headRow.map((elt, index) => {
                        return (
                            <th key={"th " + index}
                                colSpan={elt.colSpan || 1} rowSpan={elt.rowSpan || 1}
                                className={"font-medium-2 " + elt.className || ""}
                            >
                                {
                                    elt.msgField || elt.title
                                }
                            </th>
                        )
                    })
                }
            </tr>
        )
    }

    return (
        <div style={{ overflowX: "auto", width: "100%" }}>
            <TableStyle >
                <thead>
                    {
                        renderHeadRow()
                    }
                </thead>
                <tbody>
                    {
                        bodyRows.map((personInfo, index) => {
                            return (
                                <tr key={"tr " + index}>
                                    {
                                        personInfo.contents.map((elt, index) => {
                                            return (
                                                <td className={"font-medium-1 " + elt.className || ""} key={index}>
                                                    {
                                                        elt.content || elt.title
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </TableStyle>
        </div>
    )
}

export default CustomTable