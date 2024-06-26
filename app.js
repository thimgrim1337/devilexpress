import express from 'express';
import router from './routes/router.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import ejs from 'ejs';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', router);

// app.post(
//   '/send',
//   [
//     check('name').notEmpty().withMessage('Name is required'),
//     check('email').isEmail().withMessage('Invalid Email Address'),
//     check('message').notEmpty().withMessage('Message is required'),
//   ],
//   (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       res.render('pages/index', { errors: errors.mapped() });
//     } else {
//       const transporter = nodemailer.createTransport({
//         host: 'serwer1897998.home.pl',
//         port: 587,
//         secure: false,
//         auth: {
//           user: process.env.SMTPUser,
//           pass: process.env.SMTPPassword,
//         },
//       });

//       const mail_option = {
//         from: 'form@devilexpress.eu',
//         to: 'd.dygner@devilexpress.eu',
//         subject: `Formularz kontaktowy ze strony od ${req.body.name} (${req.body.email})`,
//         text: req.body.message,
//       };

//       transporter.sendMail(mail_option, (error, info) => {
//         if (error) {
//           console.log(error);
//         } else {
//           res.redirect('/success');
//         }
//       });
//     }
//   }
// );

// app.get('/success', (req, res) => {
//   res.send('<h1>Your message was successfully sent!</h1>');
// });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;
