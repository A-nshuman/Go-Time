import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { useWashroomStore } from '@/store/washroom-store';
import OccupancySummary from '@/components/OccupancySummary';
import FloorCard from '@/components/FloorCard';
import RefreshTimer from '@/components/RefreshTimer';

export default function BlockDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { blocks, lastUpdated, isLoading, refreshData } = useWashroomStore();
  const [block, setBlock] = useState(blocks.find(b => b.id === id));

  useEffect(() => {
    const foundBlock = blocks.find(b => b.id === id);
    if (foundBlock) {
      setBlock(foundBlock);
    }
  }, [id, blocks]);

  if (!block) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Block not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Stack.Screen options={{ title: block.name }} />
      
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
          totalToilets={block.totalToilets}
          occupiedToilets={block.occupiedToilets}
          totalBathingAreas={block.totalBathingAreas}
          occupiedBathingAreas={block.occupiedBathingAreas}
        />
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Floors</Text>
          <RefreshTimer lastUpdated={lastUpdated} onRefreshNeeded={refreshData} />
        </View>
        
        {block.floors.map(floor => (
          <FloorCard key={floor.id} floor={floor} blockId={block.id} />
        ))}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Select a floor to view detailed occupancy
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