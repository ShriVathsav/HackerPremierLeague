import React from 'react'
import {Segment, Loader, Dimmer, Image} from 'semantic-ui-react'

const LoadingSpinner = () => {

    return (
        <Segment>
            <Dimmer active inverted>
                <Loader size='medium'>Loading</Loader>
            </Dimmer>    
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
    )
}

export default LoadingSpinner;