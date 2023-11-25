const stringUtil = require("./stringUtil");

const formatDateDDMMYYYY = (date) => {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

const newDate = (date) => {
  return new Date(date + "T00:00:00");
}

const formatDateYYYYMMDD = (date) => {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  return `${ano}-${mes}-${dia}`;
}

const formatDate = (date) => {
  return [
    date.getFullYear(),
    stringUtil.padTo2Digits(date.getMonth() + 1),
    stringUtil.padTo2Digits(date.getDate()),
  ].join('-');
}

module.exports = {
  formatDateDDMMYYYY,
  formatDate,
  formatDateYYYYMMDD,
  newDate
};