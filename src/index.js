import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import 'semantic-ui-css/semantic.min.css'
import './app/layout/styles.css'
import { BrowserRouter } from 'react-router-dom';


const rootEl =  document.getElementById('root');

function render() {
  ReactDOM.render( 
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootEl);
}

if(module.hot) {
  module.hot.accept('./app/layout/App.jsx',function(){
    setTimeout(render);
  })
}

render();

