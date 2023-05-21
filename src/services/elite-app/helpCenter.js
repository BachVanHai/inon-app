import { BaseAppUltils, HttpClient } from 'base-app'
import {
  API_GET_QUESTION_PUBLIC,
  API_SEARCH_QUESTION
} from '../../configs/elite-app'

class HelpcenterService {
  static getAllQuetionPublic() {
    return HttpClient.get(
      `${API_GET_QUESTION_PUBLIC}`,
      { params: { uuid: BaseAppUltils.generateUUID() } }
    )
  }
  static SearchQuestion(searchKey) {
    return HttpClient.get(`${API_SEARCH_QUESTION}?searchKey=${searchKey}`, {
      params: { uuid: BaseAppUltils.generateUUID() }
    })
  }
}

export default HelpcenterService
