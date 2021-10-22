// Errors Array
let errors = [];
class FieldValidation {
  // Validation

  // Email validation
  email(email) {
    if (!email || typeof email == undefined || email == null) {
      errors.push({ message: "É obrigatório o uso de um email" });
    }
  }

  // Name validation
  name(name) {
    if (!name || typeof name == undefined || name == null) {
      errors.push({ message: "É obrigatório o uso de um nome" });
    }
  }

  // Name validation
  cpf(cpf) {
    if (!cpf || typeof cpf == undefined || cpf == null) {
      errors.push({ message: "É obrigatório o uso de um CPF" });
    }

    if (!isNumber(cpf) || !validCPF(cpf)) {
      errors.push({ message: "CPF Inválido" });
    }
  }

  // Return errors
  errors() {
    return errors;
  }

  // Clean errors
  clean() {
    errors = [];
  }

  // Verify if all is valid
  valid() {
    if (errors.length) {
      return true;
    } else {
      return false;
    }
  }
}

// CPF validation
function validCPF(strCPF) {
  var sum;
  var rest;
  sum = 0;
  if (strCPF == "00000000000") return false;

  for (i = 1; i <= 9; i++)
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(strCPF.substring(9, 10))) return false;

  sum = 0;
  for (i = 1; i <= 10; i++)
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(strCPF.substring(10, 11))) return false;
  return true;
}

// Validates if string has only numbers
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = FieldValidation;
