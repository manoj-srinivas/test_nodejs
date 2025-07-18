// Importing the required modules
const config = require('./config');
const msg = require('./msg');
const Q = require('q');
const {
  keys,
  object
} = require('underscore');

/**
 * checks if a value is a string
 * @param {any} value value.
 */
let isString = (value) => {
  return typeof value === 'string' || value instanceof String;
}

/**
 * checks if a value is a number
 * @param {any} value value.
 */
let isNumber = (value) => {
  return typeof value === 'number' && isFinite(value);
}

/**
 * checks if a value is a number
 * @param {any} value value.
 */
let isArray = (value) => {
  return Array.isArray(value);
}

/**
 * checks if a value is a number
 * @param {any} value value.
 */
let isArrayOfInteger = (value) => {
  let isNum = true;
  if (Array.isArray(value)) {
    for (let intVal of value) {
      if (!isNumber(intVal)) {
        isNum = false;
      }
    }
  } else {
    isNum = false;
  }
  return isNum;
}

/**
 * checks if a value is a number
 * @param {any} value value.
 */
let isArrayOfObject = (value) => {
  let isObject = true;
  if (Array.isArray(value)) {
    for (let objVal of value) {
      if (!isJson(objVal)) {
        isObject = false;
      }
    }
  } else {
    isObject = false;
  }
  return isObject;
}


/**
 * checks if a value is a function
 * @param {any} value value.
 */
let isFunction = (value) => {
  return typeof value === 'function';
}

/**
 * checks if a value is a object
 * @param {any} value value.
 */
let isObject = (value) => {
  return value && typeof value === 'object' && value.constructor === Object;
}

/**
 * checks if a value is a null
 * @param {any} value value.
 */
let isNull = (value) => {
  return value === null;
}

/**
 * checks if a value is a undefined
 * @param {any} value value.
 */
let isUndefined = (value) => {
  return typeof value === 'undefined';
}

/**
 * checks if a value is a booleean
 * @param {any} value value.
 */
let isBoolean = (value) => {
  return typeof value === 'boolean';
}

/**
 * checks if a value is a regexp
 * @param {any} value value.
 */
let isRegExp = (value) => {
  return value && typeof value === 'object' && value.constructor === RegExp;
}

/**
 * checks if a value is a error
 * @param {any} value value.
 */
let isError = (value) => {
  return value instanceof Error && typeof value.message !== 'undefined';
}

/**
 * checks if a value is a date
 * @param {any} value value.
 */
let isDate = (value) => {
  return value instanceof Date;
}

/**
 * checks if a value is a symbol
 * @param {any} value value.
 */
let isSymbol = (value) => {
  return typeof value === 'symbol';
}

/**
 * checks if a value is a empty or not
 * @param {any} value value.
 */
const isEmpty = (value) => {
  if (
    ([null, undefined].includes(value)) ||
    (typeof value === 'string' && [''].includes(value.trim())) ||
    (typeof value === 'number' && [NaN].includes(value)) ||
    (typeof value === 'object' && ([null, undefined].includes(value) || (!Array.isArray(value) && Object.keys(value).length === 0) || (Array.isArray(value) && value.length === 0)))
  ) {
    return true;
  }
  return false;
}

/**
 * checks if a value is a empty or not
 * @param {any} value value.
 */
let isEmail = (value) => {
  var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(value);
}


/**
 * checks if a value is a empty or not
 * @param {any} value value.
 */
 let isMobileNumber = (value) => {
  var reg = /^(\+\d{1,3}[- ]?)?\d{10}$/gm;
  return reg.test(value);
}

/**
 * checks if a value is a empty or not
 * @param {any} value value.
 */
const isJson = (value) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    return true;
  }
  return false;
}

/**
 * checks if a value is a empty or not
 * @param {any} value value.
 */
const isObj = (value) => {
  if (typeof value === 'object') {
    return true;
  }
  return false;
}


/**
 * checks if a value is passes regex validation
 * @param {any} value value.
 */
const checkRegex = (value, pattern) => {
  if (value.toString().trim().match(pattern)) {
    return true;
  }
  return false;
}

/**
 * checks if a value is a empty or not
 * @param {Object} validationInfo object.
 */
// * @param {any} fld field name.
// * @param {any} value field value.
// * @param {any} type validation type.
// * @param {any} defaultValue default value if empty.
let validateData = async (validationInfo) => {
  let fld = validationInfo.fld;
  let value = validationInfo.value;
  let type = validationInfo.type;
  let defaultValue = validationInfo.defaultValue;
  let preferredValue = validationInfo.preferredValue;

  let Obj = {
    [fld]: msg.v_txt[0][fld] + ' ' + msg.v_typ[0][type]
  };
  let isValid = true;
  if (type == config.validationType.String) {
    if (!isEmpty(value)) {
      isValid = isString(value);
    }
  } else if (type == config.validationType.Email) {
    if (!isEmpty(value)) {
      isValid = isEmail(value);
    }
  } else if (type == config.validationType.Number || type == config.validationType.Float) {
    if (!isEmpty(value)) {
      isValid = isNumber(value);
    }
  } else if (type == config.validationType.Integer) {
    if (!isEmpty(value)) {
      if (!isNumber(value)) {
        isValid = false;
      } else {
        isValid = Number.isInteger(value);
      }
    }
  } else if (type == config.validationType.Array) {
    if (!isEmpty(value)) {
      isValid = isArray(value);
    }
  } else if (type == config.validationType.ArrayOfInteger) {
    if (!isEmpty(value)) {
      isValid = isArrayOfInteger(value);
    }
  } else if (type == config.validationType.ArrayOfObject) {
    if (!isEmpty(value)) {
      isValid = isArrayOfObject(value);
    }
  } else if (type == config.validationType.Boolean) {
    if (!isEmpty(value)) {
      isValid = isBoolean(value);
    }
  } else if (type == config.validationType.JSON) {
    if (!isEmpty(value)) {
      isValid = isJson(value);
    }
  } else if (type == config.validationType.Object) {
    if (!isEmpty(value)) {
      isValid = isObj(value);
    }
  } else if (type == config.validationType.RegEx) {
    let pattern = validationInfo.pattern;
    if (!isEmpty(value)) {
      isValid = checkRegex(value, pattern);
    }
  } else {
    // this should not occur as these are manual entries.
    throw new Error('Invalid validation type');
  }

  if (!isEmpty(value) && ![null, undefined].includes(preferredValue)) {
    let preferredValueMsg = {
      [fld]: msg.v_txt[0][fld] + ' is not valid.'
    };
    if (Array.isArray(preferredValue) && !preferredValue.includes(value)) {
      isValid = false;
      Obj = preferredValueMsg;
    } else if (!Array.isArray(preferredValue) && preferredValue !== value) {
      isValid = false;
      Obj = preferredValueMsg;
    }
  }

  if (isValid && ((validationInfo.hasOwnProperty('isRequired') && validationInfo.isRequired) || !validationInfo.hasOwnProperty('isRequired'))) {
    isValid = !isEmpty(value);
    if (!isValid) {
      Obj = {
        [fld]: msg.v_txt[0][fld] + ' is required.'
      };
    }
  }

  if (isValid && (validationInfo.hasOwnProperty('maxLength') && validationInfo.maxLength) && !isEmpty(value)) {
    if (value.toString().length > validationInfo.maxLength) {
      isValid = false;
      Obj = {
        [fld]: msg.v_txt[0][fld] + ' is above range.'
      };
    }
  }

  if (isValid && (validationInfo.hasOwnProperty('minValue') && validationInfo.minValue) && !isEmpty(value)) {
    if (value < validationInfo.minValue) {
      isValid = false;
      Obj = {
        [fld]: msg.v_txt[0][fld] + ' is below the minimum value.'
      };
    }
  }

  if (isValid && (validationInfo.hasOwnProperty('maxValue') && validationInfo.maxValue) && !isEmpty(value)) {
    if (value > validationInfo.maxValue) {
      isValid = false;
      Obj = {
        [fld]: msg.v_txt[0][fld] + ' is above the maximum value.'
      };
    }
  }

  if (isValid && (validationInfo.hasOwnProperty('keys') && validationInfo.keys) && !isEmpty(value)) {
    if (Array.isArray(value)) {
      for (let objVal of value) {
        if (isValid) {
          Object.keys(objVal).forEach((resp) => {
            if (!validationInfo.keys.includes(resp)) {
              isValid = false;
              Obj = {
                [fld]: msg.v_txt[0][fld] + ' has invalid keys.'
              };
            }
          });
        }
      }
    } else {
      Object.keys(value).forEach((resp) => {
        if (isValid) {
          if (!validationInfo.keys.includes(resp)) {
            isValid = false;
            Obj = {
              [fld]: msg.v_txt[0][fld] + ' has invalid keys.'
            };
          }
        }
      });
    }
  }
  if (isValid && (validationInfo.hasOwnProperty('objectFormat') && validationInfo.objectFormat) && !isEmpty(value)) {
    if (Array.isArray(value)) {
      for (let objVal of value) {
        if (Object.keys(objVal).length === 0) {
          isValid = false;
          Obj = {
            [fld]: msg.v_txt[0][fld] + ' has empty object.'
          };
          break;
        }
        for (let i = 0; i < validationInfo.objectFormat.length; i++) {
          if (objVal.hasOwnProperty(validationInfo.objectFormat[i].key)) {
            let validateObject = Object.assign({
              value: objVal[validationInfo.objectFormat[i].key]
            }, validationInfo.objectFormat[i].validation)
            let res = await validateData(validateObject);
            if (res.state == "FAILURE") {
              return (res);
            }
          } else if (validationInfo.objectFormat[i].validation.isRequired) {
            isValid = false;
            Obj = {
              [fld]: msg.v_txt[0][fld] + ' has invalid keys.'
            };
            break;
          }
        }
      }
    } else {
      for (let i = 0; i < validationInfo.objectFormat.length; i++) {
        if (value.hasOwnProperty(validationInfo.objectFormat[i].key)) {
          let validateObject = Object.assign({
            value: value[validationInfo.objectFormat[i].key]
          }, validationInfo.objectFormat[i].validation)
          let res = await validateData(validateObject);
          if (res.state == "FAILURE") {
            return (res);
          }
        } else if (validationInfo.objectFormat[i].validation.isRequired) {
          isValid = false;
          Obj = {
            [fld]: msg.v_txt[0][fld] + ' has invalid keys.'
          };
          break;
        }
      }

    }
  }


  if (isValid) {
    return {
      state: "SUCCESS"
    }
  } else if ((isEmpty(value) || isString(value) && isEmpty(value.trim())) && (defaultValue || typeof defaultValue === 'boolean' || defaultValue === 0)) {
    return {
      state: "DEFAULT",
      key: fld,
      value: defaultValue
    }
  } else {
    return {
      state: "FAILURE",
      errorObj: Obj
    }
  }
}

/**
 * checks if a value is a empty or not
 * @param {Array} validationArray array of ValidationInfo object.
 */
let processValidation = async (validationArray) => {
  if (!Array.isArray(validationArray)) {
    // this should not occur as these are manual entries.
    throw new Error('validation data must be in a array');
  }
  let validation;
  try {
    validation = await Q.allSettled(validationArray.map(data => validateData(data)));
  } catch (error) {
    throw (error);
  }

  let error = validation.filter(obj => obj.value.state == "FAILURE").map(obj => obj.value.errorObj);
  let replacements = validation.filter(obj => obj.value.state == "DEFAULT").map(obj => {
    return {
      key: obj.value.key,
      value: obj.value.value
    };
  });
  let result = {};
  if (error.length > 0) {
    result.error = error;
  }
  if (replacements.length > 0) {
    result.replacements = replacements;
  }
  return result;
}

/**
 * Exporting the modules
 */
module.exports = {
  processValidation,
  isEmail,
  isMobileNumber
}
