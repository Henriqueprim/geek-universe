"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logoPng from '/public/images/logos/logoPng.png'
import Link from 'next/link';
import { Dropdown } from 'flowbite-react';

export default function NavBar() {
  const optionsKeys = ['Todos', 'Acessórios', 'Camisetas', 'Moletons', 'Croppeds', 'Conjuntos'];
  const optionsValues = ['/', 'Acessorios', 'Camisetas', 'Moletom', 'Cropped', 'Conjuntos'];
  const router = useRouter();

  return (
    <header>
      <nav className="flex items-center h-24 justify-between py-5 z-50 shadow-xl">
        <div className="flex items-center">
          <Link 
            href={'/'}
            className='self-center whitespace-nowrap text-xl font-semibold'
          >
            <Image
              src={logoPng}
              width={100}
              height={100}
              className="m-3 w-20 inline"
              alt="Geek Universe Logo"
            />
            Geek Universe
          </Link>
        </div>
        <div className="flex space-x-4 mr-3">
          <Link
            href={'/'}
          >
            Início
          </Link>
          <Dropdown
            arrowIcon={true}
            inline
            label="Categorias"
            className='z-100 font-semibold'
          >
            {optionsKeys.map((option, index) => (
                <Dropdown.Item
                className='z-50'
                key={option}
                as={Link}
                href={`/${optionsValues[index]}`}
                >
                    {option}
                </Dropdown.Item>
            ))}
          </Dropdown>
          <Link 
            href="/cart"
          >
             Meu Carrinho
          </Link>
        </div>
      </nav>
    </header>
  );
}

