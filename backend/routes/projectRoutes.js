import {Router} from 'express';
import {addUsersToProject, createProject, getProjectById, getProjectsByUser} from '../controllers/projectController.js';
import { authUser } from '../middleware/authMiddleware.js';

const router=Router();
//testing postman
router.post('/create',authUser,createProject);
router.get('/all',authUser,getProjectsByUser);
router.get('/getproject/:projectId',authUser,getProjectById);
router.put('/addusers',authUser,addUsersToProject);
export default router
