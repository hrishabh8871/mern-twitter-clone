import authentication from "../../Config/authentication"
import UserPost from "../../Model/UserPost"

export default async function createPost(req, res) {
    try {
        const { title, content, image } = req.body
        const auth = await authentication(req)
        if(auth.isAuthenticated) {
            console.log(auth)
            await UserPost.create({
                title: title,
                body: content,
                image: image,
                userId: auth.user._id
            }).then((createdPost) => {
                res.status(201).send({
                    success: true,
                    message: 'Post create',
                    data: createdPost
                })
            }).catch((error) => {
                res.status(401).send({
                    success: false,
                    message: 'Post Not Created'
                })
            })
        }
        else {
            res.status(500).send({
                success: false,
                message: 'Please login'
            })
        }
    }
    catch(error) {
        console.log(error)
    }
}