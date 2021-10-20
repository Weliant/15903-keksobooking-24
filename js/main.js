
import { offerGenerator } from './offer-generator.js';
import { checkActiveForm } from './form.js';

offerGenerator();

checkActiveForm();

setTimeout(()=> {
  checkActiveForm(true);
}, 3000);
