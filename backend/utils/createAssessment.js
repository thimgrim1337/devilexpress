import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
import debug from 'debug';

/**
 * Utwórz ocenę, aby przeanalizować ryzyko związane z działaniem w interfejsie użytkownika.
 *
 * projectID: Identyfikator Twojego projektu Google Cloud.
 * recaptchaSiteKey: Klucz reCAPTCHA powiązany z witryną lub aplikacją
 * token: Wygenerowany token uzyskany od klienta.
 * recaptchaAction: Nazwa działania odpowiadająca tokenowi.
 */
async function createAssessment({
  // DO ZROBIENIA: zastąp token i zmienne działania reCAPTCHA przed uruchomieniem przykładu.
  projectID = 'devil-express-1718638475411',
  recaptchaKey = '6LekyvopAAAAAKOGJAnEgH2KyGYdAzKPMJyLFwF9',
  token = 'action-token',
  recaptchaAction = 'action-name',
}) {
  // Utwórz klienta reCAPTCHA.
  // DO ZROBIENIA: zapisz kod klienta w pamięci podręcznej (zalecane) lub wywołaj client.close() przed wyjściem z tej metody.

  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(projectID);

  // Utwórz żądanie oceny.
  const request = {
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  };

  const [response] = await client.createAssessment(request);

  // Sprawdź, czy token jest prawidłowy.
  if (!response.tokenProperties.valid) {
    debug(
      `The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`
    );
    return null;
  }

  // Sprawdź, czy oczekiwane działanie zostało wykonane.
  // The `action` property is set by user client in the grecaptcha.enterprise.execute() method.
  if (response.tokenProperties.action === recaptchaAction) {
    // Uzyskaj ocenę ryzyka i jego przyczyny.
    // Więcej informacji o interpretowaniu testu znajdziesz tutaj:
    // https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
    debug(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
    response.riskAnalysis.reasons.forEach((reason) => {
      debug(reason);
    });

    return response.riskAnalysis.score;
  } else {
    debug(
      'The action attribute in your reCAPTCHA tag does not match the action you are expecting to score'
    );
    return null;
  }
}

export default createAssessment;
