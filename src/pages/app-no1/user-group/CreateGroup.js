import React, {useEffect, useState} from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Table,
    CardFooter,
    Col, Row
} from 'reactstrap'
import {
    AppId,
    BaseAppConfigs,
    BaseFormGroup,
    Button,
    Checkbox,
    FormattedMessage,
    showConfirmAlert
} from 'base-app'
import {useDispatch, useSelector} from 'react-redux'
import {
    loadListRoles,
    updateUserGroup,
    createNewUserGroup
} from '../../../redux/actions/app-no1/userGroup'
import {Check, CheckSquare} from 'react-feather'
import {useHistory, useParams} from 'react-router-dom'
import {Form, Formik} from 'formik'
import UserGroupService from '../../../services/app-no1/userGroup'
import '../../../assets/scss/app-no1/user-group.scss'
import * as Yup from 'yup'
import PerfectScrollBar from 'react-perfect-scrollbar'

const CreateGroup = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const roles = useSelector((state) => [...state.app.userGroup.roles])
    const params = useParams()
    const [isEdit, setIsEdit] = useState(false)
    const [userGroup, setUseGroup] = useState({name: '', description: ''})
    const roleItems = []
    useEffect(() => {
        const {groupId} = params
        dispatch(loadListRoles(groupId))
        if (groupId) {
            getUserGroup(groupId)
            setIsEdit(!!groupId)
        } else {
            setUseGroup({name: '', description: ''})
            setIsEdit(false)
        }
    }, [params])

    const getUserGroup = async (groupId) => {
        const res = await UserGroupService.getUserGroup(groupId)
        if (res.status === 200 && res.data) {
            setUseGroup({...res.data, userGroupId: groupId})
        }
    }

    const onClickSavePermission = (values, actions) => {
        if (isEdit) {
            dispatch(updateUserGroup(values, roleItems))
        } else {
            dispatch(createNewUserGroup(values, roleItems))
        }
        actions.setSubmitting(false)
    }

    const onClickBackHome = () => {
        dispatch(
            showConfirmAlert({
                title: <FormattedMessage id='common.home'/>,
                isShow: true,
                content: <FormattedMessage id='common.backHome.confirmMessage'/>,
                onConfirm: () => {
                    history.push('/')
                }
            })
        )
    }

    const TableRow = ({role}) => {
        const maxRow = Math.max(role.children1.length, role.children2.length)
        const [mapChidren1ShowIndex, setMapChidrenShowIndex] = useState(new Map())
        const [rows, setRows] = useState([])

        useEffect(() => {
            const items = []
            for (let i = 0; i < maxRow; i++) {
                const children2 = role.children2[i]
                const children1 = children2
                    ? role.children1.find((item) => item.id === +children2.parentId)
                    : role.children1[i]
                const child1Id = children1 ? children1.id : ''
                let mainItem = children2 || children1
                mainItem.all =
                    mainItem.view && mainItem.edit && mainItem.approve && mainItem.create
                const parentIds = [role.id]
                if (children2 && child1Id) {
                    parentIds.push(child1Id)
                }
                const item = {
                    parent: role,
                    children1,
                    children2,
                    parentIds,
                    ...mainItem
                }
                items.push(item)
            }
            getMapChidren1ShowIndex()
            setRows([...items])
            roleItems.push(...items)
        }, [role])

        const onChangePermission = (item, action, checked) => {
            item[action] = checked
            if (action !== 'view' && checked) {
                item.view = true
            }
            if (action === 'all') {
                item.view = checked
                item.edit = checked
                item.create = checked
                item.approve = checked
            }
            item.all = item.view && item.edit && item.create && item.approve
            setRows([...rows])
        }

        const getMapChidren1ShowIndex = () => {
            let showIndex = 0
            role.children1.forEach((item) => {
                mapChidren1ShowIndex.set(item.id, showIndex)
                showIndex += item.children.length ? item.children.length : 1
            })
            setMapChidrenShowIndex(mapChidren1ShowIndex)
        }

        const permissions = ['all', 'view', 'edit', 'create', 'approve']

        return rows.map((item, index) => {
            return (
                <tr key={index}>
                    {index === 0 ? (
                        <td width='20%' rowSpan={maxRow}>
                            {<FormattedMessage id={`menu.${item.parent.keyLang}`}/>}
                        </td>
                    ) : null}
                    {item.children1 ? (
                        mapChidren1ShowIndex.get(item.children1.id) === index ? (
                            <td width='30%' rowSpan={item.children1.children.length || 1}>
                                {<FormattedMessage id={`menu.${item.children1.keyLang}`}/>}
                            </td>
                        ) : null
                    ) : (
                        <td></td>
                    )}
                    <td width='30%'>
                        {item.children2 ? (
                            <FormattedMessage id={`menu.${item.children2.keyLang}`}/>
                        ) : (
                            ''
                        )}
                    </td>
                    {permissions.map((p) => (
                        <td key={p}>
                            <div className='d-flex justify-content-center'>
                                <Checkbox
                                    color='primary'
                                    checked={item[p]}
                                    icon={<Check className='vx-icon' size={16}/>}
                                    onChange={(e) =>
                                        onChangePermission(item, p, e.target.checked)
                                    }
                                />
                            </div>
                        </td>
                    ))}
                </tr>
            )
        })
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(
            <FormattedMessage
                id={'commom.error.requireField'}
                values={{
                    fieldName: (
                        <FormattedMessage id={`${AppId.APP_NO1}.userGroup.code`}/>
                    )
                }}
            />
        ).matches(BaseAppConfigs.NAME_REGEX, () => <FormattedMessage id={`${AppId.APP_NO1}.userGroup.code.invalid`}/>),
        description: Yup.string().required(
            <FormattedMessage
                id={'commom.error.requireField'}
                values={{
                    fieldName: (
                        <FormattedMessage id={`${AppId.APP_NO1}.userGroup.description`}/>
                    )
                }}
            />
        )
    })

    return (
        <React.Fragment>
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={{
                    ...userGroup
                }}
                onSubmit={onClickSavePermission}
            >
                {({errors, touched}) => (
                    <Form>
                        <Card className='create-group'>
                            <CardHeader>
                                <CardTitle className='text-uppercase'>
                                    {isEdit ? (
                                        <FormattedMessage
                                            id={`${AppId.APP_NO1}.userGroup.editPermission`}
                                        />
                                    ) : (
                                        <FormattedMessage id='menu.creatPermissionGoup'/>
                                    )}
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs={12} md={6} lg={4} >
                                        <BaseFormGroup
                                            messageId={`${AppId.APP_NO1}.userGroup.code.required`}
                                            errors={errors}
                                            touched={touched}
                                            fieldName='name'
                                        />
                                    </Col>
                                    <Col xs={12} md={6} lg={4}>
                                        <BaseFormGroup
                                            messageId={`${AppId.APP_NO1}.userGroup.description.required`}
                                            errors={errors}
                                            touched={touched}
                                            fieldName='description'
                                        />
                                    </Col>
                                </Row>
                                <div className='table-user-group'>
                                    <PerfectScrollBar>
                                        <Table responsive bordered>
                                            <thead>
                                            <tr className='text-center'>
                                                <th width='30%' rowSpan='2'>
                                                    <FormattedMessage
                                                        id={`${AppId.APP_NO1}.userGroup.groupFunction`}
                                                    />
                                                </th>
                                                <th width='30%' rowSpan='2'>
                                                    <FormattedMessage
                                                        id={`${AppId.APP_NO1}.userGroup.functions`}
                                                    />
                                                </th>
                                                <th width='30%' rowSpan='2'>
                                                    <FormattedMessage
                                                        id={`${AppId.APP_NO1}.userGroup.tab`}
                                                    />
                                                </th>
                                                <th colSpan='5'>
                                                    <FormattedMessage
                                                        id={`${AppId.APP_NO1}.userGroup.permission`}
                                                    />
                                                </th>
                                            </tr>
                                            <tr className='text-center'>
                                                <th>
                                                    <CheckSquare size={18}/>
                                                </th>
                                                <th>
                                                    <FormattedMessage
                                                        id={`${AppId.APP_NO1}.userGroup.permission.view`}
                                                    />
                                                </th>
                                                <th>
                                                    <FormattedMessage
                                                        id={`${AppId.APP_NO1}.userGroup.permission.edit`}
                                                    />
                                                </th>
                                                <th>
                                                    <FormattedMessage
                                                        id={`${AppId.APP_NO1}.userGroup.permission.create`}
                                                    />
                                                </th>
                                                <th>
                                                    <FormattedMessage
                                                        id={`${AppId.APP_NO1}.userGroup.permission.approve`}
                                                    />
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {roles.map((item) => (
                                                <TableRow key={item.id} role={item}/>
                                            ))}
                                            </tbody>
                                        </Table>
                                    </PerfectScrollBar>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <div className='d-flex justify-content-end'>
                                    <Button.Ripple color='secondary' className='mr-2' onClick={onClickBackHome}>
                                        <FormattedMessage id='common.home'/>
                                    </Button.Ripple>
                                    <Button.Ripple color='primary' type='submit'>
                                        <FormattedMessage id={`${AppId.APP_NO1}.userGroup.done`}/>
                                    </Button.Ripple>
                                </div>
                            </CardFooter>
                        </Card>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}

export default CreateGroup
