import React, { useState, useContext, useEffect } from 'react'
import { Menu, Segment, Container, Image, Button, Icon } from 'semantic-ui-react'
import AddTeam from "../AddTeam"
import About from "../About"
import "./NavBar.css"

import leaderboardIcon from "../../IconsAndImages/Icons/leaderboardIcon.svg"

const NavBar = () => {

    const addTeamTrigger = (
        <Button color="red" style={{borderRadius: 0}}>
            <Icon name="add" />CREATE TEAM
        </Button>
    )

    const aboutTrigger = (
        <Button color="red" style={{borderRadius: 0}}>
            <Icon name="info circle" />ABOUT
        </Button>
    )

    return (
        <Segment color="teal" inverted id="navbar">
            <Container>
                <Menu color="teal" inverted secondary fluid>
                    <Menu.Item id="logo-menu-item">                            
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Image src={leaderboardIcon} size="mini" style={{marginRight: 7}}/>
                            <div style={{fontWeight: 700, marginLeft: 10}} id="logo-name">
                                Hacker Premier League
                            </div>
                        </div>
                    </Menu.Item>
                    <Menu.Menu position='right' id="navbar-right-menu">
                        <Menu.Item>
                            <AddTeam addTeamTrigger={addTeamTrigger}/>
                        </Menu.Item>
                        <Menu.Item>
                            <About trigger={aboutTrigger}/>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Container>
        </Segment>
    )
}

export default NavBar;