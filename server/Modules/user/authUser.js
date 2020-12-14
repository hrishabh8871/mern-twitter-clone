import authentication from "../../Config/authentication";
import FollowFollowing from "../../Model/FollowFollowing";

export default async function authUser(req, res) {
    try {
        var user = await authentication(req)
        console.log(user)
        if(user) {
            var follow = await FollowFollowing.find({ userId: user.user._id })
            console.log(follow)
            user.follow = follow
            res.status(200).send({
                success: true,
                message: 'User Data',
                data: user
            })
        }
        else {
            res.status(401).send({
                success: false,
                message: 'User not found!!!'
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