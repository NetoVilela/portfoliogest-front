import React from 'react';

type Props = {
  mode?: string;
}

export default function Brand({ mode = 'light' }: Props) {
  return (
    <div className='flex'>
      <span className='mr-2'>
        <svg data-slot="icon" fill="white" className='w-10 bg-primary p-1 rounded-lg' viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M1 4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4ZM10 5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V5ZM4 10a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H4Z"></path>
        </svg>
      </span>
      <span className={`text-4xl ${mode === 'dark' ? 'text-bodydark1' : 'text-black-2'}`}>
        PortfolioGest
      </span>
    </div>
  );
}
