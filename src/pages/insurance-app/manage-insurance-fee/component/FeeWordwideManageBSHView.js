import {
  AppId,
  BaseAppUltils, BaseFormGroupSelect, FormattedMessage, HttpClient, Select, useDeviceDetect
} from 'base-app'
import { useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button, Card, Col, CustomInput, FormGroup, Modal, ModalBody,
  ModalFooter, ModalHeader, Row, Table
} from 'reactstrap'
import { getKeyLang, NAME_APP_CONFIG } from '../../../../configs/insurance-app'
import Utils from '../../../../configs/insurance-app/constants/Utils'
import { history } from '../../../../history'
import { getPartners } from '../../../../redux/actions/insurance-app/appConfig'
import {
  getFee, getFeeApproveDetail, getFeePartner
} from '../../../../redux/actions/insurance-app/feeInsuManage'
import { KEY_PARTNERS } from '../../../../redux/reducers/insurance-app/appConfig'
import FeeInsuranceServ from '../../../../services/insurance-app/feeManageInsurance'
import { convertStrToNumber, isArrayEmpty, isObjEmpty } from '../../../../ultity/index'
import FeeTravelWordwideIManageView from './FeeTravelWordwideIManageView'
import PartnerSelectedTable from './PartnerSelectedTable'

const FeeTravelWordwideManageBSHView = (props) => {
  const dispatch = useDispatch()
  const [role, setRole] = useState(props.role)
  const [editable, setEditable] = useState(props.editable)
  const { [KEY_PARTNERS]: partners } = useSelector(state => state.app[NAME_APP_CONFIG])
  const intl = useIntl()
  const [feeRate, setFeeRate] = useState([])

  const [infoDKBSChange, setInfoDKBSChange] = useState(false)
  const [modalResult, setModalResult] = useState(false)
  const [messageResult, setMessageResult] = useState('')

  const [updateFeeInfo, setListUpdateFeeInfo] = useState([])
  const [partnerSelect, setPartnerSelect] = useState([])
  const [userPartnerSelect, setUserPartnerSelect] = useState(null)
  const [userId, setUserId] = useState(props.userId)
  const [partnerSelected, setPartnerSelected] = useState({})


  const onSelectPartner = async (id) => {
    setPartnerSelected(id)
    const res = await HttpClient.get(`/nth/personalinsurance/api/fee-values-all?contractType=TA`)
    if (res.status === 200) {
      setFeeRate(res.data)
    }
  }
  useEffect(() => {
    const getMyFeeManager = async () => {
      const res = await HttpClient.get(`/nth/personalinsurance/api/fee-values-all?contractType=TA`)
      if (res.status === 200) {
        setFeeRate(res.data)
      }
    }
    resetSearch()
    if (props.userId !== '') {
      setUserPartnerSelect(props.userId)
      dispatch(getFeePartner(formik, role, props.userId, props.companyId))
    } else {
      if (role === 'AGENCY' || role === 'ALL') {
        dispatch(getPartners())
        setPartnerSelected(partners[0].id)
        onSelectPartner(partners[0].id)
      } else if (role === 'VIEW') {
      } else {
        getMyFeeManager()
        
      }
    }
    if (role !== 'VIEW')
      formik.setFieldValue('applyDate', moment(new Date()).add(0, 'd').format(Utils.DATE_FORMAT))
  }, [])

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
    onSubmit: values => {

    }
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

  const handleBtn = () => {
    feeRate.forEach(async(_elt , index) => {
      try {
        const res = await HttpClient.put('/nth/personalinsurance/api/travel-fee-value-reduce' , {..._elt , userId : partnerSelected})
        if (res.status === 200) {
          BaseAppUltils.toastSuccess("Cập nhật tỉ lệ phí thành công !")
          // setlastValueInsurance(Number(valueInsurance*100))
        }
      } catch (error) {
        console.log(error);
        BaseAppUltils.toastSuccess(error)
      }     
    })
  }
  return (
    <>
      <>
        {/* {(role === 'AGENCY' || role === 'ALL') ?
          <Row>
            <Col md='12' sm='12' className='mt-2'>
            <Select options={partners} value={partners.find(_elt => _elt.id === partnerSelected) || partners[0]}  classNamePrefix='select mt-2'
              className="custom-zindex9" placeholder={intl.formatMessage({ id: getKeyLang(`Partner`) })} onChange={(e) => onSelectPartner(e.value)} />
            </Col>
          </Row>
          : null} */}
        <>
          {
            (role === 'AGENCY' || role === 'ALL') && partnerSelect.length > 0 ?
              <Row>
                <PartnerSelectedTable
                  dispatch={dispatch}
                  partnerSelect={partnerSelect}
                  userPartnerSelect={userPartnerSelect}
                  setUserPartnerSelect={setUserPartnerSelect}
                />
              </Row>
              : null
          }
        </>
      </>
      {
        isObjEmpty(feeRate) ? null :  <Card>
        <FeeTravelWordwideIManageView role={role} editable={editable} feeRate={feeRate}  isEdit={role === 'AGENCY' || role === 'ALL' ? true :false} setFeeRate={setFeeRate}/>
      </Card>
      }
     
      {/* </Card> */}
      <div className='d-flex justify-content-end margin-bottom-14'>
        <Button.Ripple className='mr-1 mb-1 round bg-gradient-nophi btn-custom' color='none' onClick={() => {
          if (role === 'ALL')
            history.push('/insurance-fee/all')
          else if (role === 'SYSTEM')
            history.push('/insurance-fee/system')
          else if (role === 'NONRESIDENT')
            history.push('/insurance-fee/lx-partner')
          else if (role == 'INDIVIDUAL') {
            history.push('/insurance-fee/personal')
          } else if (role == 'AGENCY') {
            history.push('/insurance-fee/partner')
          } else if (role == 'VIEW') {
            history.push('/insurance-fee/approval')
          }
        }
        }>
          <FormattedMessage id={`${AppId.INSURANCE_APP}.Previous`} />
        </Button.Ripple>
        {/* {editable || role === 'AGENCY' || role === 'NONRESIDENT' || role === 'ALL' ?
          <Button.Ripple className='mr-1 mb-1 round custom-bg-gradient-primary btn-custom' color='none'
            onClick={() => handleBtn()}>
            <FormattedMessage id={`${AppId.INSURANCE_APP}.SaveFee`} />
          </Button.Ripple>
          : null} */}

        {
          role === 'INDIVIDUAL' ?
            <Button.Ripple className='mr-1 mb-1 round bg-gradient-nophi btn-custom' color='none' onClick={() => {
              Utils.goBackHome()
            }
            }>
              <FormattedMessage id={`${AppId.INSURANCE_APP}.HomePage`} />
            </Button.Ripple>
            : null
        }
      </div>
    </>


  )

}
export default FeeTravelWordwideManageBSHView
