import React from 'react'
import '../../../assets/scss/elite-app/settings/register-agent.scss'
import logo from '../../../assets/images/elite-app/settings/register-agent-icon.png'
import { getKeyLang } from '../../../configs/elite-app'
import { useIntl } from 'react-intl'
import { changeIsGuest, FormattedMessage } from 'base-app'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const RegisterAgent = () => {

  const intl = useIntl()
  const history = useHistory()
  const dispatch = useDispatch()

  const onClickRegister = () => {
    dispatch(changeIsGuest(false))
    history.push('/register')
  }

  const benefits = [
    { title: 'registerAgent.benefitFirst.title', content: 'registerAgent.benefitFirst.content' },
    { title: 'registerAgent.benefitSecond.title', content: 'registerAgent.benefitSecond.content' },
    { title: 'registerAgent.benefitThird.title', content: 'registerAgent.benefitThird.content' }
  ]
  return <div className='register-agent'>
    <div className='w-100 py-4'>
      <div className='h1 text-center text-white text-uppercase font-weight-bold'>Kinh doanh bảo hiểm online thời đại
        4.0
      </div>
      <div className='h1 text-center text-white text-uppercase font-weight-bold'>Tại sao không?</div>
      <div className='h2 text-uppercase text-center text-white mt-2 font-weight-bold yellow'> Thu nhập lên tới 100 triệu
        đồng
      </div>
    </div>

    <div className='text-white'>
      <div className='register-agent-benefits'>
        {benefits.map(item => (
          <div className='d-flex' key={item}>
            <div className='icon px-1 px-lg-3'>
              <img src={logo} />
            </div>
            <div className='register-agent-content px-1 px-lg-3'>
              <div className='text-white h2'>
                <FormattedMessage id={getKeyLang(item.title)} />
              </div>
              <div dangerouslySetInnerHTML={{
                __html: intl.formatMessage({
                  id: getKeyLang(item.content)
                })
              }} />
            </div>
          </div>
        ))}

      </div>

    </div>
    <div className='register text-white text-center mt-3 pb-3'>
      <button type='button' className='btn text-uppercase' onClick={onClickRegister}>Đăng ký</button>
    </div>
  </div>
}

export default RegisterAgent
