import React from "react";
import InputMask from 'react-input-mask';

export function onlyNumbers(text) {
  if (stringEmpty(text)) {
    return;
  }
  return text.replace(/\D/g, "");
}

export function formatCpf(text) {
  if (stringEmpty(text)) {
    return;
  }
  return text.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function formatCnpj(text) {
  if (stringEmpty(text)) {
    return;
  }
  return text.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

export function formatCpfCnpj(text) {
  if (stringEmpty(text)) {
    return;
  }
  if (text.length === 11) {
    return formatCpf(text);
  } else if (text.length === 14) {
    return formatCnpj(text);
  }
  return text;
}

export function formatPhone(text) {
  if (stringEmpty(text)) {
    return;
  }
  return text.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '$1($2)$3-$4');
}

export function formatBRLMoney(value) {
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

  return formattedValue;
}

export function stringNotEmpty(text) {
  return text !== undefined && text !== null && text !== '';
}

export function stringWithoutHTMLTags(text) {
  const regex = /(<([^>]+)>)/gi;
  const result = text.replace(regex, "");
  return result;
}

export function stringEmpty(text) {
  return !stringNotEmpty(text);
}

export const maskPhone = React.forwardRef((props, ref) => {
  return (
    <InputMask
      {...props}
      mask="99(99)9999-9999"
      ref={ref}
    />
  );
});

export const maskCEP = React.forwardRef((props, ref) => {
  return (
    <InputMask
      {...props}
      mask="99999-999"
      ref={ref}
    />
  );
});
