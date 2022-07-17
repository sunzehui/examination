export interface UserLoginResult {
  userInfo: {
    username: string;
  };
  token: {
    value: string;
    expires: any;
  };
}

export interface UserRegisterResult {
  username: string;
  id: number;
  create_time: number;
}
