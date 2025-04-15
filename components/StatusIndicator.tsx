import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';

type StatusIndicatorProps = {
  isOccupied: boolean;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  style?: object;
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  isOccupied,
  size = 'medium',
  showLabel = true,
  style,
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 8;
      case 'large':
        return 16;
      case 'medium':
      default:
        return 12;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.indicator,
          {
            width: getSize(),
            height: getSize(),
            backgroundColor: isOccupied ? Colors.occupied : Colors.available,
          },
        ]}
      />
      {showLabel && (
        <Text
          style={[
            styles.label,
            { color: isOccupied ? Colors.occupied : Colors.available },
          ]}
        >
          {isOccupied ? 'Occupied' : 'Available'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    borderRadius: 50,
  },
  label: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default StatusIndicator;