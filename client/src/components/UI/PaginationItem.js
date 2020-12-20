import React, { useState, useContext, useEffect } from 'react'
import { Pagination } from 'semantic-ui-react'
import {AppContext} from "../../AppContext"
import axios from "axios"

const PaginationItem = (props) => {

    const contextObj = useContext(AppContext)
    const {searchByProps, searchTermProps, teamListProps, sortFieldProps, totalPagesProps, 
        pageNumberProps, teamCountProps, sortDirectionProps, loadingProps, errorProps} = contextObj

    const [activePage, setActivePage] = pageNumberProps
    const [boundaryRange, setBoundaryRange] = useState(1)
    const [siblingRange, setSiblingRange] = useState(1)
    const [showEllipsis, setShowEllipsis] = useState(true)
    const [showFirstAndLastNav, setShowFirstAndLastNav] = useState(true)
    const [showPreviousAndNextNav, setShowPreviousAndNextNav] = useState(true)
    const [totalPages, setTotalPages] =  totalPagesProps
    
    const [searchTerm, setSearchTerm] = searchTermProps
    const [searchBy, setSearchBy] = searchByProps

    const [loading, setLoading] = loadingProps
    const [teamList, setTeamList] = teamListProps
    const [sortField, setSortField] = sortFieldProps
    const [teamCount, setTeamCount] = teamCountProps
    const [sortDirection, setSortDirection] = sortDirectionProps
    const [error, setError] = errorProps

    const viewLeaderboard = (pageNumber) => {   
        setLoading(true)     
        axios.get("/api/team/getTeamList", {
            params: {
                sortField,
                pageNumber,
                sortDirection,
                name: searchBy === "Team Name" ? searchTerm : undefined,
                team_score: searchBy === "Team Score" ? searchTerm : undefined
            }
        }).then(res => {
            if(res.data.error){
                setError(true)
                setLoading(false)
            } else{
                console.log(res.data.docs)
                setTeamList(res.data.docs)
                setLoading(false)
            }     
        }).catch(err => {
            setError(true)
        })
    }

    //useEffect(() => viewLeaderboard(), [activePage])
    const handlePaginationChange = (e, { activePage }) => {
        setActivePage( activePage )
        console.log(activePage, "pagenumber")
        viewLeaderboard(activePage)
    }

    return (
        <Pagination 
            activePage={activePage}
            boundaryRange={boundaryRange}
            onPageChange={handlePaginationChange}
            siblingRange={siblingRange}
            totalPages={totalPages}
            // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
            ellipsisItem={showEllipsis ? undefined : null}
            firstItem={showFirstAndLastNav ? undefined : null}
            lastItem={showFirstAndLastNav ? undefined : null}
            prevItem={showPreviousAndNextNav ? undefined : null}
            nextItem={showPreviousAndNextNav ? undefined : null}
        />
    )
}

export default PaginationItem;