import React from 'react'
import {
  Select
} from 'base-app'
import { useIntl } from 'react-intl'

const customStylesRequired = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#51912D !important' : '#ea5455 !important'
  })
}

const customStylesSelect = {
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#5f5f5f',
      fontSize: '0.96rem',
      opacity: '0.5'
    }
  }
}
const SelectMutilForm = ({ formik, fieldName, msgField, options, addClass, isMulti, values, ...inputProps }) => {

  const intl = useIntl()

  return (
    <Select
      id={fieldName}
      className={`React ${addClass}`}
      styles={formik.touched[fieldName] && formik.errors[fieldName] ? customStylesRequired : customStylesSelect}
      classNamePrefix='select'
      placeholder={intl.formatMessage({ id: msgField })}
      value={values}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral50: '#1A1A1A'  // Placeholder color
        }
      })}
      isMulti={isMulti}
      options={options}
      onChange={value => {
        formik.setFieldValue(`${fieldName}`, value.value)
      }}
      onBlur={() => {
        setTimeout(
          () => formik.setFieldTouched(`${fieldName}`, true),
          1000
        )
      }}
      {...inputProps}
    />
  )
}

export default SelectMutilForm