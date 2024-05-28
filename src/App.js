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
                <Route path='/home' exact component={EventCalendar} />
                <Route path='/events' exact component={Event} />
                <Route path='/eventregistered' exact component={EventRegis} />
                <Route path='/friends' exact component={Profile}/>
                <Route path='/notifications' exact component={EventNotification}/>
                <Route path='/listuser' exact component={ListUser}/>
              </div>
            </div>
          </Switch>
        </Router>
      </div>
    </NotificationProvider>
  );
}

export default App;