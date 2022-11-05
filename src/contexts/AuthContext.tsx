import {
  createContext, ReactNode, useEffect, useState,
} from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
  isUserLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [isUserLoading, setUserLoading] = useState(false);

  const [req, res, promptAsync] = Google.useAuthRequest({
    clientId: '150446280113-jji0bt7bb4nr480tg0qv3cu2rg2abe22.apps.googleusercontent.co m',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  });

  async function signIn() {
    try {
      setUserLoading(true);
      await promptAsync();
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      setUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    console.log('token de Auth', access_token);
  }

  useEffect(() => {
    if (res?.type === 'success' && res.authentication?.accessToken) {
      signInWithGoogle(res.authentication.accessToken);
    }
  }, [res]);

  return (
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
