import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import buyInsuranceStep from '../../../assets/images/elite-app/buy-insurance/recruit-step0.svg'
import { Button, FormattedMessage } from 'base-app'
import { useIntl } from 'react-intl'
import { getKeyLang } from '../../../configs/elite-app'
import '../../../assets/scss/elite-app/buy-insurance/buy-insurance-step0.scss'
import silver from '../../../assets/images/elite-app/buy-insurance/silver-icon.svg'
import gold from '../../../assets/images/elite-app/buy-insurance/gold-icon.svg'
import diamond from '../../../assets/images/elite-app/buy-insurance/diamond-icon.svg'
import package1 from '../../../assets/images/elite-app/buy-insurance/package1.svg'
import package2 from '../../../assets/images/elite-app/buy-insurance/package2.svg'
import package3 from '../../../assets/images/elite-app/buy-insurance/package3.svg'
import { ACTION_SAVE_CONTRACT, actionNextStep } from '../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import { useDispatch } from 'react-redux'

const TNDS = 'tnds'
const MOTOR = 'motor'

function BuyInsuranceStep0({ insuranceType }) {
  const intl = useIntl()

  const CONTENTS = {
    'bhvc-tnds': {
      header: ['insurance.bhvcTNDSCar.step0.header.title'],
      main: {
        titleBenefit: 'insurance.bhvcTNDSCar.step0.main.title',
        contentBenefit: [
          {
            title: 'insurance.bhvcTNDSCar.step0.main.benefit1.title',
            content: ['insurance.bhvcTNDSCar.step0.main.benefit1.content']
          },
          {
            title: 'insurance.bhvcTNDSCar.step0.main.benefit2.title',
            content: [
              'insurance.bhvcTNDSCar.step0.main.benefit2.content1',
              'insurance.bhvcTNDSCar.step0.main.benefit2.content2',
              'insurance.bhvcTNDSCar.step0.main.benefit2.content3'
            ]
          }
        ]
      }
    },

    bhvc: {
      header: ['insurance.bhvcCar.step0.header.title'],
      main: {
        titleBenefit: 'insurance.bhvcCar.step0.main.title',
        contentBenefit: [
          {
            title: 'insurance.bhvcCar.step0.main.benefit1.title',
            content: ['insurance.bhvcCar.step0.main.benefit1.content']
          },
          {
            title: 'insurance.bhvcCar.step0.main.benefit2.title',
            content: [
              'insurance.bhvcCar.step0.main.benefit2.content1',
              'insurance.bhvcCar.step0.main.benefit2.content2',
              'insurance.bhvcCar.step0.main.benefit2.content3'
            ]
          }
        ]
      }
    },

    motor: {
      header: ['insurance.bhTNDSMotor.step0.header.title'],
      main: {
        titleBenefit: 'insurance.bhTNDSMotor.step0.main.title',
        contentBenefit: [
          'insurance.bhTNDSMotor.step0.main.benefit1.content',
          'insurance.bhTNDSMotor.step0.main.benefit2.content',
          'insurance.bhTNDSMotor.step0.main.benefit3.content',
          'insurance.bhTNDSMotor.step0.main.benefit4.content',
          'insurance.bhTNDSMotor.step0.main.benefit5.content',
          'insurance.bhTNDSMotor.step0.main.benefit6.content'
        ]
      }
    },

    tnds: {
      header: ['insurance.bhTNDSCar.step0.header.title'],
      main: {
        titleBenefit: 'insurance.bhTNDSCar.step0.main.title',
        contentBenefit: [
          'insurance.bhTNDSCar.step0.main.benefit1.content',
          'insurance.bhTNDSCar.step0.main.benefit2.content',
          'insurance.bhTNDSCar.step0.main.benefit3.content',
          'insurance.bhTNDSCar.step0.main.benefit4.content',
          'insurance.bhTNDSCar.step0.main.benefit5.content',
          'insurance.bhTNDSCar.step0.main.benefit6.content'
        ]
      }
    },

    td: {
      header: ['insurance.bhtd.step0.header.title'],
      main: {
        titleBenefit: 'insurance.bhtd.step0.main.title',
        contentBenefit: [
          {
            title: 'insurance.bhtd.step0.main.benefit1.title',
            content: ['insurance.bhtd.step0.main.benefit1.content']
          },
          {
            title: 'insurance.bhtd.step0.main.benefit2.title',
            content: [
              'insurance.bhtd.step0.main.benefit2.content1',
              'insurance.bhtd.step0.main.benefit2.content2',
              'insurance.bhtd.step0.main.benefit2.content3'
            ]
          }
        ]
      }
    },
    homeprivate: {
      header: ['insurance.homeprivate'],
      main: {
        titleBenefit: 'insurance.bhtd.step0.main.title',
        contentBenefit: [
          {
            title: 'insurance.bhtd.step0.main.benefit2.title',
            content: [
              'insurance.homeprivate.step0.list.1',
              'insurance.homeprivate.step0.list.2',
              'insurance.homeprivate.step0.list.3'
            ]
          }
        ]
      }
    },
    vta: {
      header: ['insurance.title.vta'],
      main: {
        titleBenefit: 'insurance.title.benefit',
        contentBenefit: [
          {
            title: 'insurance.bhtd.step0.main.title',
            content: [
              'insurance.vta.list1',
              'insurance.vta.list2',
              'insurance.vta.list3',
              'insurance.vta.list4',
              'insurance.vta.list5',
              'insurance.vta.list6',
              'insurance.vta.list7',
            ]
          }
        ]
      }
    },
    'bc' : {
      header: ['insurance.bc'],
      main: {
        titleBenefit: 'heathCare.title',
        contentBenefit: [
          {
            title: 'insurance.bc.condition',
            content: [
              'heath-care.condition1',
              'heath-care.condition2',
              'heath-care.condition8',
              'heath-care.condition9',
            ]
          },
          {
            title: 'PersonalInsuranceBenefits',
            content: [
              'heath-care.condition3',
              'heath-care.condition4',
              'heath-care.condition5',
            ]
          },
          {
            title: 'ProductInsuranceBenefits',
            content: [
              'heath-care.condition6',
              'heath-care.condition7',
            ]
          },
          {
            title: 'heath-care.condition10',
            content: [
              'heath-care.condition11',
              'heath-care.condition12',
              'heath-care.condition13',
            ]
          }
         
        ]
      }
    } 
  }

  const [products, setProducts] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    let PRODUCTS
    if (insuranceType === 'homesafety') {
      PRODUCTS = [
        {
          key: 'silver',
          image: silver,
          price: '15.000',
          baseFee: 15000,
          insuranceMoney: 10.000
        },
        {
          key: 'gold',
          image: gold,
          price: '30.000',
          baseFee: 30000,
          insuranceMoney: 20.000
        },

        {
          key: 'diamond',
          image: diamond,
          price: '45.000',
          baseFee: 45000,
          insuranceMoney: 30.000
        }
      ]
      setProducts(PRODUCTS)
    }
    //  else if (insuranceType === 'vta') {
    //   PRODUCTS = [
    //     {
    //       key: 'package1',
    //       image: package1,
    //       price: '130.000',
    //       packageName: 'GOI1'
    //     },
    //     {
    //       key: 'package2',
    //       image: package2,
    //       price: '230.000',
    //       packageName: 'GOI2'
    //     },

    //     {
    //       key: 'package3',
    //       image: package3,
    //       price: '380.000',
    //       packageName: 'GOI3'
    //     }
    //   ]
    //   setProducts(PRODUCTS)
    // }
  }, [])

  let listBenefitContent
  let listHeaderTitle
  if (!['homesafety'].includes(insuranceType)) {
    if (insuranceType === 'tnds' || insuranceType === 'motor') {
      listBenefitContent = (
        <div className='benefit'>
          <ul className='benefit-content'>
            {CONTENTS[insuranceType].main.contentBenefit.map((item, idx) => (
              <li
                key={idx}
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage({
                    id: getKeyLang(item)
                  })
                }}
              />
            ))}
          </ul>
        </div>
      )
    } else {
      listBenefitContent = CONTENTS[insuranceType].main.contentBenefit.map(
        (item, idx) => (
          <div key={idx} className='benefit'>
            <h5 className='benefit-title'>
              <FormattedMessage id={getKeyLang(item.title)}></FormattedMessage>
            </h5>
            <ul className='benefit-content'>
              {item.content.map((content, index) => (
                <li
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({
                      id: getKeyLang(content)
                    })
                  }}
                ></li>
              ))}
            </ul>
          </div>
        )
      )
    }

    listHeaderTitle = CONTENTS[insuranceType].header.map((item, idx) => (
      <h1 key={idx} className='header-right-title'>
        <FormattedMessage id={getKeyLang(item)}></FormattedMessage>
      </h1>
    ))
  }

  const onClickBuyInsurance = (baseFee, insuranceMoney, packageName) => {
    dispatch({
      type: ACTION_SAVE_CONTRACT,
      payload: { contract: { baseFee, insuranceMoney, packageName } }
    })
    dispatch(actionNextStep())
  }

  return (
    <div className='buy-insurance-step0'>
      {!['homesafety'].includes(insuranceType) ?
        <Row className='mb-3'>
          <Col md='4' className='d-none d-sm-none d-md-block'>
            <div className='avatar-buyInsurance d-flex flex-column justify-content-center h-100'>
              <img src={buyInsuranceStep} alt='React Logo' />
            </div>
          </Col>
          <Col md='8'>
            <div className='header-right mb-2'>{listHeaderTitle}</div>
            <div className='main-right px-3 py-3'>
              <h3
                className={
                  insuranceType === TNDS || insuranceType === MOTOR
                    ? 'main-right-title mb-10px'
                    : 'main-right-title'
                }
              >
                <FormattedMessage id={getKeyLang(CONTENTS[insuranceType].main.titleBenefit)} />
              </h3>

              <div className='main-right-content'>{listBenefitContent}</div>
              <div className='total'>
                <div className='total-title'></div>
                <div className='total-content'></div>
              </div>
            </div>
          </Col>
        </Row> : (

          <div className='row mt-3 mx-auto'>
            {products.map((item) => (
              <div key={item.key} className='col-xs-12 col-lg-6 col-xl-4 mb-3 pb-3'>
                <div className='product-card h-100'>
                  <img className='product-card-icon mb-1' src={item.image} alt={item.key} />
                  <div>
                    <h4>
                      <FormattedMessage
                        id={getKeyLang(`insurance.${item.key}`)}
                      />
                    </h4>
                    <p className='text-secondary mb-3'>
                      <FormattedMessage id={getKeyLang(`insurance.${item.key}.slogan`)} />
                    </p>
                    <Button className='price mx-1'>
                      <FormattedMessage
                        id={getKeyLang(`insurance.price`)}
                        values={{ price: item.price }}
                      />
                    </Button>
                    <Button className='buy-now mx-auto'
                            onClick={() => onClickBuyInsurance(item.baseFee, item.insuranceMoney, item.packageName)}>
                      <FormattedMessage
                        id={getKeyLang(`insurance.buyNow`)}
                        values={{ price: item.price }}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>)}
    </div>
  )
}

export default BuyInsuranceStep0
