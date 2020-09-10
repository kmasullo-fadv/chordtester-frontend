
import React from 'react';
import ReactDOM from 'react-dom';
import PlayChords from './PlayChords';


describe('Fretboard', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PlayChords/>, div);
        ReactDOM.unmountComponentAtNode(div);
      });
})
