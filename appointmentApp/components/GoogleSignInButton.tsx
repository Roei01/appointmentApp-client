import React from 'react';
import OAuthButton from './OAuthButton'; // ייבוא של קומפוננטת הכפתור הכללית

const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    // כאן נוסיף את הפעולה להתחברות עם Google
    alert('Google Sign-In clicked');
  };

  return (
    <OAuthButton
      text="Sign in with Google"
      iconSource={require('../assets/favicon.png')}
      onPress={handleGoogleSignIn}
    />
  );
};

export default GoogleSignInButton;
