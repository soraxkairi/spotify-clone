"use client";

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import {useSessionContext, useSupabaseClient} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import useAuthModal from "@/hooks/useAuthModal";
import Modal from './Modal';

const AuthModal = () => {
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();
  

    
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }
    
    useEffect(() => {
      if (session) {
        router.refresh();
        onClose();
      }
    }, [session, router, onClose]);

  return (
    <Modal 
      title="Welcome back" 
      description="Login to your account." 
      isOpen={isOpen} 
      onChange={onChange} 
    >
        {/* Autenticacion con supabase con el componente auth en este caso usamos github solo */}
        {/* magicLink: Un booleano que indica si se está utilizando un enlace mágico (magic link) para la autenticación. Un enlace mágico permite a los usuarios iniciar sesión haciendo clic en un enlace enviado a su dirección de correo electrónico. */}
      <Auth
        supabaseClient={supabaseClient}
        providers={['github']}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'
              }
            }
          }
        }}
        theme="dark"
      />
    </Modal>
  );
}

export default AuthModal;

