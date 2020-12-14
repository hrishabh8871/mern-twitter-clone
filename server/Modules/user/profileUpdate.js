import authentication from "../../Config/authentication";
import User from "../../Model/User";

export default async function profileUpdate(req, res) {
    try {
        var auth = await authentication(req)
        const { image } = req.body
        if(auth && auth.isAuthenticated) {
            await User.updateOne({ _id : auth.user._id }, { $set : { image : image }})
            .then((userProfileUpdate) => {
                res.status(201).send({
                    success: true,
                    message: 'Profile updated',
                    data: userProfileUpdate
                })
            }).catch((error) => {
                res.status(401).send({
                    success: false,
                    message: error.message
                })
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