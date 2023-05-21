import React, { useState, useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getKeyLang } from '../../../../../configs/supplement-app'
import {
    Card,
    CardBody,
    Col,
    FormGroup,
    Row,
    CardFooter,
    CardHeader,
    CardTitle,
    Label
} from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import {
    BaseAppUltils,
    Select,
    Button,
    showConfirmAlert,
    goBackHomePage,
    CurrencyInput,
    BaseFormDatePicker,
    useDeviceDetect,
    BaseFormGroup
} from 'base-app'
import {
    FIFTH_DAY,
    DAY_30TH,
    convertStrToNumber,
    convertPickedDateToReadable
} from './utility'
import DebtService from '../../../../../services/supplement-app/debt'
import { loadListAccountsPending } from '../../../../../redux/actions/supplement-app/debtApproval'
import { loadListSuggestion } from '../../../../../redux/actions/supplement-app/debtCreate'
import {
    getListAllDebtAccount,
    getListAllPartnersDebtAccount
} from '../../../../../redux/actions/supplement-app/debtManagement'
import { useFormik, FormikProvider } from 'formik'

import useCheckUserRole from '../../../../../custom-hooks/useCheckUserRole'
import {
    DAYS_AMOUNT_MAX,
    DAY_MAX,
    initialValues,
    validationSchema,
    validate
} from './formikConfig'

const SelectMemo = React.memo(
  (props) => {
      return <Select {...props} />
  },
  (prevProps, nextProps) => prevProps.options === nextProps.options
)

const NewDebt = () => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const device = useDeviceDetect()
    const { availableUsersSuggestions } = useSelector(
      (state) => state.app.debtCreate
    )
    const { listAllDebtAccount } = useSelector(
      (state) => state.app.debtManagement
    )
    const { pendingAccounts } = useSelector((state) => state.app.debtApproval)
    const { groupId, partnersGroupUser, adminGroupUser } = useCheckUserRole()
    const [dispatchDependency, setDispatchActive] = useState(0)
    const dependencies = [
        availableUsersSuggestions.length,
        listAllDebtAccount.length,
        pendingAccounts.length,
        dispatchDependency
    ]
    const suggestions_filterPending = useMemo(() => {
        return availableUsersSuggestions.filter((suggestionElt) => {
            const found = pendingAccounts.find(
              (pendingElt) => Number(pendingElt.userId) === Number(suggestionElt.id)
            )
            if (found) {
                return false
            }
            return true
        })
        // eslint-disable-next-line
    }, dependencies)

    const dueDateTypes = useMemo(() => {
        return [
            {
                label: intl.formatMessage({
                    id: getKeyLang('account.dueDateType.day30th')
                }),
                value: 1,
                type: DAY_30TH
            },
            {
                label: intl.formatMessage({
                    id: getKeyLang('account.dueDateType.fifthday')
                }),
                value: 2,
                type: FIFTH_DAY
            }
        ]  // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (partnersGroupUser.includes(groupId)) {
            dispatch(getListAllPartnersDebtAccount())
        } else if (adminGroupUser.includes(groupId)) {
            dispatch(getListAllDebtAccount())
        } else {
            dispatch(getListAllPartnersDebtAccount())
        }

        dispatch(loadListAccountsPending())
        dispatch(loadListSuggestion())
        // eslint-disable-next-line
    }, dependencies)

    const onClickBackHome = () => {
        dispatch(
          showConfirmAlert({
              title: <FormattedMessage id='common.home' />,
              isShow: true,
              content: <FormattedMessage id='common.backHome.confirmMessage' />,
              onConfirm: () => {
                  dispatch(goBackHomePage())
              }
          })
        )
    }
    /////// formik section
    const [isValidateOnChange, setValidateOnChange] = useState(false)

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        onSubmit: handleFinishClick,
        validationSchema,
        validate
    })

    const {
        handleSubmit,
        getFieldProps,
        getFieldMeta,
        errors,
        setFieldValue,
        values
    } = formik

    const MIN_APPLY_DATE = useMemo(() => values.pickedDate, [])

    function handleFinishClick(values) {
        const {
            findPartner,
            transactionLimit,
            dailyLimit,
            monthlyLimit,
            dueDateType,
            pickedDate,
            daysAmount,
            day
        } = values
        const dueValue = dueDateType.type === DAY_30TH ? daysAmount : day
        dispatch(
          showConfirmAlert({
              title: <FormattedMessage id={getKeyLang('account.create.new')} />,
              isShow: true,
              content: (
                <FormattedMessage id={getKeyLang('account.create.confirmMessage')} />
              ),
              onConfirm: async () => {
                  const resolvedData = await DebtService.createDebtAccount(
                    convertStrToNumber(findPartner.id),
                    dueDateType.type,
                    dueValue,
                    convertStrToNumber(transactionLimit),
                    convertStrToNumber(dailyLimit),
                    convertStrToNumber(monthlyLimit),
                    10000000000,
                    convertPickedDateToReadable(pickedDate)
                  )
                  if (resolvedData) {
                      BaseAppUltils.toastSuccess(
                        intl.formatMessage({
                            id: getKeyLang('account.success.createNewDebt')
                        })
                      )
                      setDispatchActive((pre) => ++pre)
                      return true
                  }
              }
          })
        )
    }

    const transactionLimitFieldProps = getFieldProps('transactionLimit')
    const transactionLimitFieldMeta = getFieldMeta('transactionLimit')

    const dailyLimitFieldProps = getFieldProps('dailyLimit')
    const dailyLimitFieldMeta = getFieldMeta('dailyLimit')

    const monthlyLimitFieldProps = getFieldProps('monthlyLimit')
    const monthlyLimitFieldMeta = getFieldMeta('monthlyLimit')

    const findPartnerFieldMeta = getFieldMeta('findPartner')

    const dueDateTypeFieldMeta = getFieldMeta('dueDateType')

    const daysAmountFieldMeta = getFieldMeta('daysAmount')

    const dayFieldMeta = getFieldMeta('day')

    const handleChangleSearchPartnerIds = (original) => {
        setFieldValue(`findPartner`, original)
    }

    const handleChangeDueDateType = (original) => {
        setFieldValue(`dueDateType`, original)
    }

    return (
      <FormikProvider value={formik}>
          <Card>
              <form onSubmit={handleSubmit}>
                  <CardHeader>
                      <CardTitle className='text-uppercase'>
                          {intl.formatMessage({ id: getKeyLang(`account.create.new`) })}
                      </CardTitle>
                  </CardHeader>
                  <CardBody>
                      <Row className={!device.isMobile ? 'mb-1' : ''}>
                          <Col xs={12} md={6} className={device.isMobile ? 'mb-1' : ''}>
                              <FormGroup>
                                  <SelectMemo
                                    readOnly
                                    closeMenuOnSelect={true}
                                    notRequired
                                    className={`find-partner`}
                                    classNamePrefix='select mt-1'
                                    onChange={handleChangleSearchPartnerIds}
                                    options={suggestions_filterPending}
                                    placeholder={
                                        '*' +
                                        intl.formatMessage({
                                            id: getKeyLang(`bonus.findPartner`)
                                        })
                                    }
                                    isClearable={false}
                                  />
                                  {findPartnerFieldMeta.error && (
                                    <div
                                      style={{
                                          fontSize: '.8rem',
                                          position: 'absolute',
                                          left: '16px',
                                          bottom: '1px'
                                      }}
                                      className='text-danger'
                                    >
                                        {errors.findPartner}
                                    </div>
                                  )}
                              </FormGroup>
                          </Col>
                          <Col xs={12} md={6} className={device.isMobile ? 'mb-1' : ''}>
                              <FormGroup className={'form-label-group'}>
                                  <CurrencyInput
                                    {...monthlyLimitFieldProps}
                                    id='monthlyLimitInput'
                                    placeholder={getKeyLang('account.star.monthlyLimit.vnd')}
                                    className={`form-control form-label-group ${
                                      monthlyLimitFieldMeta.error ? 'is-invalid' : false
                                    }`}
                                  />
                                  {monthlyLimitFieldMeta.error && (
                                    <div
                                      style={{
                                          fontSize: '.8rem',
                                          position: 'absolute',
                                          left: '4px',
                                          bottom: '-20px'
                                      }}
                                      className='text-danger'
                                    >
                                        {errors.monthlyLimit}
                                    </div>
                                  )}
                                  <Label>
                                      {intl.formatMessage({
                                          id: getKeyLang('account.star.monthlyLimit.vnd')
                                      })}
                                  </Label>
                              </FormGroup>
                          </Col>
                      </Row>
                      <Row className={!device.isMobile ? 'mb-1' : ''}>
                          <Col xs={12} md={6} className={device.isMobile ? 'mb-1' : ''}>
                              <FormGroup className={'form-label-group'}>
                                  <CurrencyInput
                                    {...dailyLimitFieldProps}
                                    id='dailyLimitInput'
                                    placeholder={getKeyLang('account.star.dailyLimit.vnd')}
                                    className={`form-control form-label-group ${
                                      dailyLimitFieldMeta.error ? 'is-invalid' : false
                                    }`}
                                  />
                                  {dailyLimitFieldMeta.error && (
                                    <div
                                      style={{
                                          fontSize: '.8rem',
                                          position: 'absolute',
                                          left: '4px',
                                          bottom: '-20px'
                                      }}
                                      className='text-danger'
                                    >
                                        {errors.dailyLimit}
                                    </div>
                                  )}
                                  <Label>
                                      {intl.formatMessage({
                                          id: getKeyLang('account.star.dailyLimit.vnd')
                                      })}
                                  </Label>
                              </FormGroup>
                          </Col>
                          <Col xs={12} md={6} className={device.isMobile ? 'mb-1' : ''}>
                              <FormGroup className={'form-label-group'}>
                                  <CurrencyInput
                                    {...transactionLimitFieldProps}
                                    id='transactionLimitInput'
                                    placeholder={getKeyLang(
                                      'account.star.transactionLimit.vnd'
                                    )}
                                    className={`form-control form-label-group ${
                                      transactionLimitFieldMeta.error ? 'is-invalid' : false
                                    }`}
                                  />
                                  {transactionLimitFieldMeta.error && (
                                    <div
                                      style={{
                                          fontSize: '.8rem',
                                          position: 'absolute',
                                          left: '4px',
                                          bottom: '-20px'
                                      }}
                                      className='text-danger'
                                    >
                                        {errors.transactionLimit}
                                    </div>
                                  )}
                                  <Label>
                                      {intl.formatMessage({
                                          id: getKeyLang('account.star.transactionLimit.vnd')
                                      })}
                                  </Label>
                              </FormGroup>
                          </Col>
                      </Row>
                      <Row>
                          <Col
                            xs={12}
                            md={6}
                            className={`position-relative ${device.isMobile ? 'mb-1' : ''}`}
                          >
                              <FormGroup>
                                  <SelectMemo
                                    readOnly
                                    closeMenuOnSelect={true}
                                    notRequired
                                    className={`${
                                      dueDateTypeFieldMeta.error ? 'is-invalid' : ''
                                    }`}
                                    classNamePrefix='select mt-1'
                                    onChange={handleChangeDueDateType}
                                    options={dueDateTypes}
                                    placeholder={
                                        '*' +
                                        intl.formatMessage({ id: getKeyLang(`account.dueDate`) })
                                    }
                                    isClearable={false}
                                  />
                                  {dueDateTypeFieldMeta.error && (
                                    <div
                                      style={{
                                          fontSize: '.8rem',
                                          position: 'absolute',
                                          left: '16px',
                                          bottom: '1px'
                                      }}
                                      className='text-danger'
                                    >
                                        {errors.dueDateType}
                                    </div>
                                  )}
                              </FormGroup>
                          </Col>
                          <Col
                            xs={12}
                            md={6}
                            className={`position-relative ${device.isMobile ? 'mb-1' : ''}`}
                          >
                              {dueDateTypeFieldMeta.value ? (
                                dueDateTypeFieldMeta.value.label === dueDateTypes[0].label ? (
                                  <FormGroup className='position-relative'>
                                      <BaseFormGroup
                                        id='dueDateTypeDaysAmountInput'
                                        messageId={getKeyLang(`account.daysAmount`)}
                                        fieldName={`daysAmount`}
                                        type={`number`}
                                        onChange={(e) => {
                                            if (e.target.value > DAYS_AMOUNT_MAX) {
                                                setFieldValue(`daysAmount`, DAYS_AMOUNT_MAX)
                                            }
                                        }}
                                        className={`${
                                          daysAmountFieldMeta.error ? 'is-invalid' : ''
                                        }`}
                                      />
                                      {daysAmountFieldMeta.error && (
                                        <div
                                          style={{
                                              fontSize: '.8rem',
                                              position: 'absolute',
                                              left: '4px',
                                              bottom: '-20px'
                                          }}
                                          className='text-danger'
                                        >
                                            {errors.daysAmount}
                                        </div>
                                      )}
                                  </FormGroup>
                                ) : (
                                  <FormGroup className='position-relative'>
                                      <BaseFormGroup
                                        id='dueDateTypeDayInput'
                                        messageId={getKeyLang(`account.day`)}
                                        fieldName={`day`}
                                        type={`number`}
                                        onChange={(e) => {
                                            if (e.target.value > DAY_MAX) {
                                                setFieldValue(`day`, DAY_MAX)
                                            }
                                        }}
                                        className={`${dayFieldMeta.error ? 'is-invalid' : ''}`}
                                      />
                                      {dayFieldMeta.error && (
                                        <div
                                          style={{
                                              fontSize: '.8rem',
                                              position: 'absolute',
                                              left: '4px',
                                              bottom: '-20px'
                                          }}
                                          className='text-danger'
                                        >
                                            {errors.day}
                                        </div>
                                      )}
                                  </FormGroup>
                                )
                              ) : (
                                false
                              )}
                          </Col>
                      </Row>

                      <Row className={`mt-1`}>
                          <Col xs={12} md={6} className={device.isMobile ? 'mb-1' : ''}>
                              <BaseFormDatePicker
                                messageId={getKeyLang(`account.star.applyDate`)}
                                fieldName={'pickedDate'}
                                errors={errors}
                                options={{
                                    minDate: MIN_APPLY_DATE
                                }}
                              />
                          </Col>
                      </Row>
                  </CardBody>
                  <CardFooter>
                      <Row>
                          <Col sm={12} className='d-flex justify-content-end'>
                              <Button.Ripple
                                type='submit'
                                color='primary'
                                className='mr-1'
                                onClick={React.useCallback(() => {
                                    setValidateOnChange(true)
                                }, [])}
                              >
                                  <FormattedMessage id={getKeyLang(`account.create.new`)} />
                              </Button.Ripple>
                              <Button.Ripple
                                type='button'
                                color='secondary'
                                onClick={onClickBackHome}
                              >
                                  <FormattedMessage id={`common.home`} />
                              </Button.Ripple>
                          </Col>
                      </Row>
                  </CardFooter>
              </form>
          </Card>
      </FormikProvider>
    )
}

export default NewDebt