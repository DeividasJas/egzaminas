import { useLoaderData } from 'react-router-dom';
import { extendReservation } from '../services/post.mjs';
import { Toaster, toast } from 'sonner';
export default function UserReservations() {
  const data = useLoaderData();
  console.log(data);
  const extendBookHandler = async (id) => {
    const response = await extendReservation(id);
    // console.log(response);
    if (response.data.length === 0) {
      console.log('yes');
      toast.error('Cannot extend more than two times');
    } else {
      toast.success('Extended Successfully');
    }
  };
  return (
    <>
      <div>
        <h2>My Reservations</h2>
        <ul className='grid grid-cols-3 gap-2'>
          {data.map((reservation) => {
            return (
              <div
                key={reservation.id}
                className='bg-zinc-400 flex flex-col p-3 gap-2'
              >
                <li>{reservation.book_name}</li>

                <button
                  className='bg-green-700 p-1 mx-auto'
                  onClick={() => extendBookHandler(reservation.id)}
                >
                  Extend
                </button>
              </div>
            );
          })}
        </ul>
      </div>{' '}
      <Toaster richColors />
    </>
  );
}
