import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import RegisterAgent from './pages/elite-app/settings/RegisterAgent'
import AccountSettings from './pages/elite-app/settings/AccountSettings'
import GeneralInfo from './pages/elite-app/settings/GeneralInfo'
import InitApp from './components/elite-app/InitApp'
import PaymentProcessing from './pages/elite-app/buy-insurance/PaymentProcessing'

const EliteApp = () => {

  const Home = lazy(() => import('./pages/elite-app/home/Home'))
  const BuyInsurance = lazy(() => import('./pages/elite-app/buy-insurance/BuyInsurance'))
  const ContractManagement = lazy(() => import('./pages/elite-app/contract-management/ContractManagement'))
  const AccountSettingMobile = lazy(() => import('./pages/elite-app/settings/AccountSettingMobile'))
  const Renewal = lazy(() => import('./pages/elite-app/insuranceRenewal'))
  const BuyNewInsurance = lazy(() => import('./pages/elite-app/buyNewInsurance'))


  const settingRoutes = [
    { id: 'account-info', path: 'app-account-info', component: AccountSettings },
    { id: 'change-password', path: 'app-change-password', component: AccountSettings },
    { id: 'share-with-friends', path: 'app-share-with-friends', component: AccountSettings },
    { id: 'terms-and-condition', path: 'app-terms-and-condition', component: GeneralInfo },
    { id: 'privacy-policy', path: 'app-privacy-policy', component: GeneralInfo },
    { id: 'language', path: 'app-language', component: GeneralInfo },
    { id: 'contact', path: 'app-contact', component: GeneralInfo },
    { id: 'register-agent', path: 'register-agent', component: RegisterAgent },
  ]


  return (
    <div className={`app elite-app`}>
      <>
        <Switch>
          {settingRoutes.map((item) => (
            <Route
              key={item.id}
              path={`/${item.id}`}
              render={() => <item.component activeTab={item.id} />}
            />
          ))}
          <Route path='/buy-insurance/:type' component={BuyInsurance} />
          <Route path='/vnpayreturn' component={PaymentProcessing} />
          <Route path='/contract-management' component={ContractManagement} />
          <Route path='/register-agent' component={RegisterAgent} />
          <Route path="/account-setting-mobile" component={AccountSettingMobile} />
          <Route path="/buy-old-insurance/:id" component={Renewal} />
          <Route path="/buy-insurance-on-zalo/:id" component={BuyNewInsurance} />
          <Route path='/' component={Home} />
        </Switch>
      </>
      <InitApp />
    </div>
  )
}

export default React.memo(EliteApp)
