import { MeetingInfo } from '@/components/my-owl/meeting/Meeting';

export const sortMeetingInfo = (meetingInfo: MeetingInfo[]): MeetingInfo[] => {
  return meetingInfo.sort((a, b) => {
    // 정렬 1순위 : verified가 true
    if (a.verified && !b.verified) return -1;
    if (!a.verified && b.verified) return 1;
    // 정렬 2순위 : created_at
    if (a.created_at && b.created_at) return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    return 0;
  });
};
