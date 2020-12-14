import authentication from "../../Config/authentication"
import FollowFollowing from "../../Model/FollowFollowing"
import UserPost from "../../Model/UserPost"

export default async function showPost(req, res) {
    try {
        var auth = await authentication(req)        
        if(auth.isAuthenticated) {
            var followUser = await FollowFollowing.find({ userId : auth.user._id })
            const followedId = new Array()
            for(let followItem of followUser) {
                followedId.push(followItem.followUserId)
            }
            await UserPost.find({ $or: [{userId : auth.user._id}, { userId : { $in : followedId }}] })
            .then((data) => {
                res.status(200).send({
                    success: true,
                    message: 'User Post',
                    data: data
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
                message: 'Please Login!!!'
            })
        }
    }
    catch(error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong!!!'
        })
    }
}