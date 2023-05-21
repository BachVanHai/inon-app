import { FormattedMessage, Radio } from 'base-app';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKeyLang } from '../../../configs/elite-app';
import { loadQuestionPublic } from '../../../redux/actions/elite-app/help-center/helpcenter';
import { CHTG, HDSD, INDIVIDUAL, PARTNER, TLNV } from './utility';

const SelectTypeQuestion = ({handleChangeType , handleChangeTypeDocumemnt}) => {
    const {loginStatus} = useSelector(state => state.auth)
    const [typeQuestion, setTypeQuestion] = useState(CHTG);
    const [typeApllyFor, setTypeApllyFor] = useState(PARTNER);
    return (
        <div className="mb-2 shadow-lg p-2">
            <div className="d-flex flex-wrap justify-content-between align-items-center rounded-lg text-left ml-2">
                <span className="font-weight-bold">
                    <FormattedMessage id={getKeyLang('helpcenter.select.wellcome')} />
                </span>
                <div className="d-flex align-items-center"><Radio onClick={() =>{
                    setTypeQuestion(CHTG)
                    if(loginStatus){
                        handleChangeTypeDocumemnt("CHTG")
                    }else{
                        handleChangeType("CHTG" , typeApllyFor)
                    }
                }}  checked={typeQuestion === CHTG}/>
                <FormattedMessage id={getKeyLang('helpcenter.select.askedQuestion')} />
                </div>
                <div className="d-flex align-items-center"><Radio onClick={() =>{
                    setTypeQuestion(HDSD)
                    if(loginStatus){
                        handleChangeTypeDocumemnt("HDSD")
                    }else{
                        handleChangeType("HDSD" , typeApllyFor)
                    }
                }} checked={typeQuestion === HDSD}/>
                <FormattedMessage id={getKeyLang('helpcenter.select.userManual')} />
                </div>
                <div className="d-flex align-items-center" style={{marginRight:"16px"}}><Radio onClick={() =>{
                    setTypeQuestion(TLNV)
                    if(loginStatus){
                        handleChangeTypeDocumemnt("TLNV")
                    }else{
                        handleChangeType("TLNV" , typeApllyFor)
                    }
                }} checked={typeQuestion === TLNV}/>
                <FormattedMessage id={getKeyLang('helpcenter.select.professionalDocuments')} />
                </div>
            </div>
            {
                !loginStatus?
                <div className="d-flex flex-wrap justify-content-between align-items-center rounded-lg text-left mt-2 ml-2">
                <span className="font-weight-bold text-left" style={{width:"160px"}}>
                    <FormattedMessage  id={getKeyLang('helpcenter.select.applyFor')}/>
                </span>
                    <div className="d-flex align-items-center " style={{marginRight:"22px"}}><Radio onClick={()=>{
                        setTypeApllyFor(PARTNER)
                        handleChangeType(typeQuestion,"PARTNER")
                        }} checked={typeApllyFor === PARTNER}/>

                        <FormattedMessage id={getKeyLang('helpcenter.select.individual')}/>

                    </div>
                    <div className="d-flex align-items-center mr-lg-4"><Radio onClick={()=>{
                        setTypeApllyFor(INDIVIDUAL)
                        handleChangeType(typeQuestion ,"INDIVIDUAL" )
                        }} checked={typeApllyFor === INDIVIDUAL}/>

                        <FormattedMessage id={getKeyLang('helpcenter.select.individualCustomers')}/>
                    </div>
                    
            </div>
                 : null
            }
        </div>
    )
}

export default SelectTypeQuestion
