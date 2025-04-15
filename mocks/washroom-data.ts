import { BlockStatus } from '@/types/washroom';

// Helper function to generate random occupancy
const generateRandomOccupancy = (total: number) => {
  const occupied = Math.floor(Math.random() * (total + 1));
  const occupiedIds = new Set();
  
  while (occupiedIds.size < occupied) {
    occupiedIds.add(Math.floor(Math.random() * total) + 1);
  }
  
  return occupiedIds;
};

// Generate mock data for each block and floor
export const generateMockData = (): BlockStatus[] => {
  const blocks: BlockStatus[] = [];
  const blockNames = ['A Block', 'B Block', 'C Block'];
  
  for (let i = 1; i <= 3; i++) {
    const floors = [];
    
    for (let j = 0; j < 3; j++) {
      const floorNames = ['Ground Floor', 'First Floor', 'Second Floor'];
      const occupiedToiletIds = generateRandomOccupancy(4);
      const occupiedBathingAreaIds = generateRandomOccupancy(4);
      
      const toilets = Array.from({ length: 4 }, (_, index) => {
        const id = `t-${i}-${j}-${index + 1}`;
        const isOccupied = occupiedToiletIds.has(index + 1);
        
        return {
          id,
          isOccupied,
          occupiedSince: isOccupied ? Date.now() - Math.floor(Math.random() * 600000) : undefined,
          estimatedWaitTime: isOccupied ? Math.floor(Math.random() * 10) + 1 : undefined,
        };
      });
      
      const bathingAreas = Array.from({ length: 4 }, (_, index) => {
        const id = `b-${i}-${j}-${index + 1}`;
        const isOccupied = occupiedBathingAreaIds.has(index + 1);
        
        return {
          id,
          isOccupied,
          occupiedSince: isOccupied ? Date.now() - Math.floor(Math.random() * 1200000) : undefined,
          estimatedWaitTime: isOccupied ? Math.floor(Math.random() * 15) + 5 : undefined,
        };
      });
      
      floors.push({
        id: `floor-${i}-${j}`,
        name: floorNames[j],
        toilets,
        bathingAreas,
        totalToilets: 4,
        totalBathingAreas: 4,
        occupiedToilets: toilets.filter(t => t.isOccupied).length,
        occupiedBathingAreas: bathingAreas.filter(b => b.isOccupied).length,
      });
    }
    
    // Calculate total occupancy for the block
    const totalToilets = floors.reduce((sum, floor) => sum + floor.totalToilets, 0);
    const occupiedToilets = floors.reduce((sum, floor) => sum + floor.occupiedToilets, 0);
    const totalBathingAreas = floors.reduce((sum, floor) => sum + floor.totalBathingAreas, 0);
    const occupiedBathingAreas = floors.reduce((sum, floor) => sum + floor.occupiedBathingAreas, 0);
    
    blocks.push({
      id: `block-${i}`,
      name: blockNames[i-1],
      floors,
      totalToilets,
      totalBathingAreas,
      occupiedToilets,
      occupiedBathingAreas,
    });
  }
  
  return blocks;
};

// Initial mock data
export const initialMockData = generateMockData();