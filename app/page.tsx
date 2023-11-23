import { Button } from '@/components/ui/button';
import { getAuthSession } from '@/lib/auth';
import { signIn } from 'next-auth/react';
import React from 'react';

type Props = {};

const Home: React.FC<Props> = async ({ ...authOptions }: Props) => {
  const session = await getAuthSession(authOptions);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold mb-6'>
        COMECE JÁ A GERAÇÃO DOS SEUS MELHORES CURSOS
      </h1>
      <p className='text-lg text-gray-600'>
        Transforme suas ideias em experiências educacionais incríveis com a nossa solução.
      </p>
      {session ? (
        <Button
          className='mt-8'
          onClick={() => {
            window.location.href = '/create';
          }}
        >
          Criar Curso
        </Button>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-6">
            Realize o login para começar a gerar cursos
          </h1>
          <Button
            className='mt-8'
            onClick={() => {
              signIn('google');
            }}
          >
            Começar Agora
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
