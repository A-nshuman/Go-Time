import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Toilet, ShowerHead } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { BlockStatus } from '@/types/washroom';
import StatusIndicator from './StatusIndicator';

type BlockCardProps = {
  block: BlockStatus;
};

export const BlockCard: React.FC<BlockCardProps> = ({ block }) => {
  const router = useRouter();

  const toiletAvailability = block.totalToilets - block.occupiedToilets;
  const bathingAvailability = block.totalBathingAreas - block.occupiedBathingAreas;

  const handlePress = () => {
    router.push(`/block/${block.id}`);
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
        <Text style={styles.title}>{block.name}</Text>
        <View style={styles.statusContainer}>
          <StatusIndicator 
            isOccupied={block.occupiedToilets === block.totalToilets && block.occupiedBathingAreas === block.totalBathingAreas} 
            size="small" 
            showLabel={false} 
          />
          <Text style={styles.statusText}>
            {block.occupiedToilets === block.totalToilets && block.occupiedBathingAreas === block.totalBathingAreas
              ? 'Fully Occupied'
              : 'Available'}
          </Text>
        </View>
      </View>

      <View style={styles.facilitiesContainer}>
        <View style={styles.facilityItem}>
          <View style={styles.iconContainer}>
            <Toilet size={20} color={Colors.primary} />
          </View>
          <View style={styles.facilityDetails}>
            <Text style={styles.facilityTitle}>Toilets</Text>
            <View style={styles.availabilityContainer}>
              <Text style={styles.availabilityText}>
                <Text style={toiletAvailability > 0 ? styles.availableCount : styles.occupiedCount}>
                  {toiletAvailability}
                </Text> / {block.totalToilets} available
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.facilityItem}>
          <View style={styles.iconContainer}>
            <ShowerHead size={20} color={Colors.primary} />
          </View>
          <View style={styles.facilityDetails}>
            <Text style={styles.facilityTitle}>Bathing Areas</Text>
            <View style={styles.availabilityContainer}>
              <Text style={styles.availabilityText}>
                <Text style={bathingAvailability > 0 ? styles.availableCount : styles.occupiedCount}>
                  {bathingAvailability}
                </Text> / {block.totalBathingAreas} available
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
  title: {
    fontSize: 18,
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
    width: 40,
    height: 40,
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

export default BlockCard;