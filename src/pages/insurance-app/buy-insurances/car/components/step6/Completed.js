import 'react-toggle/style.css'
import React from 'react'
import Original from '../../../../../../components/insurance-app/buy-insurances-page/step/CompleteContractBase'
/**@example
  _keys = {
           invoiceTypeInsurBuyer: {
               KEY_ID_PERSON_TYPE: "KEY_ID_PERSON_TYPE",
               KEY_NAME: "KEY_NAME",
               KEY_ADDRESS: "KEY_ADDRESS",
               KEY_PHONE_NUMBER: "KEY_PHONE_NUMBER",
               KEY_EMAIL: "KEY_EMAIL",
           },
           invoiceTypePers: {
               KEY_ID_PERSON_TYPE: "KEY_ID_PERSON_TYPE",
               KEY_IC_NO: "KEY_IC_NO",
               KEY_ADDRESS: "KEY_ADDRESS",
               KEY_PHONE_NUMBER: "KEY_PHONE_NUMBER",
               KEY_EMAIL: "KEY_EMAIL",
               KEY_BUYER_PERS: "KEY_BUYER_PERS",
           },
           invoiceTypeCops: {
               KEY_TAX_ID: "KEY_TAX_ID",
               KEY_NAME_COPR: "KEY_NAME_COPR",
               KEY_ADDRESS: "KEY_ADDRESS",
               KEY_PHONE_NUMBER: "KEY_PHONE_NUMBER",
               KEY_EMAIL: "KEY_EMAIL",
           },
           KEY_INVOICE_TYPE : "KEY_INVOICE_TYPE"
   }
   <Completed
       payContractStatus={payContractStatus} keys={_keys} // keys can omitted
   />
 */
const Completed = ({ keys, payContractStatus }) => {
    return (
        <Original
            payContractStatus={payContractStatus}
            keys={keys}
        />
    )
}

export default Completed
