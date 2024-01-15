import BaseAPI from '../BaseAPI';
import { ChatInfo } from './chatsApiTypes';
import { User } from '../AuthApi/authApiTypes';

export class ChatsApi extends BaseAPI {
  constructor() {
    super('/chats');
  }

  createChat(title: string) {
    return this.http.post('/', { title });
  }

  deleteChat(id: number): Promise<unknown> {
    return this.http.delete('/', { chatId: id });
  }

  getChats(): Promise<ChatInfo[]> {
    return this.http.get('/');
  }

  getUsers(id: number): Promise<Array<User & { role: string }>> {
    return this.http.get(`/${id}/users`);
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', { users, chatId: id });
  }

  deleteUserFromChat(id: number, userId: number) {
    return this.http.delete('/users', { chatId: id, users: [userId] });
  }

  changeChatAvatar(data: FormData) {
    return this.http.put('/avatar', data);
  }

  async getChatToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }
}

export default new ChatsApi();
