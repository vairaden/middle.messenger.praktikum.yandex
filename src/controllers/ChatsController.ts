import API, { ChatsApi } from '../api/ChatsApi/ChatsApi';
import store from '../utils/Store';
import MessagesController from './MessagesController';

class ChatsController {
  private readonly api: ChatsApi;

  constructor() {
    this.api = API;
  }

  async createChat(title: string) {
    await this.api.createChat(title);

    this.fetchChats();
  }

  async fetchChats() {
    const chats = await this.api.getChats();

    chats.map(async (chat) => {
      const token = await this.getChatToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set('chats', chats);
  }

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
  }

  async deleteChat(id: number) {
    await this.api.deleteChat(id);

    this.fetchChats();
  }

  getChatToken(id: number) {
    return this.api.getChatToken(id);
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }
}

export default new ChatsController();
