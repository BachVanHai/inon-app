import React from 'react'
import { Card, CardTitle, CardHeader } from 'reactstrap'

const Step = ({ titleMsg, children }) => {

    return (
        <Card >
            {
                titleMsg &&
                <CardHeader>
                    <CardTitle className="letter-uppercase primary font-weight-bold font-medium-5">
                        {
                            titleMsg
                        }
                    </CardTitle>
                </CardHeader>
            }
            {
                children
            }
        </Card>
    )
}

export default Step