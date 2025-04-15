export interface ToiletStatus {
    id: string;
    isOccupied: boolean;
    occupiedSince?: number; // timestamp when occupied
    estimatedWaitTime?: number; // in minutes
  }
  
  export interface BathingAreaStatus {
    id: string;
    isOccupied: boolean;
    occupiedSince?: number; // timestamp when occupied
    estimatedWaitTime?: number; // in minutes
  }
  
  export interface BlockStatus {
    id: string;
    name: string;
    toilets: ToiletStatus[];
    bathingAreas: BathingAreaStatus[];
    totalToilets: number;
    totalBathingAreas: number;
    occupiedToilets: number;
    occupiedBathingAreas: number;
  }
  
  export interface WashroomState {
    blocks: BlockStatus[];
    lastUpdated: number; // timestamp
    isLoading: boolean;
    error: string | null;
  }

  export interface Facility {
    id: string;
    isOccupied: boolean;
    occupiedSince?: number;
    estimatedWaitTime?: number;
  }
  
  export interface Floor {
    id: string;
    name: string;
    toilets: Facility[];
    bathingAreas: Facility[];
    totalToilets: number;
    totalBathingAreas: number;
    occupiedToilets: number;
    occupiedBathingAreas: number;
  }

  export interface FloorStatus {
    id: string;
    name: string;  // e.g., "Ground Floor", "1st Floor", etc.
    totalToilets: number;
    occupiedToilets: number;
    totalBathingAreas: number;
    occupiedBathingAreas: number;
    toilets: {
      id: string;
      isOccupied: boolean;
      occupiedSince?: number;
      estimatedWaitTime?: number;
    }[];
    bathingAreas: {
      id: string;
      isOccupied: boolean;
      occupiedSince?: number;
      estimatedWaitTime?: number;
    }[];
  }