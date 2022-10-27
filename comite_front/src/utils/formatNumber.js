import { replace } from 'lodash';
import numeral from 'numeral';

export const fCurrency = (number) => {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export const fPercent = (number) => {
  return numeral(number / 100).format('0.0%');
}

export const fNumber = (number) => {
  return numeral(number).format();
}

export const fShortenNumber = (number) => {
  return replace(numeral(number).format('0.00a'), '.00', '');
}

export const fData = (number) => {
  return numeral(number).format('0.0 b');
}
