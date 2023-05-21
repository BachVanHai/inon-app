import motorImg2 from '../../../assets/images/insurance-app/icons/icon-motor.png'
import carImg from '../../../assets/images/insurance-app/icons/icon-car.png'
import homeSafetyImg from '../../../assets/images/insurance-app/icons/icon-home-safety.png'
import homeImg from '../../../assets/images/insurance-app/icons/homeinsuranceicon.png'
import travelImg from '../../../assets/images/insurance-app/icons/travel.png'
import React, { useEffect, useState } from 'react'
import { Row, Col, CardBody } from 'reactstrap'
import { FormattedMessage, Button } from 'base-app'
import { useSelector } from 'react-redux'
import { history } from '../../../history'
import {
  addAppContextPath,
  getKeyLang,
  INSURANCE_TYPE_CAR,
  INSURANCE_TYPE_MOTORS,
  NAME_BUY_INSURANCE_MOTORS,
  PATH_BUY_INSURANCES_CARS,
  PATH_BUY_INSURANCES_MOTORS,
  INSURANCE_TYPE_HOME_SAFETY,
  INSURANCE_TYPE_MOTOR,
  INSURANCE_TYPE_PERSONAL_HOME,
  INSURANCE_TYPE_PERSONAL_HOME_MULTIPLE,
  INSURANCE_TYPE_VTA,
  PATH_BUY_HOME_PERSONAL_MULTIPLE,
  PATH_BUY_INSURANCES_CAR,
  PATH_BUY_INSURANCES_FAMILY_SAFETY,
  PATH_BUY_INSURANCES_MOTOR,
  PATH_BUY_INSURANCES_MOTOR_SIMPLIFY,
  PATH_BUY_INSURANCES_PERSONAL_HOME,
  PATH_BUY_INSURANCES_VEHICLE_TEMPLATE,
  PATH_BUY_INSURANCES_VTA,
  NAME_BUY_INSURANCES_CARS,
  NAME_BUY_INSURANCES_MOTOR,
  NAME_BUY_INSURANCES_CAR,
  INSURANCE_TYPE_CARS,
  NAME_BUY_INSURANCES_VTA,
  NAME_BUY_INSURANCES_FAMILY_SAFETY,
  NAME_BUY_INSURANCES_HEALTH_CARE,
  NAME_BUY_INSURANCES_PERSONAL_HOME,
  NAME_BUY_INSURANCES_MULTIPLE_HOME,
  PATH_BUY_INSURANCES_HEALTH_CARE,
  INSURANCE_TYPE_HEALTH_CARE,
  PATH_BUY_INSURANCES_CAR_SIMPLIFY,
  INSURANCE_TYPE_CAR_SIMPLIFY,
  INSURANCE_TYPE_MOTOR_SIMPLIFY,
  INSURANCE_TYPE_HEALTH_CARE_CONTRACT,
  INSURANCE_TYPE_ANTIN_CONTRACT,
  PATH_BUY_ANTIN_INSURANCE,
  NAME_BUY_INSURANCES_ANTIN,
  INSURANCE_TYPE_TRAVEL,
  NAME_BUY_INSURANCES_TRAVEL,
  PATH_BUY_INSURANCES_TRAVEL,
  INSURANCE_TYPE_GOODS,
  NAME_BUY_INSURANCES_GOODS,
  PATH_BUY_INSURANCES_GOODS,
  NAME_BUY_INSURANCES_TRAVEL_DOMESTIC,
  PATH_BUY_INSURANCES_TRAVEL_DOMESTIC,
  INSURANCE_TYPE_TRAVEL_DOMESTIC,
  INSURANCE_TYPE_TRAVEL_DS,
  INSURANCE_TYPE_HEALTH_CARE_ADVANDCED,
  PATH_BUY_INSURANCES_HEALTH_CARE_ADVANCED,
  NAME_BUY_INSURANCES_HEALTH_CARE_ADVANCED
} from '../../../configs/insurance-app'
import * as vtaAction from '../../../redux/actions/insurance-app/buyInsurancesVta'
import * as personalHomeAction from '../../../redux/actions/insurance-app/buyInsurancesPersonalHome'
import * as carAction from '../../../redux/actions/insurance-app/buyInsurancesCar'
import * as carsAction from '../../../redux/actions/insurance-app/buyInsurancesCars'
import * as motorAction from '../../../redux/actions/insurance-app/buyInsurancesMotor'
import * as motorsAction from '../../../redux/actions/insurance-app/buyInsurancesMotors'
import * as familySafetyAction from '../../../redux/actions/insurance-app/buyInsurancesFamilySafety'
import * as healthCareAction from '../../../redux/actions/insurance-app/buyInsurancesHealthCare'
import * as healthCareActionAdvanced from '../../../redux/actions/insurance-app/buyInsurancesHealthCareAdvanced'
import * as antinAction from '../../../redux/actions/insurance-app/buyInsurancesAntin'
import * as travelAction from '../../../redux/actions/insurance-app/buyInsurancesTravel'
import * as travelDomesticAction from '../../../redux/actions/insurance-app/buyInsurancesTravelDomestic'
import * as goodsAction from '../../../redux/actions/insurance-app/buyInsurancesGoods'
import * as homePersonalMulpleAction from '../../../redux/actions/insurance-app/buyInsuranceMultiple'
import { MAX_STEP as VTA_MAX_STEP } from '../../../redux/reducers/insurance-app/buyInsurancesVta'
import { MAX_STEP as HOME_MAX_STEP } from '../../../redux/reducers/insurance-app/buyInsurancesPersonalHome'
import { MAX_STEP as CAR_MAX_STEP } from '../../../redux/reducers/insurance-app/buyInsurancesCar'
import { MAX_STEP as CARS_MAX_STEP } from '../../../redux/reducers/insurance-app/buyInsurancesCars'
import {
  MAX_STEP as MOTOR_MAX_STEP,
  SIMPLIFY_MAX_STEP
} from '../../../redux/reducers/insurance-app/buyInsurancesMotor'
import { MAX_STEP as MOTORS_MAX_STEP } from '../../../redux/reducers/insurance-app/buyInsurancesMotors'
import { MAX_STEP as FAMILY_MAX_STEP } from '../../../redux/reducers/insurance-app/buyInsurancesFamilySafety'
import { MAX_STEP as HEALTH_MAX_STEP } from '../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import { MAX_STEP as TRAVEL_MAX_STEP } from '../../../redux/reducers/insurance-app/buyInsurancesTravel'
import { MAX_STEP as TRAVEL_DOMESTIC_MAX_STEP } from '../../../redux/reducers/insurance-app/buyInsurancesTravelDomestic'
import StepBase from './step/StepBase'
import TitleRow from '../common-forms/title-row'
import { MAX_STEP as PERSONAL_HOME_MULTIPLE_MAX_STEP } from '../../../redux/reducers/insurance-app/buyInsuranceHomeMultiple'
import { MAX_STEP as GOODS_MAX_STEP } from '../../../redux/reducers/insurance-app/buyInsurancesGoods'
import Service from '../../../services/insurance-app/appConfig'

const BoldTextRow = ({
  msgField,
  isShowTemplateBtn,
  handleTemplateBtnClick,
  className
}) => {
  return (
    <div className={'d-flex justify-content-between ' + className}>
      <TitleRow msg={msgField} type='s' className='w-75' />
      {isShowTemplateBtn && (
        <Button.Ripple
          className='mb-1 d-flex justify-content-end round'
          size='sm'
          color='primary'
          onClick={handleTemplateBtnClick}
        >
          <FormattedMessage id={getKeyLang(`Template`)} />
        </Button.Ripple>
      )}
    </div>
  )
}

/**
 * @example
 * insursInfo = [
 *  {
 *      handleClick, imgSrc, msgField
 *  },
 * ]
 */
const InsuranceCol = ({ insursInfo }) => {
  const doingNothing = () => {}

  return (
    <Row>
      {insursInfo.map((elt, index) => {
        return (
          <Col md={6} xs={12} key={index} className={index > 1 ? '' : ''}>
            <div
              className='d-flex align-items-center cursor-pointer'
              onClick={elt.handleClick || doingNothing}
            >
              <img
                className='mr-2'
                src={elt.imgSrc}
                alt='user avatar'
                height='40'
                width='40'
              />
              <span>{elt.msgField}</span>
            </div>
          </Col>
        )
      })}
    </Row>
  )
}
/**
 * @example
    const dispatch = useDispatch()
    const intl = useIntl()
    const [openConfirm, ConfirmModal] = useConfirm(
        intl.formatMessage({ id: getKeyLang(`confirm.title.newContract`) }),
        intl.formatMessage({ id: getKeyLang(`confirm.content.newContract`) }),
        intl.formatMessage({ id: getKeyLang(`confirm.yesBtnLabel.newContract`) }),
        intl.formatMessage({ id: getKeyLang(`confirm.noBtnLabel.newContract`) })
    )
    const handleInsuranceClick = (reduxState, PATH, INSURANCE_TYPE, action, MAX_STEP) => {
            const letUserIn = (PATH, INSURANCE_TYPE) => {
                history.push(addAppContextPath(PATH))
                dispatch(assignInsuranceType(INSURANCE_TYPE))
            }
            const setupObj = {
                yesAction: () => {
                    action && dispatch(action.resetState())
                    letUserIn(PATH, INSURANCE_TYPE)
                },
                noAction: () => {
                    letUserIn(PATH, INSURANCE_TYPE)
                }
            }
        
            if (!reduxState) {
                letUserIn(PATH, INSURANCE_TYPE)
                return
            }
        
            if (MAX_STEP && reduxState.activeStep === MAX_STEP) {
                letUserIn(PATH, INSURANCE_TYPE)
                action && dispatch(action.resetState())
                return
            }
        
            if (!reduxState.contractId && reduxState.activeStep <= 1) {
                letUserIn(PATH, INSURANCE_TYPE)
                return
            }
            openConfirm(setupObj)
        }
    return (
        <>
            {ConfirmModal}
            <Original pageType="buy-insurance" handleInsuranceClick={handleInsuranceClick} isShowTemplateBtn={true} />
        </>
    )
 */
const BuyInsuranceCarPage = ({
  handleInsuranceClick,
  isShowTemplateBtn,
  pageType
}) => {
  const app = useSelector((state) => state.app)
  const [arrConfigInsurance, setArrConfigInsurance] = useState([])
  /** vehicleInfoComps section  */
  useEffect(() => {
    const getConfigInsurance = async () => {
      const res = await Service.getConfigInsuranceEnabled()
      setArrConfigInsurance(JSON.parse(res.data[0].value))
    }
    getConfigInsurance()
  }, [
    JSON.stringify(vehicleInfoComps),
    JSON.stringify(humanInsurances),
    JSON.stringify(assetsInsurances)
  ])

  const vehicleInfoComps = [
    {
      handleClick: handleInsuranceClick.bind(
        null,
        app[NAME_BUY_INSURANCES_CAR],
        PATH_BUY_INSURANCES_CAR,
        INSURANCE_TYPE_CAR,
        carAction,
        CAR_MAX_STEP
      ),
      imgSrc: carImg,
      msgField: <FormattedMessage id={getKeyLang(`InsuranceCar`)} />,
      type: INSURANCE_TYPE_CAR
    },
    {
      handleClick: handleInsuranceClick.bind(
        null,
        app[NAME_BUY_INSURANCES_MOTOR],
        PATH_BUY_INSURANCES_MOTOR,
        INSURANCE_TYPE_MOTOR,
        motorAction,
        MOTOR_MAX_STEP
      ),
      imgSrc: motorImg2,
      msgField: <FormattedMessage id={getKeyLang(`InsuranceMotor`)} />,
      type: INSURANCE_TYPE_MOTOR
    }
  ]
  if (pageType === 'buy-insurance') {
    vehicleInfoComps.push(
      {
        handleClick: handleInsuranceClick.bind(
          null,
          app[NAME_BUY_INSURANCES_CARS],
          PATH_BUY_INSURANCES_CARS,
          INSURANCE_TYPE_CARS,
          carsAction,
          CARS_MAX_STEP
        ),
        imgSrc: carImg,
        msgField: <FormattedMessage id={getKeyLang(`InsuranceCars`)} />,
        type: INSURANCE_TYPE_CARS
      },

      {
        handleClick: handleInsuranceClick.bind(
          null,
          app[NAME_BUY_INSURANCES_CAR],
          PATH_BUY_INSURANCES_CAR_SIMPLIFY,
          INSURANCE_TYPE_CAR,
          carAction,
          SIMPLIFY_MAX_STEP
        ),
        imgSrc: carImg,
        msgField: <FormattedMessage id={getKeyLang(`carSimplify`)} />,
        type: INSURANCE_TYPE_CAR_SIMPLIFY
      },
      {
        handleClick: handleInsuranceClick.bind(
          null,
          app[NAME_BUY_INSURANCES_MOTOR],
          PATH_BUY_INSURANCES_MOTOR_SIMPLIFY,
          INSURANCE_TYPE_MOTOR,
          motorAction,
          SIMPLIFY_MAX_STEP
        ),
        imgSrc: motorImg2,
        msgField: <FormattedMessage id={getKeyLang(`InsuranceMotor`)} />,
        type: INSURANCE_TYPE_MOTOR
      },
      {
        handleClick: handleInsuranceClick.bind(
          null,
          app[NAME_BUY_INSURANCES_MOTOR],
          PATH_BUY_INSURANCES_MOTOR_SIMPLIFY,
          INSURANCE_TYPE_MOTOR,
          motorAction,
          SIMPLIFY_MAX_STEP
        ),
        imgSrc: motorImg2,
        msgField: (
          <FormattedMessage id={getKeyLang(`simplifyInsuranceMotor`)} />
        ),
        type: INSURANCE_TYPE_MOTOR_SIMPLIFY
      },
      {
        handleClick: handleInsuranceClick.bind(
          null,
          app[NAME_BUY_INSURANCE_MOTORS],
          PATH_BUY_INSURANCES_MOTORS,
          INSURANCE_TYPE_MOTORS,
          motorsAction,
          MOTORS_MAX_STEP
        ),
        imgSrc: motorImg2,
        msgField: <FormattedMessage id={getKeyLang(`InsuranceMotors`)} />,
        type: INSURANCE_TYPE_MOTORS
      }
    )
  }
  const renderVehicleInfoComps = () => {
    let _insurances = []
    arrConfigInsurance
      .filter((_elt) => _elt.buyEnable === 1)
      .map((item) => {
        const insurance = vehicleInfoComps.find(
          (_elt) => _elt.type === item.key
        )
        if (insurance) {
          _insurances.push(insurance)
        }
      })
    return _insurances
  }
  /** humanInsurances section */
  const humanInsurances = [
    {
      handleClick: handleInsuranceClick.bind(
        null,
        app[NAME_BUY_INSURANCES_VTA],
        PATH_BUY_INSURANCES_VTA,
        INSURANCE_TYPE_VTA,
        vtaAction,
        VTA_MAX_STEP
      ),
      imgSrc: homeSafetyImg,
      msgField: <FormattedMessage id={getKeyLang(`vtaInsurance`)} />,
      type: INSURANCE_TYPE_VTA
    },
    {
      handleClick: handleInsuranceClick.bind(
        null,
        app[NAME_BUY_INSURANCES_FAMILY_SAFETY],
        PATH_BUY_INSURANCES_FAMILY_SAFETY,
        INSURANCE_TYPE_HOME_SAFETY,
        familySafetyAction,
        FAMILY_MAX_STEP
      ),
      imgSrc: homeSafetyImg,
      msgField: <FormattedMessage id={getKeyLang(`homeSafetyInsurance`)} />,
      type: INSURANCE_TYPE_HOME_SAFETY
    },
    {
      handleClick: handleInsuranceClick.bind(
        null,
        app[NAME_BUY_INSURANCES_HEALTH_CARE],
        PATH_BUY_INSURANCES_HEALTH_CARE,
        INSURANCE_TYPE_HEALTH_CARE,
        healthCareAction,
        HEALTH_MAX_STEP
      ),
      imgSrc: homeSafetyImg,
      msgField: <FormattedMessage id={getKeyLang(`healthCareInsurance`)} />,
      type: INSURANCE_TYPE_HEALTH_CARE_CONTRACT
    },
    {
      handleClick: handleInsuranceClick.bind(
        null,
        app[NAME_BUY_INSURANCES_HEALTH_CARE_ADVANCED],
        PATH_BUY_INSURANCES_HEALTH_CARE_ADVANCED,
        INSURANCE_TYPE_HEALTH_CARE_ADVANDCED,
        healthCareActionAdvanced,
        HEALTH_MAX_STEP
      ),
      imgSrc: homeSafetyImg,
      msgField: <FormattedMessage id={getKeyLang(`heathcareAdvanced.insurance`)} />,
      type: INSURANCE_TYPE_HEALTH_CARE_ADVANDCED
    },
    {
      handleClick: handleInsuranceClick.bind(
        null,
        app[NAME_BUY_INSURANCES_ANTIN],
        PATH_BUY_ANTIN_INSURANCE,
        INSURANCE_TYPE_ANTIN_CONTRACT,
        antinAction,
        4
      ),
      imgSrc: homeSafetyImg,
      msgField: <FormattedMessage id={getKeyLang(`antin.title`)} />,
      type: INSURANCE_TYPE_ANTIN_CONTRACT
    }
  ]
  const renderHumanInsurances = () => {
    let _insurances = []
    arrConfigInsurance
      .filter((_elt) => _elt.buyEnable === 1)
      .map((item) => {
        const insurance = humanInsurances.find((_elt) => _elt.type === item.key)
        if (insurance) {
          _insurances.push(insurance)
        }
      })
    return _insurances
  }
  /** assetsInsurances section  */
  const assetsInsurances = [
    {
      handleClick: handleInsuranceClick.bind(
        null,
        app[NAME_BUY_INSURANCES_PERSONAL_HOME],
        PATH_BUY_INSURANCES_PERSONAL_HOME,
        INSURANCE_TYPE_PERSONAL_HOME,
        personalHomeAction,
        HOME_MAX_STEP
      ),
      imgSrc: homeImg,
      msgField: <FormattedMessage id={getKeyLang(`personalHomeInsurance`)} />,
      type: INSURANCE_TYPE_PERSONAL_HOME
    },
    {
      handleClick: handleInsuranceClick.bind(
        null,
        app[NAME_BUY_INSURANCES_GOODS],
        PATH_BUY_INSURANCES_GOODS,
        INSURANCE_TYPE_GOODS,
        goodsAction,
        GOODS_MAX_STEP
      ),
      imgSrc: homeImg,
      msgField: <FormattedMessage id={getKeyLang(`goods.title`)} />,
      type: INSURANCE_TYPE_GOODS
    }
  ]
  if (pageType === 'buy-insurance') {
    assetsInsurances.push({
      handleClick: handleInsuranceClick.bind(
        null,
        app[NAME_BUY_INSURANCES_MULTIPLE_HOME],
        PATH_BUY_HOME_PERSONAL_MULTIPLE,
        INSURANCE_TYPE_PERSONAL_HOME_MULTIPLE,
        homePersonalMulpleAction,
        PERSONAL_HOME_MULTIPLE_MAX_STEP
      ),
      imgSrc: homeImg,
      msgField: (
        <FormattedMessage
          id={getKeyLang('insurance.homePersonMultiple.titleSelect')}
        />
      ),
      type: INSURANCE_TYPE_PERSONAL_HOME_MULTIPLE
    })
  }
  const renderAssetsInsurances = () => {
    let _insurances = []
    arrConfigInsurance
      .filter((_elt) => _elt.buyEnable === 1)
      .map((item) => {
        const insurance = assetsInsurances.find(
          (_elt) => _elt.type === item.key
        )
        if (insurance) {
          _insurances.push(insurance)
        }
      })
    return _insurances
  }
  const travelInsurances = [
    {
      handleClick: handleInsuranceClick.bind(
        null,
        app[NAME_BUY_INSURANCES_TRAVEL],
        PATH_BUY_INSURANCES_TRAVEL,
        INSURANCE_TYPE_TRAVEL,
        travelAction,
        TRAVEL_MAX_STEP
      ),
      imgSrc: travelImg,
      msgField: <FormattedMessage id={getKeyLang(`travelInsurance`)} />,
      type: INSURANCE_TYPE_TRAVEL
    },
    {
      handleClick: handleInsuranceClick.bind(
        null,
        app[NAME_BUY_INSURANCES_TRAVEL_DOMESTIC],
        PATH_BUY_INSURANCES_TRAVEL_DOMESTIC,
        INSURANCE_TYPE_TRAVEL_DS,
        travelDomesticAction,
        TRAVEL_DOMESTIC_MAX_STEP
      ),
      imgSrc: travelImg,
      msgField: <FormattedMessage id={getKeyLang(`travel.domestic`)} />,
      type: INSURANCE_TYPE_TRAVEL_DOMESTIC
    }
  ]
  const renderTravelInsurance = () => {
    let _insurances = []
    arrConfigInsurance
      .filter((_elt) => _elt.buyEnable === 1)
      .map((item) => {
        const insurance = travelInsurances.find(
          (_elt) => _elt.type === item.key
        )
        if (insurance) {
          _insurances.push(insurance)
        }
      })
    return _insurances
  }
  return (
    <StepBase
      titleMsg={<FormattedMessage id={getKeyLang(`InsuranceSelect`)} />}
    >
      <CardBody>
        <BoldTextRow
          msgField={<FormattedMessage id={getKeyLang(`InsuranceVehicle`)} />}
          isShowTemplateBtn={isShowTemplateBtn}
          handleTemplateBtnClick={() => {
            history.push(
              addAppContextPath(PATH_BUY_INSURANCES_VEHICLE_TEMPLATE)
            )
          }}
          className={pageType !== 'buy-insurance' && 'mb-1'}
        />
        <InsuranceCol insursInfo={renderVehicleInfoComps()} />

        <BoldTextRow
          msgField={<FormattedMessage id={getKeyLang(`peopleInsurance`)} />}
          className={'mt-2'}
        />
        <InsuranceCol insursInfo={renderHumanInsurances()} />

        <BoldTextRow
          msgField={<FormattedMessage id={getKeyLang(`assetsInsurance`)} />}
          className={'mt-2'}
        />
        <InsuranceCol insursInfo={renderAssetsInsurances()} />
        <BoldTextRow
          msgField={<FormattedMessage id={getKeyLang(`travelInsurances`)} />}
          className={'mt-2'}
        />
        <InsuranceCol insursInfo={renderTravelInsurance()} />
      </CardBody>
    </StepBase>
  )
}

export default BuyInsuranceCarPage
