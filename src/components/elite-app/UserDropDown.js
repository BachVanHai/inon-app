import React from 'react'
import { FormattedMessage } from 'react-intl'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import * as Icon from 'react-feather'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BaseAppConfigs, goToAgencyApp, logoutAction, showConfirmAlert } from 'base-app'
import { getKeyLang } from '../../configs/elite-app'

const UserDropdown = ({setInsuranceType}) => {

  const history = useHistory()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth.guest)

  const handleNavigation = (e, path) => {
    e.preventDefault()
    history.push(path)
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

  const onClickGoToAgencyApp = (e) => {
    e.preventDefault()
    dispatch(goToAgencyApp())
  }

  return (
    <UncontrolledDropdown tag='div'>
      <DropdownToggle tag='div' className='w-100 d-flex align-items-center'>
        <span className='cursor-pointer ml-2' data-tour='user'>
              <img
                src={user.userSettings.avatar || ''}
                className='round'
                height='40'
                width='40'
                alt='avatar'
              />
          </span>
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem
          tag='a'
          href='#'
          onClick={(e) => handleNavigation(e, '/account-info')}
        >
          <Icon.User size={14} className='mr-50' />
          <span className='align-middle'>
          <FormattedMessage id='setting.accountInformation' />
        </span>
        </DropdownItem>
        <DropdownItem
          tag='a'
          href='#'
          onClick={(e) => handleNavigation(e, '/change-password')}
        >
          <Icon.Lock size={14} className='mr-50' />
          <span className='align-middle'>
          <FormattedMessage id='setting.changePassword' />
        </span>
        </DropdownItem>
        <DropdownItem
          tag='a'
          href='#'
          onClick={(e) => handleNavigation(e, '/share-with-friends')}
        >
          <Icon.Link size={14} className='mr-50' />
          <span className='align-middle'>
          <FormattedMessage id='setting.shareWithFriends' />
        </span>
        </DropdownItem>
        {
          user.groupId !== 'KHCN' ? (
            <React.Fragment>
              <DropdownItem divider />
              <DropdownItem
                tag='a'
                href='#'
                onClick={(e) => onClickGoToAgencyApp(e)}
              >
                <Icon.Users size={14} className='mr-50' />
                <span className='align-middle'><FormattedMessage id='setting.goToAgencyApp' /></span>
              </DropdownItem>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <DropdownItem divider />
              <DropdownItem
                tag='div'
                onClick={() => history.push('/register-agent')}
              >
                <Icon.Users size={14} className='mr-50' />
                <span className='align-middle font-weight-bold'><FormattedMessage id={getKeyLang('registerAgent.title')} /></span>
              </DropdownItem>
            </React.Fragment>
          )
        }
        <DropdownItem divider />

        <DropdownItem
          tag='a'
          href='#'
          onClick={(e) => handleNavigation(e, '/setting-connect-social')}
        >
          <Icon.Aperture size={14} className='mr-50'/>
          <span className='align-middle'>
            <FormattedMessage id='setting.connectSocial' />
          </span>
        </DropdownItem>

        <DropdownItem
          tag='a'
          target={'_blank'}
          href={BaseAppConfigs.TERMS_PDF}
        >
          <Icon.FileText size={14} className='mr-50' />
          <span className='align-middle'>
            <FormattedMessage id='setting.termAndCondition' />
          </span>
        </DropdownItem>
        <DropdownItem
          tag='a'
          target={'_blank'}
          href={BaseAppConfigs.POLICY_PDF}
        >
          <Icon.Shield size={14} className='mr-50' />
          <span className='align-middle'>
            <FormattedMessage id='setting.privacyPolicy' />
          </span>
        </DropdownItem>
        <DropdownItem
          tag='a'
          href='#'
          onClick={(e) => handleNavigation(e, '/language')}
        >
          <Icon.Globe size={14} className='mr-50' />
          <span className='align-middle'>
            <FormattedMessage id='setting.language' />
          </span>
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            setInsuranceType('')
          }}
        >
          <Icon.HelpCircle size={14} className='mr-50' />
          {/*<img style={{width: '19px', height: '20px'}}  src={helpCenterIcon} alt='Help center' />*/}
          <span className='align-middle'>
            <FormattedMessage id={getKeyLang('helpcenter.sideBar.title')} />
          </span>
        </DropdownItem>
        <DropdownItem
          tag='a'
          href='#'
          onClick={(e) => handleNavigation(e, '/contact')}
        >
          <Icon.MessageSquare size={14} className='mr-50' />
          <span className='align-middle'>
            <FormattedMessage id='setting.contact' />
          </span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag='a' onClick={onClickLogout}>
          <Icon.Power size={14} className='mr-50' />
          <span className='align-middle'>
          <FormattedMessage id='navbar.logout' />
        </span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
