import React, { Fragment }from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SigPad = ( { sigPad, clearPad }) => {

        return (
            <Fragment>
                <SignatureCanvas clearButton="true" penColor='black' canvasProps={{backgroundcolor: 'rgba(255, 255, 255, 1)', width: 400, height: 100, className: 'sigPad', id: 'sigPad'}} ref={sigPad} />
                <button id="sigButton" onClick={e => clearPad(e)} type="button ">Clear</button>
            </Fragment>
        )
}

export default SigPad
