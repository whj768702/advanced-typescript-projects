import React from 'react';
import './App.css';
import { Container } from 'reactstrap';
import PersonalDetails from './PersonalDetails';
import { IPersonState } from './Types';

export default class App extends React.Component {
  private defaultPerson: IPersonState = {
    Address1: '',
    Address2: null,
    County: '',
    DateOfBirth: new Date().toISOString().substring(0, 10),
    FirstName: '',
    LastName: '',
    PersonId: '',
    PhoneNumber: '',
    Postcode: '',
    Town: '',
  };

  render() {
    return (
      <Container>
        <PersonalDetails DefaultState={this.defaultPerson}></PersonalDetails>
      </Container>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
