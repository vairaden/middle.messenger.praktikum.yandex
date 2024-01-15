import API, {ChatsApi} from '../api/ChatsApi/ChatsApi';
import store from '../utils/Store';
import MessagesController from './MessagesController';
import router from "../utils/Router";

class ChatsController {
  private readonly api: ChatsApi;

  constructor() {
    this.api = API;
  }

  async createChat(title: string) {
    try {
      await this.api.createChat(title);

      this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
      router.go('/500');
    }
  }

  async fetchChats() {
    try {
      const chats = await this.api.getChats();

      chats.map(async (chat) => {
        const token = await this.getChatToken(chat.id);
        if (token) {
          await MessagesController.connect(chat.id, token);
        }
      });

      store.set('chats', chats);
    } catch (e: any) {
      console.error(e.message);
      router.go('/500');
    }
  }

  addUserToChat(id: number, userId: number) {
    try {
      this.api.addUsers(id, [userId]);
    } catch (e: any) {
      console.error(e.message);
      router.go('/500');
    }
  }

  async deleteChat(id: number) {
    try {
      await this.api.deleteChat(id);

      this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
      router.go('/500');
    }
  }

  deleteUserFromChat(id: number, userId: number) {
    try {
      return this.api.deleteUserFromChat(id, userId);
    } catch (e: any) {
      console.error(e.message);
      router.go('/500');
    }

    return null;
  }

  getChatToken(id: number) {
    try {
      return this.api.getChatToken(id);
    } catch (e: any) {
      console.error(e.message);
      router.go('/500');
    }

    return null;
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }

  getChatUsers(id: number) {
    try {
      return this.api.getUsers(id);
    } catch (e: any) {
      console.error(e.message);
      router.go('/500');
    }

    return null;
  }
}

export default new ChatsController();
