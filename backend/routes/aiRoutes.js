import {Router} from 'express';

import { getresult, getReview } from '../controllers/aiController.js';

const router=Router();

router.get('/get-result',getresult);
router.post('/get-review',getReview);
export default router;