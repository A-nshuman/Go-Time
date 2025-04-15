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

export interface FloorStatus {
  id: string;
  name: string;
  toilets: ToiletStatus[];
  bathingAreas: BathingAreaStatus[];
  totalToilets: number;
  totalBathingAreas: number;
  occupiedToilets: number;
  occupiedBathingAreas: number;
}

export interface BlockStatus {
  id: string;
  name: string;
  floors: FloorStatus[];
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