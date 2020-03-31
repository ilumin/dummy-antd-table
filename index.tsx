import React, { Component } from 'react';
import { render } from 'react-dom';
import Dummy from './Dummy';
import 'antd/dist/antd.css'
import './style.css';

interface AppProps { }
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {

  render() {
    return (
      <div>
        <Dummy />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
