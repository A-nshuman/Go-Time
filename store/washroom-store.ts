import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from '@/firebase/config';
import { ref, onValue, get, off } from 'firebase/database';
import { WashroomState, BlockStatus, FloorStatus } from '@/types/washroom';

interface WashroomStore extends WashroomState {
  fetchStatus: () => Promise<void>;
  refreshData: () => Promise<void>;
  startRealtimeUpdates: () => void;
  stopRealtimeUpdates: () => void;
  updateBlockStatus: (blockId: string, updatedBlock: Partial<BlockStatus>) => void;
  updateFloorStatus: (blockId: string, floorId: string, updatedFloor: Partial<FloorStatus>) => void;
}

export const useWashroomStore = create<WashroomStore>()(
  persist(
    (set, get) => ({
      blocks: [],
      lastUpdated: Date.now(),
      isLoading: false,
      error: null,
      
      fetchStatus: async () => {
        set({ isLoading: true });
        try {
          const washroomsRef = ref(database, 'washrooms');
          const snapshot = await get(washroomsRef);
          
          if (snapshot.exists()) {
            const data = snapshot.val();
            const blocks = processFirebaseData(data);
            
            set({ 
              blocks, 
              lastUpdated: Date.now(),
              isLoading: false,
              error: null
            });
          } else {
            set({ 
              isLoading: false, 
              error: "No data available"
            });
          }
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : "Failed to fetch washroom status" 
          });
        }
      },
      
      refreshData: async () => {
        await get().fetchStatus();
      },
      
      startRealtimeUpdates: () => {
        const washroomsRef = ref(database, 'washrooms');
        
        onValue(washroomsRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const blocks = processFirebaseData(data);
            
            set({ 
              blocks, 
              lastUpdated: Date.now(),
              error: null
            });
          }
        }, (error) => {
          set({ 
            error: error.message 
          });
        });
      },
      
      stopRealtimeUpdates: () => {
        const washroomsRef = ref(database, 'washrooms');
        off(washroomsRef);
      },
      
      updateBlockStatus: (blockId, updatedBlock) => {
        set(state => ({
          blocks: state.blocks.map(block => 
            block.id === blockId ? { ...block, ...updatedBlock } : block
          ),
          lastUpdated: Date.now()
        }));
      },
      
      updateFloorStatus: (blockId, floorId, updatedFloor) => {
        set(state => ({
          blocks: state.blocks.map(block => {
            if (block.id === blockId) {
              const updatedFloors = block.floors.map(floor => 
                floor.id === floorId ? { ...floor, ...updatedFloor } : floor
              );
              
              // Recalculate block totals
              const occupiedToilets = updatedFloors.reduce((sum, floor) => sum + floor.occupiedToilets, 0);
              const occupiedBathingAreas = updatedFloors.reduce((sum, floor) => sum + floor.occupiedBathingAreas, 0);
              
              return {
                ...block,
                floors: updatedFloors,
                occupiedToilets,
                occupiedBathingAreas
              };
            }
            return block;
          }),
          lastUpdated: Date.now()
        }));
      },
    }),
    {
      name: 'washroom-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        lastUpdated: state.lastUpdated
      }),
    }
  )
);

// Helper function to process Firebase data into our app's data structure
function processFirebaseData(data: any): BlockStatus[] {
  const blocks: BlockStatus[] = [];
  
  Object.keys(data).forEach(blockId => {
    const blockData = data[blockId];
    const floors: FloorStatus[] = [];
    
    Object.keys(blockData.floors).forEach(floorId => {
      const floorData = blockData.floors[floorId];
      
      // Calculate occupancy for this floor
      const occupiedToilets = floorData.toilets.filter((t: any) => t.isOccupied).length;
      const occupiedBathingAreas = floorData.bathingAreas.filter((b: any) => b.isOccupied).length;
      
      // Add estimated wait times based on occupancy
      const toilets = floorData.toilets.map((toilet: any) => ({
        ...toilet,
        occupiedSince: toilet.isOccupied ? Date.now() - Math.floor(Math.random() * 600000) : undefined,
        estimatedWaitTime: toilet.isOccupied ? Math.floor(Math.random() * 10) + 1 : undefined,
      }));
      
      const bathingAreas = floorData.bathingAreas.map((bathingArea: any) => ({
        ...bathingArea,
        occupiedSince: bathingArea.isOccupied ? Date.now() - Math.floor(Math.random() * 1200000) : undefined,
        estimatedWaitTime: bathingArea.isOccupied ? Math.floor(Math.random() * 15) + 5 : undefined,
      }));
      
      floors.push({
        id: floorId,
        name: floorData.name,
        toilets,
        bathingAreas,
        totalToilets: floorData.toilets.length,
        totalBathingAreas: floorData.bathingAreas.length,
        occupiedToilets,
        occupiedBathingAreas,
      });
    });
    
    // Calculate total occupancy for the block
    const totalToilets = floors.reduce((sum, floor) => sum + floor.totalToilets, 0);
    const occupiedToilets = floors.reduce((sum, floor) => sum + floor.occupiedToilets, 0);
    const totalBathingAreas = floors.reduce((sum, floor) => sum + floor.totalBathingAreas, 0);
    const occupiedBathingAreas = floors.reduce((sum, floor) => sum + floor.occupiedBathingAreas, 0);
    
    blocks.push({
      id: blockId,
      name: blockData.name,
      floors,
      totalToilets,
      totalBathingAreas,
      occupiedToilets,
      occupiedBathingAreas,
    });
  });
  
  return blocks;
}