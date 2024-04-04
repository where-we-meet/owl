import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const Logout = async () => {
  const signOut = async () => {
    'use server';
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/');
  };

  return (
    <form>
      <button formAction={signOut} role="button">
        로그아웃
      </button>
    </form>
  );
};

export default Logout;
