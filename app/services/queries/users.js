import { oneOrNone } from '../../db/index';
import {
  getSelectUserByEmailQuery,
  getInsertUserQuery,
} from '../../sql-queries/users';


export function getUserByEmail(email) {
  return oneOrNone(
    getSelectUserByEmailQuery(email),
  );
}

export function addUser(user) {
  return oneOrNone(
    getInsertUserQuery(user),
  );
}
