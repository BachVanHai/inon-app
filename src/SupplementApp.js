import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

const SupplementApp = () => {

  const Bonus = lazy(() => import('./pages/supplement-app/bonus/Bonus'))
  const BonusApproval = lazy(() => import('./pages/supplement-app/bonus-approval/BonusApproval'))
  const BonusHistory = lazy(() => import('./pages/supplement-app/bonus-history/BonusHistory'))
  const DebtManagement = lazy(() => import('./pages/supplement-app/account/debt/management/DebtManagement'))
  const MyDebtManagement = lazy(() => import('./pages/supplement-app/account/debt/management/MyDebtManagement'))
  const DetailDebtPartnerContract = lazy(() => import('./pages/supplement-app/account/debt/management/DetailDebtPartnerContract'))
  const DetailMyDebtContract = lazy(() => import('./pages/supplement-app/account/debt/management/DetailMyDebtContract'))
  const NewDebt = lazy(() => import('./pages/supplement-app/account/debt/create/NewDebt'))
  const DebtApproval = lazy(() => import('./pages/supplement-app/account/debt/approval/DebtApproval'))
  const EditDebt = lazy(() => import('./pages/supplement-app/account/debt/edit/EditDebt'))
  const CreateNotification = lazy(() => import('./pages/supplement-app/notification/create/NewNotification'))
  const NotificationManagement = lazy(() => import('./pages/supplement-app/notification/management/NotificationManagement'))
  const NewEVoucher = lazy(() => import('./pages/supplement-app/evoucher/create/NewEVoucher'))
  const ManagementEVoucher =  lazy(() => import('./pages/supplement-app/evoucher/management/ManagementEVoucher'))
  const EditEvoucher =  lazy(() => import('./pages/supplement-app/evoucher/edit/EditEvoucher'))
  const ImportAccountProduct =  lazy(() => import('./pages/supplement-app/account-product/importAccountProduct/ImportAcountProduct'))
  const ManagementAccountProduct =  lazy(() => import('./pages/supplement-app/account-product/managementAccountProduct/ManagementAccountProduct'))
  return (
    <div className='supplement-app app'>
      <Switch>
        <Route path='/supplement/bonus/approval' component={BonusApproval} />
        <Route path='/supplement/bonus-history' component={BonusHistory} />
        <Route path='/supplement/bonus' component={Bonus} />
        <Route path='/supplement/debt/create' component={NewDebt} />
        <Route path='/supplement/debt/approval' component={DebtApproval} />
        <Route path='/supplement/debt/edit' component={EditDebt} />
        <Route path='/supplement/debt/partner-debt/:userId' component={DetailDebtPartnerContract} />
        <Route path='/supplement/debt/all-debt/:userId' component={DetailDebtPartnerContract} />
        <Route path='/supplement/debt/personal-debt/:userId' component={DetailMyDebtContract} />
        <Route path='/supplement/debt/personal-debt' component={MyDebtManagement} />
        <Route path='/supplement/debt/partner-debt' component={DebtManagement} />
        <Route path='/supplement/debt/all-debt' component={DebtManagement} />
        <Route path='/supplement/notification/create' component={CreateNotification} exact/>
        <Route path='/supplement/notification/create/:id' component={CreateNotification} exact/>
        <Route path='/supplement/notification/management' component={NotificationManagement} />
        <Route path='/supplement/evoucher/create' component={NewEVoucher}/>
        <Route path='/supplement/evoucher/management' component={ManagementEVoucher}/>
        <Route path='/supplement/evoucher/edit/:id' component={EditEvoucher}/>
        <Route path='/supplement/account-product/import' component={ImportAccountProduct}/>
        <Route path='/supplement/account-product/management' component={ManagementAccountProduct}/>
      </Switch>
    </div>
  )
}

export default SupplementApp
