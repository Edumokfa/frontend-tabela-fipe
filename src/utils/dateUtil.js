const stringUtil = require("./stringUtil");

const formatDateDDMMYYYY = (date) => {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

const formatDateTimeYYYYMMDDHHMMSS = (dataString) => {
  const data = new Date(dataString);

  const ano = String(data.getFullYear());
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');

  const horas = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');
  const segundos = String(data.getSeconds()).padStart(2, '0');

  return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
};

const newDate = (date) => {
  return new Date(date + "T00:00:00");
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
  newDate,
  formatDateTimeYYYYMMDDHHMMSS
};