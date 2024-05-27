import http from '../http-common';

class EventDataService {
    getEventBasic(id) {
        return http.get(`/event/basic?id=${id}`)
    }
    getAllEventBasic() {
      return http.get('/event/basics/');
    }
    createEvent(data) {
        return http.post('/event/', data);
    }
    getEvent(id) {
        return http.get(`/event/${id}`)
    }
    getEventInvitations(id) {
        return http.get(`/event/${id}/invitations`);
    }
    getEventNotifications(id) {
      return http.get(`/event/${id}/notifications`);
    }
    updateEvent(id, data) {
        return http.put(`/event/${id}`, data);
    }
    deleteEvent(id) {
        return http.delete(`/event/${id}`)
    }
    invite(invitation) {
      return http.post('/event/invite/', invitation);
    }
    cancelInvitation(id, invitation) {
      return http.put(`/event/${id}/invitation`, invitation)
    }
    changeRole(id, role) {
      return http.put(`/event/${id}/role`, role)
    }
    responseInvitation(id, response) {
      return http.put(`/event/${id}/response`, response);
    }
    getRole(id) {
      return http.get(`/event/${id}/role`);
    }
}

export default new EventDataService();