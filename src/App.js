import Event from "./components/Event/Event";
import Sidebar from "./components/Navigation/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EventCalendar from './components/EventCalendar/EventCalendar';
import Profile from "./components/Profile/Profile";
// import TopBar from './components/Navigation/Topbar/TopBar';
import Form from './components/Login/Form';
import Login from './components/Login/Login';
import EventNotification from "./components/EventNotification/EventNotification";
import ListUser from './components/Profile/ListUser';
import { NotificationProvider } from './components/EventNotification/NotificationProvider';
import EventRegis from "./components/Event/EventRegis";
import PrivateRoute from './services/PrivateRoute';


function App() {
  return (
    <NotificationProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/signup" component={Form} />
            <Route exact path="/" component={Login} />
            <div>
              <Sidebar />
              <div className='container-fluid'>
                  <PrivateRoute path='/home' exact component={EventCalendar} />
                  <PrivateRoute path='/events' exact component={Event} />
                  <PrivateRoute path='/eventregistered' exact component={EventRegis} />
                  <PrivateRoute path='/friends' exact component={Profile}/>
                  <PrivateRoute path='/notifications' exact component={EventNotification}/>
                  <PrivateRoute path='/listuser' exact component={ListUser}/>
              </div>
            </div>
          </Switch>
        </Router>
      </div>
    </NotificationProvider>
  );
}

export default App;