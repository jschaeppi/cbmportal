import React, { Component } from 'react'
import SignatureCanvas from 'react-signature-canvas'

export class SigPad extends Component {
    clearPad(e) {
        e.preventDefault();
        this.sigPad.clear();
    }
    render() {
        return (
            <div id="sigPad">
                <SignatureCanvas clearButton="true" penColor='black' canvasProps={{backgroundcolor: 'rgba(255, 255, 255, 1)', width: 200, height: 100, className: 'sigPad'}} ref={(ref) => { this.sigPad = ref }}/><br />
                <button id="sigButton" onClick={this.clearPad.bind(this)} type="button ">Clear</button>
            </div>
        )
    }
}

export default SigPad
