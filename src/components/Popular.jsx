import React from 'react'

const Popular = ({image, name, id}) => {
    return (
        <div className='popular-recipe inline-snap' key={id}>
            <img src={image} alt={name} id='popular-image'/>
        </div>
    )
}

export default Popular
