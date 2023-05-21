import {
  AppId,
  BaseAppUltils,
  FormattedMessage,
  HttpClient,
  Select,
  useDeviceDetect
} from 'base-app'
import { useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Card,
  Col,
  CustomInput,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table
} from 'reactstrap'
import { getKeyLang, NAME_APP_CONFIG } from '../../../../configs/insurance-app'
import Utils from '../../../../configs/insurance-app/constants/Utils'
import { history } from '../../../../history'
import { getPartners } from '../../../../redux/actions/insurance-app/appConfig'
import {
  getFee,
  getFeeApproveDetail,
  getFeePartner
} from '../../../../redux/actions/insurance-app/feeInsuManage'
import { KEY_PARTNERS } from '../../../../redux/reducers/insurance-app/appConfig'
import FeeInsuranceServ from '../../../../services/insurance-app/feeManageInsurance'
import {
  convertStrToNumber,
  isArrayEmpty,
  isObjEmpty
} from '../../../../ultity/index'
import FeeTravelDomesticIManageView from './FeeTravelDomesticIManageView'
import PartnerSelectedTable from './PartnerSelectedTable'

const FeeTravelDomesticManageBSHView = (props) => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const [role, setRole] = useState(props.role)
  const [editable, setEditable] = useState(props.editable)
  const { [KEY_PARTNERS]: partners } = useSelector(
    (state) => state.app[NAME_APP_CONFIG]
  )
  const intl = useIntl()
  const [feeRate, setFeeRate] = useState([])

  const [modalResult, setModalResult] = useState(false)

  const [partnerSelect, setPartnerSelect] = useState([])
  const [userPartnerSelect, setUserPartnerSelect] = useState(null)

  const [valueInsurance, setValueInsurance] = useState(0)
  const [listFeeRateChange, setListFeeRateChange] = useState([])

  const reset = () => {}

  const onSelectPartner = async (id) => {
    const res = await HttpClient.get(
      `/nth/homeinsurance/api/insurance-types?contractType=TD&companyId=06`
    )
    if (res.status === 200) {
      const _data = res.data
        .filter((_elt) => _elt?.contractType === 'TD')
        .map((_elt) => {
          return {
            ..._elt,
            feeRateTravel: String(_elt.feeRateTravel * 100),
            oldFeeRateTravel: String(_elt.feeRateTravel * 100)
          }
        })
      setFeeRate(_data)
    }
  }
  useEffect(() => {
    const getMyFeeManager = async () => {
      const res = await HttpClient.get(
        '/nth/personalinsurance/api/authenticate/get-my-fee-rate'
      )
      if (res.status === 200 && res.data) {
        setFeeRate(res.data)
      }
    }
    resetSearch()
    reset()
    if (props.userId !== '') {
      setUserPartnerSelect(props.userId)
      dispatch(getFeePartner(formik, role, props.userId, props.companyId))
    } else {
      if (role === 'AGENCY' || role === 'ALL') {
        dispatch(getPartners())
        onSelectPartner(partners[0].id)
      } else if (role === 'VIEW') {
      } else {
        getMyFeeManager()
      }
    }
    if (role !== 'VIEW')
      formik.setFieldValue(
        'applyDate',
        moment(new Date()).add(0, 'd').format(Utils.DATE_FORMAT)
      )
  }, [props.userId, props.companyId])

  useEffect(() => {
    if (userPartnerSelect) {
      handleSearch()
    }
  }, [userPartnerSelect])

  const formik = useFormik({
    initialValues: {
      applyDate: ''
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {}
  })

  function resetSearch() {
    dispatch({
      type: 'ACTION_RESET_FEE',
      payload: ''
    })
  }

  function handleSearch() {
    resetSearch()
    if (userPartnerSelect == null || userPartnerSelect == '') {
      return
    }
    dispatch(getFeePartner(formik, role, userPartnerSelect, props.companyId))
  }

  const handleBtn = async () => {
    const newArr = feeRate.filter(
      (_elt) => _elt.feeRateTravel !== _elt.oldFeeRateTravel
    )
    if (newArr.length === 0) {
      BaseAppUltils.toastError('Vui lòng cập nhật tỉ lệ phí !')
      return
    } else {
      newArr.forEach(async (_elt) => {
        const indexItem = feeRate.findIndex((obj) => obj.id == _elt.id)
        const item = {
          ..._elt ,
          feeRateTravel : _elt.feeRateTravel/100,
          oldFeeRateTravel : undefined
        }
        const res = await HttpClient.put(
          `/nth/personalinsurance/api/insurance-types/${_elt.id}`,
          item
        )
        if (res.status === 200) {
          BaseAppUltils.toastSuccess('Cập nhật tỉ lệ phí thành công !')
          const _feeRate = [...feeRate]
          _feeRate[indexItem].oldFeeRateTravel = String(_elt.feeRateTravel)
          setFeeRate(_feeRate)
        }
      })
    }
  }
  return (
    <>
      <>
        <>
          {(role === 'AGENCY' || role === 'ALL') && partnerSelect.length > 0 ? (
            <Row>
              <PartnerSelectedTable
                dispatch={dispatch}
                partnerSelect={partnerSelect}
                userPartnerSelect={userPartnerSelect}
                setUserPartnerSelect={setUserPartnerSelect}
              />
            </Row>
          ) : null}
        </>
      </>
      {isObjEmpty(feeRate) ? null : (
        <Card>
          <FeeTravelDomesticIManageView
            role={role}
            editable={editable}
            feeRate={feeRate}
            valueInsurance={valueInsurance}
            setValueInsurance={setValueInsurance}
            isEdit={role === 'AGENCY' || role === 'ALL' ? true : false}
            setFeeRate={setFeeRate}
            listFeeRateChange={listFeeRateChange}
            setListFeeRateChange={setListFeeRateChange}
          />
        </Card>
      )}

      {/* </Card> */}
      <div className='d-flex justify-content-end margin-bottom-14'>
        <Button.Ripple
          className='mr-1 mb-1 round bg-gradient-nophi btn-custom'
          color='none'
          onClick={() => {
            if (role === 'ALL') history.push('/insurance-fee/all')
            else if (role === 'SYSTEM') history.push('/insurance-fee/system')
            else if (role === 'NONRESIDENT')
              history.push('/insurance-fee/lx-partner')
            else if (role == 'INDIVIDUAL') {
              history.push('/insurance-fee/personal')
            } else if (role == 'AGENCY') {
              history.push('/insurance-fee/partner')
            } else if (role == 'VIEW') {
              history.push('/insurance-fee/approval')
            }
          }}
        >
          <FormattedMessage id={`${AppId.INSURANCE_APP}.Previous`} />
        </Button.Ripple>
        {editable ||
        role === 'AGENCY' ||
        role === 'NONRESIDENT' ||
        role === 'ALL' ? (
          <Button.Ripple
            className='mr-1 mb-1 round custom-bg-gradient-primary btn-custom'
            color='none'
            onClick={() => handleBtn()}
          >
            <FormattedMessage id={`${AppId.INSURANCE_APP}.SaveFee`} />
          </Button.Ripple>
        ) : null}

        {role === 'INDIVIDUAL' ? (
          <Button.Ripple
            className='mr-1 mb-1 round bg-gradient-nophi btn-custom'
            color='none'
            onClick={() => {
              Utils.goBackHome()
            }}
          >
            <FormattedMessage id={`${AppId.INSURANCE_APP}.HomePage`} />
          </Button.Ripple>
        ) : null}
      </div>
    </>
  )
}
export default FeeTravelDomesticManageBSHView
