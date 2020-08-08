import React, {Fragment} from 'react'
import spinner from '../images/spinner.gif'

const SpinnerImage = () => {
    return (
        <Fragment>
            <img src={spinner} alt="" style={{width: '100px', margin: 'auto', display: 'block' }}/>
        </Fragment>
    )
}

export default SpinnerImage;
