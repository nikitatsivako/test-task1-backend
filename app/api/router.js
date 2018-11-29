import express from 'express';
import  { ROUTES }  from '../constants/routes';

import session from './session';

const router = express.Router();

router.use(ROUTES.SESSION.BASE, session);

export default router;
