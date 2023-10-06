import { types } from '../reducers/types';

const AuthService = {
  isAuthenticated: false,
};
const auth = (store) => (next) => (action) => {
  switch (action.type) {
    case types.login:
      AuthService.isAuthenticated = true;
      break;

    case types.logout:
      AuthService.isAuthenticated = false;
      break;

    case types.succes:
      console.log('Success!');
      break;

    default:
      return next(action);
  }
};

export default auth;
