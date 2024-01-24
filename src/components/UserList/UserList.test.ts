import { expect } from 'chai';
import UserList from './UserList.ts';

describe('UserList', () => {
  it('should render', () => {
    new UserList({
      chatId: 1,
      currentUser: 1,
      users: [],
    });
  });

  it('element should return UList element', () => {
    const { element } = new UserList({
      chatId: 1,
      currentUser: 1,
      users: [],
    });

    expect(element)
      .to
      .be
      .instanceof(window.HTMLUListElement);
  });

  it('should render children', () => {
    const users = [
      {
        avatar: 'kek',
        login: 'kek',
        id: 1,
        role: 'kek',
        email: 'kek',
        display_name: 'kek',
        first_name: 'kek',
        second_name: 'kek',
        phone: 'kek',
      }, {
        avatar: 'lol',
        login: 'lol',
        id: 2,
        role: 'lol',
        email: 'lol',
        display_name: 'lol',
        first_name: 'lol',
        second_name: 'lol',
        phone: 'lol',
      },
    ];

    const userList = new UserList({
      chatId: 1,
      currentUser: 1,
      users,
    });

    expect(userList.children.UserListItems)
      .to
      .have
      .lengthOf(2);
  });
});
