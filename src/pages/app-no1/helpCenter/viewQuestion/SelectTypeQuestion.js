import { FormattedMessage, Radio } from 'base-app'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getKeyLang } from '../../../../configs/app-no1'
import { loadQuestionPublic } from '../../../../redux/actions/app-no1/helpCenterViewQuestion'
import { CHTG, HDSD, INDIVIDUAL, PARTNER, TLNV } from './utility'

const SelectTypeQuestion = ({ handleChangeType }) => {
  const [typeQuestion, setTypeQuestion] = useState(CHTG)

  return (
    <div className='mb-2 shadow-lg p-2'>
      <div className='d-flex flex-wrap align-items-center rounded-lg mt-1'>
        <span className='font-weight-bold mb-1 ml-lg-3'>
          <FormattedMessage id={getKeyLang('helpcenter.select.wellcome')} />
        </span>
        <div className="d-flex ml-lg-5 flex-wrap">
          <div className='d-flex align-items-center ml-lg-5 mb-1'>
            <Radio
              onClick={() => {
                setTypeQuestion(CHTG)
                handleChangeType('CHTG', 'ALL')
              }}
              checked={typeQuestion === CHTG}
            />
            <FormattedMessage
              id={getKeyLang('helpcenter.create.askedQuestion')}
            />
          </div>
          <div className='d-flex align-items-center ml-lg-5 mb-1'>
            <Radio
              onClick={() => {
                setTypeQuestion(HDSD)
                handleChangeType('HDSD', 'ALL')
              }}
              checked={typeQuestion === HDSD}
            />
            <FormattedMessage id={getKeyLang('helpcenter.create.userManual')} />
          </div>
          <div className='d-flex align-items-center ml-lg-5 mb-1'>
            <Radio
              onClick={() => {
                setTypeQuestion(TLNV)
                handleChangeType('TLNV', 'ALL')
              }}
              checked={typeQuestion === TLNV}
            />
            <FormattedMessage id={getKeyLang('helpcenter.create.document')} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectTypeQuestion
