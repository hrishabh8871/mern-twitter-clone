const express = require("express");
const router = express.Router();

import { signupUser, loginUser, authUser, profileUpdate, userSearch } from '../Modules/user'
import { createPost, showPost, userPost } from '../Modules/post'
import { follow, unFollow } from '../Modules/follow'

router.post('/register', signupUser)
router.post('/login', loginUser)
router.post('/profileUpdate', profileUpdate)
router.post('/userSearch', userSearch)
router.post('/createPost', createPost)
router.get('/showPost', showPost)
router.get('/userPost', userPost)
router.get('/user', authUser)
router.post('/follow', follow)
router.post('/unFollow', unFollow)

export default router;