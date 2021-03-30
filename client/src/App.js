import './App.css';
import AllPets from './components/AllPets';
import OnePet from './components/OnePet';
import NewForm from './components/NewForm';
import { Router, Link } from '@reach/router'
import EditPet from './components/EditPet';

function App() {
  return (
    <div className="App">
      <button><Link to = "/">Home</Link></button>
      <button><Link to = "/api/pets/create">Add Pet to Shelter</Link></button>
      <div className="d-flex justify-content-center flex-column">
        <h1>Pet Shelter</h1>
        <Router>
          <AllPets path="/"></AllPets>
          <OnePet path = "/api/pets/:petid"></OnePet>
          <NewForm path = "/api/pets/create"></NewForm>
          <EditPet path = "/api/pets/update/:petid"></EditPet>
        </Router>
      </div>
    </div>
  );
}

export default App;
