import squel from 'squel';
import { TABLES } from '../constants/tables';

const table = TABLES.USERS;
const columns = table.COLUMNS;

const squelPostgres = squel.useFlavour('postgres');

export function getSelectUserByEmailQuery(email) {
  return squel.select()
    .from(table.NAME)
    .where(`${columns.EMAIL} = '${email}'`)
    .toString();
}

export function getInsertUserQuery(user) {
  return squelPostgres.insert()
    .into(table.NAME)
    .setFields(user)
    .returning('*')
    .toString();
}
