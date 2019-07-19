import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';
import Home from './components/HomeComponent';
import Movie from './components/MovieComponent';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';

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
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
