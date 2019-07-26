import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';
import Home from './components/HomeComponent';
import Movie from './components/MovieComponent';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import Orders from './components/OrdersComponent';
import Confirmation from './components/ConfirmationComponent';

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Route path='/' exact component={Home} />
            <Route path='/movie/:movieId' component={Movie} />
            <Route path='/orders' component={Orders} />
            <Route path='/confirmation' component={Confirmation} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
