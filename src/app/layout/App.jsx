import React, {useState,Fragment} from 'react';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';

function App() {

  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  function handleSelectedEvent(event) {
    setSelectedEvent(event)
    setFormOpen(true)
  }

  function handleCreateFormOpen() {
    setSelectedEvent(null)
    setFormOpen(true)
  }

  return (
      <Fragment>
        <NavBar setFormOpen={handleCreateFormOpen}/>
          <Container className="main">
            <EventDashboard 
              formOpen={formOpen} 
              setFormOpen={setFormOpen} 
              selectEvent={handleSelectedEvent}
              selectedEvent={selectedEvent}
            />
          </Container>
      </Fragment>
  );
}

export default App;
