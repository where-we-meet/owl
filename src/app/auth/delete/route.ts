import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const supabaseAdmin = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,

    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.log(error, 'cookieStore set Error');
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            console.log(error, 'cookieStore remove Error');
          }
        }
      }
    }
  );

  const {
    data: { user },
    error
  } = await supabaseAdmin.auth.getUser();

  if (error) {
    return NextResponse.error();
  }

  if (user) {
    if (user.identities?.length === 2) {
      const googleIdentity = user.identities.find((identity) => identity.provider === 'google');
      if (googleIdentity) {
        const { data, error } = await supabaseAdmin.auth.unlinkIdentity(googleIdentity);
        console.log('data => ', data, 'error => ', error);
      }

      const kakaoIdentity = user.identities.find((identity) => identity.provider === 'kakao');
      const kakao_uid = kakaoIdentity?.id;

      await axios.post(
        'https://kapi.kakao.com/v1/user/unlink',
        {
          target_id_type: 'user_id',
          target_id: kakao_uid
        },
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_ADMIN_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
    } else {
      const {
        data: { session },
        error: session_error
      } = await supabaseAdmin.auth.getSession();

      if (user.app_metadata.provider === 'google') {
        await axios.post('https://oauth2.googleapis.com/revoke', null, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          params: {
            token: session?.provider_token
          }
        });
      } else {
        const kakao_uid = user.user_metadata.sub;
        await axios.post(
          'https://kapi.kakao.com/v1/user/unlink',
          {
            target_id_type: 'user_id',
            target_id: kakao_uid
          },
          {
            headers: {
              Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_ADMIN_KEY}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );
      }
    }

    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(user.id);
  }

  revalidatePath('/', 'layout');
  return NextResponse.redirect(new URL('/login', req.url), {
    status: 302
  });
}
