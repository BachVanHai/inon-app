import 'base-app/index.css'
import React, { lazy, Suspense } from 'react'
import storage from 'redux-persist/lib/storage'
import { FallbackSpinner, AppId } from 'base-app'
import appNo1EN from './assets/translates/app-no1/en.json'
import appNo1VN from './assets/translates/app-no1/vi.json'
import eliteAppEN from './assets/translates/elite-app/en.json'
import eliteAppVN from './assets/translates/elite-app/vi.json'
import insuranceAppVN from './assets/translates/insurance-app/vi.json'
import insuranceAppEN from './assets/translates/insurance-app/en.json'
import supplementAppVN from './assets/translates/supplement-app/vi.json'
import supplementAppEN from './assets/translates/supplement-app/en.json'
import { Route, Router, Switch } from 'react-router-dom'
import userGroupReducer from './redux/reducers/app-no1/userGroup'
import accountReducer from './redux/reducers/app-no1/account'
import homeReducer from './redux/reducers/app-no1/home'
import buyInsuranceReducer from './redux/reducers/elite-app/buy-insurace/BuyInsurance'
import contractManagementReducer from './redux/reducers/elite-app/contract-management/ContractManagement'
import { combineReducers } from 'redux'
import { history } from './history'
import { persistReducer } from 'redux-persist'
import feeInsuranceReducer from './redux/reducers/insurance-app/feeInsuManage'
import bonusReducer from './redux/reducers/supplement-app/bonus'
import bonusApprovalReducer from './redux/reducers/supplement-app/bonusApproval'
import bonusHistoryReducer from './redux/reducers/supplement-app/bonusHistory'
import debtManagementReducer from './redux/reducers/supplement-app/debtManagement'
import debtCreateReducer from './redux/reducers/supplement-app/debtCreate'
import debtApprovalReducer from './redux/reducers/supplement-app/debtApproval'
import notificationApprovalReducer from './redux/reducers/supplement-app/notificationApproval'
import notificationCreateReducer from './redux/reducers/supplement-app/notificationCreate'
import notificationManagementReducer from './redux/reducers/supplement-app/notificationManagement'
import introReducer from './redux/reducers/app-no1/intro/Intro'
import buyInsurancesFamilySafety from './redux/reducers/insurance-app/buyInsurancesFamilySafety'
import buyInsurancesCar from './redux/reducers/insurance-app/buyInsurancesCar'
import buyInsurancesCars from './redux/reducers/insurance-app/buyInsurancesCars'
import buyInsurancesPersonalHome from './redux/reducers/insurance-app/buyInsurancesPersonalHome'
import buyInsurancesVta from './redux/reducers/insurance-app/buyInsurancesVta'
import buyInsurancesMotor from './redux/reducers/insurance-app/buyInsurancesMotor'
import buyInsurancesMotors from './redux/reducers/insurance-app/buyInsurancesMotors'
import appConfigRed from './redux/reducers/insurance-app/appConfig'
import eVoucherCreateReducer from './redux/reducers/supplement-app/eVoucherCreate'
import eVoucherManagementReducer from './redux/reducers/supplement-app/eVoucherManagement'

import {
  NAME_APP_CONFIG, NAME_BUY_INSURANCES_CAR, NAME_BUY_INSURANCES_FAMILY_SAFETY, NAME_BUY_INSURANCES_MOTOR,
  NAME_BUY_INSURANCE_MOTORS, NAME_BUY_INSURANCES_MULTIPLE_HOME, NAME_BUY_INSURANCES_PERSONAL_HOME,
  NAME_BUY_INSURANCES_VTA, NAME_BUY_INSURANCES_CARS, NAME_BUY_INSURANCES_ANTIN, NAME_CHAT_BOX, NAME_BUY_INSURANCES_HEALTH_CARE, NAME_BUY_INSURANCES_TRAVEL, NAME_BUY_INSURANCES_TRAVEL_DOMESTIC, NAME_BUY_INSURANCES_GOODS, NAME_BUY_INSURANCES_HEALTH_CARE_ADVANCED
} from './configs/insurance-app'
import helpCenterCreateReducers from './redux/reducers/app-no1/helpCenterCreate'
import helpCenterManagementReducers from './redux/reducers/app-no1/helpCenterManagement'
import helpCenterPublicReducers from './redux/reducers/elite-app/help-center/helpcenter';
import helpCenterPublicKHCNReducers from './redux/reducers/app-no1/helpCenterViewQuestion';
import managementRequestReducers from './redux/reducers/app-no1/supportManagement'
import myRequestManagementReducers from './redux/reducers/app-no1/myRequestManagement'
import createRequestReducers from './redux/reducers/app-no1/supportCreate'
import permissionReducers from './redux/reducers/app-no1/permissionManagement'
import ChatBox from './components/elite-app/chat-box'
import ChatBoxRed from './components/elite-app/chat-box/reducer'
import { API_DEV_URL, API_SIT_URL, NODE_ENV_TYPE_DEVELOPMENT, NODE_ENV_TYPE_PRODUCTION } from './ultity'
import PageWrapper from './components/insurance-app/common-page/page-context/PageContext'
import AuthSitBox from './components/elite-app/authenticate-sit'
import accountProducsReducers from './redux/reducers/supplement-app/accountProducts'
import buyInsuranceHomeMultipleReducers from './redux/reducers/insurance-app/buyInsuranceHomeMultiple'
import healthCareReducers from './redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import antinReducers from './redux/reducers/insurance-app/buyInsurancesAntin'
import travelReducers from './redux/reducers/insurance-app/buyInsurancesTravel'
import travelDomesticReducers from './redux/reducers/insurance-app/buyInsurancesTravelDomestic'
import goodsReducers from './redux/reducers/insurance-app/buyInsurancesGoods'
import heathCareAdvancedReducers from './redux/reducers/insurance-app/buyInsurancesHealthCareAdvanced'
import renewalInsuranceReducers from './redux/reducers/elite-app/renewal/renewal'

const familySafetyPersistConfig = {
  key: 'buy-insurances-family-safety',
  storage
}
const carPersistConfig = {
  key: 'buy-insurances-car',
  storage
}
const carsPersistConfig = {
  key: 'buy-insurances-cars',
  storage
}
const personalHomePersistConfig = {
  key: 'buy-insurances-personal-home',
  storage
}
const VtaPersistConfig = {
  key: 'buy-insurances-vta',
  storage
}
const MotorPersistConfig = {
  key: 'buy-insurances-motor',
  storage
}
const MotorsPersistConfig = {
  key: 'buy-insurances-motors',
  storage
}
const appConfig = {
  key: 'app-config',
  storage
}

const chatBoxConfig = {
  key: 'chat-box',
  storage
}
const personalHomeMultiple = {
  key: 'buy-insuraces-home-personal-multiple',
  storage
}
const healthCare = {
  key: 'buy-insurance-health-care',
  storage
}
const antin = {
  key: 'buy-insurances-antin',
  storage
}
const travel = {
  key: 'buy-insurance-travel',
  storage
}
const travelDomestic = {
  key: 'buy-insurance-travel-domestic',
  storage
}
const goodsDomestic = {
  key: 'buy-insurance-goods',
  storage
}
const heathCareAdvanced = {
  key: 'buy-insurance-goods',
  storage
}

const buyInsurancesFamilySafetyReducer = persistReducer(familySafetyPersistConfig, buyInsurancesFamilySafety)
const buyInsurancesCarReducer = persistReducer(carPersistConfig, buyInsurancesCar)
const buyInsurancesCarsReducer = persistReducer(carsPersistConfig, buyInsurancesCars)
const buyInsurancesPersonalHomeReducer = persistReducer(personalHomePersistConfig, buyInsurancesPersonalHome)
const buyInsurancesVtaReducer = persistReducer(VtaPersistConfig, buyInsurancesVta)
const buyInsurancesMotorReducer = persistReducer(MotorPersistConfig, buyInsurancesMotor)
const buyInsurancesMotorsReducer = persistReducer(MotorsPersistConfig, buyInsurancesMotors)
const appConfigReducer = persistReducer(appConfig, appConfigRed)
const ChatBoxReducer = persistReducer(chatBoxConfig, ChatBoxRed)
const buyInsuranceHomeMultipleReducer = persistReducer(personalHomeMultiple, buyInsuranceHomeMultipleReducers)
const buyInsurancesHealthCareReducer = persistReducer(healthCare, healthCareReducers)
const buyInsurancesAntinReducer = persistReducer(antin, antinReducers)
const buyInsurancesTravelReducer = persistReducer(travel, travelReducers)
const buyInsurancesTravelDomesticReducer = persistReducer(travelDomestic, travelDomesticReducers)
const buyInsurancesGoodsReducer = persistReducer(goodsDomestic, goodsReducers)
const buyInsurancesHeathCareAdvancedReducer = persistReducer(heathCareAdvanced, heathCareAdvancedReducers)

const App = () => {
  const setMessages = (message = {}, appId) => {
    const newMessage = {}
    Object.keys(message).forEach((key) => {
      newMessage[appId + '.' + key] = message[key]
    })
    return newMessage
  }

  const message = {
    en: {
      ...setMessages(appNo1EN, AppId.APP_NO1),
      ...setMessages(eliteAppEN, AppId.ELITE_APP),
      ...setMessages(insuranceAppEN, AppId.INSURANCE_APP),
      ...setMessages(supplementAppEN, AppId.SUPPLEMENT_APP)
    },
    vi: {
      ...setMessages(appNo1VN, AppId.APP_NO1),
      ...setMessages(eliteAppVN, AppId.ELITE_APP),
      ...setMessages(insuranceAppVN, AppId.INSURANCE_APP),
      ...setMessages(supplementAppVN, AppId.SUPPLEMENT_APP)
    }
  }

  const BaseApp = lazy(() => import('./BasePage'))
  const EliteApp = lazy(() => import('./EliteApp'))
  const InsuranceApp = lazy(() => import('./InsuranceApp'))
  const SupplementApp = lazy(() => import('./SupplementApp'))
  const AppNo1 = lazy(() => import('./AppNo1'))

  const appReducer = combineReducers({
    userGroup: userGroupReducer,
    account: accountReducer,
    home: homeReducer,
    buyInsurance: persistReducer({ key: 'buyInsurance', storage },
      buyInsuranceReducer
    ),

    contractManagement: contractManagementReducer,
    feeInsuranceReducer: feeInsuranceReducer,
    [NAME_CHAT_BOX]: ChatBoxReducer,
    [NAME_APP_CONFIG]: appConfigReducer,
    [NAME_BUY_INSURANCES_VTA]: buyInsurancesVtaReducer,
    [NAME_BUY_INSURANCES_CAR]: buyInsurancesCarReducer,
    [NAME_BUY_INSURANCES_CARS]: buyInsurancesCarsReducer,
    [NAME_BUY_INSURANCES_MOTOR]: buyInsurancesMotorReducer,
    [NAME_BUY_INSURANCE_MOTORS]: buyInsurancesMotorsReducer,
    [NAME_BUY_INSURANCES_PERSONAL_HOME]: buyInsurancesPersonalHomeReducer,
    [NAME_BUY_INSURANCES_FAMILY_SAFETY]: buyInsurancesFamilySafetyReducer,
    [NAME_BUY_INSURANCES_MULTIPLE_HOME]: buyInsuranceHomeMultipleReducer,
    [NAME_BUY_INSURANCES_HEALTH_CARE]: buyInsurancesHealthCareReducer,
    [NAME_BUY_INSURANCES_ANTIN]: buyInsurancesAntinReducer,
    [NAME_BUY_INSURANCES_TRAVEL]: buyInsurancesTravelReducer,
    [NAME_BUY_INSURANCES_TRAVEL_DOMESTIC]: buyInsurancesTravelDomesticReducer,
    [NAME_BUY_INSURANCES_GOODS]: buyInsurancesGoodsReducer,
    [NAME_BUY_INSURANCES_HEALTH_CARE_ADVANCED]: buyInsurancesHeathCareAdvancedReducer,

    bonus: bonusReducer,
    bonusApproval: bonusApprovalReducer,
    bonusHistory: bonusHistoryReducer,
    debtManagement: debtManagementReducer,
    debtCreate: debtCreateReducer,
    debtApproval: debtApprovalReducer,
    notificationCreate: notificationCreateReducer,
    notificationApproval: notificationApprovalReducer,
    notificationManagement: notificationManagementReducer,
    evoucherCreate: eVoucherCreateReducer,
    evoucherManagement: eVoucherManagementReducer,
    helpCenterCreate: helpCenterCreateReducers,
    helpCenterManagement: helpCenterManagementReducers,
    helpCenterPublic: helpCenterPublicReducers,
    helpCenterKNCN: helpCenterPublicKHCNReducers,
    supportManangement: managementRequestReducers,
    myRequestManagement: myRequestManagementReducers,
    permissionManagement: permissionReducers,
    supportCreate: createRequestReducers,
    intro: persistReducer({ key: 'intro', storage },
      introReducer
    ),
    accountProducts: accountProducsReducers,
    renewalInsurance : renewalInsuranceReducers
  })

  const getBaseUrl = () => {
    let url
    switch (process.env.NODE_ENV) {
      case NODE_ENV_TYPE_DEVELOPMENT:
        url = API_DEV_URL
        break
      case NODE_ENV_TYPE_PRODUCTION:
        window.console.log = () => { }
        url = API_SIT_URL
        break
      default:
        break
    }
    return url
  }

  return (
    <Suspense fallback={<FallbackSpinner />}>
      <BaseApp
        history={history}
        message={message}
        apiBaseUrl={getBaseUrl()}
        appId={AppId.ELITE_APP}
        appReducer={appReducer}
      >
        <PageWrapper value={{ sockJs: null, _forceUpdate: 0 }}>
          <AuthSitBox />
          <ChatBox />
          <Router history={history}>
            <Switch>
              {/*App no1*/}
              <Route path='/app' component={AppNo1} />
              {/*App no1*/}
              {/*Insurance app*/}
              <Route path='/insurance' component={InsuranceApp} />
              {/*Insurance app*/}
              {/*Supplement app*/}
              <Route path='/supplement' component={SupplementApp} />
              {/*Supplement app*/}
              {/*Elite app*/}
              <Route path='/' component={EliteApp} />
              {/*Elite app*/}
            </Switch>
          </Router>
        </PageWrapper>
      </BaseApp>
    </Suspense>
  )
}

export default App