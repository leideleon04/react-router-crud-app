import './App.css';
import React from 'react';
import { RescuesList } from './Components/rescuesList';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import {
  BrowserRouter as Router,
  Switch, 
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';

function App() {
  const employees = [
    {
      id: 1,
      name: 'Link Letters',
      phone: '123-456-7890',
      mail: 'linkbreakspots@hotmail.com'
    },
    {
      id: 2,
      name: 'Zelda Zebra',
      phone: '234-567-8901',
      mail: 'zeldatries@gmail.com'
    },
    {
      id: 3,
      name: 'Ganondorf Giraffe',
      phone: '345-678-9012',
      mail: 'ganonisatryhard@yahoo.com'
    }
  ];

  return (
    <Container className="text-center"> 
      <Router>
        <div>
          <ButtonGroup>
            <Button variant="outline-secondary">
              <Link to="/">Home</Link>
            </Button>
            <Button variant="outline-secondary">
              <Link to="/rescues">Rescues</Link>
            </Button>
            <Button variant="outline-secondary">
              <Link to="/employees">Contact</Link>
            </Button>
          </ButtonGroup>
          <Switch>
            <Route path='/employees' exact>
              <Employees employees={employees} />
            </Route>
            <Route path="/rescues" exact>
                <div>
                    <RescuesList />
                </div>
            </Route>
            <Route path="/employees/:employeeId" exact>
              <Employee employees={employees} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Container>
  );
}

function Home() {
  return(
  <div>
    <Card style={{ width: '70rem' }}>
      <br></br>
    <h1>Welcome to Our Nonprofit</h1>
    <p>
      This website is for use of Action Institute LLC to provide adequate information for the use of organization within our neighboring Nonprofit rescue centers, as well as
      for the use of our citizens that wish to help a struggling animal in need and doesn't quite know which Rescues are all filled up.  
    </p>
    <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://th.bing.com/th/id/OIP.8amkcxCP5S_ElaU0-8cuOAHaE8?pid=ImgDet&rs=1"
            alt="A picture of a dog"
          />
          <Carousel.Caption>
            <h5>This is Benjamin</h5>
            <p>We take extra care to save all types of animals</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://th.bing.com/th/id/OIP.7ng8jCJZOZ8YC5Pfq4y1fgHaE8?pid=ImgDet&rs=1"
            alt="Image of a ginger cat"
          />
          <Carousel.Caption>
            <h5>This is Tommy</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://th.bing.com/th/id/OIF.1ACYbrD877qyXYv8mDTFGw?pid=ImgDet&rs=1"
            alt="Image of a pitt-bull"
          />
          <Carousel.Caption>
            <h5>This is Sally</h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    <br></br>
    <p>The Rescues page above provides a table format for those to fill out their capacity for their rescue centers, as well as there animals with names and breeds.</p>
    <p>This is especially helpful for these organizations so that our rescuers can simply look at our tables and ensure that their newfound friend finds some where safe to rest.</p>
    </Card>
  </div>
  );
}

function Employees({ employees }) {
  const match = useRouteMatch();

  return (
    <div>
      <h2>Employees of Action Institute LLC</h2>
      {employees.map((employees, index) => (
        <Alert key={index} variant="primary">
          <Link to={`${match.url}/${employees.id}`}>
            {employees.name}
          </Link>
        </Alert>
      ))}
    </div>
  );
}

function Employee({ employees }) {
  const match = useRouteMatch();
  const employeeId = match.params.employeeId;

  const selectedEmployee = employees.find((employee) => employee.id.toString() === employeeId);

  return (
    <div>
      {selectedEmployee ? (
        <Card>
          <Card.Header>{selectedEmployee.name}</Card.Header>
          <Card.Body>
            <Card.Subtitle>{selectedEmployee.phone}</Card.Subtitle>
            <Card.Text>{selectedEmployee.mail}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </div>
  );
}


export default App;