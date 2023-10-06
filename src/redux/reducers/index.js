import auth from '../middleware/auth';
import { userReducer } from './user';

export const reducers = {
  auth: userReducer,
  protection: auth,
};
