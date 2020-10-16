import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import 'semantic-ui-css/semantic.min.css'
import './app/layout/styles.css'


const rootEl =  document.getElementById('root');

function render() {
  ReactDOM.render( <App />,rootEl);
}

if(module.hot) {
  module.hot.accept('./app/layout/App.jsx',function(){
    setTimeout(render);
  })
}

render();

