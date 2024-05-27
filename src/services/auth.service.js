import http from '../http-common';

class AuthService {
    login(data) {
        return http.post('/login', data);
    }
    signup(data) {
        return http.post('/signup', data);
    }
    logout() {
        return http.get('/logout');
    }
}

export default new AuthService();