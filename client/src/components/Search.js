import React, {useContext, useEffect, useState} from "react"
import {Input, Button, Dropdown, Icon, Message, Form} from "semantic-ui-react"
import "./Search.css"
import {AppContext} from "../AppContext"
import axios from "axios"

const Search = () => {

    const [localSearchTerm, setLocalSearchTerm] = useState("")
    const [localSearchBy, setLocalSearchBy] = useState("Team Name")

    const {searchByProps, searchTermProps, teamListProps, sortFieldProps, totalPagesProps, 
        pageNumberProps, teamCountProps, sortDirectionProps, loadingProps, errorProps} = useContext(AppContext)
    const [searchTerm, setSearchTerm] = searchTermProps
    const [searchBy, setSearchBy] = searchByProps

    const [loading, setLoading] = loadingProps
    const [teamList, setTeamList] = teamListProps
    const [sortField, setSortField] = sortFieldProps
    const [pageNumber, setPageNumber] = pageNumberProps
    const [totalPages, setTotalPages] = totalPagesProps
    const [teamCount, setTeamCount] = teamCountProps
    const [sortDirection, setSortDirection] = sortDirectionProps
    const [error, setError] = errorProps

    const options = [
        { key: 0, text: 'Team Name', value: 'Team Name' },
        { key: 1, text: 'Team Score', value: 'Team Score' }
    ]

    const viewLeaderboard = (teamName = undefined, teamScore = undefined) => {   
        setLoading(true)     
        axios.get("/api/team/getTeamList", {
            params: {
                sortField,
                pageNumber,
                sortDirection,
                name: teamName,
                team_score: teamScore
            }
        }).then(res => {
            if(res.data.error){
                setError(true)
                setLoading(false)
            } else{
                setTeamList(res.data.docs)
                setPageNumber(res.data.page)
                setTotalPages(res.data.pages)
                setTeamCount(res.data.total)
                setLoading(false)  
            }     
        }).catch(err => {
            setError(true)
        })
    }

    const searchTeams = () => {
        console.log(localSearchBy, localSearchTerm, "search")
        if(localSearchBy === "Team Score" && !Object.is(parseInt(localSearchTerm), NaN)){
            setSearchTerm(parseInt(localSearchTerm))
            setSearchBy(localSearchBy)            
        } else {
            setSearchTerm(localSearchTerm)
            setSearchBy(localSearchBy)
        }
        if(localSearchBy === "Team Name"){
            viewLeaderboard(localSearchTerm)
        } else if(localSearchBy === "Team Score"){
            !Object.is(parseInt(localSearchTerm), NaN) && viewLeaderboard(undefined, parseInt(localSearchTerm))
        }
    }

    return (
        <Message>
            <div id="search-wrapper">            
                <div id="search-input" >
                    <Form>
                        <Form.Field>
                            <label>Search Teams by Team name or Score</label>
                            <Input type='text' placeholder='Search by team name or score' action fluid>
                                <input onChange={(e) => setLocalSearchTerm(e.target.value)} value={localSearchTerm}/>
                                <Dropdown selection compact floating options={options} value={localSearchBy} 
                                    onChange={(e, data) => setLocalSearchBy(data.value)}/>
                                <Button color="red" id="search-button" onClick={() => localSearchTerm !== "" && searchTeams()}>
                                    <span id="search-button-text">SEARCH</span>
                                    <Icon id="search-button-icon" color="white" name="search" />
                                </Button>
                            </Input>
                        </Form.Field>
                    </Form>
                </div>          
            </div>
        </Message>
    )
}

export default Search;