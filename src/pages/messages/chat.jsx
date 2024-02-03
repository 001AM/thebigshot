// import React, { useState, useEffect, useContext } from 'react'
// import { Link } from 'react-router-dom'
// import ExampleContext from '../../context/Context'
// import axios from 'axios'
// import { socket, BaseURL } from '../../hooks/socket'
// import { useRef } from 'react'
// function Chat() {
//     const [isMenuOpen, setMenuOpen] = useState(false)
//     const { userid } = useContext(ExampleContext)
//     const [receiverId, setReceiverId] = useState()
//     const [onlineuser, setOnlineuser] = useState([])
//     const [messages, setMessages] = useState({})

//     const handleToggleMenu = () => {
//         setMenuOpen((prev) => !prev)
//     }

//     useEffect(() => {
//         const handleSetUserId = (data) => {
//             setOnlineuser((prevOnlineUsers) =>
//                 prevOnlineUsers.map((user) =>
//                     user.user._id === data.userId ? { ...user, online: data.online } : user
//                 )
//             );

//             if (receiverId && receiverId.user._id === data.userId && receiverId.online !== data.online) {
//                 setReceiverId((prevReceiverId) => ({ ...prevReceiverId, online: data.online }));
//             }
//         };


//         socket.emit('setUserId');
//         socket.on('setUserId', handleSetUserId);

//         return () => {
//             socket.off('setUserId', handleSetUserId);
//         };
//     }, [receiverId?.user?._id])


//     useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 if (receiverId) {
//                     const res = await axios.get(`/api/rec_messages?receiver=${receiverId.user._id}`)
//                     const messagesByDate = {};

//                     res.data.forEach((message) => {
//                         const date = new Date(message?.timestamp).toLocaleDateString();

//                         if (!messagesByDate[date]) {
//                             messagesByDate[date] = [];
//                         }

//                         messagesByDate[date].push(message);
//                     });

//                     setMessages(messagesByDate);
//                 }

//             } catch (error) {
//                 console.error('Error fetching messages:', error)
//             }
//         }

//         // Listen for incoming messages
//         const handleReceiveMessage = (data) => {
//             const date = new Date(data?.timestamp).toLocaleDateString();

//             setMessages((prevDatemessages) => {
//                 const newDatemessages = { ...prevDatemessages };

//                 if (!newDatemessages[date]) {
//                     newDatemessages[date] = [data];
//                 } else {
//                     // Check if the message is already present to avoid duplicates
//                     const isMessagePresent = newDatemessages[date].some((msg) => msg._id === data._id);

//                     if (!isMessagePresent) {
//                         newDatemessages[date].push(data);
//                     }
//                 }

//                 return newDatemessages;
//             });
//         };


//         socket.on('receiveMessage', handleReceiveMessage)

//         fetchMessages()
//         return () => {
//             socket.off('receiveMessage', handleReceiveMessage)
//         }
//     }, [receiverId])
//     console.log(messages, 'messages')

//     const sendMessage = async (content) => {
//         socket.emit('sendMessage', { userid: userid, receiverId: receiverId.user._id, content }, (ack) => {
//             if (ack.success) {
//                 const date = new Date(ack.message?.timestamp).toLocaleDateString();
//                 setMessages((prevDatemessages) => {
//                     const newDatemessages = { ...prevDatemessages };

//                     if (!newDatemessages[date]) {
//                         newDatemessages[date] = [ack.message];
//                     } else {
//                         // Check if the message is already present to avoid duplicates
//                         const isMessagePresent = newDatemessages[date].some((msg) => msg._id === ack.message._id);

//                         if (!isMessagePresent) {
//                             newDatemessages[date].push(ack.message);
//                         }
//                     }

//                     return newDatemessages;
//                 });
//             } else {
//                 console.error('Failed to send message:', ack.error)
//             }
//         })
//     }

//     const handleFormSubmit = async (e) => {
//         e.preventDefault()
//         const content = e.target.message.value.trim()

//         if (content !== '') {
//             try {
//                 await sendMessage(content)
//                 e.target.reset()
//             } catch (error) {
//                 console.error('Error sending message:', error)
//             }
//         }
//     }



//     const registerUser = async () => {
//         try {
//             const res = await axios.get('onlineuser/onlineUsers')
//             console.log(res.data.onlineUsers, '...onlineuser')
//             setOnlineuser(res.data.onlineUsers)
//         } catch (error) {
//             console.error('Error fetching online users:', error)
//         }
//     }
//     useEffect(() => {
//         const removeUserById = (userIdToRemove) => {
//             const isUserPresent = onlineuser.some(user => user.user._id === userIdToRemove)
//             if (isUserPresent) {
//                 const updatedonlineuser = onlineuser.filter(user => user.user._id !== userIdToRemove)
//                 setOnlineuser(updatedonlineuser)
//             }
//         }
//         removeUserById(userid)
//     }, [userid, onlineuser])


//     useEffect(() => {
//         registerUser()
//     }, [])
//     const chatContainerRef = useRef(null)

//     useEffect(() => {
//         scrollToBottom()
//     }, [messages])

//     const scrollToBottom = () => {
//         // Scroll to the bottom of the chat container
//         if (chatContainerRef.current) {
//             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
//         }
//     }
//     return (
//         <div className='flex flex-row p-2 grow h-96'>
//             <div className='w-1/5 p-3 rounded-md bg-cyan-400'>
//                 {onlineuser?.map((user) => (
//                     <div key={user.user.id} className='flex flex-row items-center w-full p-4 border-2 rounded-md bg-slate-300 border-stone-500 h-30' onClick={() => { setReceiverId(user) }}>
//                         <div className="w-100">
//                             <img className="w-16 h-16 rounded-full" src={`${BaseURL}/profile-images/${user?.user?._id}`} alt="User Profile" />
//                             <span className={`relative left-12 bottom-3 block w-3.5 h-3.5 ${user?.online ? 'bg-green-400' : 'bg-gray-400'} border-2 border-white dark:border-gray-800 rounded-full`}></span>
//                         </div>
//                         <div className='flex flex-col pl-5'>
//                             <div className='text-2xl'>{user.user.username}</div>
//                             <div className='h2'>{user.online ? 'Online' : 'Offline'}</div>
//                         </div>
//                     </div>
//                 ))}

//             </div>


//             {
//                 receiverId ? (
//                     <div className='flex flex-col flex-1 w-4/5 h-full pl-2'>
//                         <div className='flex flex-row items-center w-full p-4 rounded-md align-center bg-slate-300 h-30'>
//                             <div className="w-100">
//                                 <img className="w-16 h-16 rounded-full" src={`${BaseURL}/profile-images/${receiverId?.user?._id}`} alt="User Profile" />
//                                 <span className={`relative left-12 bottom-3 block w-3.5 h-3.5 ${receiverId?.online ? 'bg-green-400' : 'bg-gray-400'} border-2 border-white dark:border-gray-800 rounded-full`}></span>
//                             </div>
//                             <div className='flex flex-col pl-5'>
//                                 <div className='text-2xl'>{receiverId?.user.username}</div>
//                                 <div className='h2'>{receiverId?.online ? 'Online' : 'Offline'}</div>
//                             </div>
//                         </div>

//                         <div className="flex-1 p-3 overflow-y-scroll scrollhidden" ref={chatContainerRef}>
//                             {Object.entries(messages).map(([date, messagesByDate]) => (
//                                 <div key={date}>
//                                     <div className="flex justify-center w-full">
//                                         <div className="p-2 text-xs rounded-md date-header bg-slate-300 w-fit">
//                                             {date}
//                                         </div>
//                                     </div>

//                                     {Array.isArray(messagesByDate) ? (
//                                         messagesByDate.map((mess) => (
//                                             userid === mess.sender ? (
//                                                 <div className='mb-4 left-chat'>
//                                                     <div className="flex flex-row-reverse items-start gap-2.5">
//                                                         <img className="w-8 h-8 rounded-full" src={`${BaseURL}/profile-images/${userid}`} alt="Jese" />
//                                                         <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
//                                                             {/* <div className="flex items-center space-x-2 rtl:space-x-reverse">
//                                                                 <span className="text-sm font-semibold text-gray-900 dark:text-white">Me</span>

//                                                             </div> */}
//                                                             <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{mess?.content}</p>
//                                                             <div className='flex flex-row'>
//                                                                 <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
//                                                                 <span className="ml-auto text-sm font-normal text-gray-500 dark:text-gray-400 ">{mess?.timestamp ? new Date(mess?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
//                                                             </div>
//                                                         </div>
//                                                         <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className="inline-flex items-center self-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
//                                                             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
//                                                                 <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
//                                                             </svg>
//                                                         </button>
//                                                         <div id="dropdownDots" className="z-10 hidden w-40 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
//                                                             <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
//                                                                 <li>
//                                                                     <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                             ) : (<div className='mb-4 right-chat'>
//                                                 <div className="flex flex-row items-start gap-2.5">
//                                                     <img className="w-8 h-8 rounded-full" src={`${BaseURL}/profile-images/${receiverId?.user?._id}`} alt="Jese" />
//                                                     <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
//                                                         {/* <div className="flex items-center space-x-2 rtl:space-x-reverse">
//                                                                 <span className="text-sm font-semibold text-gray-900 dark:text-white">Me</span>

//                                                             </div> */}
//                                                         <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{mess?.content}</p>
//                                                         <div className='flex flex-row'>
//                                                             <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
//                                                             <span className="ml-auto text-sm font-normal text-gray-500 dark:text-gray-400 ">{mess?.timestamp ? new Date(mess?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
//                                                         </div>
//                                                     </div>
//                                                     <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className="inline-flex items-center self-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
//                                                         <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
//                                                             <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
//                                                         </svg>
//                                                     </button>
//                                                     <div id="dropdownDots" className="z-10 hidden w-40 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
//                                                         <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
//                                                             <li>
//                                                                 <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</Link>
//                                                             </li>
//                                                             <li>
//                                                                 <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</Link>
//                                                             </li>
//                                                             <li>
//                                                                 <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</Link>
//                                                             </li>
//                                                             <li>
//                                                                 <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</Link>
//                                                             </li>
//                                                             <li>
//                                                                 <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</Link>
//                                                             </li>
//                                                         </ul>
//                                                     </div>
//                                                 </div>
//                                             </div>)
//                                         ))
//                                     ) : (
//                                         <p>Invalid messages structure for date: {date}</p>
//                                     )}
//                                 </div>
//                             ))}

//                         </div>
//                         <div className='flex flex-row items-center'>
//                             <form className='flex flex-row w-full' onSubmit={handleFormSubmit}>
//                                 <input type='text' name="message" placeholder="Type a message..." className='p-2 mx-2 mb-1 border-t rounded-md border-stone-900' style={{ width: '90%' }} />
//                                 <button type="submit" value='submit' className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >Send</button>
//                             </form>

//                             <div className={`fixed bottom-0 right-0 mr-2`}>
//                                 <div className="flex flex-col items-center mb-4 space-y-2">
//                                     <div className={`${isMenuOpen ? 'flex' : 'hidden'}`}>
//                                         {/* Share button */}
//                                         <button
//                                             type="button"
//                                             className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
//                                         >
//                                             {/* SVG for Share button */}
//                                             <svg
//                                                 className="w-5 h-5"
//                                                 aria-hidden="true"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 fill="currentColor"
//                                                 viewBox="0 0 18 18"
//                                             >
//                                                 <path
//                                                     d="M14.419 10.581a3.564 3.564 0 0 0-2.574 1.1l-4.756-2.49a3.54 3.54 0 0 0 .072-.71 3.55 3.55 0 0 0-.043-.428L11.67 6.1a3.56 3.56 0 1 0-.831-2.265c.006.143.02.286.043.428L6.33 6.218a3.573 3.573 0 1 0-.175 4.743l4.756 2.491a3.58 3.58 0 1 0 3.508-2.871Z"
//                                                 />
//                                             </svg>
//                                             <span className="sr-only">Share</span>
//                                         </button>
//                                         {/* Tooltip for Share button */}
//                                         <div
//                                             className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
//                                             role="tooltip"
//                                         >
//                                             Share
//                                             <div className="tooltip-arrow" data-popper-arrow></div>
//                                         </div>
//                                     </div>
//                                     <button
//                                         type="button"
//                                         onClick={handleToggleMenu}
//                                         aria-controls="speed-dial-menu-default"
//                                         aria-expanded={isMenuOpen}
//                                         className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
//                                     >
//                                         <svg
//                                             className={`w-5 h-5 transition-transform ${isMenuOpen ? 'rotate-45' : ''}`}
//                                             aria-hidden="true"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             fill="none"
//                                             viewBox="0 0 18 18"
//                                         >
//                                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
//                                         </svg>
//                                         <span className="sr-only">Open actions menu</span>
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 ) : (
//                     <div className='flex flex-col flex-1 w-4/5 h-full pl-2 '>
//                         <div className='flex items-center justify-center w-full h-full p-4 rounded-md bg-slate-300'>
//                             <h2>Select User</h2>
//                         </div>
//                     </div>
//                 )
//             }


//         </div>

//     )
// }

// export default Chat
