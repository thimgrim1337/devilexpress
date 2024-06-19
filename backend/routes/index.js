import { Router } from 'express';
import {index, ofert, about, contact} from '../controllers/indexController.js'
import { sendForm } from '../controllers/formController.js';
const router = Router();

/* GET home page. */
router.get('/', index);
router.get('/oferta', ofert)
router.get('/firma', about);
router.get('/kontakt', contact);

router.post('/send', sendForm)

export default router;
