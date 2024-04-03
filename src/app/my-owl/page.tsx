import { Meeting } from '@/components/my-owl/meeting/Meeting';
import Profile from '@/components/my-owl/profile/Profile';

export default function MyOwl() {
  return (
    <main style={{ display: 'flex' }}>
      <Profile />
      <Meeting />
    </main>
  );
}
