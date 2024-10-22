import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';

const HomeScreen = () => {
  const [balance, setBalance] = useState(244.0);

  // רשימת מעקבים
  const trackingData = [
    { id: '1', trackingNumber: '#412-639-JTO', from: 'Yogyakarta', to: 'Jakarta (EST)', date: '18 Dec 2023 - 22 Dec 2023', status: 'Transit' },
    { id: '2', trackingNumber: '#832-091-HQO', from: 'Bali', to: 'Bandung', date: '20 Dec 2023 - 24 Dec 2023', status: 'Created' },
  ];

  const renderTrackingItem = ({ item }) => (
    <View style={styles.trackingCard}>
      <Text style={styles.trackingNumber}>{item.trackingNumber}</Text>
      <View style={styles.trackingDetails}>
        <Text style={styles.trackingStatus}>{item.status}</Text>
        <Text>{item.from} ➡️ {item.to}</Text>
        <Text style={styles.trackingDate}>{item.date}</Text>
      </View>
      <Image source={require('../assets/Profile.jpg')} style={styles.packageImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* תצוגת פרופיל */}
      <View style={styles.profileSection}>
        <Image source={require('../assets/Profile.jpg')} style={styles.profileImage} />
        <View>
          <Text style={styles.profileName}>Sri Julaekha</Text>
          <Text style={styles.profileLocation}>Jakarta, ID</Text>
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <Image source={require('../assets/Notification.jpg')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* תצוגת יתרה */}
      <View style={styles.balanceSection}>
        <View style={styles.balanceInfo}>
          <Text style={styles.balanceLabel}>Your balance</Text>
          <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.topUpButton}>
          <Text style={styles.topUpText}>Top up</Text>
        </TouchableOpacity>
      </View>

      {/* כפתורים לפעולות */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Image source={require('../assets/Profile.jpg')} style={styles.actionIcon} />
          <Text style={styles.actionButtonText}>New track</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Image source={require('../assets/Profile.jpg')} style={styles.actionIcon} />
          <Text style={styles.actionButtonText}>Order us</Text>
        </TouchableOpacity>
      </View>

      {/* חיפוש */}
      <View style={styles.searchSection}>
        <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#888" />
      </View>

      {/* רשימת מעקבים */}
      <Text style={styles.sectionTitle}>Current tracking</Text>
      <FlatList
        data={trackingData}
        renderItem={renderTrackingItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 29,
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileLocation: {
    fontSize: 14,
    color: '#888',
  },
  notificationIcon: {
    marginLeft: 'auto',
  },
  icon: {
    width: 24,
    height: 24,
  },
  balanceSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceInfo: {
    flexDirection: 'column',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#888',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  topUpButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 10,
  },
  topUpText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  actionButtonText: {
    fontWeight: 'bold',
  },
  searchSection: {
    backgroundColor: '#ececec',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchInput: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  trackingCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackingNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackingDetails: {
    flex: 1,
    marginLeft: 10,
  },
  trackingStatus: {
    fontSize: 14,
    color: '#1E90FF',
    marginBottom: 5,
  },
  trackingDate: {
    color: '#888',
  },
  packageImage: {
    width: 50,
    height: 50,
  },
});

export default HomeScreen;
