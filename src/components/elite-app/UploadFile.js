import { FormattedMessage } from 'base-app'
import React from 'react'
import * as Icon from 'react-feather'
import { useIntl } from 'react-intl/lib'
import { Button as ReactrapButton, Input } from 'reactstrap'
import { getKeyLang } from '../../configs/elite-app'

const UploadFile = ({ handleChange, msgField, className, fileSelect , errors }) => {
  const intl = useIntl()
  return (
    <ReactrapButton tag='label' color={'primary'} outline className={`${className} w-100`}>
      <Input
        hidden
        type='file'
        size='sm'
        id='uploadxls'
        label='Document'
        name='originalFileName'
        inputProps={{ accept: '.pdf' }}
        onChange={handleChange}
        multiple
      />
      {msgField || (
        <div className='text-center'>
          {
            fileSelect.length === 0 ? null : <p>{fileSelect.length}
            <span style={{marginLeft : "5px"}}>
              <FormattedMessage id={getKeyLang('suppot.create.fileSelected')}/>
            </span>
            </p>
          }
          <div className='d-flex align-items-center justify-content-center'>
            <Icon.Upload size="15" />
            <span className="ml-1" style={{fontSize :"13px"}}>
              {intl.formatMessage({
                id: getKeyLang('helpcenter.create.updateFile')
              })}
            </span>
          </div>
        </div>
      )}
    </ReactrapButton>
  )
}

export default UploadFile
