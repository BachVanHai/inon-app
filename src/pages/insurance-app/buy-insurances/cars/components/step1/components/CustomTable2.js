import React from 'react'
import { FormattedMessage } from 'react-intl'
import TreeTable from "../../../../../../../components/insurance-app/common-forms/custom-table/TreeTable"
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import ExpandableTable from "../../../../../../../components/insurance-app/common-forms/custom-table/ExpandableTable"
import { isArrayEmpty } from '../../../../../../../ultity'

const CustomTable = ({ stepInfo }) => {
    const { returnOwnerUploaded } = stepInfo
    let _data_for_columns = []
    if (!isArrayEmpty(returnOwnerUploaded)) {
        _data_for_columns = returnOwnerUploaded
    }

    const columns = [
        {
            Header: <FormattedMessage id={getKeyLang(`LicensePlate`)} />,
            accessor: `numberPlate`,
            minWidth: 40
        },
        {
            Header: <FormattedMessage id={getKeyLang("nameOrEnterprise")} />,
            accessor: `fullName`,
        },
        {
            Header: <FormattedMessage id={getKeyLang("icNoType")} />,
            accessor: `icType`,
            minWidth: 50
        },
        {
            Header: <FormattedMessage id={getKeyLang("idPersOrMST")} />,
            accessor: `icNo`,
        },
    ]

    const SubComponent = ({ original: original_data_for_columns }) => {
        const {
            email,
            address,
            telephone,
        } = original_data_for_columns

        const _rows = [
            {
                msgField: <FormattedMessage id={getKeyLang("PartnerPhone")} />,
                content: telephone
            },
            {
                msgField: <FormattedMessage id={getKeyLang("Email")} />,
                content: email
            },
            {
                msgField: <FormattedMessage id={getKeyLang("Address")} />,
                content: address
            },
        ]

        return (
            <div style={{ padding: '4px' }}>
                <ExpandableTable
                    rows={_rows}
                />
            </div>
        )
    }

    return (
        <TreeTable
            columns={columns}
            data={_data_for_columns}
            SubComponent={SubComponent}
        />
    )
}

export default CustomTable