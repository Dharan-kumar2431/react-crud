import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Userlist from './User-List/Userlist';
import Createuser from './Create User/Createuser';
import Edituser from './Edit User/Edituser';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path='/' Component={Userlist}/>
          <Route path='/createuser' Component={Createuser}/>
          <Route path='/edituser/:id' Component={Edituser}/>
        </Routes>
    </Router>
  );
}

export default App;
