import http from '../http-common';

class AccountService {
    changePassword(data) {
        return http.post('/my/change-password', data);
    }
    updateInfo(data) {
        return http.put(`/api/taikhoan/update/=${data}`, data);
    }
    getInformation(id) {
        return http.get(`/api/taikhoan/getone/=${id}`);
    }
    getContacts() {
      return http.get('/my/contacts');
    }
    updateContacts(data) {
      return http.put('/my/contacts/update', data);
    }
}

export default new AccountService();