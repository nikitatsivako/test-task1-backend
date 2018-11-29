import { TABLES } from '../../constants/tables';
import { isValidEmail } from './index';
import { isEmpty } from 'lodash';

const columns = TABLES.USERS.COLUMNS;

export function isValidAuthData(logInData) {
  const result = {};

  if(!isValidEmail(logInData[columns.EMAIL]) ) {
    result[columns.EMAIL] = 'Wrong email';
  }

  if(!logInData[columns.PASSWORD]) {
    result[columns.PASSWORD] = 'Wrong password';
  }

  return isEmpty(result) ? null : result;
}
