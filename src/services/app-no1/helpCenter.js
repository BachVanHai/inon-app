import { BaseAppUltils, HttpClient } from 'base-app'
import {
  API_ADD_FILE,
  API_CREATE_QUESTION,
  API_GET_ALL_CATEGORIES_QUESTION,
  API_GET_ALL_QUESTION_MANAGEMENT,
  API_GET_ALL_QUESTION_PUBLIC,
  API_SEARCH_QUESTION,
  API_UPDATE_QUESTION,
  API_CREATE_CATEGORY_QUESTION,
  API_GET_LIST_ACCOUNTS_PENDING,
  API_USER_GROUP_AUTHENTICATE,
  API_UPDATE_STATUS_QUESTION,
  API_GET_QUESTION_PUBLIC,
  API_CREATE_CATEGORY
} from '../../configs/app-no1'

class HelpCenterSevice {
  static GetAllQuestionPublic() {
    return HttpClient.get(
      `${API_GET_ALL_QUESTION_PUBLIC}?categoryQuestionType=CHTG&applyFor=PARTNER`,
      {
        params: { uuid: BaseAppUltils.generateUUID() }
      }
    )
  }
  static CreateQuestion(type, question) {
    return HttpClient.post(
      `${API_CREATE_QUESTION}?categoryQuestionType=${type}&docType=documents`,
      question
    )
  }
  static GetAllQuestionManagement() {
    return HttpClient.get(`${API_GET_ALL_QUESTION_MANAGEMENT}`, {
      params: { uuid: BaseAppUltils.generateUUID() }
    })
  }
  static GetAllCatagoriesQuestion() {
    return HttpClient.get(`${API_GET_ALL_CATEGORIES_QUESTION}`, {
      params: { uuid: BaseAppUltils.generateUUID() }
    })
  }
  static AddFile(type ,formData) {
    return HttpClient.post(
      `${API_ADD_FILE}?categoryQuestionType=${type}&docType=documents`,formData
    )
  }
  static UpdateQuestion(type ,id, question) {
    return HttpClient.put(
      `${API_UPDATE_QUESTION}?categoryQuestionType=${type}&id=${id}`,
      question
    )
  }
  static CreateCategoryQuestion(category) {
    return HttpClient.post(
      `${API_CREATE_CATEGORY}`,
      category
    )
  }
  static getListAccountsPending() {
    return HttpClient.get(`${API_GET_LIST_ACCOUNTS_PENDING}`, {
      params: { uuid: BaseAppUltils.generateUUID() },
      isBackgroundRequest: true
    })
  }
  static getUserGroupAuthenticate () {
    return HttpClient.get(`${API_USER_GROUP_AUTHENTICATE}`, {
      params: { uuid: BaseAppUltils.generateUUID() }
    })
  }
  static getInfoQuestion (id) {
    return HttpClient.get(`${API_CREATE_QUESTION}/${id}`, {
      params: { uuid: BaseAppUltils.generateUUID() }
    })
  }
  static deleteQuestion(id){
    return HttpClient.delete(`${API_CREATE_QUESTION}/${id}`)
  }
  static rejectedQuestion (id , reasonReject ){
    return HttpClient.put(`${API_UPDATE_STATUS_QUESTION}?questionId=${id}&status=REJECTED`,
    reasonReject)
  }
  static disabledQuestion (id) {
    return HttpClient.put(`${API_UPDATE_STATUS_QUESTION}?questionId=${id}&status=DISABLED`,{
      status : 'DISABLED'
    })
  }
  static approvalQuestion(id , question){
    return HttpClient.put(`${API_UPDATE_STATUS_QUESTION}?questionId=${id}&status=APPROVALED`,{
      status : 'APPROVALED'
    })
  }
  static saveDraftQuestion(type,question){
    return HttpClient.post(
      `${API_CREATE_QUESTION}?categoryQuestionType=${type}&docType=documents`,
      question
    )
  }
  static getAllQuetionPublic() {
    return HttpClient.get(
      `${API_GET_ALL_CATEGORIES_QUESTION}`
    )
  }
  static SearchQuestion(searchKey) {
    return HttpClient.get(`${API_SEARCH_QUESTION}?searchKey=${searchKey}`, {
      params: { uuid: BaseAppUltils.generateUUID() }
    })
  }
  static UpdateDraft(id , type  , question){
    return HttpClient.put(`${API_UPDATE_QUESTION}?categoryQuestionType=${type}&id=${id}`,
    question)
  }
}

export default HelpCenterSevice
