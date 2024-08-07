import { createContext, useEffect, useReducer, ReactElement } from 'react';

// third-party
import { Chance } from 'chance';
// import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// project-imports
import Loader from 'components/Loader';
// import { KeyedObject } from 'types/root';
import { AuthProps, JWTContextType } from 'types/auth';
import { UserProfile } from 'types/user-profile';
import api from 'services/api';
// import { UserJWTAPI } from 'types/UserJWTAPI';

const chance = new Chance();

// constant
const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
  return true; // TODO Remover ao integrar com API
  // if (!serviceToken) {
  //   return false;
  // }
  // const decoded: KeyedObject = jwtDecode(serviceToken);

  // /**
  //  * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
  //  */
  // return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    api.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete api.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = localStorage.getItem('serviceToken');
        console.log(serviceToken);
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          // const dataJWT: UserJWTAPI = jwtDecode(serviceToken);
          // const user: UserProfile = {
          //   id: dataJWT.userId,
          //   name: dataJWT.userName,
          //   email: dataJWT.userEmail,
          //   profileId: dataJWT.roleId,
          //   profileName: dataJWT.roleName,
          //   avatar: dataJWT.avatar ?? dataJWT.userName,
          //   customerId: dataJWT.customerId,
          //   customerName: dataJWT.customerName
          // };

          // TODO: Remover ao integrar com API
          const user: UserProfile = {
            id: '123',
            name: 'Admin',
            email: 'admin@email.com',
            profileId: 1,
            profileName: 'Administrador',
            avatar: ''
          };

          // user.avatar = `${process.env.REACT_APP_API_URL}/${user.avatar}`;
          console.log('Teste');
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          console.log('Teste 2');
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.log('Teste 3');
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    // const response = await api.post('/auth/login', { email, password });
    // const { access_token } = response.data;
    // const serviceToken = access_token;
    // const dataJWT: UserJWTAPI = jwtDecode(access_token);
    // const user: UserProfile = {
    //   id: dataJWT.userId,
    //   name: dataJWT.userName,
    //   email: dataJWT.userEmail,
    //   profileId: dataJWT.roleId,
    //   profileName: dataJWT.roleName,
    //   avatar: dataJWT.avatar ?? dataJWT.userName,
    //   customerId: dataJWT.customerId,
    //   customerName: dataJWT.customerName
    // };

    const serviceToken = '12345token';
    const user: UserProfile = {
      id: '12345',
      name: 'Admin',
      email: 'admin@email.com',
      profileId: 1,
      profileName: 'Administrador',
      avatar: ''
    };

    user.avatar = `${process.env.REACT_APP_API_URL}/${user.avatar}`;

    setSession(serviceToken);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = await api.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers!),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async (email: string) => {};

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
