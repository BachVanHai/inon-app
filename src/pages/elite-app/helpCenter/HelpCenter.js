import { FormattedMessage } from 'base-app'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getKeyLang } from '../../../configs/elite-app'
import { loadQuestionPublic } from '../../../redux/actions/elite-app/help-center/helpcenter'
import { isArrayEmpty } from '../../../ultity'
import ListQuestion from './ListQuestion'
import PaginationList from './Pagination'
import SearchBox from './SearchBox'
import SelectTypeQuestion from './SelectTypeQuestion'
import { ALL, CHTG, isEmptyObject, PARTNER } from './utility'

const HelpCenter = () => {
  const {loginStatus} = useSelector(state => state.auth)
  const [searchKey, setSearchKey] = useState('')
  const { questionPublic } = useSelector((state) => state.app.helpCenterPublic)
  const [questionFilter, setQuestionFilter] = useState([]);
  const history = useHistory()
  const [dispatchDependency, setDispatchAcitive] = useState(0)
  const [listQuestionPagination, setListQuestionPagination] = useState([])
  const [listSearch, setListSearch] = useState({})
  const [listFilter, setListFilter] = useState([])
  const [currentPageActive, setCurrentPageActive] = useState(0)

  const dependencies = [
    questionPublic.length,
    history.location.pathname,
    dispatchDependency
  ]
  const dispatch = useDispatch()

  
  const handleChangeType = (type , typeApply) =>{
    const statusType = loginStatus ? ALL : typeApply
    const questionFilter = !isArrayEmpty(questionPublic.content) ?  questionPublic.content.filter(elt => {
        if (elt.categoryQuestionType === type) {
          const cloneEltList = elt.questionDTOList.slice()
          const _elt = cloneEltList.filter(e => {
            return e.applyFor === statusType || e.applyFor === ALL
          })
          elt._questionDTOList = _elt
          return  _elt.length > 0
      }
      return false 
  }) : []
  setQuestionFilter(questionFilter)
  setCurrentPageActive(0)
  }
  const handleChangeTypeDocumemnt = (type) =>{
    const questionFilter = !isArrayEmpty(questionPublic.content) ?  questionPublic.content.filter(elt => {
      if (elt.categoryQuestionType === type) {
        const cloneEltList = elt.questionDTOList.slice()
        const _elt = cloneEltList.filter(e => e.categoryQuestionType === type)
        elt._questionDTOList = _elt
        return  _elt.length > 0
    }
    return false 
}) : []
setQuestionFilter(questionFilter)
setCurrentPageActive(0)
  } 
  useEffect(() => {
    dispatch(loadQuestionPublic())
    if (loginStatus) {
      handleChangeTypeDocumemnt(CHTG)
    }else{
      handleChangeType(CHTG, PARTNER)
    }
   
  }, [...dependencies])
  return (
    <div className={'p-2'}>
    <div className="d-flex justify-content-center justify-content-sm-start">
      <h2 className="mb-2 font-weight-bold" style={{color : "#106D5A"}}>
        <FormattedMessage id={getKeyLang('helpcenter')} />
      </h2>
    </div>
      <SearchBox
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        setListSearch={setListSearch}
      />
      {
        isEmptyObject(listSearch)?  <SelectTypeQuestion setListQuestionPagination={setListQuestionPagination} questionPublic={questionPublic.content} setListFilter={setListFilter} handleChangeType={handleChangeType} handleChangeTypeDocumemnt={handleChangeTypeDocumemnt} /> : null
      }
      <ListQuestion
        questions={listQuestionPagination}
        listSearch={listSearch} listFilter={listFilter}
        
      /> 
      {!isArrayEmpty(questionPublic.content)? (
        <PaginationList
          listSearch={listSearch}
          dataSet={questionFilter}
          setListQuestionPagination={setListQuestionPagination}
          currentPageActive={currentPageActive}
          setCurrentPageActive={setCurrentPageActive}
        />
      ) : null}
    </div>
  )
}

export default HelpCenter
