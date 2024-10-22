import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

type OAuthButtonProps = {
  text: string;
  iconSource: any; // מקור התמונה לאייקון
  onPress: () => void; // פונקציה שתתבצע בלחיצה
};

const OAuthButton: React.FC<OAuthButtonProps> = ({ text, iconSource, onPress }) => {
  return (
    <TouchableOpacity style={styles.oauthButton} onPress={onPress}>
      <Image source={iconSource} style={styles.oauthIcon} />
      <Text style={styles.oauthButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default OAuthButton;
