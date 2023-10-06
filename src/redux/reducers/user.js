import { types } from './types';

const init_state = {
  id: null,
  fullname: '',
  email: '',
  password: '',
  referralCode: '',
  credit: 0,
  referralCodeFromFriend: '',
};

export const userReducer = (state = init_state, action) => {
  if (action.type === types.login) {
    return {
      ...state,
      id: action.payload.id,
      fullname: action.payload.fullname,
      email: action.payload.email,
      credit: action.payload.credit,
      referralCode: action.payload.referralCode,
      password: action.payload.password,
      referralCodeFromFriend: action.payload.referralCodeFromFriend,
    };
  } else if (action.type === types.logout) {
    return init_state;
  }
  return state;
};
