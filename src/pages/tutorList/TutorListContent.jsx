import { Box, Button, Input } from "@mui/material";
import Modal from "react-modal";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/avatar.png";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "../../utils/LoadingVer2";
import { useAuth } from "../../hooks/AuthContext";
import { useUserStore } from "../../lib/useUserStore";
import { set, update } from "firebase/database";
import { jwtDecode } from "jwt-decode";
import { arrayUnion, collection, serverTimestamp, setDoc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { doc } from "firebase/firestore";
import Chat from "../../components/chat/Chat";
const TutorListContent = ({ data }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const { currentUser, isLoading, fetchCurrentUser } = useUserStore();
  const [userChats, setUserChats] = useState([]);
  const { setShowChat } = useAuth();
  // Kiểm tra chats thay đổi 
  useEffect(() => {
    let unsubscribe = () => { };

    if (currentUser) {
      const userChatsDocRef = doc(db, 'userchats', currentUser.userID);
      unsubscribe = onSnapshot(userChatsDocRef, (snapshot) => {
        const docData = snapshot.data();
        if (docData) {
          setUserChats(docData.chats);
        }
      });
    }

    // clean up
    return () => unsubscribe();
  }, [currentUser]);

  const isReceiverInChats = (chats, receiverId) => {
    return chats?.some(chat => chat.receiverId === receiverId);
  }
  const token = localStorage.getItem("token");
  const handleChat = async (tutor) => {
    setSelectedTutor(tutor);
    if (!token) {
      navigate("/login");
    }
    else if (isReceiverInChats(userChats, selectedTutor.userId)) {
      setShowChat(true);
    }
    else {
      setIsLoadingModal(true);
      setSelectedTutor(tutor);
      setIsOpen(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoadingModal(false);
    }
  };
  const handleRent = () => {
    navigate("/tutor-detail/3");
  };
  const handleClose = () => {
    setIsOpen(false);
  }
  // Handle Send First Message
  const handleSendMessage = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats")
    try {
      const newChatRef = doc(chatRef)
      await setDoc(newChatRef, {
        createAt: serverTimestamp(),
        messages: arrayUnion(
          {
            senderId: currentUser.userID,
            text: message,
            createdAt: new Date(),
          }
        )
      });
      await updateDoc(doc(userChatsRef, selectedTutor.userId), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          isSeen: false,
          lastMessage: message,
          receiverId: currentUser.userID,
          updatedAt: Date.now(),
        })
      });
      await updateDoc(doc(userChatsRef, currentUser.userID), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          isSeen: false,
          lastMessage: ` Bạn: ${message} `,
          receiverId: selectedTutor.userId,
          updatedAt: Date.now(),
        })
      });
      setIsOpen(false);
    } catch (error) {
      console.log("Error when sending message: ", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const id = jwtDecode(token).UserId;
      fetchCurrentUser(id);
    }
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (isLoading) {
      setIsLoadingModal(true);
    }
  }, [isLoading]);
  return (
    <div className="flex flex-col gap-5">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((item, index) => (
          <div
            key={index}
            className="flex flex-row gap-5 border-2 border-gray-400 rounded-md p-5 hover:border-theme w-fit mx-auto"
          >
            <div>
              <img
                src={item?.avatar}
                alt="Avatar"
                className="object-cover border rounded-md size-40"
              />
            </div>
            <div className="w-96">
              <div className="flex flex-row gap-1 font-semibold text-2xl">
                {item?.tutorName}
              </div>
              <div className="flex flex-row items-center gap-2 text-sm text-gray-400">
                {item?.level}
              </div>
              <div className="line-clamp-4">{item?.description}</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row">
                <div className="flex flex-col gap-1 w-28">
                  <div className="font-semibold text-2xl">${item?.pricePerHour}</div>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-center mt-10">
                <div
                  onClick={handleRent}
                  className="border-2 border-black rounded-lg p-3 text-white bg-theme cursor-pointer hover:opacity-90"
                >
                  Thuê
                </div>
                <div
                  onClick={() => handleChat(item)}
                  className="border-2 border-gray-400 rounded-lg p-3 hover:bg-gray-100 cursor-pointer">
                  Nhắn tin
                </div>
              </div>
            </div>
            <Modal
              isOpen={isOpen}
              onRequestClose={handleClose}
              contentLabl="Chat with tutor"
              className=" fixed inset-0 flex items-center justify-center z-50 w-auto transition-all duration-300 ease-in-out"
              overlayClassName="fixed inset-0 bg-gray-600  bg-opacity-20 transition-all duration-300 ease-in-out"
              style={{
                overlay: { opacity: isOpen ? 1 : 0 },
                content: {
                  opacity: isOpen ? 1 : 0, transform: isOpen ? 'scale(1)' : 'scale(0.9)'
                }
              }
              }
            >
              {isLoadingModal ? (
                <Loading />
              ) : (
                <Box sx={{ width: 500, padding: 3 }} className="relative">
                  <CloseIcon onClick={handleClose} className=" z-50 absolute top-8 right-8 cursor-pointer" />
                  <div className="h-auto flex flex-col bg-white p-5 rounded-md relative z-10 w-auto">
                    <div className="my-5 flex flex-col items-center justify-center">
                      <img style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }} src={selectedTutor?.avatar} alt="" />
                      <h2 className=" text-center font-bold my-4 text-[32px]">{selectedTutor ? selectedTutor.tutorName : ""}</h2>
                      <p className="flex text-center justify-center items-center mb-8">
                        Bạn hãy cho tôi biết bạn đang gặp khó khăn ở đâu. Tôi sẽ giúp bạn.
                      </p>
                    </div>
                    <div>
                      <h2 className="font-bold" id="modal-modal-title">GỬI TIN NHẮN ĐẦU TIÊN</h2>
                      <textarea id="modal-modal-description" rows="5" onChange={(e) => setMessage(e.target.value)} className="w-full p-2 border rounded-md" placeholder="Message..."></textarea>
                    </div>
                    <div className="flex w-full justify-end gap-3">
                      <button className="bg-[#6b48f2] hover:bg-blue-700 rounded-lg text-white w-full my-3 font-bold py-3 px-4" onClick={handleSendMessage}>Gửi tin nhắn</button>
                    </div>
                  </div>
                </Box>
              )}
            </Modal>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600">No tutors match the search query</div>
      )}
    </div >
  );
};
export default TutorListContent;
