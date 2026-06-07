import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  adminView: 'admin' | 'student' | 'lecturer';
  setAdminView: (view: 'admin' | 'student' | 'lecturer') => void;
  signIn: (email: string, password: string, rememberMe: boolean) => Promise<{ success: boolean; message: string }>;
  signUp: (data: any) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  switchUserRole: (role: 'student' | 'lecturer') => void;
  registerBiometrics: () => Promise<void>;
  signInWithBiometrics: (email: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminView, setAdminViewInternal] = useState<'admin' | 'student' | 'lecturer'>(() => {
    return (localStorage.getItem('smartlearn_admin_view') as 'admin' | 'student' | 'lecturer') || 'admin';
  });

  const setAdminView = (view: 'admin' | 'student' | 'lecturer') => {
    setAdminViewInternal(view);
    localStorage.setItem('smartlearn_admin_view', view);
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
        
        const response = await axios.get('/api/auth/session');
        if (response.data?.user) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.warn('Session verification failed.');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, []);

  const signIn = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const response = await axios.post('/api/auth/signin', { email, password, rememberMe });
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      const loggedUser: User = response.data.user;
      setUser(loggedUser);
      localStorage.setItem('smartlearn_user', JSON.stringify(loggedUser));
      return { success: true, message: response.data.message || 'Logged in!' };
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Authentication failed.');
    }
  };

  const signUp = async (data: any) => {
    try {
      const response = await axios.post('/api/auth/signup', data);
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      const loggedUser: User = response.data.user;
      setUser(loggedUser);
      localStorage.setItem('smartlearn_user', JSON.stringify(loggedUser));
      return { success: true, message: response.data.message || 'Account created!' };
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Registration failed.');
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (err) {
      console.warn('Logout endpoint offline.');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('smartlearn_user');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  const switchUserRole = (role: 'student' | 'lecturer') => {
    localStorage.setItem('preferred_email', role === 'student' ? 'student@smartlearn.edu' : 'lecturer@smartlearn.edu');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('smartlearn_user');
    delete axios.defaults.headers.common['Authorization'];
  };

  const registerBiometrics = async () => {
    if (!user) throw new Error('You must be signed in to enroll biometric keys.');
    
    try {
      // 1. Get challenge
      const optRes = await axios.post('/api/auth/biometrics/register-options');
      const { challenge } = optRes.data;
      
      // 2. Generate RSA Key Pair
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: 'RSASSA-PKCS1-v1_5',
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: { name: 'SHA-256' }
        },
        true,
        ['sign', 'verify']
      );
      
      // 3. Export public key in spki format
      const publicKeyBuffer = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
      const publicKeyBase64 = btoa(String.fromCharCode(...new Uint8Array(publicKeyBuffer)));
      
      // 4. Save private key in LocalStorage as JWK
      const privateKeyJwk = await window.crypto.subtle.exportKey('jwk', keyPair.privateKey);
      const keyId = `smartlearn_bio_${user.id}`;
      localStorage.setItem(keyId, JSON.stringify(privateKeyJwk));
      
      // 5. Sign the challenge
      const encoder = new TextEncoder();
      const signatureBuffer = await window.crypto.subtle.sign(
        { name: 'RSASSA-PKCS1-v1_5' },
        keyPair.privateKey,
        encoder.encode(challenge)
      );
      const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));
      
      // 6. Verify with backend
      await axios.post('/api/auth/biometrics/register-verify', {
        publicKey: publicKeyBase64,
        signature: signatureBase64,
        keyId
      });
    } catch (err: any) {
      throw new Error(err.response?.data?.message || err.message || 'Biometric key enrollment failed.');
    }
  };

  const signInWithBiometrics = async (email: string) => {
    if (!email) throw new Error('Please specify your account email address first.');
    
    try {
      // 1. Fetch challenge and keyId
      const optRes = await axios.post('/api/auth/biometrics/login-options', { email });
      const { challenge, keyId } = optRes.data;
      
      // 2. Retrieve local private key
      const privateKeyJwkJson = localStorage.getItem(keyId);
      if (!privateKeyJwkJson) {
        throw new Error('Biometric credentials for this account were not found on this device.');
      }
      const privateKeyJwk = JSON.parse(privateKeyJwkJson);
      
      // 3. Import private key
      const privateKey = await window.crypto.subtle.importKey(
        'jwk',
        privateKeyJwk,
        {
          name: 'RSASSA-PKCS1-v1_5',
          hash: { name: 'SHA-256' }
        },
        true,
        ['sign']
      );
      
      // 4. Sign challenge
      const encoder = new TextEncoder();
      const signatureBuffer = await window.crypto.subtle.sign(
        { name: 'RSASSA-PKCS1-v1_5' },
        privateKey,
        encoder.encode(challenge)
      );
      const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));
      
      // 5. Send to verify
      const response = await axios.post('/api/auth/biometrics/login-verify', {
        email,
        signature: signatureBase64
      });
      
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      const loggedUser: User = response.data.user;
      setUser(loggedUser);
      localStorage.setItem('smartlearn_user', JSON.stringify(loggedUser));
      return { success: true, message: response.data.message || 'Logged in!' };
    } catch (err: any) {
      throw new Error(err.response?.data?.message || err.message || 'Biometric login failed.');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      adminView, 
      setAdminView, 
      signIn, 
      signUp, 
      logout, 
      switchUserRole,
      registerBiometrics,
      signInWithBiometrics
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside an AuthProvider');
  return context;
};
