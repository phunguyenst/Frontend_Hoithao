import Event from "./components/Event/Event";
import Sidebar from "./components/Navigation/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import EventCalendar from './components/EventCalendar/EventCalendar'
import Profile from "./components/Profile/Profile";
// import TopBar from './components/Navigation/Topbar/TopBar'
import Form from './components/Login/Form'
import Login from './components/Login/Login'
import EventNotification from "./components/EventNotification/EventNotification";

function App() {
  return (
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
              <Route path='/friends' exact component={Profile}/>
              <Route path='/notifications' exact component={EventNotification}/>
            </div>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
