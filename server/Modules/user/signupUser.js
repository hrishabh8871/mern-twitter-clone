import User from "../../Model/User"
import bcrypt from 'bcryptjs'
import authResponse from '../../Config/authResponse'
const salt = '$2a$10$hTZyUIFeDkGroVdXjjsZe.'

export default async function signupUser(req, res) {
    try {        
        const { name, email, mobile, password, image } = req.body
        console.log(name, email, password, image)
        await User.findOne({ email: email })        
        .then((userValidate) => {
            console.log(userValidate)
            if(userValidate) {
                res.status(400).send({
                    success: false,
                    message: 'User Present Please Login!!!'                 
                })
            }
        }).catch(error => res.status(400).send({
            success: false,
            message: error.message
        }));
                
        if(password && password.length < 6) {            
            res.status(400).send({
                success: false,
                message: 'Password length should be min 6'
            })
        }
        else {
            let passwordHashed = ''                            
            passwordHashed = await bcrypt.hash(password, salt)        
            let userSet = {
                name: name,                
                email: email,
                image: image,
                password: passwordHashed,                
                role: 'user',                
            }        
            await User.create({ ...userSet })
            .then(async (userSignupQuery) => {
                res.status(200).send({
                    success: true,
                    message: 'User Data',
                    data: await authResponse(userSignupQuery)
                }) 
            }).catch((error) => {
                res.status(500).send({
                    success: false,
                    message: error.message
                })
            }); 
        }                   
         
    }
    catch(error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something Went Wrong!!!'
        })
    }   
}