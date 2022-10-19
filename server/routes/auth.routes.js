const express = require('express');
const router = express.Router();
import authCtrl from '../controllers/auth.controller';

router.route('/auth/signin')
    .post(authCtrl.signin)
router.route('/auth/signout')
    .get(authCtrl.signout)

export default router