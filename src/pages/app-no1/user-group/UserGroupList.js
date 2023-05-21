import React, {useEffect} from 'react'
import '../../../assets/scss/app-no1/user-group.scss'
import matchSorter from 'match-sorter'
import {AppId, Button, showConfirmAlert} from 'base-app'
import {Card, CardBody, CardFooter, CardHeader, CardTitle} from 'reactstrap'
import {FormattedMessage} from 'react-intl'
import {useDispatch, useSelector} from 'react-redux'
import {deleteUserGroup, loadUserGroup} from '../../../redux/actions/app-no1/userGroup'
import {Link, useHistory} from 'react-router-dom'
import ReactTable from '../../../components/app-no1/ReactTable'
import * as Icon from 'react-feather'
import {getKeyLang} from '../../../configs/app-no1'

const UserGroupList = () => {
    const userGroups = useSelector((state) => state.app.userGroup.userGroups)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(loadUserGroup())
    }, [])

    const onClickDeleteUserGroup = (row) => {
        dispatch(
            showConfirmAlert({
                title: <FormattedMessage id={getKeyLang('userGroup.deleteGroup')}/>,
                isShow: true,
                content: <FormattedMessage id={getKeyLang('userGroup.deleteGroup.confirmMessage')}
                                           values={{name: row.name}}/>,
                onConfirm: () => {
                    dispatch(deleteUserGroup(row.id))
                }
            })
        )
    }

    const onClickEditUserGroup = (row) => {
        dispatch(
            showConfirmAlert({
                title: <FormattedMessage id={getKeyLang('userGroup.editGroup')}/>,
                isShow: true,
                content: <FormattedMessage id={getKeyLang('userGroup.editGroup.confirmMessage')}
                                           values={{name: row.name}}/>,
                onConfirm: () => {
                    history.push(`/app/permission-group/create/${row.id}`)
                }
            })
        )
    }

    const onClickBackHome = () => {
        dispatch(
            showConfirmAlert({
                title: <FormattedMessage id='common.home'/>,
                isShow: true,
                content: <FormattedMessage id='common.backHome.confirmMessage'/>,
                onConfirm: () => {
                    history.push('/app/home')
                }
            })
        )
    }

    const columns = [
        {
            Header: <FormattedMessage id={`${AppId.APP_NO1}.userGroup.code`}/>,
            id: 'name',
            Cell: ({original}) => (
                <div className='text-left pl-3'>
                    <Link to={`/permission-group/management/${original.code}`}>{original.name}</Link>
                </div>
            ),
            minWidth : 200,
            filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, {keys: ['name']}),
            filterAll: true
        },
        {
            Header: (
                <FormattedMessage id={`${AppId.APP_NO1}.userGroup.description`}/>
            ),
            minWidth : 300,
            id: 'description',
            accessor: (d) => <div className='text-left'>{d.description}</div>,
            filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, {keys: ['description']}),
            filterAll: true
        },
        {
            Header: <FormattedMessage id={`${AppId.APP_NO1}.userGroup.action`}/>,
            id: 'action',
            minWidth : 200,
            filterable: false,
            accessor: (d) => (
                <React.Fragment>
                    <div className='text-center'>
                        <Button.Ripple
                            onClick={() => onClickEditUserGroup(d)}
                            className='btn-icon rounded-circle'
                            color='flat-success'
                        >
                            <Icon.Edit3 className='vx-icon' size={24}/>
                        </Button.Ripple>
                        <Button.Ripple
                            disabled={d.isDefault}
                            onClick={() => onClickDeleteUserGroup(d)}
                            className='ml-2 btn-icon rounded-circle'
                            color='flat-danger'
                        >
                            <Icon.X className='vx-icon' size={24}/>
                        </Button.Ripple>
                    </div>
                </React.Fragment>
            )
        }
    ]

    return (
        <React.Fragment>
            <Card className={'user-group-list'}>
                <CardHeader>
                    <CardTitle className='text-uppercase'>
                        <FormattedMessage id={'menu.permissionGoupManagement'}/>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <ReactTable
                        data={userGroups}
                        defaultSorted={[
                            {
                                id: "name",
                                desc: false
                            }
                        ]}
                        filterable
                        defaultPageSize={10}
                        minRows='4'
                        columns={columns}
                    />
                </CardBody>
                <CardFooter>
                    <div className='d-flex justify-content-end'>
                        <Button.Ripple color='secondary' className='mr-2' onClick={onClickBackHome}>
                            <FormattedMessage id='common.home'/>
                        </Button.Ripple>
                    </div>
                </CardFooter>
            </Card>
        </React.Fragment>
    )
}

export default UserGroupList
