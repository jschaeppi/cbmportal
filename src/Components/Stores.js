import React from 'react'

const Stores = ( { stores }) => {
    return (
        stores.map((store, i) => {
            return <option key={i} name="store" id="store">{store.store}</option>
        })
    )
}

export default Stores