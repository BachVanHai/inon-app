import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import CreateMultipleAccountInfo
  from './pages/app-no1/account-manage/create-multiple-account-info/CreateMultipleAccountInfo'

 const AppNo1 = () => {

   const CreateGroup = lazy(() => import('./pages/app-no1/user-group/CreateGroup'))
   const UserGroupList = lazy(() => import('./pages/app-no1/user-group/UserGroupList'))
   const UserGroupDetail = lazy(() =>
     import('./pages/app-no1/user-group/UserGroupDetail')
   )
   const Home = lazy(() => import('./pages/app-no1/home/Home'))
   const AccountList = lazy(() => import('./pages/app-no1/account-manage/account-list/AccountList'))
   const CreateAccountInfo = lazy(() =>
     import('./pages/app-no1/account-manage/create-account-info/CreateAccountInfo')
   )
   const ApproveAccountOpen = lazy(() =>
     import('./pages/app-no1/account-manage/approve-account-opening/ApproveAccountOpen')
   )
   const CreateMulipleAccountInfo = lazy(() => import('./pages/app-no1/account-manage/create-multiple-account-info/CreateMultipleAccountInfo'))

   const NewQuestion = lazy(()=> import('./pages/app-no1/helpCenter/create/NewQuestion'))
   const ManagementQuestion = lazy(()=> import('./pages/app-no1/helpCenter/managementQuestion/ManagementQuestion'))
   const ManagementUserManual = lazy(()=> import('./pages/app-no1/helpCenter/managementUserManual/ManagementUserManual'))
   const ManagementProfessionalDocuments = lazy(()=> import('./pages/app-no1/helpCenter/managementProfessionalDocuments/ManagementProfessionalDocuments'))
   const EditQuestion = lazy(()=> import('./pages/app-no1/helpCenter/edit/editQuestion'))
   const ViewQuestion = lazy(()=> import('./pages/app-no1/helpCenter/viewQuestion/ViewQuestion'))
   const NewRequest = lazy(()=> import('./pages/app-no1/support/CreateRequest/NewRequest'))
   const ManagementRequest = lazy(()=> import('./pages/app-no1/support/management/managementRequest'))
   const MyRequest = lazy(()=> import('./pages/app-no1/support/myRequest/myRequest'))
   const PermissionRequest = lazy(()=> import('./pages/app-no1/support/permissionManagement/Permission'))
   const DetailMesssage = lazy(()=> import('./pages/app-no1/support/detailRequest/DeailMesssage'))
   const EditPermission = lazy(()=> import('./pages/app-no1/support/permissionManagement/edit/EditPermission'))
  return (
    <div className='app-no1'>
      <Switch>
        <Route
          exact
          path='/app/permission-group/create'
          component={CreateGroup}
        />
        <Route
          path='/app/permission-group/create/:groupId'
          component={CreateGroup}
        />
        <Route
          path='/app/permission-group/management/:groupId'
          component={UserGroupDetail}
        />
        <Route
          path='/app/permission-group/management'
          component={UserGroupList}
        />
        <Route
          exact
          path='/app/accounts/create'
          component={CreateAccountInfo}
        />
        <Route
          path='/app/accounts/create/:username'
          component={CreateAccountInfo}
        />
        <Route path='/app/accounts/management' component={AccountList}/>
        <Redirect
          exact
          from='/app/permission-group'
          to='/app/permission-group/management'
        />
        <Redirect exact from='/app/accounts' to='/accounts/management'/>
        <Route
          path='/app/accounts/approve-open-account'
          render={() => <ApproveAccountOpen isWaitingApprove={true}/>}
        />
        <Route
          path='/app/accounts/multiple-create'
          render={() => <CreateMultipleAccountInfo />}
        />
         <Route exact path="/app/help-center/create"  component={NewQuestion}/>
         <Route exact path="/app/help-center"  component={ViewQuestion}/>
         <Route exact path="/app/help-center/management-question" component={ManagementQuestion}/>
         <Route exact path="/app/help-center/management-user-manual" component={ManagementUserManual}/>
         <Route exact path="/app/help-center/management-professional-document" component={ManagementProfessionalDocuments}/>
         <Route exact path="/app/help-center/edit/:id" component={EditQuestion}/>
         <Route exact path="/app/support/create-request" component={NewRequest}/>
         <Route exact path="/app/support/management-request" component={ManagementRequest}/>
         <Route exact path="/app/support/my-request" component={MyRequest}/>
         <Route exact path="/app/support/chat/:id" component={DetailMesssage}/>
         <Route exact path="/app/support/permission-request" component={PermissionRequest}/>
         <Route exact path="/app/support/permission-request/edit/:id" component={EditPermission}/>
        <Route path='/app/home' component={Home} />
      </Switch>
    </div>
  )
}

export default AppNo1
