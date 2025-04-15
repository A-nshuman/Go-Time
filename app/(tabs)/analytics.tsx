import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart3, Clock, Users, ShowerHead, Toilet } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useWashroomStore } from '@/store/washroom-store';

export default function AnalyticsScreen() {
  const { blocks } = useWashroomStore();
  
  // Calculate total occupancy stats
  const totalToilets = blocks.reduce((sum, block) => sum + block.totalToilets, 0);
  const occupiedToilets = blocks.reduce((sum, block) => sum + block.occupiedToilets, 0);
  const totalBathingAreas = blocks.reduce((sum, block) => sum + block.totalBathingAreas, 0);
  const occupiedBathingAreas = blocks.reduce((sum, block) => sum + block.occupiedBathingAreas, 0);
  
  const toiletOccupancyRate = Math.round((occupiedToilets / totalToilets) * 100);
  const bathingOccupancyRate = Math.round((occupiedBathingAreas / totalBathingAreas) * 100);
  
  // Mock data for peak hours
  const peakHours = [
    { time: '7:00 - 8:00 AM', occupancyRate: 85 },
    { time: '12:00 - 1:00 PM', occupancyRate: 70 },
    { time: '6:00 - 7:00 PM', occupancyRate: 90 },
  ];
  
  // Mock data for average wait times
  const averageWaitTimes = [
    { block: 'A Block', toilets: 5, bathing: 12 },
    { block: 'B Block', toilets: 4, bathing: 10 },
    { block: 'C Block', toilets: 6, bathing: 15 },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>Usage statistics and trends</Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Current Occupancy Stats */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <BarChart3 size={20} color={Colors.primary} />
            <Text style={styles.cardTitle}>Current Occupancy</Text>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Toilet size={18} color={Colors.primary} />
              </View>
              <Text style={styles.statLabel}>Toilets</Text>
              <Text style={styles.statValue}>{toiletOccupancyRate}%</Text>
              <Text style={styles.statSubtext}>{occupiedToilets}/{totalToilets} in use</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <ShowerHead size={18} color={Colors.primary} />
              </View>
              <Text style={styles.statLabel}>Bathing</Text>
              <Text style={styles.statValue}>{bathingOccupancyRate}%</Text>
              <Text style={styles.statSubtext}>{occupiedBathingAreas}/{totalBathingAreas} in use</Text>
            </View>
          </View>
        </View>
        
        {/* Peak Hours */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Clock size={20} color={Colors.primary} />
            <Text style={styles.cardTitle}>Peak Hours</Text>
          </View>
          
          {peakHours.map((peak, index) => (
            <View key={index} style={styles.peakHourItem}>
              <Text style={styles.peakHourTime}>{peak.time}</Text>
              <View style={styles.peakHourBarContainer}>
                <View 
                  style={[
                    styles.peakHourBar, 
                    { 
                      width: `${peak.occupancyRate}%`,
                      backgroundColor: peak.occupancyRate > 80 
                        ? Colors.occupied 
                        : peak.occupancyRate > 50 
                          ? Colors.warning 
                          : Colors.available
                    }
                  ]} 
                />
                <Text style={styles.peakHourPercentage}>{peak.occupancyRate}%</Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* Average Wait Times */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Users size={20} color={Colors.primary} />
            <Text style={styles.cardTitle}>Average Wait Times</Text>
          </View>
          
          <View style={styles.waitTimeHeader}>
            <Text style={[styles.waitTimeCell, styles.waitTimeHeaderText, { flex: 2 }]}>Block</Text>
            <Text style={[styles.waitTimeCell, styles.waitTimeHeaderText, { flex: 1 }]}>Toilets</Text>
            <Text style={[styles.waitTimeCell, styles.waitTimeHeaderText, { flex: 1 }]}>Bathing</Text>
          </View>
          
          {averageWaitTimes.map((item, index) => (
            <View key={index} style={styles.waitTimeRow}>
              <Text style={[styles.waitTimeCell, { flex: 2 }]}>{item.block}</Text>
              <Text style={[styles.waitTimeCell, { flex: 1 }]}>{item.toilets} min</Text>
              <Text style={[styles.waitTimeCell, { flex: 1 }]}>{item.bathing} min</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            * Analytics data is based on historical usage patterns and may not reflect current conditions.
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.background,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statSubtext: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  peakHourItem: {
    marginBottom: 12,
  },
  peakHourTime: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  peakHourBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
  },
  peakHourBar: {
    height: '100%',
    borderRadius: 4,
  },
  peakHourPercentage: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  waitTimeHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 8,
    marginBottom: 8,
  },
  waitTimeHeaderText: {
    fontWeight: '600',
    color: Colors.text,
  },
  waitTimeRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border + '50',
  },
  waitTimeCell: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  disclaimer: {
    marginTop: 8,
    marginBottom: 24,
  },
  disclaimerText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
});