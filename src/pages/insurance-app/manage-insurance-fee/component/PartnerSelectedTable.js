import React from 'react'
import { getKeyLang } from '../../../../configs/insurance-app'
import 'react-table/react-table.css'
import { Table } from 'reactstrap'
import {
    FormattedMessage,
} from 'base-app'
import styled from 'styled-components'

const TrStyled = styled.tr`
background-color: ${p => p.selected ? "#c7c7c7" : "inherit"};
cursor: pointer;
`

const PartnerSelectedTable = ({ dispatch, partnerSelect, userPartnerSelect, setUserPartnerSelect }) => {
    return (
        <div className='col-xs-12 col-md-10 mx-auto bonus-table mb-2'>
            <div className="margin-top-14 mb-2 text-bold-600">
                <FormattedMessage id={getKeyLang(`PartnerInfo`)} />
            </div>
            <Table responsive bordered hover>
                <thead>
                    <tr>
                        <th><FormattedMessage id={getKeyLang(`PartnerName`)} /></th>
                        <th><FormattedMessage id={getKeyLang(`PartnerUser`)} /></th>
                        <th><FormattedMessage id={getKeyLang(`PartnerPhone`)} /></th>
                        <th><FormattedMessage id={getKeyLang(`Email`)} /></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        partnerSelect.map((partner) => (
                            <TrStyled
                                key={partner.id}
                                onClick={() => {
                                    setUserPartnerSelect(partner.id)
                                    dispatch({
                                        type: 'ACTION_RESET_FEE',
                                        payload: ''
                                    })
                                }}
                                selected={userPartnerSelect === partner.id}
                            >
                                <td>{partner.fullName}</td>
                                <td>{partner.userCode}</td>
                                <td>{partner.phoneNumber}</td>
                                <td>{partner.email}</td>
                            </TrStyled>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default PartnerSelectedTable
