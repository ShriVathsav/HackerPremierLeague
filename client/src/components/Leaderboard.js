import React, {useState, useContext} from "react"
import TeamStatus from "./TeamStatus"
import {Grid, Segment, Image, Button, Icon} from "semantic-ui-react"
import "./Leaderboard.css"
import {AppContext} from "../AppContext"
import axios from "axios"
import PortalMain from "./UI/PortalMain"

import tie from '../IconsAndImages/Icons/tie.svg'
import finalize from '../IconsAndImages/Icons/finalize.svg'

const Leaderboard = () => {

    const contextObj = useContext(AppContext)

    const {team1Props, team2Props, team1StatusProps, team2StatusProps, teamListProps, sortFieldProps, 
        totalPagesProps, pageNumberProps, teamCountProps, sortDirectionProps, loadingProps, errorProps} = contextObj

    const [loading, setLoading] = loadingProps
    const [teamList, setTeamList] = teamListProps
    const [sortField, setSortField] = sortFieldProps
    const [pageNumber, setPageNumber] = pageNumberProps
    const [totalPages, setTotalPages] = totalPagesProps
    const [teamCount, setTeamCount] = teamCountProps
    const [sortDirection, setSortDirection] = sortDirectionProps
    const [error, setError] = errorProps

    const [team1, setTeam1] = team1Props
    const [team2, setTeam2] = team2Props

    const portalOpenProps = useState(false)
    const [portalOpen, setPortalOpen] = portalOpenProps

    const [portalMessage, setPortalMessage] = useState("")

    const checkObjectisFalsy = (obj) => {
        // RETURNS TRUE IF OBJECT IS FALSY
        return (!!obj && Object.keys(obj).length === 0)
    }

    const declareTie = () => {
        team1StatusProps[1](2)
        team2StatusProps[1](2)
    }

    const commentary = () => {
        if(team1StatusProps[0] === 1){
            return 'Declare Team 1 as winner? Team 1 will get 3 points. Click on "FINALIZE JUDGEMENT" button to proceed.'
        } else if(team1StatusProps[0] === 0){
            return 'Declare Team 2 as winner? Team 2 will get 3 points. Click on "FINALIZE JUDGEMENT" button to proceed.'
        } else if(team1StatusProps[0] === 2){
            return 'Declare a tie ? Both teams will get 1 points each. Click on "FINALIZE JUDGEMENT" button to proceed.'
        } else if(team1StatusProps[0] === -1){
            return "Select a team as winner or loser or declare a tie."
        }
    }

    const clearResults = () => {
        setTeam1({})
        setTeam2({})
        team1StatusProps[1](-1)
        team2StatusProps[1](-1)
    }

    const viewLeaderboard = () => {
        setLoading(true)
        axios.get("/api/team/getTeamList", {
            params: {
                sortField,
                pageNumber,
                sortDirection
            }
        }).then(res => {
            if(res.data.error){
                setError(true)
                setLoading(false)
            }else{
                setTeamList(res.data.docs)
                setPageNumber(res.data.page)
                setTotalPages(res.data.pages)
                setTeamCount(res.data.total)
                setLoading(false)
                clearResults()
            }
        }).catch(err => {
            setError(true)
        })
    }

    const finalizeJudgement = () => {
        const team1Obj = {...team1}
        const team2Obj = {...team2}

        let message

        if(team1StatusProps[0] === 1 && team2StatusProps[0] === 0){                      
            team1Obj.wins += 1
            team1Obj.score += 3
            team2Obj.losses += 1
            message = `Team ${team2Obj.team_name} won and gain 3 points`
        } else if(team1StatusProps[0] === 0 && team2StatusProps[0] === 1){            
            team1Obj.losses += 1
            team2Obj.wins += 1
            team2Obj.score += 3
            message = `Team ${team1Obj.team_name} won and gain 3 points`
        } else if(team1StatusProps[0] === 2 && team2StatusProps[0] === 2){
            team1Obj.ties += 1
            team1Obj.score += 1
            team2Obj.ties += 1
            team2Obj.score += 1
            message = `A Tie! Both Team ${team1Obj.team_name} and Team ${team2Obj.team_name} gain 1 point each`
        }
        
        axios.put("/api/team/updateTeam", {
            teamArray : [team1Obj, team2Obj]
        }).then(res => {
            if(res.error){
                setError(true)
            }else{
                setPortalMessage(message)
                setPortalOpen(true)
                viewLeaderboard()
            }
        }).catch(err => {
            setError(true)
        })
    }

    return (
        <div>
            <Segment>
                <Grid>
                    <Grid.Column id="team-status" stretched>
                        <TeamStatus teamProps={team1Props} teamStatusProps={team1StatusProps} otherTeamStatusProps={team2StatusProps}
                            heading="Team 1" />
                    </Grid.Column>
                    <Grid.Column stretched style={{width: "30%"}} only="tablet computer">
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                            <Button id="result-div" color="orange" basic disabled={!(!checkObjectisFalsy(team1) && !checkObjectisFalsy(team2))}
                                    onClick={declareTie}>
                                <Image src={tie} style={{width: 40, marginBottom: 7}} />
                                <div>DECLARE A TIE</div>
                            </Button>
                            <Button id="result-div" color="orange" basic disabled={!(!checkObjectisFalsy(team1) && !checkObjectisFalsy(team2)) || 
                                    (team1StatusProps[0] === -1 && team2StatusProps[0] === -1)}
                                    onClick={finalizeJudgement}>
                                <Image src={finalize} style={{width: 40, marginBottom: 7}} />
                                <div>FINALIZE JUDGEMENT</div>
                            </Button>
                        </div>
                    </Grid.Column>
                    <Grid.Column id="team-status" stretched>
                        <TeamStatus teamProps={team2Props} teamStatusProps={team2StatusProps} otherTeamStatusProps={team1StatusProps} 
                            heading="Team 2" />
                    </Grid.Column>
                    <Grid.Column width="16" stretched id="judgement-alt" style={{paddingTop: 0}} only="mobile">
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <Button id="result-div" color="orange" basic style={{marginRight: 7}}
                                disabled={!(!checkObjectisFalsy(team1) && !checkObjectisFalsy(team2))}>
                                <Image src={tie} style={{width: 30, marginRight: 5}} />
                                <div>DECLARE A TIE</div>
                            </Button>
                            <Button id="result-div" color="orange" basic style={{marginLeft: 7}}
                                disabled={!(!checkObjectisFalsy(team1) && !checkObjectisFalsy(team2)) || 
                                    (team1StatusProps[0] === -1 && team2StatusProps[0] === -1)}>
                                <Image src={finalize} style={{width: 30, marginRight: 5}} />
                                <div>FINALIZE JUDGEMENT</div>
                            </Button>
                        </div>
                    </Grid.Column>
                    <Grid.Column width="16">
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <div style={{width: "70%"}} id="commentary-message">
                                {commentary()}
                            </div>
                            <div style={{width: "30%"}} >
                                <Button color="blue" inverted floated="right" onClick={clearResults}>
                                    <Icon name="delete" />CLEAR
                                </Button>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid>                
            </Segment>
            <PortalMain portalOpenProps={portalOpenProps} icon="thumbs up" message={portalMessage}
                header="Success!" />
        </div>
    )
}

export default Leaderboard;