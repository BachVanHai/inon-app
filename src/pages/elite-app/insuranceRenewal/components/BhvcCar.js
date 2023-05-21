import { CurrencyInput } from 'base-app'
import React from 'react'
import { useIntl } from 'react-intl'
import { Col, FormGroup, Label, Row } from 'reactstrap'
import { getKeyLang } from '../../../../configs/elite-app'
import { convertNumberToCurrency, convertStrToNumber, MAX_INIT_CAR_VALUE } from '../../../../ultity'
import VatChatInsurCar from '../../../insurance-app/buy-insurances/car/components/step2/insur-components/VatChatInsurCar'
import { KEY_GTBH_YEUCAU, KEY_GT_XE_KHAIBAO } from '../formikConfig'

const BhvcCar = ({ errors, values, touched, setFieldValue, getFieldMeta, disableContinueBtn }) => {
  const intl = useIntl()
  function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  return (
    <>
      <Row className={`mt-2 mb-2`}>
        <Col xs={12} md={6} className={`${getFieldMeta(KEY_GT_XE_KHAIBAO).error && "mb-2"}`}>
          <FormGroup className={"form-label-group"}>
            <CurrencyInput
              value={values[KEY_GT_XE_KHAIBAO]}
              onBlur={(e) => { 
                let initCarVal = convertStrToNumber(e.target.value)
                if (initCarVal > MAX_INIT_CAR_VALUE) {
                  initCarVal = MAX_INIT_CAR_VALUE
                }
                const initCarStr = convertNumberToCurrency(initCarVal)
                setFieldValue(KEY_GT_XE_KHAIBAO, initCarStr)
                setFieldValue(KEY_GTBH_YEUCAU, initCarStr)
              }}
              id={KEY_GT_XE_KHAIBAO}
              placeholder={getKeyLang('ValueVehicle')}
              className={`form-control form-label-group ${getFieldMeta(KEY_GT_XE_KHAIBAO).error ? 'is-invalid' : ""}`}
            />
            {
              (getFieldMeta(KEY_GT_XE_KHAIBAO).error)
              &&
              <div style={{ fontSize: ".8rem", position: "absolute", left: "4px", bottom: "-20px" }} className="text-danger">
                {
                  getFieldMeta(KEY_GT_XE_KHAIBAO).error
                }
              </div>
            }
            <Label >{intl.formatMessage({ id: getKeyLang('ValueVehicle') })}</Label>
          </FormGroup>
        </Col>

        <Col xs={12} md={6}>
          <FormGroup className={"form-label-group"}>
            <CurrencyInput
              value={values[KEY_GTBH_YEUCAU]}
              onBlur={(e) => {
                let _val = e.target.value
                const convertedVal = convertStrToNumber(_val)
                const convertedGtXeKhaiBao = convertStrToNumber(values[KEY_GT_XE_KHAIBAO])
                if (convertedVal > convertedGtXeKhaiBao) {
                  _val = values[KEY_GT_XE_KHAIBAO]
                }
                setFieldValue(KEY_GTBH_YEUCAU, _val)
              }}
              id={KEY_GTBH_YEUCAU}
              placeholder={getKeyLang('RequireValue')}
              className={`form-control form-label-group ${getFieldMeta(KEY_GTBH_YEUCAU).error ? 'is-invalid' : ""}`}
            />
            {
              (getFieldMeta(KEY_GTBH_YEUCAU).error)
              &&
              <div style={{ fontSize: ".8rem", position: "absolute", left: "4px", bottom: "-20px" }} className="text-danger">
                {
                  getFieldMeta(KEY_GTBH_YEUCAU).error
                }
              </div>
            }
            <Label >{intl.formatMessage({ id: getKeyLang('RequireValue') })}</Label>
          </FormGroup>
        </Col>
      </Row>
      <VatChatInsurCar errors={errors} values={values} touched={touched} setFieldValue={setFieldValue} getFieldMeta={getFieldMeta} disableContinueBtn={disableContinueBtn} />
    </>

  )
}

export default BhvcCar