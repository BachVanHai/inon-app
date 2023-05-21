import React from 'react'
import AlterBeneficiary from "../../../../../../../components/insurance-app/common-forms/alter-beneficiaries"

/** @example
    <AlterBeneficiary
            callbacks={{
                banksSelectChange: (original) => {
                },
                branchInputChange: (e) => {
                },
                addressInputChange: (e) => {
                },
                currencyInputChange: (e) => {
                },
            }}
            keyNames={{
                KEY_BANKS_SELECT: "KEY_BENEFIARRY_BANK_SELETECTED",
                KEY_BRANCH_NAME_INPUT: "KEY_BENEFICIARY_BRANCH",
                KEY_ADDRESS_INPUT: "KEY_BENEFICIARY_ADDRESS",
                KEY_CURRENCY_INPUT: "KEY_BENEFICIARY_LIMIT"
            }}
    />
 */
const SubBenificiary = ({ callbacks, keyNames }) => {
    const { banksSelectChange, branchInputChange, addressInputChange, currencyInputChange } = callbacks
    const { KEY_BANKS_SELECT, KEY_BRANCH_NAME_INPUT, KEY_ADDRESS_INPUT, KEY_CURRENCY_INPUT } = keyNames

    return (
        <AlterBeneficiary
            callbacks={{
                banksSelectChange: banksSelectChange,
                branchInputChange: branchInputChange,
                addressInputChange: addressInputChange,
                currencyInputChange: currencyInputChange,
            }}
            keyNames={{
                KEY_BANKS_SELECT: KEY_BANKS_SELECT,
                KEY_BRANCH_NAME_INPUT: KEY_BRANCH_NAME_INPUT,
                KEY_ADDRESS_INPUT: KEY_ADDRESS_INPUT,
                KEY_CURRENCY_INPUT: KEY_CURRENCY_INPUT
            }}
            className="mt-2 mb-1"
        />
    )
}

export default SubBenificiary
