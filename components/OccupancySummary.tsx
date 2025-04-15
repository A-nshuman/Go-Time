import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'lucide-react-native';
import Colors from '@/constants/colors';

type OccupancySummaryProps = {
  totalToilets: number;
  occupiedToilets: number;
  totalBathingAreas: number;
  occupiedBathingAreas: number;
};

export const OccupancySummary: React.FC<OccupancySummaryProps> = ({
  totalToilets,
  occupiedToilets,
  totalBathingAreas,
  occupiedBathingAreas,
}) => {
  const totalFacilities = totalToilets + totalBathingAreas;
  const totalOccupied = occupiedToilets + occupiedBathingAreas;
  const occupancyPercentage = Math.round((totalOccupied / totalFacilities) * 100);

  const getStatusColor = (percentage: number) => {
    if (percentage >= 80) return Colors.occupied;
    if (percentage >= 50) return Colors.warning;
    return Colors.available;
  };

  const statusColor = getStatusColor(occupancyPercentage);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PieChart size={20} color={Colors.primary} />
        <Text style={styles.title}>Current Occupancy</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.percentageContainer}>
          <Text style={[styles.percentageText, { color: statusColor }]}>
            {occupancyPercentage}%
          </Text>
          <Text style={styles.occupiedText}>
            {totalOccupied} of {totalFacilities} occupied
          </Text>
        </View>
        
        <View style={styles.barContainer}>
          <View style={styles.barBackground}>
            <View 
              style={[
                styles.barFill, 
                { 
                  width: `${occupancyPercentage}%`,
                  backgroundColor: statusColor
                }
              ]} 
            />
          </View>
          
          <View style={styles.facilityBreakdown}>
            <Text style={styles.breakdownText}>
              Toilets: <Text style={{ fontWeight: '600' }}>{occupiedToilets}/{totalToilets}</Text>
            </Text>
            <Text style={styles.breakdownText}>
              Bathing: <Text style={{ fontWeight: '600' }}>{occupiedBathingAreas}/{totalBathingAreas}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentageContainer: {
    width: 100,
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  occupiedText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  barContainer: {
    flex: 1,
    marginLeft: 16,
  },
  barBackground: {
    height: 12,
    backgroundColor: Colors.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
  },
  facilityBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  breakdownText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});

export default OccupancySummary;