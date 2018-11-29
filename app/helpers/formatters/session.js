import { TABLES } from '../../constants/tables';
import { isString } from 'lodash';

const columns = TABLES.USERS.COLUMNS;

export function formatAuthData(rawLogInData) {
    return {
        [columns.EMAIL]: isString(rawLogInData[columns.EMAIL]) && rawLogInData[columns.EMAIL].toLowerCase(),
        [columns.PASSWORD]: rawLogInData[columns.PASSWORD],
    };
}
