import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock, Toilet, ShowerHead } from 'lucide-react-native';
import Colors from '@/constants/colors';
import StatusIndicator from './StatusIndicator';

type FacilityItemProps = {
  id: string;
  type: 'toilet' | 'bathing';
  number: number;
  isOccupied: boolean;
  occupiedSince?: number;
  estimatedWaitTime?: number;
};

export const FacilityItem: React.FC<FacilityItemProps> = ({
  id,
  type,
  number,
  isOccupied,
  occupiedSince,
  estimatedWaitTime,
}) => {
  const getOccupiedDuration = () => {
    if (!occupiedSince) return null;
    
    const now = Date.now();
    const durationMs = now - occupiedSince;
    const minutes = Math.floor(durationMs / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute';
    return `${minutes} minutes`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{number}</Text>
        <Text style={styles.title}>
          {type === 'toilet' ? <Toilet size={20} color={Colors.primary} /> : <ShowerHead size={20} color={Colors.primary} />}
        </Text>
        <StatusIndicator isOccupied={isOccupied} size="small" />
      </View>
      
      {/* {isOccupied && (
        <View style={styles.infoContainer}>
          {occupiedSince && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Occupied for:</Text>
              <Text style={styles.infoValue}>{getOccupiedDuration()}</Text>
            </View>
          )}
          
          {estimatedWaitTime && (
            <View style={styles.infoItem}>
              <View style={styles.waitTimeContainer}>
                <Clock size={14} color={Colors.textSecondary} />
                <Text style={styles.infoLabel}>Est. wait:</Text>
              </View>
              <Text style={styles.infoValue}>~{estimatedWaitTime} min</Text>
            </View>
          )}
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
  },
  infoContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text,
  },
  waitTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FacilityItem;