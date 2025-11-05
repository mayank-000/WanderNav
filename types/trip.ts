export interface Trip {
  _id: string;
  user: string;
  title: string;
  tripPlans: string[];
  createdAt: string;
  updatedAt: string;
}

// Optional: If you need a type for creating a new trip (without generated fields)
export interface CreateTripInput {
  user: string;
  title: string;
  tripPlans?: string[];
}

// Optional: If you need a type for updating a trip
export interface UpdateTripInput {
  title?: string;
  tripPlans?: string[];
}