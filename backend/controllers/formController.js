import createAssessment from '../utils/createAssessment.js';
import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

export const handleForm = async (req, res) => {
  const score = await createAssessment({
    token: req.body['g-recaptcha-response'],
    recaptchaAction: 'submit',
  });

  if (!score || score < 0.7) {
    return res.render('pages/kontakt', {
      errors: '',
      modalOpen: true,
      modalTitle: 'Błąd wysyłania wiadomości.',
      modalMessage: `W wyniku błędu Twoja wiadomość nie została wysłana. Spróbuj ponownie. `,
    });
  }

  sendEmail(req, res);
};

const sendEmail = (req, res) => {
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
      if (error) console.error(error);
      else {
        res.render('pages/kontakt', {
          errors: '',
          modalOpen: true,
          modalTitle: 'Dziękujęmy za kontakt.',
          modalMessage: 'Wiadomość została wysłana. Odpowiemy w ciągu 24h',
        });
      }
    });
  }
};
