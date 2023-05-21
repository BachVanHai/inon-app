import React, { useEffect } from 'react'
import '../../../assets/scss/app-no1/user-group.scss'

import { AppId, Button } from 'base-app'
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { loadListAccountInGroup } from '../../../redux/actions/app-no1/userGroup'
import matchSorter from 'match-sorter'
import ReactTable from '../../../components/app-no1/ReactTable'

const UserGroupDetail = () => {
  const { accounts } = useSelector((state) => state.app.userGroup)
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()

  useEffect(() => {
    if (params.groupId) {
      dispatch(loadListAccountInGroup(params.groupId))
    }
  }, [])

  const columns = [
    {
      Header: '#',
      id: 'id',
      filterable: false,
      Cell: ({ index }) => index + 1
    },
    {
      Header: (
        <FormattedMessage id={`${AppId.APP_NO1}.partner.account.accountCode`} />
      ),
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['userCode'] }),
      filterAll: true,
      accessor: 'userCode'
    },
    {
      Header: (
        <FormattedMessage id={`${AppId.APP_NO1}.partner.account.fullName`} />
      ),
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['fullName'] }),
      filterAll: true,
      accessor: 'fullName'
    },
    {
      Header: <FormattedMessage id={`${AppId.APP_NO1}.account.phoneNumber`} />,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['phoneNumber'] }),
      filterAll: true,
      accessor: 'phoneNumber'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-uppercase'>
          <FormattedMessage
            id={`${AppId.APP_NO1}.userGroup.details`}
            values={{ name: params.groupId || '' }}
          />
        </CardTitle>
      </CardHeader>
      <CardBody className='approve-lg-content'>
        <ReactTable
          data={accounts}
          defaultPageSize={10}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          columns={columns}
        />
      </CardBody>
      <CardFooter>
        <div className='d-flex justify-content-end'>
          <Button.Ripple
            color='primary'
            onClick={() => history.push('/app/permission-group/management')}
          >
            <FormattedMessage id={`${AppId.APP_NO1}.userGroup.back`} />
          </Button.Ripple>
        </div>
      </CardFooter>
    </Card>
  )
}

export default UserGroupDetail
