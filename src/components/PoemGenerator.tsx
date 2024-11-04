import { useEffect, useState } from 'react';
import { Button } from './ui/button';

const BASE_URL = 'https://poetrydb.org/random';

interface Poem {
  title: string;
  author: string;
  lines: string[];
}

const PoemGenerator: React.FC = () => {
  const [poem, setPoem] = useState<Poem | null>(null);

  const fetchPoem = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data: Poem[] = await response.json();
      setPoem(data[0]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center'>
      <Button className='p-8 text-xl bg-slate-800' onClick={fetchPoem}>
        Generate Poem
      </Button>
      {poem && (
        <div className='mt-4'>
          <h2 className='text-xl font-bold'>{poem.title}</h2>
          <p className='italic text-gray-700 mb-4'>{poem.author}</p>
          <pre className='whitespace-pre-wrap'>
            {poem.lines.slice(0, 10).join('\n')}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PoemGenerator;
