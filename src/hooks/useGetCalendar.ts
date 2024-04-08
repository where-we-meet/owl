import { getUserSchedule } from "@/api/supabaseCSR/supabase"
import { UserSchedule } from "@/components/room/meeting/calender/Calender";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react"


export const useGetCalendar = (id : string) => {
  const [userSchedules, setUserSchedules] = useState<UserSchedule[]>([]);
  const supabase = createClient()
  useEffect(() => {
    const dateOfUser = async () => {

      const data = await getUserSchedule(id.toString())
      setUserSchedules(data);
    }
    dateOfUser()
  }, [id])
  
  useEffect(() => {
    const subscription = supabase
      .channel('room')
      .on('postgres_changes', {event: '*', schema:'public', table:'room_schedule', filter:`room_id=eq.${id}` }, (payload) => {
        console.log('1234',payload.new)
      })
      .subscribe()
    return () => {
      supabase.removeChannel(subscription)
    }
  },[id])


  return { userSchedules };
}