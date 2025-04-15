import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { Clock } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useWashroomStore } from '@/store/washroom-store';
import BlockCard from '@/components/BlockCard';
import OccupancySummary from '@/components/OccupancySummary';
import RefreshTimer from '@/components/RefreshTimer';

export default function HomeScreen() {
  const { blocks, lastUpdated, isLoading, fetchStatus, refreshData, simulateOccupancyChange } = useWashroomStore();

  // Fetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchStatus();
      
      // Simulate real-time updates
      const intervalId = setInterval(() => {
        simulateOccupancyChange();
      }, 15000); // Every 15 seconds
      
      return () => clearInterval(intervalId);
    }, [])
  );

  // Calculate total occupancy stats
  const totalToilets = blocks.reduce((sum, block) => sum + block.totalToilets, 0);
  const occupiedToilets = blocks.reduce((sum, block) => sum + block.occupiedToilets, 0);
  const totalBathingAreas = blocks.reduce((sum, block) => sum + block.totalBathingAreas, 0);
  const occupiedBathingAreas = blocks.reduce((sum, block) => sum + block.occupiedBathingAreas, 0);

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.header}>
        <Text style={styles.title}>GoTime</Text>
        <Text style={styles.subtitle}>Washroom Occupancy System</Text>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshData}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
      >
        <OccupancySummary
          totalToilets={totalToilets}
          occupiedToilets={occupiedToilets}
          totalBathingAreas={totalBathingAreas}
          occupiedBathingAreas={occupiedBathingAreas}
        />
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Blocks</Text>
          <RefreshTimer lastUpdated={lastUpdated} onRefreshNeeded={refreshData} />
        </View>
        
        {blocks.map(block => (
          <BlockCard key={block.id} block={block} />
        ))}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Pull down to refresh
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});