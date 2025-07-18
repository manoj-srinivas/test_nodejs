'use strict';

var convertBase = (() => {

  var ConvertBase = (num) => {
    return {
      from: (baseFrom) => {
        return {
          to: (baseTo) => {
            return parseInt(num, baseFrom).toString(baseTo);
          }
        };
      }
    };
  };

  // binary to decimal
  ConvertBase.bin2dec = (num) => {
    return ConvertBase(num).from(2).to(10);
  };

  // binary to hexadecimal
  ConvertBase.bin2hex = (num) => {
    return ConvertBase(num).from(2).to(16);
  };

  // decimal to binary
  ConvertBase.dec2bin = (num) => {
    return ConvertBase(num).from(10).to(2);
  };

  // decimal to hexadecimal
  ConvertBase.dec2hex = (num) => {
    return ConvertBase(num).from(10).to(16);
  };

  // hexadecimal to binary
  ConvertBase.hex2bin = (num) => {
    return (ConvertBase(num).from(16).to(2)).padStart(8, '0');
  };

  // hexadecimal to decimal
  ConvertBase.hex2dec = (num) => {
    return ConvertBase(num).from(16).to(10).padStart((num).length, '0');
  };
  return ConvertBase;
})();

module.exports = convertBase;
