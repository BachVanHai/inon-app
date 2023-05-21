import 'base-app/index.css'
import './assets/scss/insurance-app/common.scss'
import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import Payment from './components/insurance-app/payment'

import {
  addAppContextPath, PATH_BUY_INSURANCE, PATH_BUY_INSURANCES_CAR, PATH_BUY_INSURANCES_VEHICLE_TEMPLATE,
  PATH_BUY_INSURANCES_FAMILY_SAFETY, PATH_BUY_INSURANCES_PERSONAL_HOME, PATH_BUY_INSURANCES_VTA,
  PATH_CONTRACTS_MANAGE, PATH_VNPAY_RETURN, ROLE_ALL, ROLE_PARTNER, ROLE_PERSONAL, PATH_BUY_INSURANCES_MOTOR,
  PATH_BUY_INSURANCES_MOTOR_SIMPLIFY, PATH_BUY_INSURANCES_MOTORS, PATH_BUY_INSURANCES_CARS, PATH_BUY_INSURANCES_HEALTH_CARE, PATH_BUY_INSURANCES_CAR_SIMPLIFY, PATH_BUY_ANTIN_INSURANCE , PATH_BUY_INSURANCES_TRAVEL, PATH_BUY_INSURANCES_TRAVEL_DOMESTIC, PATH_BUY_INSURANCES_GOODS, PATH_BUY_INSURANCES_HEALTH_CARE_ADVANCED
} from './configs/insurance-app'

const InsuranceApp = () => {
  const InsuranceManageAllPage = lazy(() => import('./pages/insurance-app/insurance-manage/InsuranceManageAllPage'))
  const InsurancesManageView = lazy(() => import('./pages/insurance-app/insurance-manage/manage'))
  const InsuranceManagePersPage = lazy(() => import('./pages/insurance-app/insurance-manage/InsuranceManagePersPage'))
  const InsuranceManagePartnerPage = lazy(() => import('./pages/insurance-app/insurance-manage/InsuranceManagePartnerPage'))

  const FeeManageAllPage = lazy(() => import('./pages/insurance-app/manage-insurance-fee/FeeManageAllPage'))
  const FeeCarManageView = lazy(() => import('./pages/insurance-app/manage-insurance-fee/component/FeeCarManageView'))
  const FeeMotorManageView = lazy(() => import('./pages/insurance-app/manage-insurance-fee/component/FeeMotorManageView'))
  const FeeAntinManageView = lazy(() => import('./pages/insurance-app/manage-insurance-fee/component/FeeAntinManageView'))
  const FeeTravelWordwideManageView = lazy(() => import('./pages/insurance-app/manage-insurance-fee/component/FeeWordwideManageView'))
  const FeeTravelDomesticManageView = lazy(() => import('./pages/insurance-app/manage-insurance-fee/component/FeeTravelDomesticManageView'))
  const FeeManageSystemPage = lazy(() => import('./pages/insurance-app/manage-insurance-fee/FeeManageSystemPage'))
  const FeeManageLXPartnerPage = lazy(() => import('./pages/insurance-app/manage-insurance-fee/FeeManageLXPartnerPage'))
  const FeeManagePersionalPage = lazy(() => import('./pages/insurance-app/manage-insurance-fee/FeeManagePersionalPage'))
  const FeeManagePartnerPage = lazy(() => import('./pages/insurance-app/manage-insurance-fee/FeeManagePartnerPage'))
  const FeeManageCustomerPage = lazy(() => import('./pages/insurance-app/manage-insurance-fee/FeeManageCustomerPage'))
  const FeeManageApprovePage = lazy(() => import('./pages/insurance-app/manage-insurance-fee/FeeManageApprovePage'))
  const FeePartnerConfigPage = lazy(() => import('./pages/insurance-app/manage-insurance-fee/FeePartnerConfigPage'))

  const VehicleTemplateView = lazy(() => import('./components/insurance-app/common-page/template-list'))
  const BuyInsurancePage = lazy(() => import('./pages/insurance-app/buy-insurances'))
  const FamilySafetyView = lazy(() => import('./pages/insurance-app/buy-insurances/family-safety'))
  const CarView = lazy(() => import('./pages/insurance-app/buy-insurances/car'))
  const CarsView = lazy(() => import('./pages/insurance-app/buy-insurances/cars'))
  const MotorView = lazy(() => import('./pages/insurance-app/buy-insurances/motor'))
  const MotorsView = lazy(() => import('./pages/insurance-app/buy-insurances/motors'))
  const MotorSimplifyView = lazy(() => import('./pages/insurance-app/buy-insurances/motor-simplify'))
  const CarSimplifyView = lazy(() => import('./pages/insurance-app/buy-insurances/car-simplify'))
  const PersonalHomeView = lazy(() => import('./pages/insurance-app/buy-insurances/personal-home'))
  const VtaView = lazy(() => import('./pages/insurance-app/buy-insurances/vta'))
  const HomeInsuranceMultiple = lazy(() => import('./pages/insurance-app/buy-insurances/personal-home-multiple'))
  const HealthCareView = lazy(() => import('./pages/insurance-app/buy-insurances/health-care'))
  const HealthCareAdvancedView = lazy(() => import('./pages/insurance-app/buy-insurances/health-care-advanced'))
  const AntinView = lazy(() => import('./pages/insurance-app/buy-insurances/antin-insurance'))
  const TravelView = lazy(() => import('./pages/insurance-app/buy-insurances/travel'))
  const TravelDomesticView = lazy(() => import('./pages/insurance-app/buy-insurances/travel-domestic'))
  const goodsView = lazy(() => import('./pages/insurance-app/buy-insurances/goods-domestic'))

  return (
    <div className='app insurance-app'>
      <Switch>
        <Route exact path={addAppContextPath(PATH_BUY_INSURANCE)} component={BuyInsurancePage} />

        <Route path={addAppContextPath(PATH_BUY_INSURANCES_VTA)} component={VtaView} />
        <Route path={addAppContextPath(PATH_BUY_INSURANCES_CAR)} component={CarView} />
        <Route path={addAppContextPath(PATH_BUY_INSURANCES_CARS)} component={CarsView} />
        <Route path={addAppContextPath(PATH_BUY_INSURANCES_MOTOR)} component={MotorView} />
        <Route path={addAppContextPath(PATH_BUY_INSURANCES_MOTORS)} component={MotorsView} />
        <Route path={addAppContextPath(PATH_BUY_INSURANCES_MOTOR_SIMPLIFY)} component={MotorSimplifyView} />
        <Route path={addAppContextPath(PATH_BUY_INSURANCES_CAR_SIMPLIFY)} component={CarSimplifyView} />
        <Route path={addAppContextPath(PATH_BUY_INSURANCES_FAMILY_SAFETY)} component={FamilySafetyView} />
        <Route path={addAppContextPath(PATH_BUY_INSURANCES_PERSONAL_HOME)} component={PersonalHomeView} />
        <Route path={addAppContextPath(PATH_BUY_INSURANCES_HEALTH_CARE)} component={HealthCareView} />
        <Route path={addAppContextPath(PATH_BUY_ANTIN_INSURANCE)} component={AntinView} />
        <Route path={addAppContextPath(PATH_BUY_INSURANCES_TRAVEL)} component={TravelView} />
        <Route path={addAppContextPath(PATH_BUY_INSURANCES_TRAVEL_DOMESTIC)} component={TravelDomesticView} />
        <Route path={addAppContextPath(PATH_BUY_INSURANCES_GOODS)} component={goodsView} />
        <Route path={addAppContextPath(PATH_BUY_INSURANCES_HEALTH_CARE_ADVANCED)} component={HealthCareAdvancedView} />

        <Route exact path={addAppContextPath(PATH_CONTRACTS_MANAGE + `/${ROLE_PERSONAL}`)} component={InsuranceManagePersPage} />
        <Route exact path={addAppContextPath(PATH_CONTRACTS_MANAGE + `/${ROLE_ALL}`)} component={InsuranceManageAllPage} />
        <Route exact path={addAppContextPath(PATH_CONTRACTS_MANAGE + `/${ROLE_PARTNER}`)} component={InsuranceManagePartnerPage} />
        <Route path={addAppContextPath(PATH_CONTRACTS_MANAGE + '/:id')} component={InsurancesManageView} />

        <Route path={addAppContextPath(PATH_BUY_INSURANCES_VEHICLE_TEMPLATE)} component={VehicleTemplateView} />
        <Route path={addAppContextPath(PATH_VNPAY_RETURN)} component={Payment} />

        <Route
          exact
          path='/insurance/insurance-fee/system'
          component={FeeManageSystemPage}
        />
        <Route
          exact
          path='/insurance/insurance-fee/all'
          component={FeeManageAllPage}
        />
        <Route
          exact
          path='/insurance/insurance-fee/lx-partner'
          component={FeeManageLXPartnerPage}
        />
        <Route
          exact
          path='/insurance/insurance-fee/personal'
          component={FeeManagePersionalPage}
        />
        <Route
          exact
          path='/insurance/insurance-fee/partner'
          component={FeeManagePartnerPage}
        />
        <Route
          exact
          path='/insurance/insurance-fee/customer'
          component={FeeManageCustomerPage}
        />
        <Route path='/insurance/insurance-fee/feeCar' component={FeeCarManageView} />
        <Route path='/insurance/insurance-fee/feeMotor' component={FeeMotorManageView} />
        <Route path='/insurance/insurance-fee/feeAntin' component={FeeAntinManageView} />
        <Route path='/insurance/insurance-fee/feeTravelWordwide' component={FeeTravelWordwideManageView} />
        <Route path='/insurance/insurance-fee/feeTravelDomestic' component={FeeTravelDomesticManageView} />
        <Route
          exact
          path='/insurance/insurance-fee/approval'
          component={FeeManageApprovePage}
        />
        <Route
          exact
          path='/insurance/insurance-fee/fee-partner-config'
          component={FeePartnerConfigPage}
        />
        <Route exact path='/insurance' />
        <Route exact path='/insurance/buy-insurance/home-personal-multiple' component={HomeInsuranceMultiple} />
      </Switch>
    </div>
  )
}

export default InsuranceApp