import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db, storage } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
export const useUserStore = create(
    persist(
        // Store
        (set) => ({
            currentUser: null,
            isLoading: true,
            fetchCurrentUser: async (userID) => {
                try {
                    if (!userID) {
                        return set({ currentUser: null, isLoading: false });
                    }
                    const docRef = doc(db, "users", userID);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        set({ currentUser: docSnap.data(), isLoading: false });
                    } else {
                        set({ currentUser: null, isLoading: false });
                    }
                } catch (error) {
                    console.log("Lỗi khi fetch dữ liệu từ Firestore:", error);
                    set({ currentUser: null, isLoading: false });
                }
            },
        }),
        // Key duy nhất cho store và cấu hình lưu trữ
        {
            name: 'user-store',
            storage: window.localStorage,
        }
    )
);