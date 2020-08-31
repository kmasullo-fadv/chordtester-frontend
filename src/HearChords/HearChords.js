import React, { Component } from 'react';
import './HearChords.css';
import Context from '../Context';
import $ from 'jquery'

export default class HearChords extends Component {

    static contextType = Context;

    handleToggleNote = e => {
        const note = e.target.name
        if(e.target.checked){
            this.context.addNote(note)
        } else {
            this.context.deleteNote(note)
        }
    }

    handleClearNotes = () => {
        $('input[type=checkbox]').each(function() { 
        this.checked = false; 
        });
        this.context.clearNotes();
    }

    render() {
        return (
            <>
                <button className='playButton' onClick={this.context.buildChord}>PlayChord</button>
                <button onClick={this.handleClearNotes}>Clear Fretboard</button>
                <section className="guitar-neck" >
                    
                    <div className="string" id="1">
                        <div className="fret" ><label htmlFor="he0"/><input type="checkbox" name="he0" onChange={this.handleToggleNote}/></div>
                        <div className="fret"><label htmlFor="he1"/><input type="checkbox" name="he1" onChange={this.handleToggleNote} /></div>
                        <div className="fret"><label htmlFor="he2"/><input type="checkbox" name="he2" onChange={this.handleToggleNote} /></div>
                        <div className="fret inlay"><label htmlFor="he3"/><input type="checkbox" name="he3" onChange={this.handleToggleNote} /></div>
                        <div className="fret"><label htmlFor="he4"/><input type="checkbox" name="he4" onChange={this.handleToggleNote} /></div>
                        <div className="fret inlay"><label htmlFor="he5"/><input type="checkbox" name="he5" onChange={this.handleToggleNote} /></div>
                        <div className="fret"><label htmlFor="he6"/><input type="checkbox" name="he6" onChange={this.handleToggleNote} /></div>
                        <div className="fret inlay"><label htmlFor="he7"/><input type="checkbox" name="he7" onChange={this.handleToggleNote} /></div>
                        <div className="fret"><label htmlFor="he8"/><input type="checkbox" name="he8" onChange={this.handleToggleNote} /></div>
                        <div className="fret inlay"><label htmlFor="he9"/><input type="checkbox" name="he9" onChange={this.handleToggleNote} /></div>
                        <div className="fret"><label htmlFor="he10"/><input type="checkbox" name="he10" onChange={this.handleToggleNote} /></div>
                        <div className="fret"><label htmlFor="he11"/><input type="checkbox" name="he11" onChange={this.handleToggleNote} /></div>
                        <div className="fret">
                            <div className="double-inlay"></div>
                            <label htmlFor="he12"/><input type="checkbox" name="he12" onChange={this.handleToggleNote} />
                        </div>
                        <div className="fret"><label htmlFor="he13"/><input type="checkbox" name="he13" onChange={this.handleToggleNote} /></div>
                        <div className="fret"><label htmlFor="he14"/><input type="checkbox" name="he14" onChange={this.handleToggleNote} /></div>
                        <div className="fret inlay"><label htmlFor="he15"/><input type="checkbox" name="he15" onChange={this.handleToggleNote} /></div>
                    </div>

                    <div className="string" id="2">
                        <div className="fret" htmlFor="b0"><label/><input type="checkbox" name="b0" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b1"><label/><input type="checkbox" name="b1" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b2"><label/><input type="checkbox" name="b2" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b3"><label/><input type="checkbox" name="b3" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b4"><label/><input type="checkbox" name="b4" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b5"><label/><input type="checkbox" name="b5" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b6"><label/><input type="checkbox" name="b6" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b7"><label/><input type="checkbox" name="b7" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b8"><label/><input type="checkbox" name="b8" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b9"><label/><input type="checkbox" name="b9" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b10"><label/><input type="checkbox" name="b10" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b11"><label/><input type="checkbox" name="b11" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b12"><label/><input type="checkbox" name="b12" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b13"><label/><input type="checkbox" name="b13" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b14"><label/><input type="checkbox" name="b14" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b15"><label/><input type="checkbox" name="b15" onChange={this.handleToggleNote} /></div>
                    </div>

                    <div className="string" id="3">
                        <div className="fret" htmlFor="g0"><label/><input type="checkbox" name="g0" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g1"><label/><input type="checkbox" name="g1" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g2"><label/><input type="checkbox" name="g2" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g3"><label/><input type="checkbox" name="g3" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g4"><label/><input type="checkbox" name="g4" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g5"><label/><input type="checkbox" name="g5" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g6"><label/><input type="checkbox" name="g6" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g7"><label/><input type="checkbox" name="g7" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g8"><label/><input type="checkbox" name="g8" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g9"><label/><input type="checkbox" name="g9" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g10"><label/><input type="checkbox" name="g10" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g11"><label/><input type="checkbox" name="g11" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g12"><label/><input type="checkbox" name="g12" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g13"><label/><input type="checkbox" name="g13" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g14"><label/><input type="checkbox" name="g14" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g15"><label/><input type="checkbox" name="g15" onChange={this.handleToggleNote} /></div>
                    </div>

                    <div className="string" id="4">
                        <div className="fret" htmlFor="d0"><label/><input type="checkbox" name="d0" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d1"><label/><input type="checkbox" name="d1" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d2"><label/><input type="checkbox" name="d2" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d3"><label/><input type="checkbox" name="d3" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d4"><label/><input type="checkbox" name="d4" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d5"><label/><input type="checkbox" name="d5" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d6"><label/><input type="checkbox" name="d6" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d7"><label/><input type="checkbox" name="d7" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d8"><label/><input type="checkbox" name="d8" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d9"><label/><input type="checkbox" name="d9" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d10"><label/><input type="checkbox" name="d10" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d11"><label/><input type="checkbox" name="d11" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d12"><label/><input type="checkbox" name="d12" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d13"><label/><input type="checkbox" name="d13" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d14"><label/><input type="checkbox" name="d14" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d15"><label/><input type="checkbox" name="d15" onChange={this.handleToggleNote} /></div>
                    </div>

                    <div className="string" id="5">
                        <div className="fret" htmlFor="a0"><label/><input type="checkbox" name="a0" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a1"><label/><input type="checkbox" name="a1" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a2"><label/><input type="checkbox" name="a2" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a3"><label/><input type="checkbox" name="a3" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a4"><label/><input type="checkbox" name="a4" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a5"><label/><input type="checkbox" name="a5" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a6"><label/><input type="checkbox" name="a6" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a7"><label/><input type="checkbox" name="a7" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a8"><label/><input type="checkbox" name="a8" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a9"><label/><input type="checkbox" name="a9" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a10"><label/><input type="checkbox" name="a10" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a11"><label/><input type="checkbox" name="a11" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a12"><label/><input type="checkbox" name="a12" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a13"><label/><input type="checkbox" name="a13" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a14"><label/><input type="checkbox" name="a14" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a15"><label/><input type="checkbox" name="a15" onChange={this.handleToggleNote} /></div>
                    </div>

                    <div className="string" id="6">
                        <div className="fret" htmlFor="le0"><label/><input type="checkbox" name="le0" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le1"><label/><input type="checkbox" name="le1" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le2"><label/><input type="checkbox" name="le2" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le3"><label/><input type="checkbox" name="le3" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le4"><label/><input type="checkbox" name="le4" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le5"><label/><input type="checkbox" name="le5" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le6"><label/><input type="checkbox" name="le6" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le7"><label/><input type="checkbox" name="le7" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le8"><label/><input type="checkbox" name="le8" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le9"><label/><input type="checkbox" name="le9" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le10"><label/><input type="checkbox" name="le10" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le11"><label/><input type="checkbox" name="le11" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le12"><label/><input type="checkbox" name="le12" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le13"><label/><input type="checkbox" name="le13" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le14"><label/><input type="checkbox" name="le14" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le15"><label/><input type="checkbox" name="le15" onChange={this.handleToggleNote} /></div>
                    </div>

                </section>
            </>
        )
    }
}