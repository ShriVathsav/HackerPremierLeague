import React, {Fragment, useContext, useState} from "react"
import {Form, Input, Modal, Header, Icon, Button} from "semantic-ui-react"

const About = (props) => {

    const [open, setOpen] = useState(false)
    const {trigger} = props

    return (
        <Modal open={open} trigger={trigger} onClose={() => setOpen(false)} closeOnDimmerClick={false}
                size="tiny" onOpen={() => setOpen(true)} >
            <Header icon='info circle' content='About this application' />
            <Modal.Content>
                <div style={{fontSize: 16}}>
                    This application has been built as a part of Coda Global FullStack Superhero Hiring Challenge Dec 04, 2020 to Dec 20, 2020. 
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={() => setOpen(false)}>
                    <Icon name='remove' />Close
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default About;