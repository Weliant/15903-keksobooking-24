
import { offerGenerator } from './offer-generator.js';
import { checkActiveForm, checkValidationForm } from './form.js';

offerGenerator();

checkActiveForm();

setTimeout(()=> {
  checkActiveForm(true);
  checkValidationForm();
}, 3000);
