// import { hasRequestFail, isArrayEmpty } from '../../../../../../ultity'
import { Select } from 'base-app'
import { useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
// import EditableDuration from './form-components/EditableDuration'
import { useDispatch } from 'react-redux'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'
import {
  selectErrorStyles,
  selectNormalStyles
} from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
// import Service from '../../../../../../services/insurance-app/buyInsuranceMotor'
import EdiableBlock from '../../../../../../components/insurance-app/common-forms/ediable-block'
import { COMPANIES, getKeyLang } from '../../../../../../configs/insurance-app'
// import { KEY_VEHICLES_TYPE, KEY_FRAME_NUMBER, KEY_MACHINE_NUMBER } from '../step1/formikConfig'
// import { doEverything } from './utility'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesCar'
import {
  BASE,
  KEY_STEP_2
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import { isArrayEmpty } from '../../../../../../ultity'
import { sugg_Purpose } from '../../../car/components/step1/formikConfig'
import { getDefault_updateOwnerContactObj } from '../../../car/components/step3/utility'
import {
  KEY_CHASSIS_NUMBER,
  KEY_LOADS,
  KEY_MANUFACTURER_NAME,
  KEY_PURPOSE,
  KEY_SEATS
} from '../step1/formikConfig'
import EditableDuration from './form-components/EditableDuration'
import {
  KEY_ADDRESS,
  KEY_BRAND_NAME,
  KEY_DATE_INSUR_FROM,
  KEY_DATE_INSUR_TO,
  KEY_DURATION_BBTNDS,
  KEY_EMAIL,
  KEY_FRAME_NUMBER,
  KEY_FULLNAME,
  KEY_MACHINE_NUMBER,
  KEY_MANUFACTURER_VEHICLE,
  KEY_MAX_NUM_IN_CAR,
  KEY_NUMBER_PLATE,
  KEY_PHONE_NUMBER,
  KEY_TOGGLE_TNLPL,
  KEY_VEHICLE_TYPE
} from './formikConfig'
import {
  doEverything,
  updateCustomer,
  updateInsurancAndCalFee,
  updateVehicelAndCalFee
} from './utility'
const FormContract = ({
  contractCode,
  datafees,
  paymentType,
  companyId,
  vehicleId,
  contractId,
  contractInfo,
  stepInfo = {},
  sugg_Vehicle,
  sugg_Automaker,
  formik,
  toggleValidateChange
}) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const { getFieldMeta, setFieldValue, values, errors, touched } =
    useFormikContext()
    const capacityType =  sugg_Vehicle.find(
      (elt) => elt.value == getFieldMeta(KEY_VEHICLE_TYPE).value
    )?.capacityType
  const { step_1 = {} } = stepInfo
  const [usageList, setUsageList] = useState(sugg_Purpose)
  const [branchNameSugg, setBranchNameSugg] = useState([])
  const saveOwnerInfo = () => {
    dispatch(
      updateCustomer(
        getDefault_updateOwnerContactObj(contractInfo.owner.id, values),
        values,
        step_1
      )
    )
  }
  const saveVehicelInfo = () => {
    setFieldValue(KEY_MAX_NUM_IN_CAR , values.seats)
    dispatch(
      updateVehicelAndCalFee(
        vehicleId,
        values,
        contractId,
        contractInfo.insurances
      )
    )
  }
  const saveInsuranceInfo = () => {
    toggleValidateChange(false)
    dispatch(
      updateInsurancAndCalFee(
        contractId,
        companyId,
        contractInfo.insurances,
        values
      )
    )
  }
  const ownerDetails_1 = [
    {
      label: intl.formatMessage({ id: getKeyLang('Email') }),
      content: getFieldMeta(KEY_EMAIL).value,
      formikKey: KEY_EMAIL
    },
    {
      label: intl.formatMessage({ id: getKeyLang('PartnerPhone') }),
      content: getFieldMeta(KEY_PHONE_NUMBER).value,
      formikKey: KEY_PHONE_NUMBER
    }
  ]
  const ownerDetails_2 = [
    {
      label: intl.formatMessage({ id: getKeyLang('owner') }),
      content: getFieldMeta(KEY_FULLNAME).value,
      formikKey: KEY_FULLNAME
    },

    {
      label: intl.formatMessage({ id: getKeyLang('Address') }),
      content: getFieldMeta(KEY_ADDRESS).value,
      formikKey: KEY_ADDRESS
    }
  ]
  const vehicleDetails = [
    {
      label: intl.formatMessage({ id: getKeyLang('TypeVihicle') }),
      content:
        !isArrayEmpty(sugg_Vehicle) &&
        sugg_Vehicle.find(
          (elt) => elt.id === getFieldMeta(KEY_VEHICLE_TYPE).value
        )?.name,
      contentInput: (
        <Select
        disabled
        readOnly
        isClearable={false}
        closeMenuOnSelect={true}
        classNamePrefix='select mt-1'
        maxMenuHeight={120}
        className="custom-zindex9"
          styles={
            getFieldMeta(KEY_VEHICLE_TYPE).error
              ? selectErrorStyles
              : selectNormalStyles
          }
          value={
            !isArrayEmpty(sugg_Vehicle) &&
            sugg_Vehicle.find(
              (elt) => elt.value == getFieldMeta(KEY_VEHICLE_TYPE).value
            )
          }
          options={sugg_Vehicle || []}
          onChange={(original) => {
            setFieldValue(KEY_VEHICLE_TYPE, original.value)
            if (original.businessStatus === 'A') {
              setFieldValue(KEY_PURPOSE , sugg_Purpose[0].temp)
              setUsageList(sugg_Purpose)
            }else{
              const defaultUsage = sugg_Purpose.filter(_elt => _elt.temp === original.businessStatus)
              setUsageList(defaultUsage)
              setFieldValue(KEY_PURPOSE , defaultUsage[0].temp)
            }
          }}
        />
      ),
      formikKey: KEY_VEHICLE_TYPE
    },
    {
      label: intl.formatMessage({ id: getKeyLang('purpose') }),
      content:
        !isArrayEmpty(sugg_Purpose) &&
        usageList.find((elt) => elt.temp === getFieldMeta(KEY_PURPOSE).value)
          ?.label,
      contentInput: (
        <Select
        disabled
        readOnly
        isClearable={false}
        closeMenuOnSelect={true}
        classNamePrefix='select mt-1'
        maxMenuHeight={120}
        className="custom-zindex8"
          styles={
            getFieldMeta(KEY_PURPOSE).error
              ? selectErrorStyles
              : selectNormalStyles
          }
          value={
            !isArrayEmpty(usageList) &&
            usageList.find(
              (elt) => elt.temp == getFieldMeta(KEY_PURPOSE).value
            )
          }
          options={usageList || []}
          onChange={(original) => {
            setFieldValue(KEY_PURPOSE, original.temp)
          }}
        />
      ),
      formikKey: KEY_PURPOSE
    },
    {
      label: intl.formatMessage({ id: getKeyLang('LicensePlate') }),
      content: getFieldMeta(KEY_NUMBER_PLATE).value,
      formikKey: KEY_NUMBER_PLATE
    },
    {
      label: intl.formatMessage({ id: getKeyLang('BrandVehicle') }),
      content: getFieldMeta(KEY_MANUFACTURER_NAME).value,
      contentInput: (
        <Select
          readOnly
          closeMenuOnSelect={true}
          classNamePrefix='select mt-1'
          className='custom-zindex7'
          maxMenuHeight={120}
          isClearable={false}
          options={sugg_Automaker}
          styles={
            getFieldMeta(KEY_MANUFACTURER_NAME).error
              ? selectErrorStyles
              : selectNormalStyles
          }
          value={sugg_Automaker.find(
            (elt) => elt.label === getFieldMeta(KEY_MANUFACTURER_NAME).value
          )}
          onChange={(original) => {
            setFieldValue(KEY_MANUFACTURER_NAME, original.label)
          }}
        />
      ),
      formikKey: KEY_MANUFACTURER_NAME
    },
    {
      label: intl.formatMessage({ id: getKeyLang('LineVehicle') }),
      content: getFieldMeta(KEY_BRAND_NAME).value,
      contentInput: (
        <Select
          readOnly
          closeMenuOnSelect={true}
          classNamePrefix='select mt-1'
          className='custom-zindex6'
          maxMenuHeight={120}
          isClearable={false}
          options={branchNameSugg}
          styles={
            getFieldMeta(KEY_MANUFACTURER_NAME).error
              ? selectErrorStyles
              : selectNormalStyles
          }
          value={
            branchNameSugg &&
            branchNameSugg.find(
              (_elt) => _elt.label === getFieldMeta(KEY_BRAND_NAME).value
            )
          }
          onChange={(original) => {
            setFieldValue(KEY_BRAND_NAME, original.label)
          }}
        />
      ),
      formikKey: KEY_BRAND_NAME
    },

    {
      label: intl.formatMessage({ id: getKeyLang('ChassisNumber1') }),
      content: getFieldMeta(KEY_CHASSIS_NUMBER).value,
      formikKey: KEY_FRAME_NUMBER
    },
    {
      label: intl.formatMessage({ id: getKeyLang('EngineNumber') }),
      content: getFieldMeta(KEY_MACHINE_NUMBER).value,
      formikKey: KEY_MACHINE_NUMBER
    },
    {
      label: intl.formatMessage({ id: getKeyLang('Seat') }),
      content: getFieldMeta(KEY_SEATS).value,
      formikKey: KEY_SEATS
    },
    {
      label: intl.formatMessage({ id: getKeyLang('grossTon') }),
      content: getFieldMeta(KEY_LOADS).value,
      formikKey: KEY_LOADS,
      className : capacityType !== 'LOADS' && "d-none" || capacityType !== 'ALL' && "d-none"
    }
  ]

  const _insurances = [
    <div className='' key={'TNDS'}>
      <FormattedMessage id={getKeyLang('BHBBTNDSCCXMTXM')} />
    </div>
  ]

  if (getFieldMeta(KEY_TOGGLE_TNLPL).value) {
    _insurances.push(
      <div className='font-medium-2' key={'TAINAN'}>
        <FormattedMessage id={getKeyLang('BHTNNNTXMTXM')} />
      </div>
    )
  }

  const insuranceDetails = [
    {
      label: intl.formatMessage({ id: getKeyLang('InsuranceProduct') }),
      content: COMPANIES.find((elt) => elt.companyId === companyId)?.companyName
    },
    {
      label: intl.formatMessage({ id: getKeyLang('RangeDate') }),
      content: `${getFieldMeta(KEY_DURATION_BBTNDS).value} tháng`
    },
    {
      label: intl.formatMessage({ id: getKeyLang('startDate') }),
      content: getFieldMeta(KEY_DATE_INSUR_FROM).value
    },
    {
      label: intl.formatMessage({ id: getKeyLang('endDateIns') }),
      content: getFieldMeta(KEY_DATE_INSUR_TO).value
    }
  ]
  const getInsurInfoValues = () => {
    const _values = {}
    _values[KEY_MANUFACTURER_NAME] = values[KEY_MANUFACTURER_NAME]
    _values[KEY_BRAND_NAME] = values[KEY_BRAND_NAME]
    return _values
  }

  const _infoValues = getInsurInfoValues()
  useEffect(() => {
    const getBranchNameVehicel = () => {
      if (!isArrayEmpty(sugg_Automaker)) {
        const brands = sugg_Automaker.find(
          (_elt) => _elt.label === getFieldMeta(KEY_MANUFACTURER_NAME).value
        )?.brands
        setBranchNameSugg(brands)
      }
    }
    const getUsageArrDefault = () => {
      const vehicelType = sugg_Vehicle.find(_elt => _elt.id === getFieldMeta(KEY_VEHICLE_TYPE).value)
      if (vehicelType) {
        if (vehicelType?.businessStatus === 'A') {
          setUsageList(sugg_Purpose)
        }else{
          const usgeList = sugg_Purpose.filter(_elt => _elt.temp === vehicelType?.businessStatus)
          setUsageList(usgeList)
        }
      }
    }
    getBranchNameVehicel()
    getUsageArrDefault()
  }, [JSON.stringify(_infoValues)])
  return (
    <div>
      <Row className={'mb-1'}>
        <Col xs={6} md={4}>
          <h5 className={'text-uppercase primary'}>
            <FormattedMessage id={getKeyLang('InsuranceNum')} />
          </h5>
        </Col>

        <Col xs={6} md={8}>
          <h5 className={'text-uppercase font-weight-bold'}>
            {contractCode || ''}
          </h5>
        </Col>
      </Row>
      <EdiableBlock
        title={<FormattedMessage id={getKeyLang('OwnAcctInfo')} />}
        details={ownerDetails_2}
        className=''
        saveCallback={saveOwnerInfo}
      />
      <div className='mt-1'>
        <EdiableBlock
          details={ownerDetails_1}
          className='mb-1'
          // saveCallback={saveAction}
          isEditMode={true}
          isHideEditBtn={true}
        />
      </div>

      <EdiableBlock
        title={<FormattedMessage id={getKeyLang('VehicleInfo')} />}
        details={vehicleDetails}
        className='mb-1'
        saveCallback={saveVehicelInfo}
      />
      <EditableDuration
        title={<FormattedMessage id={getKeyLang('insuranceInfo')} />}
        contractInfo={contractInfo}
        details={insuranceDetails}
        dataFees={datafees}
        contractId={contractId}
        paymentType={paymentType}
        companyId={companyId}
        saveCallback={saveInsuranceInfo}
        errors={errors}
        touched={touched}
        formik={formik}
        toggleValidateChange={toggleValidateChange}
      />
    </div>
  )
}

export default FormContract
