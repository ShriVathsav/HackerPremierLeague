import React, {useContext} from 'react'
import { Portal, Segment, Divider, Icon, Button, Header } from 'semantic-ui-react'
import {AppContext} from "../../AppContext"
import "./PortalMain.css"

const ErrorPortal = (props) => {

    const {errorProps} = useContext(AppContext)

    const {portalOpenProps} = props

    const [portalOpen, setPortalOpen] = portalOpenProps
    const [error, setError] = errorProps

    return (
        <Portal open={portalOpen} onOpen={() => setPortalOpen(true)} 
                onClose={() => {setPortalOpen(false); setError(false);}} >
            <Segment id="portal-segment" >
                <div id="portal-header">
                    <Header icon="clock" content="An error has occured" />
                </div>
                <Divider style={{margin: 0}}/>
                <div id="portal-content">
                    An error has occured. Please try again later.
                </div>
                <Divider style={{margin: 0}} />
                <div style={{backgroundColor: "#f9fafb", textAlign: "right"}} id="portal-action">
                    <Button color='red' onClick={() => setPortalOpen(false)}><Icon name='remove' />Close</Button>
                </div>
            </Segment>
        </Portal> 
    )
}

export default ErrorPortal;