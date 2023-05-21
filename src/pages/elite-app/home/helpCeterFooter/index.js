import { Button, FormattedMessage } from 'base-app'
import React from 'react'
import { Link } from 'react-router-dom'
import { getKeyLang } from '../../../../configs/elite-app'

const HelpcenterFooter = ({setSideNavType}) => {
    return (
        <div className="pl-2 pr-2 mt-5"> 
        <div className="text-center">
          <h4><FormattedMessage id={getKeyLang('helpcenter.footer.questionHelp')} /></h4>
        </div>
        <div className="text-center mt-2">
          <span><FormattedMessage id={getKeyLang('helpcenter.footer.InOn')} /></span>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <Button.Ripple onClick={()=>{setSideNavType('support')}}>
            <FormattedMessage  id={getKeyLang("helpcenter.footer.actionGoTo")}/>
          </Button.Ripple>
        </div>
      </div>
    )
}

export default HelpcenterFooter
