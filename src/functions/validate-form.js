
export const validateForm = function(formObject) {

  let formValid = true;
  let emptyFields = [];

  Object.keys(formObject).forEach(field => {
    if (!formObject[field].valid) {
      formValid = false;
    } else if (formObject[field].value === '') {
      formValid = false;
      emptyFields.push(field)
    }
  })

  return {
    formValid: formValid,
    emptyFields: emptyFields
  }
}
