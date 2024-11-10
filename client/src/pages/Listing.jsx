

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore from 'swiper';
// import { useSelector } from 'react-redux';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css/bundle';
// import {
//   FaBath,
//   FaBed,
//   FaChair,
//   FaMapMarkerAlt,
//   FaParking,
//   FaShare,
// } from 'react-icons/fa';
// import Contact from '../components/Contact';

// export default function Listing() {
//   SwiperCore.use([Navigation]);
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [contact, setContact] = useState(false);
//   const [booked, setBooked] = useState(false);
//   const [placeInfo, setPlaceInfo] = useState(''); // User input for place query
//   const [placeDescription, setPlaceDescription] = useState(''); // Gemini API response
//   const [conversation, setConversation] = useState([]); // Chat conversation state
//   const params = useParams();
//   const { currentUser } = useSelector((state) => state.user);

//   // Function to query Gemini API with user input about the place
//   const handlePlaceQuery = async () => {
//     if (!placeInfo.trim()) return;

//     const userMessage = { sender: 'user', text: placeInfo ,place: listing.name};
//     setConversation((prev) => [...prev, userMessage]);
//     setPlaceInfo(''); // Clear input after submitting

//     try {
//       const response = await fetch('http://localhost:3000/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         // body: JSON.stringify({ prompt: placeInfo }),
//         // body: JSON.stringify({ prompt: placeInfo + ' about ' + listing.name }),
//         body: JSON.stringify({ prompt: userMessage }),

//       });
//       const data = await response.json();
//       const botMessage = { sender: 'bot', text: data.text }; // Assuming the API returns 'text'
//       setConversation((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error("Couldn't fetch place information", error);
//       const botMessage = {
//         sender: 'bot',
//         text: "Sorry, I couldn't fetch information about this place.",
//       };
//       setConversation((prev) => [...prev, botMessage]);
//     }
//   };

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/listing/get/${params.listingId}`);
//         const data = await res.json();
//         if (data.success === false) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
//         setListing(data);
//         setLoading(false);
//         setError(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchListing();
//   }, [params.listingId]);

//   const handleBook = async () => {
//     alert('Booked successfully!');
//     try {
//       const res = await fetch(`/api/listing/book/${params.listingId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${currentUser.token}`,
//         },
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         return;
//       }
//       setBooked(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <main>
//       {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
//       {error && (
//         <p className='text-center my-7 text-2xl'>Something went wrong!</p>
//       )}
//       {listing && !loading && !error && (
//         <div>
//           <Swiper navigation>
//             {listing.imageUrls.map((url) => (
//               <SwiperSlide key={url}>
//                 <div
//                   className='h-[550px]'
//                   style={{
//                     background: `url(${url}) center no-repeat`,
//                     backgroundSize: 'cover',
//                   }}
//                 ></div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//           <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
//             <FaShare
//               className='text-slate-500'
//               onClick={() => {
//                 navigator.clipboard.writeText(window.location.href);
//                 setCopied(true);
//                 setTimeout(() => {
//                   setCopied(false);
//                 }, 2000);
//               }}
//             />
//           </div>
//           {copied && (
//             <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
//               Link copied!
//             </p>
//           )}
//           <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
//             <p className='text-2xl font-semibold'>
//               {listing.name} - ${' '}
//               {listing.offer
//                 ? listing.discountPrice.toLocaleString('en-US')
//                 : listing.regularPrice.toLocaleString('en-US')}
//               {listing.type === 'rent' && ' / month'}
//             </p>
//             <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'>
//               <FaMapMarkerAlt className='text-green-700' />
//               {listing.address}
//             </p>
//             <div className='flex gap-4 justify-start'>
//               {listing.offer && (
//                 <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
//                   ${+listing.regularPrice - +listing.discountPrice} OFF
//                 </p>
//               )}
//               <p className='bg-blue-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
//                 <button onClick={handleBook}>Book</button>
//               </p>
//             </div>

//             <p className='text-slate-800'>
//               <span className='font-semibold text-black'>Description - </span>
//               {listing.description}
//             </p>
//             <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
//               <li className='flex items-center gap-1 whitespace-nowrap '>
//                 <FaBed className='text-lg' />
//                 {listing.bedrooms > 1
//                   ? `${listing.bedrooms} beds `
//                   : `${listing.bedrooms} bed `}
//               </li>
//               <li className='flex items-center gap-1 whitespace-nowrap '>
//                 <FaBath className='text-lg' />
//                 {listing.bathrooms > 1
//                   ? `${listing.bathrooms} baths `
//                   : `${listing.bathrooms} bath `}
//               </li>
//               <li className='flex items-center gap-1 whitespace-nowrap '>
//                 <FaParking className='text-lg' />
//                 {listing.parking ? 'Parking spot' : 'No Parking'}
//               </li>
//               <li className='flex items-center gap-1 whitespace-nowrap '>
//                 <FaChair className='text-lg' />
//                 {listing.furnished ? 'Furnished' : 'Unfurnished'}
//               </li>
//             </ul>

//             {/* Chatbot UI */}
//             <div className='my-6'>
//               <div className='chat-container'>
//                 <div className='chat-messages'>
//                   {conversation.map((msg, index) => (
//                     <div
//                       key={index}
//                       className={`chat-message ${
//                         msg.sender === 'user' ? 'user-message' : 'bot-message'
//                       }`}
//                     >
//                       <p>{msg.text}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className='chat-input'>
//                 <input
//                   type='text'
//                   value={placeInfo}
//                   onChange={(e) => setPlaceInfo(e.target.value)}
//                   placeholder='Ask about this place...'
//                   className='border p-2 rounded w-full'
//                 />
//                 <button
//                   onClick={handlePlaceQuery}
//                   className='mt-2 bg-blue-500 text-white p-2 rounded'
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>

//             {currentUser && listing.userRef !== currentUser._id && !contact && (
//               <button
//                 onClick={() => setContact(true)}
//                 className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
//               >
//                 Contact landlord
//               </button>
//             )}
//             {contact && <Contact listing={listing} />}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [booked, setBooked] = useState(false);
  const [placeInfo, setPlaceInfo] = useState(''); // User input for place query
  const [placeDescription, setPlaceDescription] = useState(''); // Gemini API response
  const [conversation, setConversation] = useState([]); // Chat conversation state
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  // Function to query Gemini API with user input about the place
  const handlePlaceQuery = async () => {
    if (!placeInfo.trim()) return;

    const userMessage = { sender: 'user', text: placeInfo ,place: listing.name};
    setConversation((prev) => [...prev, userMessage]);
    setPlaceInfo(''); // Clear input after submitting

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage }),
      });
      const data = await response.json();
      const formattedResponse = formatResponse(data.text);
      const botMessage = { sender: 'bot', text: formattedResponse }; // Assuming the API returns 'text'
      setConversation((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Couldn't fetch place information", error);
      const botMessage = {
        sender: 'bot',
        text: "Sorry, I couldn't fetch information about this place.",
      };
      setConversation((prev) => [...prev, botMessage]);
    }
  };

  const formatResponse = (responseText) => {
    // Remove all unwanted symbols (*, **, #)
    let cleanText = responseText
      .replace(/\*\*|\*/g, '') // Remove bold and italic markdown
      .replace(/#/g, '') // Remove heading symbols
      .replace(/\n/g, '<br>'); // Add line breaks where necessary (if wanted)
  
    return cleanText;
  };
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const handleBook = async () => {
    alert('Booked successfully!');
    try {
      const res = await fetch(`/api/listing/book/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setBooked(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4 justify-start'>
              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
              <p className='bg-blue-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                <button onClick={handleBook}>Book</button>
              </p>
            </div>

            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>

            {/* Chatbot UI */}
            <div className='my-6'>
              <div className='chat-container bg-white p-4 rounded-lg shadow-md max-w-2xl mx-auto'>
                <div className='chat-messages space-y-4'>
                  {conversation.map((msg, index) => (
                    <div
                      key={index}
                      className={`chat-message p-3 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-blue-500 text-white ml-auto'
                          : 'bg-gray-200 text-black mr-auto'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='chat-input mt-4 flex flex-col'>
                <input
                  type='text'
                  value={placeInfo}
                  onChange={(e) => setPlaceInfo(e.target.value)}
                  placeholder='Ask about this place...'
                  className='border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button
                  onClick={handlePlaceQuery}
                  className='mt-3 bg-blue-500 text-white p-3 rounded-lg shadow-sm hover:bg-blue-600'
                >
                  Send
                </button>
              </div>
            </div>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
