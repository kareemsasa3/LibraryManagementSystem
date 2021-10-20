import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/header/header';
import Home from './components/home/home';
import Books from './components/books/books';
import Logout from './components/logout/logout';
import Signup from './components/signup/signup';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Route exact path='/' component= {Home}></Route>
        <Route exact path='/books' component= {Books}></Route>
        <Route exact path='/logout' component= {Logout}></Route>
        <Route exact path='/signup' component= {Signup}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
