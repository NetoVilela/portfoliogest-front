import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../index';
import { ChatStateProps } from 'types/chat';
import api from 'services/api';

const initialState: ChatStateProps = {
  error: null,
  chats: [],
  user: {},
  users: []
};

const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET USER
    getUserSuccess(state, action) {
      state.user = action.payload;
    },

    // GET USER CHATS
    getUserChatsSuccess(state, action) {
      state.chats = action.payload;
    },

    // GET USERS
    getUsersSuccess(state, action) {
      state.users = action.payload;
    }
  }
});

// Reducer
export default chat.reducer;

export function getUser(id: number) {
  return async () => {
    try {
      const response = await api.post('/api/chat/users/id', { id });
      dispatch(chat.actions.getUserSuccess(response.data));
    } catch (error) {
      dispatch(chat.actions.hasError(error));
    }
  };
}

export function getUserChats(user: string | undefined) {
  return async () => {
    try {
      const response = await api.post('/api/chat/filter', { user });
      dispatch(chat.actions.getUserChatsSuccess(response.data));
    } catch (error) {
      dispatch(chat.actions.hasError(error));
    }
  };
}

export function insertChat(chat: any) {
  return async () => {
    try {
      await api.post('/api/chat/insert', chat);
    } catch (error) {
      dispatch(chat.actions.hasError(error));
    }
  };
}

export function getUsers() {
  return async () => {
    try {
      const response = await api.get('/api/chat/users');
      dispatch(chat.actions.getUsersSuccess(response.data.users));
    } catch (error) {
      dispatch(chat.actions.hasError(error));
    }
  };
}
