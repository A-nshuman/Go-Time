import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WashroomState, BlockStatus, FloorStatus } from '@/types/washroom';
import { initialMockData, generateMockData } from '@/mocks/washroom-data';

interface WashroomStore extends WashroomState {
  fetchStatus: () => Promise<void>;
  refreshData: () => Promise<void>;
  updateBlockStatus: (blockId: string, updatedBlock: Partial<BlockStatus>) => void;
  updateFloorStatus: (blockId: string, floorId: string, updatedFloor: Partial<FloorStatus>) => void;
  simulateOccupancyChange: () => void;
}

export const useWashroomStore = create<WashroomStore>()(
  persist(
    (set, get) => ({
      blocks: initialMockData,
      lastUpdated: Date.now(),
      isLoading: false,
      error: null,
      
      fetchStatus: async () => {
        set({ isLoading: true });
        try {
          // In a real app, this would be an API call to fetch real data
          // For now, we'll use a timeout to simulate network request
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Simulate fetching new data
          const newData = generateMockData();
          set({ 
            blocks: newData, 
            lastUpdated: Date.now(),
            isLoading: false,
            error: null
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : "Failed to fetch washroom status" 
          });
        }
      },
      
      refreshData: async () => {
        set({ isLoading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 800));
          const newData = generateMockData();
          set({ 
            blocks: newData, 
            lastUpdated: Date.now(),
            isLoading: false,
            error: null
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : "Failed to refresh data" 
          });
        }
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
              const updatedFloors = (block as BlockStatus & { floors: FloorStatus[] }).floors.map(floor =>
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
      
      simulateOccupancyChange: () => {
        const { blocks } = get();
        const updatedBlocks = [...blocks];
        
        // Randomly select a block to update
        const blockIndex = Math.floor(Math.random() * updatedBlocks.length);
        const block = { ...updatedBlocks[blockIndex] };
        
        // Randomly select a floor to update
        const floorIndex = Math.floor(Math.random() * (block as BlockStatus & { floors: FloorStatus[] }).floors.length);
        const floor = { ...(block as BlockStatus & { floors: FloorStatus[] }).floors[floorIndex] };
        
        // Randomly decide whether to update a toilet or bathing area
        const updateToilet = Math.random() > 0.5;
        
        if (updateToilet) {
          const toiletIndex = Math.floor(Math.random() * floor.toilets.length);
          const toilets = [...floor.toilets];
          toilets[toiletIndex] = {
            ...toilets[toiletIndex],
            isOccupied: !toilets[toiletIndex].isOccupied,
            occupiedSince: !toilets[toiletIndex].isOccupied ? Date.now() : undefined,
            estimatedWaitTime: !toilets[toiletIndex].isOccupied ? Math.floor(Math.random() * 10) + 1 : undefined,
          };
          
          floor.toilets = toilets;
          floor.occupiedToilets = toilets.filter(t => t.isOccupied).length;
        } else {
          const bathingAreaIndex = Math.floor(Math.random() * floor.bathingAreas.length);
          const bathingAreas = [...floor.bathingAreas];
          bathingAreas[bathingAreaIndex] = {
            ...bathingAreas[bathingAreaIndex],
            isOccupied: !bathingAreas[bathingAreaIndex].isOccupied,
            occupiedSince: !bathingAreas[bathingAreaIndex].isOccupied ? Date.now() : undefined,
            estimatedWaitTime: !bathingAreas[bathingAreaIndex].isOccupied ? Math.floor(Math.random() * 15) + 5 : undefined,
          };
          
          floor.bathingAreas = bathingAreas;
          floor.occupiedBathingAreas = bathingAreas.filter(b => b.isOccupied).length;
        }
        
        (block as BlockStatus & { floors: FloorStatus[] }).floors[floorIndex] = floor;
        
        // Recalculate block totals
        block.occupiedToilets = (block as BlockStatus & { floors: FloorStatus[] }).floors.reduce((sum, f) => sum + f.occupiedToilets, 0);
        block.occupiedBathingAreas = (block as BlockStatus & { floors: FloorStatus[] }).floors.reduce((sum, f) => sum + f.occupiedBathingAreas, 0);
        
        updatedBlocks[blockIndex] = block;
        
        set({ 
          blocks: updatedBlocks,
          lastUpdated: Date.now()
        });
      }
    }),
    {
      name: 'washroom-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        blocks: state.blocks,
        lastUpdated: state.lastUpdated
      }),
    }
  )
);