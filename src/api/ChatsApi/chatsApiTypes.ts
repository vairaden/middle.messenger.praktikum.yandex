export interface GetChatsParams {
  offset: number;
  limit: number;
  title: string;
}

export interface ChatInfo {
  id: number;
  title: string;
  avatar: string;
  unread_count: number
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    },
    time: string;
    content: string;
  }
}

export interface CreateChatData {
  title: string;
}

export interface DeleteChatData {
  chatId: number;
}

export interface DeleteChatResponse {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
    created_by: number;
  }
}
