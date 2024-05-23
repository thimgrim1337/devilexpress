const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const cors = require('cors');
const ejs = require('ejs');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('pages/index', { errors: '' });
});

app.post(
  '/send',
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid Email Address'),
    check('message').notEmpty().withMessage('Message is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('pages/index', { errors: errors.mapped() });
    } else {
      const transporter = nodemailer.createTransport({
        host: 'serwer1897998.home.pl',
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTPUser,
          pass: process.env.SMTPPassword,
        },
      });

      const mail_option = {
        from: 'form@devilexpress.eu',
        to: 'd.dygner@devilexpress.eu',
        subject: `Formularz kontaktowy ze strony od ${req.body.name} (${req.body.email})`,
        text: req.body.message,
      };

      transporter.sendMail(mail_option, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect('/success');
        }
      });
    }
  }
);

app.get('/success', (req, res) => {
  res.send('<h1>Your message was successfully sent!</h1>');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
