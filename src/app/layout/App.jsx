import React, {Fragment} from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';

function App() {

  return (
      <Fragment>
        <Route exact path="/" component={HomePage}/>
        <Route path={'/(.+)'} render={() => (
          <>
            <NavBar/>
            <Container className="main">
              <Route exact path="/events" component={EventDashboard}/>
              <Route exact path="/events/:id" component={EventDetailedPage}/>
              <Route exact path={["/createEvent",'/manage/:id']} component={EventForm}/>
            </Container>
          </>
        )}/>

      </Fragment>
  );
}

export default App;
