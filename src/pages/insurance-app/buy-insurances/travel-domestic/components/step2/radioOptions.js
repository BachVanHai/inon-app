import { Radio } from 'base-app'
import React, { useState } from 'react'
import {
  KEY_INSURANCECODE,
  KEY_INSURANCE_CODE,
  KEY_INSURANCE_MONEY,
  KEY_JOIN_GAME_NUMBER,
  KEY_PACKAGE_SELECTED,
  KEY_PERSON_INSURANCE_TYPE,
  OPTS3
} from './formikConfig'
import PopupInfoInsurance from './popupInfoInsurance'
import { ADDITIONAL_INSURANCE_BENEFITS, rangeAdvandceOption } from './utility'

const RadioOptions = ({ options, setFieldValue, getFieldMeta, typeComp , enableValidateOnChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [typePackage, setTypePackage] = useState('BASIC')
  const detailBtnStyle = {
    color: '#3091dd',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
  const showPopDetail = (type) => {
    setIsOpen(true)
    setTypePackage(type)
  }
  const toggle = () => {
    setIsOpen(false)
  }
  return (
    <>
      {options.map(({ value, mgs, subMgs, detail, fieldName, type }, index) => (
        <div className={`d-flex align-items-center mb-2 `} key={index}>
          <Radio
            onClick={() => {
              setFieldValue(fieldName, value)
              if (
                fieldName === KEY_PERSON_INSURANCE_TYPE &&
                value === OPTS3 &&
                getFieldMeta(KEY_JOIN_GAME_NUMBER).value === 0
              ) {
                enableValidateOnChange()
                setFieldValue(KEY_JOIN_GAME_NUMBER, 1)
              } else {
                setFieldValue(KEY_JOIN_GAME_NUMBER, 1)
              }
            }}
            checked={getFieldMeta(fieldName).value === value}
          />
          <div className='d-flex flex-column'>
            <span className='font-weight-bold'>{mgs}</span>
            {subMgs ? (
              <span className='font-italic text-primary'>{subMgs}</span>
            ) : null}
          </div>
          {detail ? (
            <span
              className='ml-5 font-italic'
              style={detailBtnStyle}
              onClick={() => showPopDetail(type)}
            >
              Chi tiết
            </span>
          ) : null}
        </div>
      ))}
      {/* ================hiển thị bảng phí ================= */}
      <PopupInfoInsurance
        isOpen={isOpen}
        toggle={toggle}
        packageType={typePackage}
      />
      {/* ================GÓI NÂNG CAO================ */}
      {getFieldMeta(KEY_INSURANCE_MONEY).value >= 50 && typeComp === 'RANGE' ? (
        <div className={`d-flex align-items-center mb-2 `}>
          <Radio
            onClick={() => {
              setFieldValue(KEY_PACKAGE_SELECTED, rangeAdvandceOption.value)
            }}
            checked={getFieldMeta(KEY_PACKAGE_SELECTED).value === 'ADVANCE'}
          />
          <div className='d-flex flex-column'>
            <span className='font-weight-bold'>{rangeAdvandceOption.mgs}</span>
            <span className='font-italic text-primary'>
              {rangeAdvandceOption.subMgs}
            </span>

          </div>
          {rangeAdvandceOption.detail ? (
            <span
              className='ml-5 font-italic'
              style={detailBtnStyle}
              onClick={() => showPopDetail('ADVANCE')}
            >
              Chi tiết
            </span>
          ) : null}
        </div>
      ) : null}
      <div className='d-flex justify-content-around flex-column flex-lg-row ml-2 ml-lg-0'>
      {getFieldMeta(KEY_PACKAGE_SELECTED).value === 'ADVANCE' && typeComp === 'RANGE' && ADDITIONAL_INSURANCE_BENEFITS.map((_sub, index) => (
              <div className={`d-flex mb-2 align-items-center`} key={index}>
                <Radio
                  onClick={() => {
                    setFieldValue(
                      KEY_INSURANCE_CODE,
                      _sub.value
                    )
                  }}
                  className="radio__additional"
                  checked={
                    getFieldMeta(KEY_INSURANCE_CODE).value === _sub.value
                  }
                />
                 <span className='font-weight-bold'>{_sub.mgs}</span>
              </div>
            ))}
      </div>
    </>
  )
}

export default RadioOptions
