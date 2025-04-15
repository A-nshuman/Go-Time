import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Clock, Cpu, ShowerHead, Toilet, Users } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function ModalScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Clock size={48} color={Colors.primary} />
          </View>
          <Text style={styles.logoText}>GoTime</Text>
          <Text style={styles.tagline}>Washroom Occupancy System</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the App</Text>
          <Text style={styles.paragraph}>
            GoTime is a real-time washroom occupancy monitoring system designed to help users find available toilets and bathing facilities across multiple blocks of the hostels.
          </Text>
          <Text style={styles.paragraph}>
            The app displays live occupancy data, and usage analytics to improve your washroom experience.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Cpu size={24} color={Colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Smart Sensors</Text>
              <Text style={styles.featureDescription}>
                Door-mounted sensors detect when facilities are locked or unlocked, providing real-time occupancy data.
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Clock size={24} color={Colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Wait Time Estimation</Text>
              <Text style={styles.featureDescription}>
                The app calculates estimated wait times based on historical usage patterns and current occupancy.
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Users size={24} color={Colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Usage Analytics</Text>
              <Text style={styles.featureDescription}>
                View peak usage hours and trends to plan your visits during less busy times.
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Facilities Monitored</Text>
          
          <View style={styles.facilitiesContainer}>
            <View style={styles.facilityBox}>
              <Toilet size={24} color={Colors.primary} />
              <Text style={styles.facilityTitle}>36 Toilets</Text>
              <Text style={styles.facilitySubtitle}>Across 3 blocks</Text>
            </View>
            
            <View style={styles.facilityBox}>
              <ShowerHead size={24} color={Colors.primary} />
              <Text style={styles.facilityTitle}>36 Showers</Text>
              <Text style={styles.facilitySubtitle}>Across 3 blocks</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            GoTime v1.0.0
          </Text>
          <Text style={styles.copyright}>
            © 2025 GoTime
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.primaryLight + '30',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
  },
  tagline: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  facilitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  facilityBox: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  facilityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  facilitySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
    paddingBottom: 16,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  copyright: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});