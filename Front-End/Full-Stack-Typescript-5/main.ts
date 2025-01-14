interface IChat {
  id: number;
  ownerId: number;
  messages: IMessage[];
}

interface IMessage {
  id: number;
  chatId: number;
  userId: number;
  content: string;
  feedback?: string;
  createdAt: Date;
}

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface IDatabaseResource<T> {
  get(id: number): Promise<T | null>;

  getAll(): Promise<T[]>;
}

class ChatResource implements IDatabaseResource<IChat> {
  async get(id: number): Promise<IChat | null> {
      return null;
  }

  async getAll(): Promise<IChat[]> {
      return [];
  }
}

class UserResource implements IDatabaseResource<IUser> {

  async get(id: number): Promise<IUser | null> {
      return null;
  }

  async getAll(): Promise<IUser[]> {
      return [];
  }

  async getIdFromToken(id: string): Promise<number | null> {
      return 0;
  }
}

class AuthenticationService {
  async isAuthenticated(token: string): Promise<boolean> {
      return true;
  }
}

class ChatService {
  private chatResource: ChatResource = new ChatResource();
  private userResource: UserResource = new UserResource();
  private authService: AuthenticationService = new AuthenticationService();


  async getChatMessages(chatId: number, token: string): Promise<IMessage[] | null> {
      if (!await this.authService.isAuthenticated(token)) {
          throw new Error('User not authenticated');
      }

      const userId = await this.userResource.getIdFromToken(token);
      const user = await this.userResource.get(userId!);
      const chat = await this.chatResource.get(chatId);

      if (!chat || chat.ownerId !== user?.id) {
          throw new Error('Chat not found or access denied');
      }

      return chat.messages;
  }
}


const chatService = new ChatService();

async function getChatMessages(chatId: number, token: string) {
  try {
      const messages = await chatService.getChatMessages(chatId, token);
      return {success: true, messages};
  } catch (error) {
      return {success: false, message: 'Internal server error'}
  }
}

function narrowToNumber(value: unknown): number {
  if (typeof value !== 'number') {
      throw new Error('Value is not a number');
  }
  return value;
}

async function getChatMessagesWithNarrowing(chatId: unknown, req: { authorization: string }) {
  const authToken = req.authorization;
  const numberChatId = narrowToNumber(chatId);
  const messages = await chatService.getChatMessages(numberChatId, authToken);
  if (messages !== null) {
      messages.map((message) => {
          console.log(`Message ID: ${message.id}, Feedback: ${message.feedback?.trim() ?? "no feedback"}`);
      });
      return {success: true, messages}
  } else {
      return {success: false, message: 'Chat not found or access denied'}
  }
}
