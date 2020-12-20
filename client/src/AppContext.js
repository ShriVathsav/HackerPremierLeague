import React, {useState} from 'react'

export const AppContext = React.createContext({
    team1Props: [],
    team2Props: [],
    team1StatusProps: [],
    team2StatusProps: [],
    teamListProps: [],
    pageNumberProps: [],
    totalPagesProps: [],
    searchByProps: [],
    searchTermProps: [],
    winnerProps: [],
    sortFieldProps: [],
    teamCountProps: [],
    sortDirectionProps: [],
    loadingProps: [],
    errorProps: []
})

const AppContextProvider = props => {

    const lists = [
        {id: 1, "team_name":"Konklux","wins":0,"losses":0,"ties":0,"score":0},
        {id: 2, "team_name":"Stronghold","wins":0,"losses":0,"ties":0,"score":0},
        {id: 3, "team_name":"Toughjoyfax","wins":0,"losses":0,"ties":0,"score":0},
        {id: 4, "team_name":"Cardify","wins":0,"losses":0,"ties":0,"score":0},
        {id: 5, "team_name":"Bytecard","wins":0,"losses":0,"ties":0,"score":0},
        {id: 6, "team_name":"Span","wins":0,"losses":0,"ties":0,"score":0},
        {id: 7, "team_name":"Zaam-Dox","wins":0,"losses":0,"ties":0,"score":0},
        {id: 8, "team_name":"Sub-Ex","wins":0,"losses":0,"ties":0,"score":0},
        {id: 9, "team_name":"Ventosanzap","wins":0,"losses":0,"ties":0,"score":0},
        {id: 10, "team_name":"Rank","wins":0,"losses":0,"ties":0,"score":0}
    ]

    const team1Props = useState({})
    const team2Props = useState({})
    const team1StatusProps = useState(-1)
    const team2StatusProps = useState(-1)
    const teamListProps = useState([])
    const totalPagesProps = useState(0)
    const pageNumberProps = useState(1)
    const searchByProps = useState("Team Name")
    const winnerProps = useState(-1)
    const searchTermProps = useState("")
    const sortFieldProps = useState("score")
    const teamCountProps = useState(0)
    const sortDirectionProps = useState(-1)
    const loadingProps = useState(false)
    const errorProps = useState(false)

    const initialValues = {
        team1Props, team2Props, team1StatusProps, team2StatusProps, teamListProps, pageNumberProps,
        totalPagesProps, searchByProps, winnerProps, searchTermProps, sortFieldProps, teamCountProps,
        sortDirectionProps, loadingProps, errorProps
    }

    return (
        <AppContext.Provider value={initialValues}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider