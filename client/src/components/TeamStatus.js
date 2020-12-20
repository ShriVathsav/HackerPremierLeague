import React, {useEffect, useContext} from "react"
import {Header, Segment, Button, Image} from "semantic-ui-react"
import "./TeamStatus.css"
import {AppContext} from "../AppContext"

import winnerIcon from '../IconsAndImages/Icons/winner.svg'
import loser from '../IconsAndImages/Icons/loser.svg'
import tieIcon from '../IconsAndImages/Icons/tie.svg'
import won from '../IconsAndImages/Icons/won.svg'
import lost from '../IconsAndImages/Icons/lost.svg'

const TeamStatus = (props) => {

    const {winnerProps} = useContext(AppContext)
    const {teamProps, teamStatusProps, otherTeamStatusProps, heading} = props

    const [winner, setWinner] = winnerProps
    const [team, setTeam] = teamProps
    const [teamStatus, setTeamStatus] = teamStatusProps
    const [otherTeamStatus, setOtherTeamStatus] = otherTeamStatusProps

    useEffect(() => console.log(team, "team"))

    const checkObjectisFalsy = (obj) => {
        // RETURNS TRUE IF OBJECT IS FALSY
        return (!!obj && Object.keys(obj).length === 0)
    }

    const setWinningTeam = () => {
        setTeamStatus(1)
        setOtherTeamStatus(0)
    }

    const setLosingTeam = () => {
        setTeamStatus(0)
        setOtherTeamStatus(1)
    }

    const getWinningStatus = () => {
        if(teamStatus === 1){
            return won
        } else if(teamStatus === 0){
            return lost
        } else {
            return tieIcon
        }
    }

    const getWinningStatus2 = () => {
        if(teamStatus === 1){
            return <div style={{margin: "10px 0px 0px 0px", fontWeight: 700, fontSize: 16, color: "#2ecc40"}}>WON !</div>
        } else if(teamStatus === 0){
            return <div style={{margin: "10px 0px 0px 0px", fontWeight: 700, fontSize: 16, color: "#ff695e"}}>LOST !</div>
        } else {
            return <div style={{margin: "10px 0px 0px 0px", fontWeight: 700, fontSize: 16, color: "blue"}}>TIE !</div>
        }
    }

    return (
        <Segment>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <Header style={{fontSize: 16, marginBottom: 3}}>{heading}</Header>
                {teamStatus !== -1 && 
                    <>
                        <Image src={getWinningStatus()} size="tiny" style={{marginTop: "10px"}}/>
                        {getWinningStatus2()}
                    </>
                }
                <Header style={{textAlign: "center", fontSize: 18, margin: "14px 0px"}}>{checkObjectisFalsy(team) ? "No Team Selected" : team.team_name}</Header>
                <div id="winner-outer-div">
                    <Button id="winner-div" inverted color="green" style={{backgroundColor: teamStatus === 1 && "#2ecc40"}}
                            onClick={setWinningTeam}>
                        <Image src={winnerIcon} style={{width: 40, marginBottom: 7}} />
                        <div style={{color: teamStatus === 1 && "white"}}>Winner</div>
                    </Button>
                    <Button id="winner-div" inverted color="red" style={{backgroundColor: teamStatus === 0 && "#ff695e"}}
                            onClick={setLosingTeam}>
                        <Image src={loser} style={{width: 40, marginBottom: 7}} />
                        <div style={{color: teamStatus === 0 && "white"}}>Loser</div>
                    </Button>
                </div>
            </div>
        </Segment>
    )
}

export default TeamStatus;