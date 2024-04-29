
import { createClient } from "@/utils/supabase/client";
import type { IMessage } from "@/types/message";

const supabase = createClient();

export const getMessageData = async (roomId: string) => {
  const { data, error } = await supabase
    .from('message')
    .select('*, users!public_message_send_by_fkey(*)')
    .eq('room_id', roomId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const insertMessage = async (message: IMessage) => {
  const { error } = await supabase
  .from('message')
  .insert({ name: message.name, text: message.text, room_id: message.room_id, user_profile: message.user_profile });
if (error) throw error;
}