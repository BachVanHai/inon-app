import React from 'react'
import Origin from '../../../../../../../components/insurance-app/common-forms/custom-table'

/**
 * @example
 const headRow = [
     {
         msgField: "Ten nguoi bao hiem",
     },
 ]

 const bodyRows = [
     {
         contents: [
             { content: "Hoang Nam" },
         ]
     },
 ]

 return (
         <Origin
             headRow={headRow} bodyRows={bodyRows}
         />
 )
 */

const CustomTable = ({ headRow, bodyRows }) => {
    return (
        <Origin
            headRow={headRow} bodyRows={bodyRows}
        />
    )
}

export default CustomTable
