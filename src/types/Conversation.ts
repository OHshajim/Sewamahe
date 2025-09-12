interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
}

export interface Conversation {
    _id: string;
    participants: User[];
    lastMessage?: any;
}
