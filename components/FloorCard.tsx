import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Toilet, ShowerHead, Building2 } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { FloorStatus } from '@/types/washroom';
import StatusIndicator from './StatusIndicator';

type FloorCardProps = {
  floor: FloorStatus;
  blockId: string;
};

export const FloorCard: React.FC<FloorCardProps> = ({ floor, blockId }) => {
  const router = useRouter();

  const toiletAvailability = floor.totalToilets - floor.occupiedToilets;
  const bathingAvailability = floor.totalBathingAreas - floor.occupiedBathingAreas;

  const handlePress = () => {
    router.push(`/floor/${blockId}/${floor.id}`);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={handlePress}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Building2 size={18} color={Colors.primary} style={styles.titleIcon} />
          <Text style={styles.title}>{floor.name}</Text>
        </View>
        <View style={styles.statusContainer}>
          <StatusIndicator 
            isOccupied={floor.occupiedToilets === floor.totalToilets && floor.occupiedBathingAreas === floor.totalBathingAreas} 
            size="small" 
            showLabel={false} 
          />
          <Text style={styles.statusText}>
            {floor.occupiedToilets === floor.totalToilets && floor.occupiedBathingAreas === floor.totalBathingAreas
              ? 'Fully Occupied'
              : 'Available'}
          </Text>
        </View>
      </View>

      <View style={styles.facilitiesContainer}>
        <View style={styles.facilityItem}>
          <View style={styles.iconContainer}>
          <Toilet size={18} color={Colors.primary} />
          </View>
          <View style={styles.facilityDetails}>
            <Text style={styles.facilityTitle}>Toilets</Text>
            <View style={styles.availabilityContainer}>
              <Text style={styles.availabilityText}>
                <Text style={toiletAvailability > 0 ? styles.availableCount : styles.occupiedCount}>
                  {toiletAvailability}
                </Text> / {floor.totalToilets} available
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.facilityItem}>
          <View style={styles.iconContainer}>
            <ShowerHead size={18} color={Colors.primary} />
          </View>
          <View style={styles.facilityDetails}>
            <Text style={styles.facilityTitle}>Bathing Areas</Text>
            <View style={styles.availabilityContainer}>
              <Text style={styles.availabilityText}>
                <Text style={bathingAvailability > 0 ? styles.availableCount : styles.occupiedCount}>
                  {bathingAvailability}
                </Text> / {floor.totalBathingAreas} available
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
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
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    marginLeft: 4,
    color: Colors.textSecondary,
  },
  facilitiesContainer: {
    gap: 12,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  facilityDetails: {
    flex: 1,
  },
  facilityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  availableCount: {
    color: Colors.available,
    fontWeight: '600',
  },
  occupiedCount: {
    color: Colors.occupied,
    fontWeight: '600',
  },
});

export default FloorCard;