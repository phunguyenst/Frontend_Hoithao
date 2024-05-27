import http from '../http-common';

class SearchDataService {
    searchEvent(data){
      return http.post('/event/search/', data)
    }
}

export default new SearchDataService();