import { useLoaderData } from 'react-router-dom';
import { reserveBook } from '../services/post.mjs';

export default function Books() {
  const data = useLoaderData();
  console.log(data);

  const reserveBookHandler = async (id) => {
    const response = await reserveBook(id);

    
  };
  return (
    <>
      <h2>All books</h2>

      <ul className='grid grid-cols-3 gap-2'>
        {data.map((book) => {
          return (
            <div key={book.id} className='p-3 bg-zinc-300 flex flex-col'>
              <li>
                <p>Title: {book.name}</p>
                <p>Author: {book.author}</p>
                <p>Rating: {book.rating}</p>
                <p>Released: {book.releasedate.split('T')[0]}</p>
              </li>

              <button
                className='bg-green-600 p-1 mx-auto'
                onClick={() => reserveBookHandler(book.id)}
              >
                Reserve
              </button>
            </div>
          );
        })}
      </ul>
    </>
  );
}
