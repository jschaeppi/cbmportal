import React, { Component } from 'react'
import SignatureCanvas from 'react-signature-canvas'

export class SigPad extends Component {
    clearPad(e) {
        e.preventDefault();
        this.employeePad.clear();
    }
    render() {
        return (
            <div id="sigPad">
                <SignatureCanvas clearButton="true" penColor='black' canvasProps={{backgroundcolor: '(0, 0, 0, 0)', width: 200, height: 100, className: 'employeePad'}} ref={(ref) => { this.employeePad = ref }}/><br />
                <button id="sigButton" onClick={this.clearPad.bind(this)} type="button ">Clear</button>
            </div>
        )
    }
}

export default SigPad
