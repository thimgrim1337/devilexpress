import { Router } from 'express';
import { check } from 'express-validator';

import {
  index,
  ofert,
  about,
  contact,
} from '../controllers/indexController.js';
import { handleForm, sendEmail } from '../controllers/formController.js';
const router = Router();

router.get('/', index);
router.get('/oferta', ofert);
router.get('/firma', about);
router.get('/kontakt', contact);
router.post(
  '/send',
  [
    check('name').notEmpty().withMessage('* Imię jest wymagane.'),
    check('email').isEmail().withMessage('* Adres mailowy jest wymagany.'),
    check('message').notEmpty().withMessage('* Treść wiadomości jest wymagana'),
  ],
  sendEmail
);

export default router;
