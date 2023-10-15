import express from  'express';
import cors from 'cors';
import { loginController, registerController, testController, forgotPasswordController} from '../controllers/authController.js';
import { requireSignIn , isAdmin} from '../middlewares/authMiddleware.js';
const app = express();

const router = express.Router();

router.post(`/register`,registerController);

// login 

router.post(`/login`,loginController);


// Forgot Password || POST
router.post('forgot-password', forgotPasswordController)

// test routr

// protected User route
router.get('/user-auth', requireSignIn, (req,res) => {
    res.status(200).send({
        okay:true,
    });
});
// protected admin route auth
router.get('/admin-auth', requireSignIn,isAdmin, (req,res) => {
    res.status(200).send({
        okay:true,
    });
});

router.get('/test',requireSignIn,isAdmin,testController);
export default router;