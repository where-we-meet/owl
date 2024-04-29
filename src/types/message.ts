export type IMessage = {
  created_at: string;
  id: string;
  is_edit: boolean | null;
  send_by: string;
  text: string | null;
  room_id: string | null;
  user_profile: string | null;
  name: string | null;
};