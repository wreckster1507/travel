// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function Contact({ listing }) {
//   const [landlord, setLandlord] = useState(null);
//   const [message, setMessage] = useState('');
//   const onChange = (e) => {
//     setMessage(e.target.value);
//   };

//   useEffect(() => {
//     const fetchLandlord = async () => {
//       try {
//         const res = await fetch(`/api/user/${listing.userRef}`);
//         const data = await res.json();
//         setLandlord(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchLandlord();
//   }, [listing.userRef]);
//   return (
//     <>
//       {landlord && (
//         <div className='flex flex-col gap-2'>
//           <p>
//             Contact <span className='font-semibold'>{landlord.username}</span>{' '}
//             for{' '}
//             <span className='font-semibold'>{listing.name.toLowerCase()}</span>
//           </p>
//           <textarea
//             name='message'
//             id='message'
//             rows='2'
//             value={message}
//             onChange={onChange}
//             placeholder='Enter your message here...'
//             className='w-full border p-3 rounded-lg'
//           ></textarea>

//           <Link
//           to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
//           className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
//           >
//             Send Message          
//           </Link>
//         </div>
//       )}
//     </>
//   );
// }


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        if (!res.ok) throw new Error('Failed to fetch landlord information');
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {loading && <p>Loading landlord information...</p>}
      {error && <p className='text-red-500'>Error: {error}</p>}

      {landlord && !loading && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg resize-none'
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className={`bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95 ${
              !message.trim() && 'opacity-50 cursor-not-allowed'
            }`}
            onClick={(e) => {
              if (!message.trim()) e.preventDefault();
            }}
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
