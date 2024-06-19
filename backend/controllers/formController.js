import createAssessment from '../createAssessment.js';

export const sendForm = async(req,res) => {
    // const data = await createAssessment({
    //     token: req.body['g-recaptcha-response'],
    //     recaptchaAction: 'submit'
    //   })    
    res.redirect('/')
}