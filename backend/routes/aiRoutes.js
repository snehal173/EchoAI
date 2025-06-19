import {Router} from 'express';

import { getresult } from '../controllers/aiController.js';

const router=Router();

router.get('/get-result',getresult);

export default router;