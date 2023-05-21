import React from 'react'
import { FormattedMessage } from 'react-intl'
import TreeTable from "../../../../../../../components/insurance-app/common-forms/custom-table/TreeTable"
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import ExpandableTable from "../../../../../../../components/insurance-app/common-forms/custom-table/ExpandableTable"
import { intlConvertToVnd, isArrayEmpty } from '../../../../../../../ultity'
import { useIntl } from 'react-intl'
import moment from 'moment'

const CustomTable = ({ stepInfo }) => {
    const intl = useIntl()
    const { returnUploaded } = stepInfo
    let _data_for_columns = []
    if (!isArrayEmpty(returnUploaded)) {
        _data_for_columns = returnUploaded
    }

    const columns = [
        {
            Header: <FormattedMessage id={getKeyLang(`NumberPlate`)} />,
            accessor: `numberPlate`
        },
        {
            Header: <FormattedMessage id={getKeyLang("TypeVihicle")} />,
            accessor: `vehicleType`,
        },
        {
            Header: <FormattedMessage id={getKeyLang("BrandVehicle")} />,
            accessor: `manufactureName`,
        },
        {
            Header: <FormattedMessage id={getKeyLang("LineVehicle")} />,
            accessor: `branchName`,
        },
    ]

    const SubComponent = ({ original: original_data_for_columns }) => {
        const { frameNo, machineNo,
            fullName, icType, icNo, telephone, email, address, duration, startValueDate,
            mountOfPeople, mtnTgT
        } = original_data_for_columns

        const _rows = [
            {
                msgField: <FormattedMessage id={getKeyLang("FrameNumber")} />,
                content: frameNo
            },
            {
                msgField: <FormattedMessage id={getKeyLang("MachineNumber")} />,
                content: machineNo
            },
            {
                title: <span className='text-primary'><FormattedMessage id={getKeyLang("ownAcctInfo")} /></span>,
            },
            {
                msgField: <FormattedMessage id={getKeyLang("fullName")} />,
                content: fullName
            },
            {
                msgField: <FormattedMessage id={getKeyLang("icNoType")} />,
                content: icType
            },
            {
                msgField: <FormattedMessage id={getKeyLang("idPers")} />,
                content: icNo
            },
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
            {
                title: <span className='text-primary'><FormattedMessage id={getKeyLang("InsuaranceContent")} /></span>,
            },
            {
                msgField: <FormattedMessage id={getKeyLang("RangeDate")} />,
                content: `${duration} tháng`
            },
            {
                msgField: <FormattedMessage id={getKeyLang("insuranceApplyFrom")} />,
                content: moment(startValueDate).format('MM-DD-YYYY')
            },
        ]

        const _bonus = [
            {
                title: <span className='text-primary'><FormattedMessage id={getKeyLang("BHTNNNTXMTXM")} /></span>,
            },
            {
                msgField: <FormattedMessage id={getKeyLang("addResponsibility")} />,
                content: `${intlConvertToVnd(mtnTgT, intl)} VND`
            },
            {
                msgField: <FormattedMessage id={getKeyLang("amountInCar")} />,
                content: mountOfPeople
            },
        ]

        if (true) {
            _rows.push(..._bonus)
        }

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