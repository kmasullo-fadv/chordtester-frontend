import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage'
import Account from './Account/Account'
import Login from './Account/Login'


describe('Login and Account registration pages', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LoginPage />, div);
        ReactDOM.unmountComponentAtNode(div);
      });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Account />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Login />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
})