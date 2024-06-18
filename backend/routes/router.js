import { Router } from 'express';
import {
  home,
  ofert,
  about,
  contact,
  onFormSent,
} from '../controllers/controller.js';

const router = Router();

router.get('/', home);
router.get('/oferta', ofert);
router.get('/firma', about);
router.get('/kontakt', contact);
router.post('/send', onFormSent);

export default router;
