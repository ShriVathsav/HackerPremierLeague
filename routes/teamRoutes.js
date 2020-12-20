const express = require("express")
const router = express.Router()
const Team = require("../model/Team")
const mongoose = require("mongoose")

router.post("/create", async (req, res) => {
    try{
        const team = await Team.create(req.body)
        res.send(team)
    }catch(err){
        res.send({
            error: true
        })
    }
})

router.get("/getTeamList", async (req, res) => {
    const {pageNumber, sortField, sortDirection, name, team_score} = req.query

    const query = {
        team_name: !!name ? { $regex: `.*${name}.*`} : { $regex: `.*`},
        score: team_score !== undefined ? team_score : { $gt : -1 }
    }

    try{
        const options = {
            page: parseInt(pageNumber) || 1,
            perPage: 10,
            sort: {[sortField]: parseInt(sortDirection)}
        }
        const teams = await Team.paginate(query, options)
        res.send(teams)
    } catch(err){
        res.send({
            error: true
        })
    }
    
})

router.put("/updateTeam", async (req, res) => {
    const teams = req.body.teamArray
    try{
        Team.find({
            '_id': { $in: [
                mongoose.Types.ObjectId(teams[0]._id),
                mongoose.Types.ObjectId(teams[1]._id)
            ]}
        }, function(err, result){
            if(err){
                res.send({
                    error: true
                })
            } else{
                if(result.length === 0){
                    res.send({
                        error: true
                    })
                } else{
                    result[0].wins = teams[0].wins
                    result[0].losses = teams[0].losses
                    result[0].ties = teams[0].ties
                    result[0].score = teams[0].score
                    result[1].wins = teams[1].wins
                    result[1].losses = teams[1].losses
                    result[1].ties = teams[1].ties
                    result[1].score = teams[1].score
                    let returnArray = []
                    result[0].save(function(err, updatedObj){
                        if(err){
                            res.send({
                                error: true
                            })
                        } else{
                            returnArray.push(updatedObj)
                        }
                    })

                    result[1].save(function(err, updatedObj){
                        if(err){
                            res.send({
                                error: true
                            })
                        } else{
                            returnArray.push(updatedObj)
                        }
                    })
                    res.send(returnArray)
                }
            }
        })
    } catch(err){
        res.send({
            error: true
        })
    }
    
})

module.exports = router