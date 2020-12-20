import React, {useContext, useState} from "react"
import {Grid, Segment, Header, Button} from "semantic-ui-react"
import "./TeamDetails.css"
import {AppContext} from '../AppContext'

const TeamDetails = (props) => {

    const {team1Props, team2Props} = useContext(AppContext)
    const [team1, setTeam1] = team1Props
    const [team2, setTeam2] = team2Props

    const {item} = props

    const [showDetails, setShowDetails] = useState(false)

    const addToTeamOne = (e) => {
        e.stopPropagation()
        setTeam1(item)
    }

    const addToTeamTwo = (e) => {
        e.stopPropagation()
        setTeam2(item)
    }

    return (
        <Segment id="detail-segment" onClick={() => setShowDetails(prev => !prev)}>
            <Grid celled="internally">
                <Grid.Row>
                    <Grid.Column style={{width: "35%"}} id="detail-column">
                        <Header as="h4" id="detail-header">Team Name</Header>
                        <span style={{wordBreak: "break-all"}}>{item.team_name}</span>
                    </Grid.Column>
                    <Grid.Column style={{width: "16%"}} id="detail-column">
                        <Header as="h4" id="detail-header">Wins</Header>
                        {item.wins}
                    </Grid.Column>
                    <Grid.Column style={{width: "19%"}} id="detail-column">
                        <Header as="h4" id="detail-header">Losses</Header>{item.losses}
                    </Grid.Column>
                    <Grid.Column style={{width: "15%"}} id="detail-column">
                        <Header as="h4" id="detail-header">Ties</Header>{item.ties}
                    </Grid.Column>
                    <Grid.Column style={{width: "15%"}} id="detail-column">
                        <Header as="h4" id="detail-header">Score</Header>{item.score}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {showDetails &&
                <div id="detail-accordion">
                    <div>
                        <Button id="detail-button" color="green" inverted onClick={(e) => addToTeamOne(e)}
                                disabled={(team1._id === item._id) || (team2._id === item._id)} >
                            Select as  Team 1</Button>
                        <Button id="detail-button" color="red" inverted onClick={(e) => addToTeamTwo(e)}
                                disabled={(team1._id === item._id) || (team2._id === item._id)} >
                            Select as Team 2</Button>
                    </div>
                </div>
            }
        </Segment>
    )
}

export default TeamDetails;