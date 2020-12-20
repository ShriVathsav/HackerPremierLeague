import React from 'react'
import { Menu, Segment, Container, Icon } from 'semantic-ui-react'
import About from "../About"
import "./Footer.css"

const Footer = () => {

    const trigger = (
        <div id="footer-item-last">About this application</div>
    )

    return (
        <div>
            <Segment color="teal" inverted style={{borderRadius: 0, padding: 8, width: "100%"}}>
                <Container>
                    <Menu color="teal" inverted secondary>
                        <Menu.Item style={{width: "100%"}}>                            
                            <div style={{display: "flex", fontSize: 15, width: "100%", flexDirection: "row", flexFlow: "row wrap"}}>
                                <div id="footer-item">
                                    Made with <Icon name="heart" color="red" /> by Shrivaathsav S
                                </div>
                                <div style={{float: "right"}} id="footer-item">
                                    Copyrights <Icon name="copyright outline" color="white" />2020 Hacker Premier League
                                </div>
                                <About trigger={trigger}/>
                            </div>
                        </Menu.Item>
                    </Menu>
                </Container>
            </Segment>
            
        </div>
    )
}

export default Footer;