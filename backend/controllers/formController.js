import createAssessment from '../createAssessment.js';
import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

export const handleForm = async (req, res) => {
  const data = await createAssessment({
    token: req.body['g-recaptcha-response'],
    recaptchaAction: 'submit',
  });

  if (data > 0.7) {
  }
  // res.redirect('/');
};

export const sendEmail = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('pages/kontakt', {
      errors: errors.mapped(),
      modalOpen: false,
    });
  } else {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTPHost,
      port: process.env.SMTPPort,
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
      if (error) console.log(error);
      else {
        res.render('pages/kontakt', { errors: '', modalOpen: true });
      }
    });
  }
};
