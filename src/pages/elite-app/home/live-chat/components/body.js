import React from 'react'
import FormCreateProblem from '../../../support/FormCreateProblem'

const Body = ({handleCloseLiveChat}) => {
    return (
        <div>
           <FormCreateProblem isLiveChat={true} handleCloseLiveChat={handleCloseLiveChat}/> 
        </div>
    )
}

export default Body
