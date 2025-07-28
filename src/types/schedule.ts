export interface Trainer {
  trainer_id: string;
  trainer_name: string;
}

export interface WorkoutType {
  workout_id: string;
  workout_type: string;
}

export interface User {
  user_id: string;
  user_name: string;
  user_email: string;
}

export interface Event {
  id: string;
  start_time: string;
  end_time: string;
  user_id: string;
  trainer_id: string;
  workout_id: string;
  user_name: string;
  trainer_name: string;
  workout_type: string;
  created_at: string;
}

export interface SelectedSlot {
  date: Date;
  hour: number;
} 