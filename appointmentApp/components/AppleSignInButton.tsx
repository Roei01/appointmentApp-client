import React from 'react';
import OAuthButton from './OAuthButton'; // ייבוא של קומפוננטת הכפתור הכללית

const AppleSignInButton = () => {
  const handleAppleSignIn = () => {
    // כאן נוסיף את הפעולה להתחברות עם Apple
    alert('Apple Sign-In clicked');
  };

  return (
    <OAuthButton
      text="Sign in with Apple"
      iconSource={require('../assets/splash.png')}
      onPress={handleAppleSignIn}
    />
  );
};

export default AppleSignInButton;
