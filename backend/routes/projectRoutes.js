import {Router} from 'express';
import {addUsersToProject, createProject, deleteProject,updateFileTree, getProjectById, getProjectsByUser,  getMessagesByProjectId} from '../controllers/projectController.js';
import { authUser } from '../middleware/authMiddleware.js';

const router=Router();
//testing postman
router.post('/create',authUser,createProject);
router.get('/all',authUser,getProjectsByUser);
router.get('/getproject/:projectId',authUser,getProjectById);
router.delete('/delete/:projectId',authUser,deleteProject);
router.put('/addusers',authUser,addUsersToProject);
router.put('/update-file-tree',authUser,updateFileTree)
router.get('/getmessages/:projectId',authUser,getMessagesByProjectId)
export default router
