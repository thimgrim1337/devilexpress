export const index = (req, res) => {
  res.render('pages/index', { errors: '', modalOpen: false });
};
export const ofert = (req, res) => {
  res.render('pages/oferta');
};
export const about = (req, res) => {
  res.render('pages/firma');
};
export const contact = (req, res) => {
  res.render('pages/kontakt', { errors: '', modalOpen: false });
};
