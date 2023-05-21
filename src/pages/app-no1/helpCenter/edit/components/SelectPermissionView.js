import { Select } from 'base-app'
import React from 'react'
import { useIntl } from 'react-intl'
import { getKeyLang } from '../../../../../configs/app-no1'
import { selectErrorStyles, selectNormalStyles } from '../utility'

const SelectPermissionView = ({getFieldMeta , suggestion , permissionValues ,
    setPermissionValues , setFieldValue}) => {
      const intl = useIntl()
      return (
          <Select
          isMulti
          placeholder={intl.formatMessage({
            id: getKeyLang('helpcenter.create.permissionToView')
          })}
          options={suggestion}
          value={permissionValues}
          onChange={(original) =>{
                const permissionValue = original !== null ? original.map((sendTo) =>{
                  return sendTo.value
                }).join() : null
                setPermissionValues(permissionValue)
                setFieldValue('sendTo' ,permissionValue === null ? '' : permissionValue)
          }}
          styles={
            getFieldMeta('sendTo').error
              ? selectErrorStyles
              : selectNormalStyles
          }
        />
      )
}

export default SelectPermissionView
