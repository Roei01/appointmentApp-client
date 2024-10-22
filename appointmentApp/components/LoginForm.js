import React from 'react';
import { TextInput, TouchableOpacity, Text } from 'react-native';

const LoginForm = ({ email, password, setEmail, setPassword, handleLogin, loginWithEmailOnly, styles }) => {
  return (
    <>
      {/* שדה עבור מייל */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
      />

      {/* הצגת שדה סיסמה רק אם המשתמש לא בחר התחברות עם מייל בלבד */}
      {!loginWithEmailOnly && (
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />
      )}

      {/* כפתור התחברות */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </>
  );
};

export default LoginForm;
