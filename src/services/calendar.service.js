import http from '../http-common';
class CalendarDataService {
    getEventsOfMonth(month, year) {
        return http.get(`/calendar?month=${month}&year=${year}`);
    }
    getEventsOfDay(day, month, year) {
        return http.get(`/calendar?day=${day}&month=${month}&year=${year}`);
    }
    
}
export default new CalendarDataService();