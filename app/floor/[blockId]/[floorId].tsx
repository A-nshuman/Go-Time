import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { useWashroomStore } from '@/store/washroom-store';
import OccupancySummary from '@/components/OccupancySummary';
import FacilityItem from '@/components/FacilityItem';
import RefreshTimer from '@/components/RefreshTimer';

export default function FloorDetailScreen() {
  const { blockId, floorId } = useLocalSearchParams<{ blockId: string; floorId: string }>();
  const { blocks, lastUpdated, isLoading, refreshData } = useWashroomStore();
  
  const block = blocks.find(b => b.id === blockId);
  const floor = block?.floors.find(f => f.id === floorId);
  
  const [blockName, setBlockName] = useState(block?.name || '');
  const [floorName, setFloorName] = useState(floor?.name || '');

  useEffect(() => {
    if (block && floor) {
      setBlockName(block.name);
      setFloorName(floor.name);
    }
  }, [blockId, floorId, blocks]);

  if (!block || !floor) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Floor not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Stack.Screen options={{ title: `${blockName} - ${floorName}` }} />
      
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
          totalToilets={floor.totalToilets}
          occupiedToilets={floor.occupiedToilets}
          totalBathingAreas={floor.totalBathingAreas}
          occupiedBathingAreas={floor.occupiedBathingAreas}
        />
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Toilets</Text>
          <RefreshTimer lastUpdated={lastUpdated} onRefreshNeeded={refreshData} />
        </View>
        
        <View style={styles.facilitiesGrid}>
          {floor.toilets.map((toilet, index) => (
            <View key={toilet.id} style={styles.facilityItemContainer}>
              <FacilityItem
                id={toilet.id}
                type="toilet"
                number={index + 1}
                isOccupied={toilet.isOccupied}
                occupiedSince={toilet.occupiedSince}
                estimatedWaitTime={toilet.estimatedWaitTime}
              />
            </View>
          ))}
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bathing Areas</Text>
        </View>
        
        <View style={styles.facilitiesGrid}>
          {floor.bathingAreas.map((bathingArea, index) => (
            <View key={bathingArea.id} style={styles.facilityItemContainer}>
              <FacilityItem
                id={bathingArea.id}
                type="bathing"
                number={index + 1}
                isOccupied={bathingArea.isOccupied}
                occupiedSince={bathingArea.occupiedSince}
                estimatedWaitTime={bathingArea.estimatedWaitTime}
              />
            </View>
          ))}
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Data is updated in real-time based on door lock signals
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
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  facilityItemContainer: {
    width: '50%',
    paddingHorizontal: 4,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});