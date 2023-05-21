import { FormattedMessage } from 'base-app'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getKeyLang } from '../../../../configs/app-no1'
import { loadQuestionPublic } from '../../../../redux/actions/app-no1/helpCenterViewQuestion'
import { isArrayEmpty } from '../../../../ultity'
import ListQuestion from './ListQuestion'
import PaginationList from './Pagination'
import SearchBox from './SearchBox'
import SelectTypeQuestion from './SelectTypeQuestion'
import { CHTG, isEmptyObject, PARTNER , ALL } from './utility'

const ViewQuestion = () => {
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

  
  const handleChangeType = (type ) =>{
    const questionFilter = !isArrayEmpty(questionPublic.content) ?  questionPublic.content.filter(elt => {
      return elt.categoryQuestionType === type && elt.questionDTOList.length > 0
  }) : []
  setQuestionFilter(questionFilter)
  setCurrentPageActive(0)
  }
  useEffect(() => {
    dispatch(loadQuestionPublic())
    handleChangeType(CHTG, ALL)
  }, [...dependencies])
  return (
    <div className={'p-2'}>
    <div className="d-flex justify-content-center justify-content-sm-start">
      <h2 className="text-uppercase mb-2 font-weight-bold" style={{color : "#106D5A"}}>
        <FormattedMessage id={getKeyLang('helpcenter')} />
      </h2>
    </div>
    <SearchBox
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        setListSearch={setListSearch}
      />
      {
        isEmptyObject(listSearch)?  <SelectTypeQuestion setListQuestionPagination={setListQuestionPagination} questionPublic={questionPublic.content} setListFilter={setListFilter} handleChangeType={handleChangeType}/> : null
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

export default ViewQuestion
