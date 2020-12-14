import authentication from "../../Config/authentication"
import FollowFollowing from "../../Model/FollowFollowing"

export default async function follow(req, res) {
    try {
        const auth = await authentication(req)
        if(auth && auth.isAuthenticated) {
            const { followUserId } = req.body
            await FollowFollowing.create({
                userId: auth.user._id,
                followUserId: followUserId
            }).then((followUser) => {
                res.status(201).send({
                    success: true,
                    message: 'Follow',
                    data: followUser
                })
            }).catch((error) => {
                res.status(401).send({
                    success: false,
                    message: error.message
                })
            })
        }
        else {
            res.status(401).send({
                success: false,
                message: 'Please login!!!'
            })
        }
    }
    catch(error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: 'Something went wrong!!!'
        })
    }
}