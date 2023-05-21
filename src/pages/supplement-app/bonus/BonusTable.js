
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { getKeyLang } from '../../../configs/supplement-app'
import 'react-table/react-table.css'
import { Table } from 'reactstrap'

const BonusTable = ({ users, userSelected, setUserSelected }) => {


    return <React.Fragment>
        <div className='col-xs-12 col-md-6 mx-auto bonus-table'>
            <Table responsive bordered hover>
                <thead>
                    <tr>
                        <th>
                            <FormattedMessage id={getKeyLang('bonus.userCode')} />
                        </th>
                        <th>
                            <FormattedMessage id={getKeyLang('bonus.fullName')} />
                        </th>
                        <th>
                            <FormattedMessage id={getKeyLang('bonus.phoneNumber')} />
                        </th>
                        <th>
                            <FormattedMessage id={getKeyLang('bonus.address')} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id} onClick={() => setUserSelected(user)} className={userSelected.id === user.id ? 'user-selected' : ''}>
                                <td>{user.userCode}</td>
                                <td>{user.fullName}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.address}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </div>
    </React.Fragment>
}

export default BonusTable
