import React, { Component } from 'react'
import Context from '../Context'
import './PlayChords.css'
//import Fret from './Fret';

export default class String extends Component {
    static contextType = Context;

    handleToggleNote = e => {
        const note = e.target.name
        if (e.target.checked) {
            this.context.addNote(note)
        } else {
            this.context.deleteNote(note)
        }
    }


    renderString = (stringName) => {
        let stringArray = []
        if(stringName === 'he'){
            for(let i=0; i<16; i++){
                if(i===3 || i===5 || i===7 || i===9){
                    stringArray.push(
                        <div className="fret inlay" key={`${stringName}${i}`} >
                            <label htmlFor={`${stringName}${i}`} />
                            <input type="checkbox"
                                checked={this.context.notes.includes(`${stringName}${i}`)}
                                onChange={this.handleToggleNote}
                                name={`${stringName}${i}`}
                                />
                        </div>
                    )
                } else if(i===12){
                    stringArray.push(
                        <div className="fret" key={`${stringName}${i}`} >
                        <div className="double-inlay"></div>
                        <label htmlFor="he12" />
                        <input type="checkbox"
                            checked={this.context.notes.includes('he12')}
                            onChange={this.handleToggleNote}
                            name="he12"
                            />
                        </div>
                    )
                }else {
                    stringArray.push(
                        <div className="fret" key={`${stringName}${i}`} >
                            <label htmlFor={`${stringName}${i}`} />
                            <input type="checkbox"
                                checked={this.context.notes.includes(`${stringName}${i}`)}
                                onChange={this.handleToggleNote}
                                name={`${stringName}${i}`}
                                />
                        </div>
                    )
                }
            }
        } else {
            for(let i=0; i<16; i++){
                stringArray.push(
                    <div className="fret" key={`${stringName}${i}`} >
                        <label htmlFor={`${stringName}${i}`} />
                        <input type="checkbox"
                            checked={this.context.notes.includes(`${stringName}${i}`)}
                            onChange={this.handleToggleNote}
                            name={`${stringName}${i}`}
                            />
                    </div>
                )
            }
        }
        return stringArray;
    }

    render(){
        return (
            <div className="string" id={this.props.id}>
                {this.renderString(this.props.stringName).map(fret => {return fret})}
            </div>
        )
    }
    
}