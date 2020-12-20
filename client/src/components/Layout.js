import React, {useContext, useState} from "react"
import Leaderboard from './Leaderboard'
import DisplayTeamList from "./DisplayTeamList"
import {Container, Button} from "semantic-ui-react"
import Search from "./Search"
import AddTeam from "./AddTeam"
import ErrorPortal from "./UI/ErrorPortal"
import {AppContext} from "../AppContext"
import "./Layout.css"

const Layout = (props) => {

    const {errorProps} = useContext(AppContext)

    const addTeamTrigger = (
        <div id="floating-action-button" >
            <Button circular negative icon='plus' size="huge"/>
        </div>
    )

    return (
        <Container>
            <Leaderboard />
            <Search />
            <DisplayTeamList />
            <AddTeam addTeamTrigger={addTeamTrigger}/>
            <ErrorPortal portalOpenProps={errorProps} />
        </Container>
    )
}

export default Layout;