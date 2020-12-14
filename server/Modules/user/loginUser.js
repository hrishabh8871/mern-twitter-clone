import auth from '../../Config/authentication'
import User from '../../Model/User'
import bcrypt from 'bcryptjs'
import userAuthResponse from '../../Config/authResponse';

export default async function loginUser(req, res) {
    try {
    const { mobile, email, password } = req.body
    await User.findOne({ email: email })        
        .then(async (userValidate) => {
            if(userValidate) {
                if(password) {
                    const passwordsMatch = await bcrypt.compare(password, userValidate.password)
                    if(passwordsMatch) {
                        res.status(200).send({
                            success: true,
                            message: 'User Data',
                            data: userAuthResponse(userValidate)
                        })
                    }
                    else {
                        res.status(401).send({
                            success: false,
                            message: 'Password not matched!!!'
                        })
                    }
                }
                else {
                    res.status(401).send({
                        success: false,
                        message: 'Please Enter Password!!!'
                    })
                }                
            }
        }).catch(error => res.status(400).send({
            success: false,
            message: error.message
        }));
    }
    catch(error) {        
        res.status(500).send({
            success: false,
            message: 'Something went wrong!!!'
        })
    }
}