/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);\n/* harmony import */ var _assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n// eslint-disable-next-line import/no-extraneous-dependencies\n__webpack_require__(1);\n\n// normalize.css must be loaded first before app css, so disable eslint check\n/* eslint-disable import/first */\n\n/* eslint-enable import/first */\n\nconst validations = [\n  {\n    field: 'country',\n    validation: {\n      length: 3,\n      required: true,\n      regex: /\\D{3}/,\n      errMsg: 'Must be 3 characters',\n    },\n  },\n  {\n    field: 'zip',\n    validation: {\n      length: 5,\n      required: true,\n      regex: /\\d{5}/,\n      errMsg: 'Must be 5 numbers',\n    },\n  },\n  {\n    field: 'email',\n    validation: {\n      length: -1,\n      required: true,\n      regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,\n      errMsg: 'Not a valid email',\n    },\n  },\n  {\n    field: 'email_confirm',\n    validation: {\n      confirmation: 'email',\n      length: -1,\n      required: true,\n      regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,\n      errMsg: 'Not a valid email',\n    },\n  },\n  {\n    field: 'password',\n    validation: {\n      length: 8,\n      required: true,\n      regex: /\\w{8}/,\n      errMsg: 'Must be eight characters',\n    },\n  },\n  {\n    field: 'password_confirm',\n    validation: {\n      confirmation: 'password',\n      length: 8,\n      required: true,\n      regex: /\\w{8}/,\n      errMsg: 'Must be eight characters',\n    },\n  },\n];\n\nfunction clearErrorStatus() {\n  const errorContainer = document.getElementById('form-errors');\n\n  while (errorContainer.firstChild) {\n    errorContainer.removeChild(errorContainer.firstChild);\n  }\n}\n\nfunction getFieldLabel(fieldName) {\n  const fieldElement = document.querySelector(`input[name=${fieldName}]`);\n  return fieldElement.previousElementSibling.textContent;\n}\n\nfunction clearError(e) {\n  e.target.classList.remove('error');\n}\n\nfunction clearErrors() {\n  const inputs = document.querySelectorAll('input');\n\n  for (let inputIndex = 0; inputIndex < inputs.length - 1; inputIndex += 1) {\n    inputs[inputIndex].classList.remove('error');\n  }\n}\n\nfunction resetErrors() {\n  clearErrorStatus();\n  clearErrors();\n}\n\nfunction validateConfirmation(confirmField, confirmation) {\n  const confirmeeElement = document.querySelector(`input[name=${confirmation}]`);\n  const confirmeeLabel = getFieldLabel(confirmation);\n  const confirmeeValue = confirmeeElement.value;\n\n  if (confirmField.value !== confirmeeValue) {\n    return {\n      name: confirmField.name,\n      error: `Does not match ${confirmeeLabel}`,\n    };\n  }\n  return null;\n}\n\nfunction validateField(field, validation) {\n  const { value } = field;\n  const regExp = validation.regex;\n  if (validation.required && value.length === 0) {\n    return { name: field.name, error: 'This field is required' };\n  } else if (validation.length !== -1 && value.length > validation.length) {\n    return {\n      name: field.name,\n      error: validation.errMsg,\n    };\n  } else if (!regExp.test(value)) {\n    return { name: field.name, error: validation.errMsg };\n  } else if (validation.confirmation) {\n    return validateConfirmation(field, validation.confirmation);\n  }\n\n  return null;\n}\n\nfunction validateFields(inputs) {\n  const errors = [];\n\n  for (let inputIndex = 0; inputIndex < inputs.length - 1; inputIndex += 1) {\n    const errMsg = validateField(\n      inputs[inputIndex],\n      validations[inputIndex].validation\n    );\n    if (errMsg) errors.push(errMsg);\n  }\n\n  return errors;\n}\n\nfunction highlightFields(errors) {\n  for (let errorIndex = 0; errorIndex < errors.length; errorIndex += 1) {\n    const field = errors[errorIndex].name;\n    const inputField = document.querySelector(`input[name=${field}]`);\n    inputField.classList.add('error');\n  }\n}\n\nfunction displayErrors(errors) {\n  const errorContainer = document.getElementById('form-errors');\n  let ul;\n\n  if (errors.length > 0) {\n    const pElement = document.createElement('p');\n    pElement.textContent = 'This form has the following errors:';\n    errorContainer.append(pElement);\n\n    ul = document.createElement('ul');\n  }\n\n  for (let errorIndex = 0; errorIndex < errors.length; errorIndex += 1) {\n    const fieldName = errors[errorIndex].name;\n    const fieldLabel = getFieldLabel(fieldName);\n    const errMsg = errors[errorIndex].error;\n    const li = document.createElement('li');\n    li.textContent = `${fieldLabel} ${errMsg}`;\n    ul.append(li);\n  }\n  if (ul) errorContainer.append(ul);\n}\n\nfunction alertUser(errors) {\n  highlightFields(errors);\n  displayErrors(errors);\n}\n\nfunction validateForm(e) {\n  e.preventDefault();\n  const form = e.target.parentNode;\n  const inputs = form.querySelectorAll('input');\n\n  resetErrors();\n\n  const errors = validateFields(inputs);\n  if (errors.length > 0) {\n    alertUser(errors);\n  } else {\n    alert('Your practice form had no errors');\n  }\n}\n\nconst submit = document.getElementById('reg-submit');\nsubmit.addEventListener('click', validateForm);\n// If there are errors as user enters new data clear the error highlight\ndocument.addEventListener('focusout', clearError);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./node_modules/normalize.css/normalize.css?");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/assets/css/style.scss?");

/***/ })
/******/ ]);