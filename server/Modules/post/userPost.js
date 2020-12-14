import authentication from "../../Config/authentication"
import UserPost from "../../Model/UserPost"

export default async function userPost(req, res) {
    try {
        var auth = await authentication(req)        
        if(auth.isAuthenticated) {           
            await UserPost.find({ userId : auth.user._id })
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