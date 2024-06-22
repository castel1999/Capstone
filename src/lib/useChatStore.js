
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useUserStore } from "./useUserStore";

export const useChatStore = create(
    persist(
        // Store
        (set) => ({
            chatId: null,
            user: null,
            isCurrentUserBlocked: false,
            isReceiverBlocked: false,
            setPermanentChatId: (id) => set({ permanentChatId: id }), // Fixed typo from isRecieverBlocked to isReceiverBlocked
            changeChat: (chatId, user) => {
                const currentUser = useUserStore.getState().currentUser;

                // Kiểm tra nếu người dùng hiện tại bị chặn
                if (user.blockedUser.includes(currentUser.userID)) {
                    return set({
                        chatId,
                        user: null,
                        isCurrentUserBlocked: true,
                        isReceiverBlocked: false,
                    });
                }

                // Kiểm tra nếu người nhận bị chặn
                else if (currentUser.blockedUser.includes(user.userID)) {
                    return set({
                        chatId,
                        user,
                        isCurrentUserBlocked: false,
                        isReceiverBlocked: true,
                    });
                } else {
                    return set({
                        chatId,
                        user,
                        isCurrentUserBlocked: false,
                        isReceiverBlocked: false,
                    });
                }
            },
            changeBlock: () => {
                set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
            },
            resetChat: () => {
                set({
                    chatId: null,
                    user: null,
                    isCurrentUserBlocked: false,
                    isReceiverBlocked: false,
                });
            },
        }),
        // Khóa duy nhất cho lưu trữ và cấu hình
        {
            name: 'chat-store',
            getStorage: () => window.localStorage,
        }
    )
);