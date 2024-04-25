export type RoomUser = {
  id: string;
  created_at: string;
  is_admin: boolean;
  start_location: string | null;
  lat: string | null;
  lng: string | null;
  user_id: string;
  name: string;
  profile_url: string | null;
};

export type UpsertUserSchedule = {
  room_id: string;
  created_by: string;
  start_date: string;
  end_date: string;
};

export type UpsertRoomUsers = {
  room_id: string;
  user_id: string;
  start_location: string | null;
  is_admin: boolean;
  lat: string | null;
  lng: string | null;
};
