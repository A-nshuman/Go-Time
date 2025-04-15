import React from 'react';
import { StyleSheet, View, Text, Switch, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { 
  Bell, 
  Clock, 
  Building2, 
  RefreshCw, 
  ChevronRight, 
  Info, 
  HelpCircle 
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useSettingsStore } from '@/store/settings-store';
import { useWashroomStore } from '@/store/washroom-store';

export default function SettingsScreen() {
  const { 
    notificationsEnabled, 
    toggleNotifications, 
    preferredBlock, 
    setPreferredBlock,
    autoRefresh,
    toggleAutoRefresh,
    refreshInterval,
    setRefreshInterval
  } = useSettingsStore();
  
  const { blocks } = useWashroomStore();

  const handleRefreshIntervalChange = () => {
    // Cycle through refresh intervals: 30s -> 60s -> 120s -> 30s
    if (refreshInterval === 30) setRefreshInterval(60);
    else if (refreshInterval === 60) setRefreshInterval(120);
    else setRefreshInterval(30);
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your experience</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Bell size={20} color={Colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>Get alerts when facilities become available</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: Colors.disabled, true: Colors.primaryLight }}
              thumbColor={notificationsEnabled ? Colors.primary : Colors.border}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Building2 size={20} color={Colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Preferred Block</Text>
              <Text style={styles.settingDescription}>
                {preferredBlock ? 
                  blocks.find(b => b.id === preferredBlock)?.name || 'None' : 
                  'None'}
              </Text>
            </View>
            <Pressable 
              style={styles.settingAction}
              onPress={() => {
                // Cycle through blocks: None -> Block 1 -> Block 2 -> Block 3 -> None
                if (!preferredBlock) setPreferredBlock('block-1');
                else if (preferredBlock === 'block-1') setPreferredBlock('block-2');
                else if (preferredBlock === 'block-2') setPreferredBlock('block-3');
                else setPreferredBlock(null);
              }}
            >
              <ChevronRight size={20} color={Colors.textSecondary} />
            </Pressable>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <RefreshCw size={20} color={Colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Auto Refresh</Text>
              <Text style={styles.settingDescription}>Automatically update occupancy data</Text>
            </View>
            <Switch
              value={autoRefresh}
              onValueChange={toggleAutoRefresh}
              trackColor={{ false: Colors.disabled, true: Colors.primaryLight }}
              thumbColor={autoRefresh ? Colors.primary : Colors.border}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Clock size={20} color={Colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Refresh Interval</Text>
              <Text style={styles.settingDescription}>{refreshInterval} seconds</Text>
            </View>
            <Pressable 
              style={styles.settingAction}
              onPress={handleRefreshIntervalChange}
              disabled={!autoRefresh}
            >
              <ChevronRight 
                size={20} 
                color={autoRefresh ? Colors.textSecondary : Colors.disabled} 
              />
            </Pressable>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <Link href="/modal" asChild>
            <Pressable style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Info size={20} color={Colors.primary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>About GoTime</Text>
                <Text style={styles.settingDescription}>Learn more about the app</Text>
              </View>
              <View style={styles.settingAction}>
                <ChevronRight size={20} color={Colors.textSecondary} />
              </View>
            </Pressable>
          </Link>
          
          <Pressable style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <HelpCircle size={20} color={Colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Help & Support</Text>
              <Text style={styles.settingDescription}>Get assistance with the app</Text>
            </View>
            <View style={styles.settingAction}>
              <ChevronRight size={20} color={Colors.textSecondary} />
            </View>
          </Pressable>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>GoTime v1.0.0</Text>
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
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
    marginLeft: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  settingAction: {
    padding: 4,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});