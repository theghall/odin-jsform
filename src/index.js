// eslint-disable-next-line import/no-extraneous-dependencies
require('normalize.css');

// normalize.css must be loaded first before app css, so disable eslint check
/* eslint-disable import/first */
import './assets/css/style.scss';
/* eslint-enable import/first */

const validations = [
  {
    field: 'country',
    validation: {
      length: 3,
      required: true,
      regex: /\D{3}/,
      errMsg: 'Must be 3 characters',
    },
  },
  {
    field: 'zip',
    validation: {
      length: 5,
      required: true,
      regex: /\d{5}/,
      errMsg: 'Must be 5 numbers',
    },
  },
  {
    field: 'email',
    validation: {
      length: -1,
      required: true,
      regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
      errMsg: 'Not a valid email',
    },
  },
  {
    field: 'email_confirm',
    validation: {
      confirmation: 'email',
      length: -1,
      required: true,
      regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
      errMsg: 'Not a valid email',
    },
  },
  {
    field: 'password',
    validation: {
      length: 8,
      required: true,
      regex: /\w{8}/,
      errMsg: 'Must be eight characters',
    },
  },
  {
    field: 'password_confirm',
    validation: {
      confirmation: 'password',
      length: 8,
      required: true,
      regex: /\w{8}/,
      errMsg: 'Must be eight characters',
    },
  },
];

function clearErrorStatus() {
  const errorContainer = document.getElementById('form-errors');

  while (errorContainer.firstChild) {
    errorContainer.removeChild(errorContainer.firstChild);
  }
}

function getFieldLabel(fieldName) {
  const fieldElement = document.querySelector(`input[name=${fieldName}]`);
  return fieldElement.previousElementSibling.textContent;
}

function clearError(e) {
  e.target.classList.remove('error');
}

function clearErrors() {
  const inputs = document.querySelectorAll('input');

  for (let inputIndex = 0; inputIndex < inputs.length - 1; inputIndex += 1) {
    inputs[inputIndex].classList.remove('error');
  }
}

function resetErrors() {
  clearErrorStatus();
  clearErrors();
}

function validateConfirmation(confirmField, confirmation) {
  const confirmeeElement = document.querySelector(`input[name=${confirmation}]`);
  const confirmeeLabel = getFieldLabel(confirmation);
  const confirmeeValue = confirmeeElement.value;

  if (confirmField.value !== confirmeeValue) {
    return {
      name: confirmField.name,
      error: `Does not match ${confirmeeLabel}`,
    };
  }
  return null;
}

function validateField(field, validation) {
  const { value } = field;
  const regExp = validation.regex;
  if (validation.required && value.length === 0) {
    return { name: field.name, error: 'This field is required' };
  } else if (validation.length !== -1 && value.length > validation.length) {
    return {
      name: field.name,
      error: validation.errMsg,
    };
  } else if (!regExp.test(value)) {
    return { name: field.name, error: validation.errMsg };
  } else if (validation.confirmation) {
    return validateConfirmation(field, validation.confirmation);
  }

  return null;
}

function validateFields(inputs) {
  const errors = [];

  for (let inputIndex = 0; inputIndex < inputs.length - 1; inputIndex += 1) {
    const errMsg = validateField(
      inputs[inputIndex],
      validations[inputIndex].validation
    );
    if (errMsg) errors.push(errMsg);
  }

  return errors;
}

function highlightFields(errors) {
  for (let errorIndex = 0; errorIndex < errors.length; errorIndex += 1) {
    const field = errors[errorIndex].name;
    const inputField = document.querySelector(`input[name=${field}]`);
    inputField.classList.add('error');
  }
}

function displayErrors(errors) {
  const errorContainer = document.getElementById('form-errors');
  let ul;

  if (errors.length > 0) {
    const pElement = document.createElement('p');
    pElement.textContent = 'This form has the following errors:';
    errorContainer.append(pElement);

    ul = document.createElement('ul');
  }

  for (let errorIndex = 0; errorIndex < errors.length; errorIndex += 1) {
    const fieldName = errors[errorIndex].name;
    const fieldLabel = getFieldLabel(fieldName);
    const errMsg = errors[errorIndex].error;
    const li = document.createElement('li');
    li.textContent = `${fieldLabel} ${errMsg}`;
    ul.append(li);
  }
  if (ul) errorContainer.append(ul);
}

function alertUser(errors) {
  highlightFields(errors);
  displayErrors(errors);
}

function validateForm(e) {
  e.preventDefault();
  const form = e.target.parentNode;
  const inputs = form.querySelectorAll('input');

  resetErrors();

  const errors = validateFields(inputs);
  if (errors.length > 0) {
    alertUser(errors);
  } else {
    alert('Your practice form had no errors');
  }
}

const submit = document.getElementById('reg-submit');
submit.addEventListener('click', validateForm);
// If there are errors as user enters new data clear the error highlight
document.addEventListener('focusout', clearError);
