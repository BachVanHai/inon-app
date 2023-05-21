import moment from 'moment'
import Utils from '../../../configs/insurance-app/constants/Utils'
import { updateContractCode, updatePropsContract } from '../../../redux/actions/elite-app/renewal'
import { updateProps } from '../../../redux/actions/insurance-app/buyInsurancesCar'
import { buyNewInsurance } from '../../../services/elite-app/buyNewInsurance'
import { convertStrToNumber, fillMultipleStepInfo, updateInsuranceEffectiveDateToDisplay } from '../../../ultity'
import { KEY_VEHICLE_TYPE } from '../../insurance-app/buy-insurances/car/components/step1/formikConfig'
import { getDefault_updateVehicleInfoObject } from '../../insurance-app/buy-insurances/car/components/step1/utility'
import {
  KEY_ADDTIONAL_TERM_MAIN,
  KEY_ADD_RESPONSIBILITY_VALUE_MOTOR,
  KEY_AMOUNT_PEOPLE_EACH_CAR,
  KEY_BH_INCREASE,
  KEY_CONTRACT_INFO,
  KEY_DATE_INSUR_FROM,
  KEY_DATE_INSUR_FROM_MOTOR,
  KEY_DATE_INSUR_TO,
  KEY_DATE_INSUR_TO_MOTOR,
  KEY_DATE_INSUR_VC_FROM,
  KEY_DATE_INSUR_VC_TO,
  KEY_DURATION,
  KEY_DURATION_BBTNDS,
  KEY_DURATION_BHVC,
  KEY_EMAIL,
  KEY_GROSS_TON,
  KEY_NAME,
  KEY_NUM_IN_CAR,
  KEY_PHONE_NUMBER,
  KEY_PURPOSE,
  KEY_TIME_INSUR_FROM,
  KEY_TIME_INSUR_FROM_MOTOR,
  KEY_TIME_INSUR_TO,
  KEY_TIME_INSUR_TO_MOTOR,
  KEY_TIME_INSUR_VC_FROM,
  KEY_TIME_INSUR_VC_TO,
  KEY_TOGGLE_BBTNDS,
  KEY_TOGGLE_CAR_CONNGUOI,
  KEY_TOGGLE_CAR_HANGHOA,
  KEY_TOGGLE_CAR_TNDS,
  KEY_TOGGLE_CAR_TNDS_TN,
  KEY_TOGGLE_CAR_VATCHAT,
  KEY_TOGGLE_TAI_NAN,
  KEY_VEHICEL_TYPE,
  KEY_XTRIEU_HANGHOA_VANCHUYEN,
  KEY_XTRIEU_NGUOI_TREN_XE,
  KEY_XTRIEU_NGUOI_VU,
  KEY_XTRIEU_TAISAN_VU,
  KEY_XTRIEU_TAI_HANHKHACH
} from './formikConfig'

export const _MIN_INITVALUE = '300,000,000'
export const sliderInfo = {
  min: 12,
  max: 36,
  stepValue: 3
}
export const LOAD = 'LOAD'
export const SEAT = 'SEAT'
export const ALL = 'ALL'
export const fillValuesInsurances = (arr, setFieldValue) => {
  arr.forEach((_elt) => {
    if (_elt.insuranceCode === 'CAR_TNDS' && _elt.isEnable) {
      setFieldValue(KEY_DURATION_BBTNDS, _elt.duration)
      setFieldValue(KEY_TOGGLE_CAR_TNDS, true)
    }
    if (_elt.insuranceCode === 'CAR_TNDS_TN' && _elt.isEnable) {
      setFieldValue(KEY_TOGGLE_CAR_TNDS_TN, true)
      setFieldValue(
        KEY_XTRIEU_NGUOI_VU,
        Number.parseInt(_elt.liability1) / 1_000_000
      )
      setFieldValue(
        KEY_XTRIEU_TAISAN_VU,
        Number.parseInt(_elt.liability2) / 1_000_000
      )
      setFieldValue(
        KEY_XTRIEU_TAI_HANHKHACH,
        Number.parseInt(_elt.liability3) / 1_000_000
      )
    }
    if (_elt.insuranceCode === 'CAR_VATCHAT' && _elt.isEnable) {
      setFieldValue(KEY_TOGGLE_CAR_VATCHAT, false)
      setFieldValue(KEY_DURATION_BHVC, _elt.duration)
      setFieldValue(
        KEY_DATE_INSUR_VC_FROM,
        moment(_elt.startValueDate).format('YYYY-MM-DD')
      )
      setFieldValue(
        KEY_DATE_INSUR_VC_TO,
        moment(_elt.endValueDate).format('YYYY-MM-DD')
      )
      setFieldValue(
        KEY_TIME_INSUR_VC_FROM,
        moment(_elt.startValueDate).format('H:mm')
      )
      setFieldValue(
        KEY_TIME_INSUR_VC_TO,
        moment(_elt.endValueDate).format('H:mm')
      )
      setFieldValue(KEY_BH_INCREASE, _elt.value2)
    }
    if (_elt.insuranceCode === 'CAR_CONNGUOI' && _elt.isEnable) {
      setFieldValue(KEY_TOGGLE_CAR_CONNGUOI, true)
      setFieldValue(
        KEY_XTRIEU_NGUOI_TREN_XE,
        Number.parseInt(_elt.liability1) / 1_000_000
      )
      setFieldValue(KEY_NUM_IN_CAR, _elt.value1)
    }
    if (_elt.insuranceCode === 'CAR_HANGHOA' && _elt.isEnable) {
      setFieldValue(KEY_TOGGLE_CAR_HANGHOA, true)
      setFieldValue(
        KEY_XTRIEU_HANGHOA_VANCHUYEN,
        Number.parseInt(_elt.liability1) / 1_000_000
      )
      setFieldValue(KEY_GROSS_TON, _elt.value1)
    }
    if (_elt.insuranceCode === 'MOTOR_TNDS' && _elt.isEnable) {
      setFieldValue(KEY_TOGGLE_BBTNDS, true)
      setFieldValue(
        KEY_DATE_INSUR_FROM_MOTOR,
        moment(_elt.startValueDate).format('YYYY-MM-DD')
      )
      setFieldValue(
        KEY_DATE_INSUR_TO_MOTOR,
        moment(_elt.endValueDate).format('YYYY-MM-DD')
      )
      setFieldValue(
        KEY_TIME_INSUR_FROM_MOTOR,
        moment(_elt.startValueDate).format('H:mm')
      )
      setFieldValue(
        KEY_TIME_INSUR_TO_MOTOR,
        moment(_elt.endValueDate).format('H:mm')
      )
      setFieldValue(KEY_DURATION, _elt.duration)
    }
    if (_elt.insuranceCode === 'MOTOR_CONNGUOI' && _elt.isEnable) {
      setFieldValue(KEY_TOGGLE_TAI_NAN, true)
    }
  })
}

export const fillInsuranceInfo = (contractInfo, formik) => {
  return contractInfo.insurances.map((insurance) => {
    let _time_from = formik.values[KEY_TIME_INSUR_FROM]
    let _time_to = formik.values[KEY_TIME_INSUR_TO]
    let _time_vc_from = formik.values[KEY_TIME_INSUR_VC_FROM]
    let _time_vc_to = formik.values[KEY_TIME_INSUR_VC_TO]
    if (typeof formik.values[KEY_TIME_INSUR_FROM] == 'object') {
      _time_from = moment(formik.values[KEY_TIME_INSUR_FROM]).format('HH:mm')
      _time_to = moment(formik.values[KEY_TIME_INSUR_TO]).format('HH:mm')
      _time_vc_from = moment(formik.values[KEY_TIME_INSUR_VC_FROM]).format(
        'HH:mm'
      )
      _time_vc_to = moment(formik.values[KEY_TIME_INSUR_VC_TO]).format('HH:mm')
    }
    switch (insurance.insuranceCode) {
      case 'CAR_TNDS':
        
        insurance.isEnable = true
        if (formik.values[KEY_TOGGLE_CAR_TNDS]) {
          insurance.duration = formik.values[KEY_DURATION_BBTNDS]

          insurance.startValueDate = Utils.formatDateTime(
            formik.values[KEY_DATE_INSUR_FROM] + ' ' + _time_from
          )
          insurance.endValueDate = Utils.formatDateTime(
            moment(formik.values[KEY_DATE_INSUR_FROM])
              .add(formik.values[KEY_DURATION_BBTNDS], 'M')
              .format(Utils.DATE_FORMAT) +
              ' ' +
              _time_to
          )
        }
        return insurance

      case 'CAR_TNDS_TN':
        insurance.isEnable = formik.values[KEY_TOGGLE_CAR_TNDS_TN]
        if (formik.values[KEY_TOGGLE_CAR_TNDS_TN]) {
          insurance.duration = formik.values[KEY_DURATION_BBTNDS]
          insurance.startValueDate = Utils.formatDateTime(
            formik.values[KEY_DATE_INSUR_FROM] + ' ' + _time_from
          )
          insurance.endValueDate = Utils.formatDateTime(
            moment(formik.values[KEY_DATE_INSUR_FROM])
              .add(formik.values[KEY_DURATION_BBTNDS], 'M')
              .format(Utils.DATE_FORMAT) +
              ' ' +
              _time_to
          )
          insurance.liability1 =
            Number.parseInt(formik.values[KEY_XTRIEU_NGUOI_VU]) * 1_000_000
          insurance.liability2 =
            Number.parseInt(formik.values[KEY_XTRIEU_TAISAN_VU]) * 1_000_000
          insurance.liability3 =
            Number.parseInt(formik.values[KEY_XTRIEU_TAI_HANHKHACH]) * 1_000_000
        }
        return insurance

      case 'CAR_VATCHAT':
        insurance.isEnable = formik.values[KEY_TOGGLE_CAR_VATCHAT]
        if (formik.values[KEY_TOGGLE_CAR_VATCHAT]) {
          insurance.duration = formik.values[KEY_DURATION_BHVC]
          insurance.startValueDate = Utils.formatDateTime(
            formik.values[KEY_DATE_INSUR_FROM] + ' ' + _time_from
          )
          insurance.endValueDate = Utils.formatDateTime(
            moment(formik.values[KEY_DATE_INSUR_FROM])
              .add(formik.values[KEY_DURATION_BBTNDS], 'M')
              .format(Utils.DATE_FORMAT) +
              ' ' +
              _time_to
          )
          insurance.value2 = formik.values[KEY_BH_INCREASE]
        }
        return insurance

      case 'CAR_CONNGUOI':
        insurance.isEnable = formik.values[KEY_TOGGLE_CAR_CONNGUOI]
        if (formik.values[KEY_TOGGLE_CAR_CONNGUOI]) {
          insurance.duration = formik.values[KEY_DURATION_BBTNDS]

          if (formik.values[KEY_TOGGLE_CAR_VATCHAT]) {
            insurance.startValueDate = Utils.formatDateTime(
              formik.values[KEY_DATE_INSUR_VC_FROM] + ' ' + _time_vc_from
            )
            insurance.endValueDate = Utils.formatDateTime(
              moment(formik.values[KEY_DATE_INSUR_VC_FROM])
                .add(formik.values[KEY_DURATION_BHVC], 'M')
                .format(Utils.DATE_FORMAT) +
                ' ' +
                _time_vc_to
            )
          } else {
            insurance.startValueDate = Utils.formatDateTime(
              formik.values[KEY_DATE_INSUR_FROM] + ' ' + _time_from
            )
            insurance.endValueDate = Utils.formatDateTime(
              moment(formik.values[KEY_DATE_INSUR_FROM])
                .add(formik.values[KEY_DURATION_BBTNDS], 'M')
                .format(Utils.DATE_FORMAT) +
                ' ' +
                _time_to
            )
          }
          insurance.liability1 =
            Number.parseInt(formik.values[KEY_XTRIEU_NGUOI_TREN_XE]) * 1_000_000
          insurance.count1 = convertStrToNumber(formik.values[KEY_NUM_IN_CAR])
        }
        return insurance

      case 'CAR_HANGHOA':
        insurance.isEnable = formik.values[KEY_TOGGLE_CAR_HANGHOA]
        if (formik.values[KEY_TOGGLE_CAR_HANGHOA]) {
          insurance.duration = formik.values[KEY_DURATION_BBTNDS]

          if (formik.values[KEY_TOGGLE_CAR_VATCHAT]) {
            insurance.startValueDate = Utils.formatDateTime(
              formik.values[KEY_DATE_INSUR_VC_FROM] + ' ' + _time_vc_from
            )
            insurance.endValueDate = Utils.formatDateTime(
              moment(formik.values[KEY_DATE_INSUR_VC_FROM])
                .add(formik.values[KEY_DURATION_BHVC], 'M')
                .format(Utils.DATE_FORMAT) +
                ' ' +
                _time_vc_to
            )
          } else {
            insurance.startValueDate = Utils.formatDateTime(
              formik.values[KEY_DATE_INSUR_FROM] + ' ' + _time_from
            )
            insurance.endValueDate = Utils.formatDateTime(
              moment(formik.values[KEY_DATE_INSUR_FROM])
                .add(formik.values[KEY_DURATION_BBTNDS], 'M')
                .format(Utils.DATE_FORMAT) +
                ' ' +
                _time_to
            )
          }
          insurance.liability1 =
            Number.parseInt(formik.values[KEY_XTRIEU_HANGHOA_VANCHUYEN]) *
            1_000_000
          insurance.count1 = Number.parseFloat(formik.values[KEY_GROSS_TON])
          formik.setFieldValue(
            KEY_GROSS_TON,
            Number.parseFloat(formik.values[KEY_GROSS_TON])
          )
        }
        return insurance
    }
    return insurance
  })
}

export const fillInsuranceInfoMotor = (contractInfo, formik) => {
  return contractInfo.insurances.map((insurance) => {
    let _time_from = formik.values[KEY_TIME_INSUR_FROM]
    let _time_to = formik.values[KEY_TIME_INSUR_TO]
    let _time_vc_from = formik.values[KEY_TIME_INSUR_VC_FROM]
    let _time_vc_to = formik.values[KEY_TIME_INSUR_VC_TO]
    if (typeof formik.values[KEY_TIME_INSUR_FROM] == 'object') {
      _time_from = moment(formik.values[KEY_TIME_INSUR_FROM]).format('HH:mm')
      _time_to = moment(formik.values[KEY_TIME_INSUR_TO]).format('HH:mm')
      _time_vc_from = moment(formik.values[KEY_TIME_INSUR_VC_FROM]).format(
        'HH:mm'
      )
      _time_vc_to = moment(formik.values[KEY_TIME_INSUR_VC_TO]).format('HH:mm')
    }
    switch (insurance.insuranceCode) {
      case 'MOTOR_TNDS':
        if (KEY_TOGGLE_BBTNDS) {
          insurance.isEnable = true
          insurance.duration = formik.values[KEY_DURATION]
          insurance.startValueDate = Utils.formatDateTime(
            formik.values[KEY_DATE_INSUR_FROM_MOTOR] + ' ' + _time_vc_from
          )
          insurance.endValueDate = Utils.formatDateTime(
            moment(formik.values[KEY_DATE_INSUR_FROM_MOTOR])
              .add(formik.values[KEY_DURATION_BHVC], 'M')
              .format(Utils.DATE_FORMAT) +
              ' ' +
              _time_vc_to
          )
        }
        return insurance
      case 'MOTOR_CONNGUOI':
        if (KEY_TOGGLE_TAI_NAN) {
          insurance.isEnable = true
          insurance.count1 = formik.values[KEY_AMOUNT_PEOPLE_EACH_CAR]
          insurance.liability1 =
            formik.values[KEY_ADD_RESPONSIBILITY_VALUE_MOTOR] * 1_000_000
        } else {
          insurance.isEnable = false
        }
        return insurance
    }

    return insurance
  })
}

export const getDefault_updateOwnerContactObj = (idContact, info) => {
  const {
    idType,
    idOwnerNum,
    issuedDate,
    idPlace,
    [KEY_NAME]: ownerName,
    dateOfBirth,
    ownerSex,
    [KEY_PHONE_NUMBER]: ownerPhone,
    [KEY_EMAIL]: ownerEmail,
    custType,
    address,
    id
  } = info
  return {
    id: idContact,
    fullName: ownerName ? ownerName : null,
    type: null,
    addresses: [
      {
        type: 'HOME',
        city: null,
        district: null,
        ward: null,
        detail: address
      }
    ]
  }
}

export const getDefault_updateContractInfoObject = (
  contractId,
  requireVehicle
) => {
  return {
    id: contractId,
    vehicleValue: convertStrToNumber(requireVehicle)
  }
}
export const getDefault_updateCompanyIdObj = (contractId, companyId) => {
  return {
    id: contractId,
    companyId: companyId
  }
}

/* 
@select style 
*/
export let selectErrorStyles = {
  control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#51912D !important" : "#ea5455 !important",
  }),
  placeholder: (defaultStyles) => {
      return {
          ...defaultStyles,
          color: "#5f5f5f",
          fontSize: "0.96rem",
          opacity: "0.5"
      };
  }
}

export let selectNormalStyles = {
  placeholder: (defaultStyles) => {
      return {
          ...defaultStyles,
          color: "#5f5f5f",
          fontSize: "0.96rem",
          opacity: "0.5"
      };
  }
}


export const getDefault_PayObjectContract = (paymentType, totalFee, contractInfo , companyId) => {
  let _contractInfo = { ...contractInfo }
  delete _contractInfo['owner']
  delete _contractInfo['beneficiaries']
  _contractInfo["paymentType"] = paymentType
  _contractInfo["totalFeeInclVAT"] = totalFee
  return _contractInfo
}

export const fetchDataToAPI =  (id , setFieldValue , setCarBrands , setCarManufacturers ,companyId , history , initialValues , setValues , setBussinessType) => {
  return async (dispatch) => {
    const res = await buyNewInsurance.getContractById(id)
    const  dataUpdate = {...res.data.vehicles[0] , issPlace : 'VIETNAM' , [KEY_VEHICLE_TYPE]: 1 , usage : 'KKD'}
    const compRes = await buyNewInsurance.updateCompanies( getDefault_updateCompanyIdObj(res.data.id , companyId))
    const vehicelRes =  await buyNewInsurance.updateVehicel(
      getDefault_updateVehicleInfoObject( res.data.vehicles[0].id, dataUpdate)
    )
    if (res.status !== 200) {
      history.replace('/')
    }else {
      const data = {
        ...res.data,
        ...res.data.owner,
        ...res.data.vehicles[0],
        ...res.data.vehicles[0].vehicleType,
        vehicelTypeName:  vehicelRes?.data?.vehicleType?.name,
        vehicelType: vehicelRes?.data?.vehicleType?.code ,
        vehicleTypeId :  vehicelRes?.data?.vehicleType?.id,
        capacityType: vehicelRes?.data?.vehicleType?.capacityType,
        address: res.data.owner.address ,
        brandName : res.data.vehicles[0]?.brandName,
        insurances : updateInsuranceEffectiveDateToDisplay(compRes?.data?.insurances)
      }
      dispatch(
        updateProps([
          {
            prop: KEY_CONTRACT_INFO,
            value: data
          },
          {
            prop: KEY_ADDTIONAL_TERM_MAIN,
            value: res.data.insuranceAddons
          },
         
        ])
      )
    
      dispatch(updatePropsContract(data))
      fillMultipleStepInfo(data, initialValues, setValues)
      fillValuesInsurances(
        compRes?.data?.insurances,
        setFieldValue,
        res.data.contractId
      )
      setBussinessType(vehicelRes?.data?.vehicleType?.businessStatus)
      if (vehicelRes?.data?.vehicleType?.businessStatus === 'A') {
        setFieldValue(KEY_PURPOSE, 'KKD')
      }else{
        setFieldValue(KEY_PURPOSE, vehicelRes?.data?.vehicleType?.businessStatus)
      }
      dispatch(updateContractCode(compRes?.data?.contractCode))
    }
    const resCarManufacturers = await buyNewInsurance.getCarManufacturers()
    if (resCarManufacturers.status === 200) {
      const dataCarManufacturers = resCarManufacturers.data.map((_elt) => {
        return {
          ..._elt,
          value: _elt.name,
          label: _elt.name
        }
      })
      if (res.data?.vehicles[0]?.manufacturerName) {
        const brands = dataCarManufacturers.find(
          (_elt) => _elt.name === res.data.vehicles[0].manufacturerName
        )?.brands
        const brandsMapping = brands.map((_elt) => {
          return {
            ..._elt,
            label: _elt.brand,
            value: _elt.brand
          }
        })
        setCarBrands(brandsMapping)
      }
      setCarManufacturers(dataCarManufacturers)
    }
  }
}