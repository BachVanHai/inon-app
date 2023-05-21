import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Icon from 'react-feather'
import { FormattedMessage } from 'react-intl'
import '../../../assets/scss/elite-app/settings/account-setting-mobile.scss'
import { useHistory } from 'react-router-dom'
import { DropdownItem } from 'reactstrap'
import { getKeyLang } from '../../../configs/elite-app'
import { goToAgencyApp, logoutAction, showConfirmAlert } from 'base-app'

const AccountSettingMobile = () => {

  const { user } = useSelector(state => state.auth.guest)
  const history = useHistory()
  const dispatch = useDispatch()

  const onClickGoToAgencyApp = () => {
    dispatch(goToAgencyApp())
  }

  const onClickLogout = () => {
    dispatch(
      showConfirmAlert({
        title: <FormattedMessage id='navbar.logout' />,
        isShow: true,
        content: <FormattedMessage id='navbar.logout.confirmMessage' />,
        onConfirm: () => {
          dispatch(logoutAction())
          history.push('/')
        }
      })
    )
  }

  return (
    <article className='account-setting'>
      <header className='d-flex align-items-center p-1'>

        <span className='cursor-pointer' data-tour='user'>
          <img
            src={user.userSettings.avatar || ''}
            className='round'
            height='40'
            width='40'
            alt='avatar'
          />
          </span>
        <div className='user-nav ml-1'>
            <span className='user-name text-bold-600 mb-0'>
              {user.fullName}
            </span>
        </div>
      </header>
      <section className='main-content p-1'>
        <div className='d-flex align-items-center py-1' onClick={() => history.push('/account-info')}>
          <Icon.User size={19} className='mr-50' />
          <span className='align-middle ml-1 font-weight-bold'>
            <FormattedMessage id='setting.accountInformation' />
          </span>
        </div>
        <div className="d-flex align-items-center py-1" onClick={() => history.push("/change-password")}>
          <Icon.Lock size={19} className='mr-50' />
          <span className='align-middle ml-1 font-weight-bold'>
            <FormattedMessage id='setting.changePassword' />
          </span>
        </div>
        <div className="d-flex align-items-center py-1" onClick={() => history.push("/share-with-friends")}>
          <Icon.Link size={19} className='mr-50' />
          <span className='align-middle ml-1 font-weight-bold'>
            <FormattedMessage id='setting.shareWithFriends' />
          </span>
        </div>
        {
          user.groupId !== 'KHCN' ? (
            <>
              <DropdownItem divider />
              <div className="d-flex align-items-center py-1" onClick={(e) => onClickGoToAgencyApp(e)}>
                <Icon.Users size={19} className='mr-50' />
                <span className='align-middle ml-1 font-weight-bold'>
                  <FormattedMessage id='setting.goToAgencyApp'/>
                </span>
              </div>
            </>
          ) : (
            <>
              <DropdownItem divider />
              <div className="d-flex align-items-center py-1" onClick={() => history.push('/register-agent')}>
                <Icon.Users size={19} className='mr-50' />
                <span className='align-middle ml-1 font-weight-bold'>
                  <FormattedMessage id={getKeyLang('registerAgent.title')} />
                </span>
              </div>
            </>
          )
        }
        <DropdownItem divider />
        <div className="d-flex align-items-center py-1" onClick={() => history.push("/terms-and-condition")}>
          <Icon.FileText size={19} className='mr-50' />
          <span className='align-middle ml-1 font-weight-bold'>
            <FormattedMessage id='setting.termAndCondition' />
          </span>
        </div>
        <div className="d-flex align-items-center py-1" onClick={() => history.push("/language")}>
          <Icon.Globe size={19} className='mr-50' />
          <span className='align-middle ml-1 font-weight-bold'>
            <FormattedMessage id='setting.language' />
          </span>
        </div>
        <div className="d-flex align-items-center py-1" onClick={() => history.push("/contact")}>
          <Icon.MessageSquare size={19} className='mr-50' />
          <span className='align-middle ml-1 font-weight-bold'>
            <FormattedMessage id='setting.contact' />
          </span>
        </div>
        <DropdownItem divider />
        <div className="d-flex align-items-center py-1" onClick={() => onClickLogout()}>
          <Icon.Power size={19} className='mr-50' />
          <span className='align-middle ml-1 font-weight-bold'>
            <FormattedMessage id='navbar.logout' />
          </span>
        </div>
      </section>

      {/*<Footer />*/}
    </article>
  )
}

export default AccountSettingMobile
