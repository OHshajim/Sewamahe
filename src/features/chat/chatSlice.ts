// features/chat/chatSlice.ts
import API from "@/lib/axios";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Message {
  _id: string;
  conversationId: string;
  sender: any;
  content: string;
  type: string;
  createdAt: string;
  seenBy: string[];
}

export interface Conversation {
  _id: string;
  participants: any[];
  lastMessage: Message | null;
  updatedAt: string;
}

interface ChatState {
  conversations: Conversation[];
  selectedConversationId: string | null;
  messages: { [conversationId: string]: Message[] };
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  selectedConversationId: null,
  messages: {},
  loading: false,
  error: null,
};

// Fetch all conversations
export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/conversations");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data.message || err.message);
    }
  }
);

// Fetch messages for a conversation
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async ({ conversationId, skip = 0, limit = 20 }: { conversationId: string; skip?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const res = await API.get(`/api/messages/${conversationId}?skip=${skip}&limit=${limit}`);
      return { conversationId, messages: res.data };
    } catch (err: any) {
      return rejectWithValue(err.response?.data.message || err.message);
    }
  }
);

// Send message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ conversationId, content, type = "text" }: { conversationId: string; content: string; type?: string }, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/messages", { conversationId, content, type });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data.message || err.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedConversation: (state, action: PayloadAction<string>) => {
      state.selectedConversationId = action.payload;
    },
    addMessageToConversation: (state, action: PayloadAction<Message>) => {
      const convId = action.payload.conversationId;
      if (!state.messages[convId]) state.messages[convId] = [];
      state.messages[convId].push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => { state.loading = true; })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchMessages.pending, (state) => { state.loading = true; })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages[action.payload.conversationId] = action.payload.messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(sendMessage.fulfilled, (state, action) => {
        const convId = action.payload.conversationId;
        if (!state.messages[convId]) state.messages[convId] = [];
        state.messages[convId].push(action.payload);
        // Update lastMessage in conversation list
        const convIndex = state.conversations.findIndex(c => c._id === convId);
        if (convIndex >= 0) state.conversations[convIndex].lastMessage = action.payload;
      });
  }
});

export const { setSelectedConversation, addMessageToConversation } = chatSlice.actions;
export default chatSlice.reducer;
