import React, { useEffect, useState } from 'react'
import {
  Row,
  Col,
  Button,
  CardHeader,
  Card,
  CardBody,
  CardTitle,
  CardFooter, ButtonGroup, PopoverHeader, PopoverBody, UncontrolledPopover
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import { Formik, Form, Field } from 'formik'
import {
  AppId,
  BaseFormGroup,
  BaseFormGroupSelect,
  BaseAppConfigs,
  showConfirmAlert
} from 'base-app'
import { useHistory, useParams } from 'react-router-dom'
import 'react-toggle/style.css'
import { getKeyLang, USER_TYPE } from '../../../../configs/app-no1'
import CreateFeeAndBonus from './create-fee-bonus/CreateFeeAndBonus'
import '../../../../assets/scss/app-no1/account.scss'
import UserGroupService from '../../../../services/app-no1/userGroup'
import {
  createAccount, updateAccountInsuranceSettings
} from '../../../../redux/actions/app-no1/account'
import AccountService from '../../../../services/app-no1/account'
import tooltip from '../../../../assets/images/app-no1/home/tooltip.svg'

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required(<FormattedMessage id={getKeyLang('account.fullName.required')} />)
    .matches(BaseAppConfigs.NAME_REGEX, () => (
      <FormattedMessage id={getKeyLang('account.fullName.inccorect')} />
    )),
  groupId: Yup.string().when('isShowUserGroup', {
    is: true,
    then: Yup.string().required(
      <FormattedMessage id={getKeyLang('account.permission.required')} />
    )
  }),
  phoneNumber: Yup.string()
    .matches(BaseAppConfigs.PHONE_REGEX, () => (
      <FormattedMessage id='register.phoneNumber.invalid' />
    ))
    .required(
      <FormattedMessage id={getKeyLang('account.phoneNumber.required')} />
    ),
  managerId: Yup.string().nullable()
    .when('groupId', {
      is: 'HT.DT',
      then: Yup.string().required(<FormattedMessage id={getKeyLang('account.managerLevel.required')} />)
    }),
  email: Yup.string()
    .required(<FormattedMessage id={getKeyLang('account.email.required')} />)
    .email(<FormattedMessage id={getKeyLang('account.email.invalid')} />)
})

const USER_DEFAULT = {
  fullName: '',
  phoneNumber: '',
  userType: USER_TYPE.KD,
  groupId: '',
  email: '',
  managerId: ''
}

const CreateAccountInfo = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [{ userDetails, userSettings = {}, ...user }, setUser] = useState({
    ...USER_DEFAULT
  })

  // const [userInsuranceSettings, setUserInsuranceSettings] = useState([])
  // const [step, setStep] = useState(1)
  const [isCreate, setIsCreate] = useState(true)
  const [creatableGroups, setCreatableGroups] = useState([])
  const params = useParams()
  const currentUserGroupId = useSelector((state) => state.auth.user.groupId)
  const groupCanSelectUserGroup = [
    BaseAppConfigs.USER_ROLE.ADMIN,
    BaseAppConfigs.USER_ROLE.KD,
    'HT.IO'
  ]

  useEffect(() => {
    (async () => {
      const { username } = params
      if (!username) {
        setUser({ ...USER_DEFAULT })
        setIsCreate(true)
        return
      } else {
        setIsCreate(false)
      }

      const res = await AccountService.getAccount(username)
      if (res.status === 200) {
        const { data } = res

        setUser(data)
        // setUserInsuranceSettings(
        //   data.isAwaitingApproval
        //     ? data.userInsuranceSettings || []
        //     : await AccountService.getInsuranceSettings(data.id)
        // )
      }
    })()
    getCreatableGroups().then()
  }, [params.username])

  const getCreatableGroups = async () => {
    const res = await UserGroupService.getCreatableUserGroup()
    if (res.status === 200) {
      setCreatableGroups(
        res.data.map((item) => ({ value: item.code, label: `${item.name} (${item.description})` }))
      )
    }
  }

  const onClickSubmit = (values) => {
    // const stateSubmit =
    //   values.userType === USER_TYPE.KD && step === 1 ? (isCreate ? 'createAccount' : 'continue') : 'done'
    const stateSubmit = 'done'
    dispatch(
      showConfirmAlert({
        title: (
          <FormattedMessage id={`${AppId.APP_NO1}.account.${stateSubmit}`} />
        ),
        isShow: true,
        content: (
          <FormattedMessage
            id={`${AppId.APP_NO1}.account.${stateSubmit}.confirmMessage`}
          />
        ),
        onConfirm: () => {
          // step === 1 ? submitStep1(values) : submitStep2(values)
          submitStep1(values)
        }
      })
    )
  }

  const submitStep1 = (values) => {
    if (isCreate && values.id) {
      // setStep(2)
      return
    }
    let callbackFunc = null
    if (values.userType === USER_TYPE.KD) {
      callbackFunc = (value) => {
        if (isCreate) {
          setUser({ ...value })
        }
        // setStep(2)
      }
    }
    dispatch(createAccount(values, callbackFunc, isCreate))
  }

  // const submitStep2 = (values) => {
  //   dispatch(
  //     updateAccountInsuranceSettings(
  //       { ...values, username: values.phoneNumber },
  //       userInsuranceSettings,
  //       isCreate
  //     )
  //   )
  // }

  const onClickBackHome = () => {
    dispatch(
      showConfirmAlert({
        title: <FormattedMessage id='common.home' />,
        isShow: true,
        content: <FormattedMessage id='common.backHome.confirmMessage' />,
        onConfirm: () => {
          history.push('/app/home')
          // setStep(1)
        }
      })
    )
  }

  // const onClickBack = () => {
  //   dispatch(
  //     showConfirmAlert({
  //       title: <FormattedMessage id={getKeyLang('account.back')} />,
  //       isShow: true,
  //       content: <FormattedMessage id={getKeyLang('account.back.confirmMessage')} />,
  //       onConfirm: () => {
  //         // setStep(1)
  //       }
  //     })
  //   )
  // }

  return (
    <Formik
      enableReinitialize
      onSubmit={onClickSubmit}
      validationSchema={validationSchema}
      initialValues={{
        ...user,
        approvedBy: user.approvedBy || user.updateBy,
        userDetails,
        userSettings
      }}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <Card className='create-account'>
            <CardHeader>
              <CardTitle className='text-uppercase'>
                {/*{step === 1 ? (*/}
                {/*  <FormattedMessage id={`${AppId.APP_NO1}.account.title`} />*/}
                {/*) : (*/}
                {/*  <FormattedMessage*/}
                {/*    id={`${AppId.APP_NO1}.account.createFeeAndBonus`}*/}
                {/*  />*/}
                {/*)}*/}
                <FormattedMessage id={`${AppId.APP_NO1}.account.title`} />
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col sm='12'>
                  <Row>
                    <Col sm='12' md='6' className='mt-2'>
                      <BaseFormGroup
                        messageId={`${AppId.APP_NO1}.account.fullName`}
                        fieldName='fullName'
                        errors={errors}
                        touched={touched}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm='12' md='6' className='mt-2'>
                      <BaseFormGroup
                        messageId={`${AppId.APP_NO1}.account.phoneNumber`}
                        fieldName='phoneNumber'
                        errors={errors}
                        touched={touched}
                      />
                    </Col>
                    <Col sm='12' md='6' className='mt-2'>
                      <BaseFormGroup
                        messageId={`${AppId.APP_NO1}.account.email`}
                        fieldName='email'
                        errors={errors}
                        touched={touched}
                      />
                    </Col>
                  </Row>
                  <Row>
                    {groupCanSelectUserGroup.indexOf(currentUserGroupId) >= 0 ? (
                      <Col sm='4' className='mt-2'>
                        <BaseFormGroupSelect
                          messageId={`${AppId.APP_NO1}.account.permission`}
                          fieldName='groupId'
                          options={creatableGroups}
                          errors={errors}
                          touched={touched}
                        />

                      </Col>
                    ) : null}
                    <Col sm='4' className='mt-2'>
                      <BaseFormGroup
                        messageId={`${AppId.APP_NO1}.account.codeRefer`}
                        fieldName='refByUser'
                        errors={errors}
                        touched={touched}
                      />
                    </Col>
                    {
                      groupCanSelectUserGroup.indexOf(currentUserGroupId) >= 0 ? (
                        <Col sm='4' className='mt-2'>
                          <BaseFormGroup
                            messageId={`${AppId.APP_NO1}.account.${values.groupId === BaseAppConfigs.USER_ROLE.HTDT ? 'managerLevelRequire' : 'managerLevel'}`}
                            fieldName='managerId'
                            errors={errors}
                            touched={touched}
                          />
                        </Col>
                      ) : null
                    }
                  </Row>
                  <Row>
                    {isCreate ? (
                      <Col sm='6' className='d-flex mt-2 align-items-center'>
                        <Field name='userType'>
                          {({ field, form }) => (
                            <ButtonGroup className='d-flex align-items-center'>
                              <Button
                                onClick={() => form.setFieldValue('userType', USER_TYPE.KD)}
                                color={field.value === USER_TYPE.KD ? 'primary' : 'secondary'}>
                                <FormattedMessage
                                  id={getKeyLang('account.sale')}
                                />
                              </Button>
                              <Button
                                onClick={() => form.setFieldValue('userType', USER_TYPE.HTKD)}
                                color={field.value === USER_TYPE.HTKD ? 'primary' : 'secondary'}>
                                <FormattedMessage
                                  id={getKeyLang('account.supportSale')}
                                />
                              </Button>
                              <img className='ml-1' style={{ width: '24px', height: '24px' }} src={tooltip}
                                   alt='Tooltip' id='popFocus' />
                              <UncontrolledPopover trigger='click' placement='right' target='popFocus'>
                                <PopoverBody>
                                  <div className='mb-1'><b>Kinh doanh:</b> dành cho đối tác bán hàng, bao gồm chức năng
                                    mua bán các sản phẩm trên hệ thống
                                  </div>
                                  <div><b>Hỗ trợ kinh doanh:</b> dành cho nhân viên hỗ trợ đối tác để tạo tài khoản, cài
                                    đặt điểm thưởng. Tài khoản không có chức năng mua bán các sản phẩm trên hệ thống
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </ButtonGroup>
                          )}
                        </Field>
                      </Col>
                    ) : null}
                  </Row>
                  <Row>
                    {currentUserGroupId === BaseAppConfigs.USER_ROLE.ADMIN &&
                    !isCreate ? (
                      <Col sm='4' className='mt-2'>
                        <BaseFormGroup
                          messageId={`${AppId.APP_NO1}.account.approvedBy`}
                          fieldName='approvedBy'
                          disabled={true}
                          isRequired={false}
                        />
                      </Col>
                    ) : null}
                  </Row>
                </Col>
              </Row>
              {/*<CreateFeeAndBonus*/}
              {/*  insuranceSettings={userInsuranceSettings}*/}
              {/*  userId={user.id}*/}
              {/*  setInsuranceSettings={(userInsuranceSettings) =>*/}
              {/*    setUserInsuranceSettings(userInsuranceSettings)*/}
              {/*  }*/}
              {/*/>*/}
            </CardBody>
            <CardFooter>
              <Row>
                <Col className='d-flex justify-content-end mt-2' sm='12'>
                  <Button.Ripple
                    type='button'
                    color='secondary'
                    onClick={onClickBackHome}
                  >
                    <FormattedMessage
                      id={`${AppId.APP_NO1}.account.backHome`}
                    />
                  </Button.Ripple>

                  <Button.Ripple className='ml-3' type='submit' color='primary'>
                    <FormattedMessage
                      id={`${AppId.APP_NO1}.account.done`}
                    />
                  </Button.Ripple>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Form>
      )}
    </Formik>
  )
}
export default CreateAccountInfo