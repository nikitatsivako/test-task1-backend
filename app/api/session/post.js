import { TABLES } from '../../constants/tables';
import { success, reject } from '../index';
import { getUserByEmail, addUser } from '../../services/queries/users';
import { encryptPassword} from '../../services/crypt';
import { getTokenForUser } from '../../services/token';
import { isValidAuthData } from '../../helpers/validators/session';
import { formatAuthData } from '../../helpers/formatters/session';

export async function signIn(req, res) {
  try {
    const columns = TABLES.USERS.COLUMNS;

    const data = formatAuthData(req.body.data);

    const logInDataValidationInfo = isValidAuthData(data);
    if(logInDataValidationInfo) {
      return reject(res, 'Invalid data for login', logInDataValidationInfo);
    }

    const user = await getUserByEmail(data[columns.EMAIL]);
    if (!user) {
      return reject(res, 'User doesn\'t exist', {
        [columns.EMAIL]: data[columns.EMAIL]
      });
    }

    const { encryptedPassword } = await encryptPassword(data[columns.PASSWORD], user[columns.KEY]);


    if (user[columns.PASSWORD] !== encryptedPassword) {
      return reject(res, 'Wrong password');
    }

    const token = await getTokenForUser(user);

    return success(res, { token });
  } catch (error) {
    console.log(error);
    return reject(res, 'Login error');
  }
}

export async function signUp(req, res) {
  try {
    const columns = TABLES.USERS.COLUMNS;
    console.log('req.body.data', req.body.data);
    let data = formatAuthData(req.body.data);

    const logInDataValidationInfo = isValidAuthData(data);
    if(logInDataValidationInfo) {
      return reject(res, 'Invalid data for sign up', logInDataValidationInfo);
    }

    const user = await getUserByEmail(data[columns.EMAIL]);
    if (user) {
      return reject(res, 'User already created', {
        [columns.EMAIL]: data[columns.EMAIL]
      });
    }

    // const { encryptedPassword } = await encryptPassword(data[columns.PASSWORD], user[columns.KEY]);
    // data[columns.PASSWORD] =  encryptedPassword;

    await addUser(data);

    const token = await getTokenForUser(user);

    return success(res, { token });
  } catch (error) {
    console.log(error);
    return reject(res, 'Register error');
  }
}
