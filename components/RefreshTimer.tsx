import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useSettingsStore } from '@/store/settings-store';

type RefreshTimerProps = {
  lastUpdated: number;
  onRefreshNeeded?: () => void;
};

export const RefreshTimer: React.FC<RefreshTimerProps> = ({
  lastUpdated,
  onRefreshNeeded,
}) => {
  const { autoRefresh, refreshInterval } = useSettingsStore();
  const [timeAgo, setTimeAgo] = useState<string>('Just now');
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const updateTimeAgo = () => {
      const now = Date.now();
      const diffInSeconds = Math.floor((now - lastUpdated) / 1000);
      setSecondsElapsed(diffInSeconds);
      
      if (diffInSeconds < 10) {
        setTimeAgo('Just now');
      } else if (diffInSeconds < 60) {
        setTimeAgo(`${diffInSeconds} seconds ago`);
      } else {
        const minutes = Math.floor(diffInSeconds / 60);
        setTimeAgo(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`);
      }

      // Trigger refresh if auto-refresh is enabled and interval has passed
      if (autoRefresh && diffInSeconds >= refreshInterval && onRefreshNeeded) {
        onRefreshNeeded();
      }
    };

    updateTimeAgo();
    const intervalId = setInterval(updateTimeAgo, 1000);

    return () => clearInterval(intervalId);
  }, [lastUpdated, autoRefresh, refreshInterval, onRefreshNeeded]);

  return (
    <View style={styles.container}>
      <Clock size={14} color={Colors.textSecondary} />
      <Text style={styles.text}>Updated {timeAgo}</Text>
      {autoRefresh && (
        <View style={styles.timerContainer}>
          <View 
            style={[
              styles.timerBar, 
              { 
                width: `${Math.min(100, (secondsElapsed / refreshInterval) * 100)}%`,
                backgroundColor: secondsElapsed > refreshInterval * 0.8 
                  ? Colors.warning 
                  : Colors.primary
              }
            ]} 
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  text: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  timerContainer: {
    height: 2,
    backgroundColor: Colors.border,
    flex: 1,
    marginLeft: 8,
    borderRadius: 1,
    overflow: 'hidden',
  },
  timerBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },
});

export default RefreshTimer;