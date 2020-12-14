import User from "../../Model/User"

export default async function userSearch(req, res) {
    try{
        const { queryData, pageNo } = req.body        
        let limit = 20
        const skip = (limit * (pageNo - 1))
        const re = { $regex: new RegExp(queryData, 'i' )}
        await User.find({ name: re })
        .limit(limit)
        .skip(skip)
        .then((userData) => {
            res.status(200).send({
                success: true,
                message: 'User Data',
                data: userData
            })
        }).catch((error) => {
            res.status(401).send({
                success: false,
                message: error.message
            })
        })
    }
    catch(error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong!!!'
        })
    }
}