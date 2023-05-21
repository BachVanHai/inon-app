import { BaseFormGroup, FormattedMessage, HttpClient, Select } from 'base-app'
import React from 'react'
import { useIntl } from 'react-intl'
import { Col, Row } from 'reactstrap'
import {
  selectErrorStyles,
  selectNormalStyles
} from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { API_GET_ALL_BANK, getKeyLang } from '../../../../../../../configs/insurance-app'
import { hasRequestFail } from '../../../../../../../ultity'
import { KEY_BANK_NAME, KEY_BRANCH_NAME } from '../formikConfig'
const InsuranceInfomation = ({
  index,
  keyMaps = {
    KEY_IC_TYPE: 'string',
    KEY_IC_NO: 'string',
    KEY_FULLNAME: 'string',
    KEY_ADDRESS: 'string'
  },
  stepInfo,
  className
}) => {
  const intl = useIntl()
  const [_sugg_Bank, setSugg_Bank] = React.useState([])
  const { setFieldValue, getFieldMeta, sugg_gender, IDTypes, errors, touched } =
    stepInfo
  const { KEY_IC_TYPE, KEY_IC_NO, KEY_FULLNAME , KEY_BANK_NAME ,KEY_BRANCH_NAME } = keyMaps

  React.useEffect(() => {
    const getAllBank = async () => {
        const res = await HttpClient.get(`${API_GET_ALL_BANK}`,
            {
                params: {
                    date: new Date().getMilliseconds()
                },
                isBackgroundRequest: true,
            }
        )
        if (hasRequestFail(res.status)) { return }
        const banks = []
        res.data.forEach((bank) => {
            bank.value = bank.en?.toUpperCase()
            bank.label = bank.vn + " " + bank.en
            banks.push(bank)
        })
        setSugg_Bank(banks)
    }

    getAllBank()
}, [])
  return (
    <>
      {index === 0 ? (
        <div>
          <Row>
            <Col md={8} xs={12}>
              <Select
                readOnly
                closeMenuOnSelect={true}
                isSearchable={false}
                classNamePrefix='select mt-1'
                className='custom-zindex8 mb-2'
                onChange={({ label }) => {
                  setFieldValue(KEY_BANK_NAME, label)
                }}
                value={_sugg_Bank.find(
                  (type) => type.label === getFieldMeta(KEY_BANK_NAME).value
                )}
                options={_sugg_Bank}
                placeholder={<FormattedMessage id={getKeyLang(`BankName`)} />}
                isClearable={false}
                styles={
                  getFieldMeta(KEY_BANK_NAME).error
                    ? selectErrorStyles
                    : selectNormalStyles
                }
              />
            </Col>
            <Col md={4} xs={12}>
            <BaseFormGroup
                fieldName={KEY_BRANCH_NAME}
                errors={errors}
                touched={touched}
                messageId={getKeyLang(`BrachName`)}
              />
            </Col>
          </Row>
        </div>
      ) : (
        <div className={`${className} mb-1`}>
          <Row>
            <Col md={4} xs={12} className='mb-2'>
              <BaseFormGroup
                fieldName={KEY_FULLNAME}
                errors={errors}
                touched={touched}
                messageId={getKeyLang(`Name`)}
              />
            </Col>
            <Col md={4} xs={12} className='mb-2'>
              <Select
                readOnly
                closeMenuOnSelect={true}
                isSearchable={false}
                classNamePrefix='select mt-1'
                className='custom-zindex7 mb-2'
                onChange={({ content }) => {
                  setFieldValue(KEY_IC_TYPE, content)
                }}
                value={IDTypes.find(
                  (type) => type.content === getFieldMeta(KEY_IC_TYPE).value
                )}
                options={IDTypes}
                placeholder={<FormattedMessage id={getKeyLang(`IDType`)} />}
                isClearable={false}
                styles={
                  getFieldMeta(KEY_IC_TYPE).error
                    ? selectErrorStyles
                    : selectNormalStyles
                }
              />
            </Col>
            <Col md={4} xs={12} className='mb-2'>
              <BaseFormGroup
                fieldName={KEY_IC_NO}
                errors={errors}
                touched={touched}
                messageId={getKeyLang(`IDPers`)}
              />
            </Col>
          </Row>
        </div>
      )}
    </>
  )
}

export default InsuranceInfomation
