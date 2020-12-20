import React, {useContext, useState} from "react"
import {Form, Input, Modal, Header, Icon, Button} from "semantic-ui-react"
import {AppContext} from '../AppContext'
import axios from 'axios'

const removeSpacesFromTextInput = (val) => {
    return val.replace(/\s\s+/g, ' ')
}

const AddTeam = (props) => {

    const {addTeamTrigger} = props

    const {teamListProps, sortFieldProps, 
        totalPagesProps, pageNumberProps, teamCountProps, sortDirectionProps, loadingProps, errorProps} = useContext(AppContext)

    const [loading, setLoading] = loadingProps
    const [teamList, setTeamList] = teamListProps
    const [sortField, setSortField] = sortFieldProps
    const [pageNumber, setPageNumber] = pageNumberProps
    const [totalPages, setTotalPages] = totalPagesProps
    const [teamCount, setTeamCount] = teamCountProps
    const [sortDirection, setSortDirection] = sortDirectionProps

    const [error, setError] = errorProps
    const [open, setOpen] = useState(false)
    const [teamName, setTeamName] = useState("")

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
        }).catch(err => {
            setError(true)
        })
    }

    const createTeamHandler = () => {
        axios.post("/api/team/create", {
            team_name: teamName,
            wins: 0,
            losses: 0,
            ties: 0,
            score: 0
        }).then(res => {
            if(res.error){
                setOpen(false)
                setError(true)
            }else{
                setOpen(false)
                setTeamName("")
                viewLeaderboard()
            }
        }).catch(err => {
            setError(true)
        })
    }

    return (
        <Modal open={open} trigger={addTeamTrigger} onClose={() => setOpen(false)} closeOnDimmerClick={false}
                size="tiny" onOpen={() => setOpen(true)} >
            <Header icon='add user' content='Create Team' />
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Team Name</label>
                        <Input placeholder='Enter Team Name' value={teamName} 
                            onChange={(e) => setTeamName(removeSpacesFromTextInput(e.target.value))}/>
                    </Form.Field>
                </Form>
                <div style={{textAlign: "center", margin: "18px 0px 0px 0px"}}>
                    <Button positive style={{padding: "16px 27px", borderRadius: 0}} size="large" 
                            fluid onClick={() => teamName !== "" && createTeamHandler()}
                            disabled={teamName.length < 3} >
                        <Icon name="add user" />
                        CREATE TEAM
                    </Button>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={() => setOpen(false)}>
                    <Icon name='remove' />Close
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default AddTeam;