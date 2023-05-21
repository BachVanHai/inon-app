import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Nav,
  NavItem,
  Row,
  NavLink,
  TabContent,
  TabPane,
  Button,
  FormGroup,
  CardFooter
} from 'reactstrap'
import {
  loadInsuranceList,
  loadInsuranceListDraft,
  loadListSuggestion,
  updateBonusDraftSettings,
  updateBonusSettings
} from '../../../redux/actions/supplement-app/bonus'
import classNames from 'classnames'
import { getKeyLang, BONUS_TYPE , INSURANCE_COMPANIES } from '../../../configs/supplement-app'
import '../../../assets/scss/supplement-app/bonus.scss'
import { goBackHomePage, Select, showConfirmAlert } from 'base-app'
import { useHistory } from 'react-router-dom'
import InsuranceItem from './InsuranceItem'
import BonusTable from './BonusTable'
import { FormattedMessage } from 'react-intl'

const SelectMemo = React.memo((props) =>
  <Select {...props} />, (prevProps, nextProps) => prevProps.options === nextProps.options)

const Bonus = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { insuranceList, bonusSettings, suggestions } = useSelector((state) => state.app.bonus)
  const currentUserId = useSelector((state) => state.auth.user.id)

  const [insuranceCompany] = useState(INSURANCE_COMPANIES)
  const [bonusType, setBonusType] = useState('')
  const [bonusSettingList, setBonusSettingList] = useState(bonusSettings)
  const [companySelected, setCompanySelected] = useState(insuranceCompany[0])
  const [partners, setPartners] = useState([])
  const [partner, setPartner] = useState({})
  const [draftId, setDraftId] = useState(null)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const type = getBonusType()
    setPartner({})
    setPartners([])
    if (type) {
      setBonusType(type)
      loadPageData(type, queryParams)
    }
  }, [history.location.pathname])

  useEffect(() => {
    setBonusSettingList(bonusSettings)
  }, [bonusSettings])


  const loadPageData = (type, queryParams) => {
    const isDraft = queryParams.get('isDraft')
    const draftId = queryParams.get('id')
    const userId = queryParams.get('userId')
    setDraftId(draftId)
    if (type === BONUS_TYPE.ALL || type === BONUS_TYPE.PARTNER) {
      dispatch(loadListSuggestion((suggestionList) => {
        const firstSuggestion = userId ? suggestionList.find(item => String(item.value) === userId) : suggestionList[0]
        if (firstSuggestion) {
          setPartner(firstSuggestion)
          setPartners([firstSuggestion])
          isDraft ? dispatch(loadInsuranceListDraft(companySelected.id, type, draftId, firstSuggestion.value, firstSuggestion.parentId)) :
            dispatch(loadInsuranceList(companySelected.id, type, firstSuggestion.value, firstSuggestion.parentId))
        }
      }))
    } else if (type === BONUS_TYPE.PERSONAL) {
      dispatch(loadInsuranceList(companySelected.id, type, currentUserId))
    } else {
      isDraft ? dispatch(loadInsuranceListDraft(companySelected.id, type, draftId)) : dispatch(loadInsuranceList(companySelected.id, type))
    }
  }


  const getBonusType = () => {
    for (const key of Object.keys(BONUS_TYPE)) {
      if (history.location.pathname.includes(`/${BONUS_TYPE[key].toLowerCase()}`)) {
        return BONUS_TYPE[key]
      }
    }
    return ''
  }

  const onChangeSettingValue = (value, insuranceCode) => {
    const settings = [...(bonusSettingList.length ? bonusSettingList : bonusSettings)]
    const setting = settings.find(item => item.insuranceCode === insuranceCode)
    setting.value = value
    setBonusSettingList([...settings])
  }

  const onChangeEndValueDate = (startValueDate) => {
    let settings = [...(bonusSettingList.length ? bonusSettingList : bonusSettings)]
    settings = settings.map(item => {
      item.startValueDate = startValueDate
      return item
    })
    setBonusSettingList([...settings])
  }

  const onClickSaveChanges = () => {
    const settings = [...(bonusSettingList.length ? bonusSettingList : bonusSettings)].map(item => {
      item.userId = bonusType === BONUS_TYPE.PERSONAL ? currentUserId : partner.value
      item.insuranceCompanyId = companySelected.id
      item.type = bonusType
      return item
    })
    dispatch(
      showConfirmAlert({
        title: <FormattedMessage id={getKeyLang('bonus.save')} />,
        isShow: true,
        content: <FormattedMessage id={getKeyLang('bonus.save.confirmMessage')} />,
        onConfirm: () => {
          draftId ? dispatch(updateBonusDraftSettings(draftId, settings)) : dispatch(updateBonusSettings(settings))
        }
      })
    )
  }

  const onClickBackHome = () => {
    dispatch(
      showConfirmAlert({
        title: <FormattedMessage id='common.home' />,
        isShow: true,
        content: <FormattedMessage id='common.backHome.confirmMessage' />,
        onConfirm: () => {
          dispatch(goBackHomePage())
        }
      })
    )
  }

  const onChangePartner = (partnerSelected) => {
    if (!partnerSelected) {
      return
    }
    setPartners(partnerSelected)
    if (partnerSelected.length === 1) {
      setUserSelected(partnerSelected[0])
    }
  }

  const setUserSelected = (user) => {
    setPartner(user)
    dispatch(loadInsuranceList(companySelected.id, bonusType, user.value, user.parentId))
  }

  const onChangeCompanySelected = (company) => {
    if (companySelected.id !== company.id) {
      if (bonusType === BONUS_TYPE.ALL || bonusType === BONUS_TYPE.PARTNER) {
        draftId ? dispatch(loadInsuranceListDraft(company.id, bonusType, draftId)) :
          dispatch(loadInsuranceList(company.id, bonusType, partner.id))
      } else if (bonusType === BONUS_TYPE.PERSONAL) {
        dispatch(loadInsuranceList(company.id, bonusType, currentUserId))
      } else {
        draftId ? dispatch(loadInsuranceListDraft(company.id, bonusType, draftId)) : dispatch(loadInsuranceList(company.id, bonusType))
      }
      setCompanySelected({ ...company })
    }
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-uppercase'><FormattedMessage
          id={getKeyLang(`bonus.title.${bonusType}`)}
        /></CardTitle>
      </CardHeader>
      <CardBody>
        {
          bonusType === BONUS_TYPE.ALL || bonusType === BONUS_TYPE.PARTNER ? (
            <React.Fragment>
              <Row className='mt-2'>
                <Col sm='8' md='6' lg='4'>
                  <FormattedMessage
                    id={getKeyLang('bonus.findPartner')}
                  >
                    {(msg) => (
                      <FormGroup>
                        <Select
                          id='seach'
                          readOnly
                          isMulti
                          closeMenuOnSelect={true}
                          notRequired
                          options={suggestions}
                          onChange={onChangePartner}
                          value={partners.map(item => item.value).join()}
                          className='React'
                          classNamePrefix='select mt-1'
                          placeholder={msg}
                          isClearable={true}
                        />
                      </FormGroup>
                    )}
                  </FormattedMessage>
                </Col>
              </Row>
              <div>
                <BonusTable users={partners} userSelected={partner} setUserSelected={setUserSelected} />
              </div>
            </React.Fragment>

          ) : ''
        }
        <Nav tabs className='mt-2'>
          {insuranceCompany.map((item) => (
            <NavItem key={item.id}>
              <NavLink
                onClick={() => onChangeCompanySelected(item)}
                className={classNames({
                  active: companySelected.id === item.id
                })}
              >
                {item.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        {insuranceList.map((insurance) => (
          insurance.isEnabled ?
            <InsuranceItem readOnly={bonusType === BONUS_TYPE.PERSONAL} key={insurance.id} insurance={insurance}
                           onChangeEndValueDate={onChangeEndValueDate}
                           onChangeSettingValue={onChangeSettingValue} /> : ''
        ))}
      </CardBody>
      <CardFooter>
        <Row>
          <Col className='d-flex justify-content-end mt-2' sm='12'>
            <Button.Ripple
              type='button'
              color='secondary'
              onClick={onClickBackHome}
            >
              <FormattedMessage
                id={`common.home`}
              />
            </Button.Ripple>
            {
              bonusType !== BONUS_TYPE.PERSONAL ? (
                <Button.Ripple className='ml-3' onClick={onClickSaveChanges}
                               disabled={(bonusType === BONUS_TYPE.ALL || bonusType === BONUS_TYPE.PARTNER) && !partners.length}
                               color='primary'>
                  <FormattedMessage id={getKeyLang('bonus.save')} />
                </Button.Ripple>
              ) : ''
            }

          </Col>
        </Row>
      </CardFooter>
    </Card>
  )
}

export default Bonus
