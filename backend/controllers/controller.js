import createAssessment from '../scripts/createAssessment.js';

export const home = (req, res) => {
  res.render('pages/index', { errors: '' });
};

export const ofert = (req, res) => {
  res.render('pages/oferta', { errors: '' });
};
export const about = (req, res) => {
  res.render('pages/firma', { errors: '' });
};
export const contact = (req, res) => {
  res.render('pages/kontakt', { errors: '' });
};

export async function onFormSent(req, res) {
  const data = await createAssessment({
    token: req.body['g-recaptcha-response'],
    recaptchaAction: 'submit',
  });
  console.log(data);
  res.redirect('/');
}
