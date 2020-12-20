import React, {useContext, useEffect} from "react"
import TeamDetails from './TeamDetails'
import PaginationItem from "./UI/PaginationItem"
import {AppContext} from '../AppContext'
import { Button, Icon, Dropdown, Header } from "semantic-ui-react"
import axios from 'axios'
import AddTeam from "./AddTeam"
import LoadingSpinner from "./UI/LoadingSpinner"

const sortByOptions = [
    {key: 0, text: 'Score', value: 'score'},
    {key: 1, text: 'Wins', value: 'wins'},
    {key: 2, text: 'Losses', value: 'losses'},
    {key: 3, text: 'Ties', value: 'ties'}
]

const sortDirectionOptions = [
    {key: 0, text: 'Asc', value: 1},
    {key: 1, text: 'Desc', value: -1}
]

const DisplayTeamList = () => {

    const {teamListProps, sortFieldProps, totalPagesProps, pageNumberProps, teamCountProps,
        sortDirectionProps, loadingProps, errorProps} = useContext(AppContext)
    const [loading, setLoading] = loadingProps
    const [teamList, setTeamList] = teamListProps
    const [sortField, setSortField] = sortFieldProps
    const [pageNumber, setPageNumber] = pageNumberProps
    const [totalPages, setTotalPages] = totalPagesProps
    const [teamCount, setTeamCount] = teamCountProps
    const [sortDirection, setSortDirection] = sortDirectionProps
    const [error, setError] = errorProps

    const addTeamTrigger = (
        <Button color="red" style={{borderRadius: 0}}>
            <Icon name="add" />CREATE TEAM
        </Button>
    )

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
            }
        }).catch((err) => {
            setError(true)
        })
    }

    useEffect(() => viewLeaderboard(), [sortField, sortDirection])

    useEffect(() => viewLeaderboard(), [])

    return (
        <div>
            <div style={{display: "flex", margin: "24px 0px 14px 0px", alignItems: "center"}}>
                <div style={{width: "30%"}}>
                    <label>Sort Teams By</label>            
                    <Dropdown inline options={sortByOptions} value={sortField}
                         style={{margin: "0px 5px"}} compact onChange={(e, data) => setSortField(data.value)}
                    />
                    <Dropdown inline options={sortDirectionOptions} value={sortDirection}
                        compact onChange={(e, data) => setSortDirection(data.value)}
                    />
                </div>
                <div style={{width: "70%"}}>
                    <Button color="orange" basic floated="right" style={{borderRadius: 0}}
                        onClick={() => {setSortDirection(-1); setSortField("score"); viewLeaderboard()}}>
                        <Icon name="eye" />VIEW LEADERBOARD
                    </Button>
                </div>
            </div>
            <Header as='h3'>
                {teamCount} Teams Found
            </Header>
            {loading ?
                <LoadingSpinner />
            :
            (
            (teamCount !== 0 || teamList.length !== 0) ?
                <div>
                    <div style={{textAlign: "center", margin: 14}}>
                        <PaginationItem />
                    </div>
                    {teamList.map(item => 
                        <TeamDetails item={item} key={item._id}/>
                    )}
                    <div style={{textAlign: "center", margin: 14}}>
                        <PaginationItem />
                    </div>
                </div>
                :
                <Header as='h3' block style={{padding: 21, textAlign: "center"}}>
                    <div style={{marginBottom: 18}}>
                        No results found. Please refine your search or create a team.
                    </div>
                    <AddTeam addTeamTrigger={addTeamTrigger}/>
                </Header>
            )
            }
        </div>
    )
}

export default DisplayTeamList;