import lgbh from '../../../../assets/images/insurance-app/icons/lgbh.png'
import React from 'react'
import { Col, FormGroup, Row } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { BaseFormGroup, Button } from 'base-app'
import { Check } from 'react-feather'
import {
  PAYMENT_TYPE_ATM,
  PAYMENT_TYPE_QR_CODE,
  PAYMENT_TYPE_FUND_TRANSFER,
  PAYMENT_TYPE_VISA_MASTER
  // PAYMENT_TYPE_BONUS
} from '../../buy-insurances-page/formik-config'
import Radio from '../../../../components/insurance-app/radio/RadioVuexy'
import { getKeyLang } from '../../../../configs/insurance-app'
import { useFormikContext } from 'formik'

/**
 * @example
   return (
        <PaymentMethod
            paymentType={paymentType}
            isHideIcon={true}
            keyNames={{ KEY_GIFT_CODE: KEY_COUPON_CODE }}
            callbacks={{
                radioChange: async (e) => {
                    dispatch(updateProps([
                        {
                            prop: BASE.KEY_PAYMENT_TYPE,
                            value: e.target.value
                        }
                    ]))
                }
            }}
        />
   )
 */
const PaymentMethod = ({
  paymentType,
  isHideIcon,
  keyNames = { KEY_GIFT_CODE: 'giftCode' },
  callbacks = { radioChange: null, handleCouponCode: null },
  ...p
}) => {
  const { radioChange, handleCouponCode } = callbacks
  const { touched, errors } = useFormikContext()
  const { KEY_GIFT_CODE } = keyNames

  return (
    <div {...p}>
      <Row>
        <Col className='d-flex align-items-center'>
          {isHideIcon ? null : (
            <img className='rounded-circle mr-50' src={lgbh} alt='ic' />
          )}

          <b className='font-medium-4 font-weight-bold text-primary-highlight letter-uppercase'>
            <FormattedMessage id={getKeyLang(`PaymentMethod`)} />
          </b>
        </Col>
      </Row>

      <Row className='mt-2'>
        
        <Col xs={12} md={6}>
          <FormGroup>
            <Radio
              name={'payment'}
              color='success successPayment'
              icon={<Check className='vx-icon' size={16} />}
              label={<FormattedMessage id={getKeyLang(`MethodBankTransfer`)} />}
              value={PAYMENT_TYPE_FUND_TRANSFER}
              defaultChecked={PAYMENT_TYPE_FUND_TRANSFER === paymentType}
              onChange={radioChange}
            />
          </FormGroup>
        </Col>
        {/* <Col xs={12} md={6}>
          <FormGroup>
            <Radio
              name={'payment'}
              color='success successPayment'
              icon={<Check className='vx-icon' size={16} />}
              label={<FormattedMessage id={getKeyLang(`MethodQR`)} />}
              defaultChecked={PAYMENT_TYPE_QR_CODE === paymentType}
              value={PAYMENT_TYPE_QR_CODE}
              onChange={radioChange}
            />
          </FormGroup>
        </Col> */}
        <Col xs={12} md={6}>
          <FormGroup>
            <Radio
              name={'payment'}
              color='success successPayment'
              icon={<Check className='vx-icon' size={16} />}
              label={<FormattedMessage id={getKeyLang(`MethodVisa`)} />}
              value={PAYMENT_TYPE_VISA_MASTER}
              defaultChecked={PAYMENT_TYPE_VISA_MASTER === paymentType}
              onChange={radioChange}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={6}>
          <FormGroup>
            <Radio
              name={'payment'}
              color='success successPayment'
              icon={<Check className='vx-icon' size={16} />}
              label={<FormattedMessage id={getKeyLang(`MethodATMN`)} />}
              value={PAYMENT_TYPE_ATM}
              defaultChecked={PAYMENT_TYPE_ATM === paymentType}
              onChange={radioChange}
            />
          </FormGroup>
        </Col>

        {/* <Col xs={12} md={6}>
                    <FormGroup>
                        <Radio
                            name={"payment"}
                            color='success successPayment'
                            icon={<Check className='vx-icon' size={16} />}
                            label={<FormattedMessage id={getKeyLang(`MethodBonus`)} />}
                            defaultChecked={PAYMENT_TYPE_BONUS === paymentType}
                            value={PAYMENT_TYPE_BONUS}
                            onChange={radioChange}
                        />
                    </FormGroup>
                </Col> */}
      </Row>

      <Row className='mt-2'>
        <Col xs={12} md={8}>
          <FormGroup className='form-label-group'>
            <BaseFormGroup
              fieldName={KEY_GIFT_CODE}
              errors={errors}
              touched={touched}
              messageId={getKeyLang(`codeGif`)}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={4}>
          <Button color='primary' outline onClick={handleCouponCode}>
            <FormattedMessage id={getKeyLang(`apply`)} />
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default PaymentMethod
