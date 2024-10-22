import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { RootStackParamList } from '../types';
import { loginUser } from '../services/login';

WebBrowser.maybeCompleteAuthSession();

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // הגדרת Google Sign-In
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '<YOUR_EXPO_CLIENT_ID>',
    iosClientId: '<YOUR_IOS_CLIENT_ID>',
    androidClientId: '<YOUR_ANDROID_CLIENT_ID>',
    webClientId: '<YOUR_WEB_CLIENT_ID>',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      handleGoogleSignIn(authentication.accessToken);
    }
  }, [response]);

  const handleGoogleSignIn = async (accessToken: string) => {
    try {
      await AsyncStorage.setItem('googleAccessToken', accessToken);
      Alert.alert('Success', 'Login with Google successful!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Failed to login with Google');
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const data = await loginUser(email, password);
      if (data.success) {
        await AsyncStorage.setItem('jwtToken', data.token);
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong, please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>To get started, sign in to your account.</Text>

      {/* כפתור התחברות עם Google */}
      <TouchableOpacity
        style={styles.oauthButton}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Image source={require('../assets/favicon.png')} style={styles.oauthIcon} />
        <Text style={styles.oauthButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      {/* כפתור התחברות עם Apple */}
      <TouchableOpacity style={styles.oauthButton}>
        <Image source={require('../assets/favicon.png')} style={styles.oauthIcon} />
        <Text style={styles.oauthButtonText}>Sign in with Apple</Text>
      </TouchableOpacity>

      <Text style={styles.dividerText}>Or sign in with</Text>

      <TextInput
        placeholder="Enter your email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity onPress={() => alert('Forgot Password?')}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? <Text style={styles.linkText}>Sign up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  oauthIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  oauthButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  dividerText: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 15,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#1E90FF',
    textAlign: 'right',
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#555',
    fontSize: 16,
  },
  linkText: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
