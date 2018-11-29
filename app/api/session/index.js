import { Router } from 'express';
import { ROUTES } from '../../constants/routes';
import * as post from './post';

const router = Router();

router.post(ROUTES.SESSION.SIGN_IN, post.signIn);
router.post(ROUTES.SESSION.SIGN_UP, post.signUp);

export default router;
