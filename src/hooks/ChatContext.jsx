
export const ChatProvider = ({ children }) => {
    const [isChatOpen, setChatIsOpen] = useState(false);

    return (
        <ChatContext.Provider value={{ isChatOpen, setChatIsOpen }}>
            {children}
        </ChatContext.Provider>
    );
} 