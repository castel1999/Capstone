import React, { useEffect, useState, useRef } from "react";
import chatIcon from "../../assets/chat.svg";
import hideIcon from "../../assets/delete.svg";
import dot from "../../assets/dot.svg";
import send from "../../assets/send.svg";
import gallery from "../../assets/gallery.svg";
import chatSetting from "../../assets/chatSetting.svg";
import defaultAvatar from "../../assets/default-avatar.jpg";
import deleteIcon from "../../assets/wastebasket.svg";
import block from "../../assets/block.svg";
import EmojiPicker from "emoji-picker-react";
import { useUserStore } from "../../lib/useUserStore";
import { arrayUnion, doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { set, update } from "firebase/database";
import LoadingVerTwo from "../../utils/LoadingVer2";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../hooks/AuthContext";
import { useChatStore } from "../../lib/useChatStore"
import upload from "../../lib/uploadImg";
const Chat = () => {
  const { showChat } = useAuth();
  const { setShowChat } = useAuth();
  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState("");
  const logged = localStorage.getItem("token") !== null;
  const role = localStorage.getItem("role");
  const { currentUser } = useUserStore();
  const [currentOpponent, setCurrentOponet] = useState(null);
  // Open dropdown chat 
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [chatLists, setChatLists] = useState([])
  const [message, setMessage] = useState([]);
  const [img, setImg] = useState({
    file: null,
    url: "",
  })
  const { chatId, user, changeChat, isCurrentUserBlocked, isRecieverBlocked, setPermanentChatId } = useChatStore();
  console.log(chatId, user);
  useEffect(() => {
    if (currentUser) {
      const unsub = onSnapshot(doc(db, "userchats", currentUser.userID), (doc) => {
        setChat(doc.data());
      });
      return () => {
        unsub();
      }
    }
  }, [currentUser]);
  useEffect(() => {
    if (chatId) {
      // Tạo một hàm bất đồng bộ bên trong useEffect
      const fetchData = async () => {
        const unSub = onSnapshot(doc(db, "chats", chatId), async (res) => {
          console.log("Fetched chat:", res.data());
          setChat(res.data());
        });
        return unSub; // Trả về hàm dọn dẹp
      };

      // Gọi hàm bất đồng bộ và xử lý hàm dọn dẹp
      fetchData().then(unSub => {
        return () => unSub();
      });
    }
  }, [chatId]);

  useEffect(() => {
    if (currentUser) {
      const unsub = onSnapshot(
        doc(db, "userchats", currentUser.userID),
        async (res) => {
          const items = res.data().chats;
          const promises = items.map(async (item) => {
            const userDocRef = doc(db, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);
            const user = userDocSnap.data();
            return { ...item, user };
          });
          const chatData = await Promise.all(promises);
          setChatLists(chatData.sort((a, b) => b.lastMessageAt - a.lastMessageAt));
        });

      return () => {
        unsub();
      };
    }
  }, [currentUser]);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClickEmoji = () => {
    setShowEmoji(!showEmoji);
  };
  // Handel Emoji Click
  const handleEmojiOneClick = (e) => {
    setText((prev) => prev + e.emoji);
  }
  // Handle Send Message 
  const handleSendMessage = async () => {
    if (text.trim() === "") return;
    let imgUrl = null;
    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.userID,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });
      const promises = [currentUser.userID, user.userID].map(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId);
          if (chatIndex !== -1) {
            userChatsData.chats[chatIndex].lastMessage = text;
            userChatsData.chats[chatIndex].isSeen = id === currentUser.userID ? true : false;
            userChatsData.chats[chatIndex].updatedAt = Date.now();
            // await updateDoc(userChatsRef, {
            //   chats: userChatsData.chats,
            // });
          }
        }
      });
      const results = await Promise.allSettled(promises);
      results.forEach((result) => {
        if (result.status === 'rejected') {
          console.error('Error with promise:', result.reason);
        }
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    } finally {
      setImg({
        file: null,
        url: "",
      });
      setText("")
    }
  };
  // Handle Click into the component user 
  const handleOponentClick = async (chat) => {
    const userChats = chatLists.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
    const chatIndex = userChats.findIndex(
      (item) => item.chatId == chat.chatId
    );
    //
    userChats[chatIndex].isSeen = true;
    const userChatsRef = doc(db, "userchats", currentUser.userID);
    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
      setPermanentChatId(chat.chatId)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {logged && role !== "Admin" && role !== "Moderator" ? (
        <div className="fixed right-4 bottom-4 z-[50]">
          {!showChat ? (
            <div
              className="h-fit w-fit rounded-lg bg-white cursor-pointer border-solid border-2 border-black shadow-button hover:translate-x-1 hover:translate-y-1 hover:shadow-none ease-out duration-500"
              onClick={() => setShowChat(true)}
            >
              <div className="h-full w-full px-[16px] py-[12px] relative">
                <img className="h-6 w-6 " src={chatIcon} />
              </div>

              <div className="flex h-6 w-6 absolute -right-1 -top-2 p-1 rounded-full bg-red-500 text-white items-center justify-center">
                1
              </div>
            </div>
          ) : (
            <div className="h-[500px] w-[850px] shadow-lg flex flex-col rounded-lg border-solid border-2 border-black">
              <div className="flex flex-row w-full h-[10%] justify-between px-[10px] pt-[9px] pb-[5px] bg-[#f5f5f5] rounded-t-lg ">
                <div className="flex flex-row items-center justify-center gap-2 ">
                  <img className="h-6 w-6 " src={chatIcon} />
                  <div className="font-medium">Tin nhắn</div>
                </div>
                <div className="flex flex-row items-center">
                  <div
                    className="h-fit w-fit border-solid rounded-full hover:bg-red-600"
                    onClick={() => setShowChat(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 fill-black hover:fill-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="h-[90%] w-full flex flex-row bg-white rounded-lg">
                <div className="flex flex-col h-full w-[35%] p-1 border-t-2 border-r-2  border-solid border-black overflow-y-auto">
                  {Array.isArray(chatLists) ? chatLists.map((chat) => (
                    <div key={chat.id} onClick={() => handleOponentClick(chat)} className="h-fit w-full flex flex-row px-2 py-1 gap-2 items-center hover:bg-gray-200 active:bg-gray-100 rounded-lg">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={chat.user.avatar}
                      />
                      <div className="flex flex-col w-full">
                        <div className=" w-full flex flex-row justify-between">
                          <div className="text-[16px] font-bold text-extra-bold">{chat.user.name}</div>
                          <div className="text-[14px]">{chat.lastMessageAt}</div>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                          <div className="text-[14px] truncate w-[180px]">
                            {chat.lastMessage}
                          </div>
                          <img src={dot} />
                        </div>
                      </div>
                    </div>
                  )) : <div />}
                </div>
                <div className="w-[65%] relative flex flex-col border-t-2 border-solid border-black">
                  <div className="flex flex-row w-full h-[15%] justify-between px-[10px] pt-[9px] pb-[5px] bg-[#DDDDDD] bg-opacity-20 border-b border-gray-300 rounded-t-lg">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full mr-4"
                        src={currentOpponent ? currentOpponent.avatar : ""}
                      />
                      <div className="text-[16px]">{currentOpponent ? currentOpponent.name : ""}</div>
                    </div>
                    <div className="relative">
                      <div className="flex h-fit w-fit  items-center rounded-full ">
                        <button className="cursor-pointer h-full w-fit p-1 border-solid rounded-full hover:bg-red-600" onClick={toggleDropdown}>
                          <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            className="w-6 h-6 fill-black hover:fill-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="absolute z-[10] right-0 top-full w-auto bg-white shadow-lg rounded-lg">
                            <ul className="p-2">
                              <li className=" hover:bg-gray-100 whitespace-nowrap p-2 rounded flex items-center hover:font-bold hover:text-red-500 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" className="w-6 h-6 mr-2">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                {/* <img className="w-5 mr-2" src={deleteIcon} alt="" /> */}
                                <span className="hover:text-bold">Xóa Chat</span>
                              </li>
                              <li className="hover:bg-gray-100  whitespace-nowrap p-2 rounded flex hover:font-bold hover:text-red-500  items-center cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" className="w-6 h-6 mr-2">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                                <span className="">Chặn người dùng</span>
                              </li>
                              <li className="hover:bg-gray-100 p-2 whitespace-nowrap rounded flex hover:font-bold hover:text-red-500  items-center cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" className="w-6 h-6 mr-2">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                                </svg>
                                <span className="">Báo cáo người dùng</span></li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Message Site */}
                  <div className="h-[90%] w-full px-4 py-6 flex flex-col gap-2 overflow-y-auto">
                    {chat?.messages?.map((message) => {
                      console.log("Rending message:", message);
                      const isCurrentUser = message.senderId === currentUser.userID;
                      return (
                        <div className={`flex flex-row gap-4 h-auto ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                          {message.senderId !== currentUser.userID && (
                            <img className="h-9 w-9 rounded-full" src="/src/assets/default-avatar.jpg" />
                          )}
                          <div className="max-w-[47%] flex flex-col gap-2">
                            <div className={`${isCurrentUser ? 'order-last' : 'order-first'} flex justify-between`}>
                              <div
                                className={`${!isCurrentUser
                                  ? 'message-opponent text-lg px-4 py-2 bg-gray-300 text-black rounded-t-xl rounded-br-xl rounded-bl-none flex justify-start'
                                  : 'hidden'
                                  }`}
                              >
                                {!isCurrentUser && message.text}
                              </div>
                              <div
                                className={`${isCurrentUser
                                  ? 'message-owner flex-end w-full text-lg px-4 py-2 bg-purple-700 text-white rounded-t-xl rounded-bl-xl rounded-br-none flex justify-end'
                                  : 'hidden'
                                  }`}
                              >
                                {isCurrentUser && message.text}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Input Site */}
                  <div className="flex flex-row h-1/10 w-full px-3 py-2 border-t-2 border-black gap-3 ">
                    <label className="flex align-items-center">
                      <img src={gallery} />
                      <input type="file" hidden />
                    </label>
                    <div className="relative w-full">
                      <input
                        className="w-full px-3 py-2 rounded-lg bg-gray-200 outline-none"
                        placeholder="Hãy viết gì đó"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" className="absolute right-3 top-1/2 transform -translate-y-1/2 size-6" onClick={handleClickEmoji}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                      </svg>
                      {showEmoji && (
                        <div className="absolute bottom-[50px] right-0">
                          <EmojiPicker
                            onEmojiClick={handleEmojiOneClick}
                          />
                        </div>
                      )}
                    </div>
                    <button onClick={handleSendMessage}>
                      <img src={send} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div >
      ) : (
        ""
      )}
    </>
  );
};

export default Chat;
