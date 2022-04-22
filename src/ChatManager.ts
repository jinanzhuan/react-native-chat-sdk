import type { NativeEventEmitter } from 'react-native';
import {
  ChatConversation,
  ChatConversationType,
} from './common/ChatConversation';
import { ChatCursorResult } from './common/ChatCursorResult';
import { ChatError } from './common/ChatError';
import { ChatGroupMessageAck } from './common/ChatGroup';
import {
  ChatMessage,
  ChatMessageStatus,
  ChatMessageStatusCallback,
} from './common/ChatMessage';
import {
  MethodTypeackConversationRead,
  MethodTypeackGroupMessageRead,
  MethodTypeackMessageRead,
  MethodTypeasyncFetchGroupAcks,
  MethodTypedeleteConversation,
  MethodTypedeleteRemoteConversation,
  MethodTypedownloadAttachment,
  MethodTypedownloadThumbnail,
  MethodTypefetchHistoryMessages,
  MethodTypegetConversation,
  MethodTypegetConversationsFromServer,
  MethodTypegetMessage,
  MethodTypegetUnreadMessageCount,
  MethodTypeimportMessages,
  MethodTypeloadAllConversations,
  MethodTypemarkAllChatMsgAsRead,
  MethodTypeonCmdMessagesReceived,
  MethodTypeonConversationHasRead,
  MethodTypeonConversationUpdate,
  MethodTypeonGroupMessageRead,
  MethodTypeonMessageError,
  MethodTypeonMessageProgressUpdate,
  MethodTypeonMessagesDelivered,
  MethodTypeonMessagesRead,
  MethodTypeonMessagesRecalled,
  MethodTypeonMessagesReceived,
  MethodTypeonMessageSuccess,
  MethodTyperecallMessage,
  MethodTyperesendMessage,
  MethodTypesearchChatMsgFromDB,
  MethodTypesendMessage,
  MethodTypeupdateChatMessage,
} from './_internal/Consts';
import { Native } from './_internal/Native';

/**
 * The message search directions.
 */
export enum ChatSearchDirection {
  /**
   * Messages are retrieved in the reverse chronological order of the timestamp included in them.
   */
  UP,
  /**
   * Messages are retrieved in the chronological order of the timestamp included in them.
   */
  DOWN,
}

/**
 * The message event listener.
 *
 * This listener is used to check whether messages are received. If messages are sent successfully, a delivery receipt will be returned (delivery receipt needs to be enabled: {@link ChatOptions#requireDeliveryAck(boolean)}.
 *
 * If the peer user reads the received message, a read receipt will be returned (read receipt needs to be enabled: {@link ChatOptions#requireAck(boolean)})
 *
 * During message delivery, the message ID will be changed from a local uuid to a global unique ID that is generated by the server to uniquely identify a message on all devices using the SDK.
 * This API should be implemented in the app to listen for message status changes.
 *
 * Adds the message listener:
 *   ```typescript
 *   let msgListener = new (class ss implements ChatManagerListener {
 *     onMessagesReceived(messages: ChatMessage[]): void {
 *       console.log('ConnectScreen.onMessagesReceived', messages);
 *     }
 *     onCmdMessagesReceived(messages: ChatMessage[]): void {
 *       console.log('ConnectScreen.onCmdMessagesReceived', messages);
 *     }
 *     onMessagesRead(messages: ChatMessage[]): void {
 *       console.log('ConnectScreen.onMessagesRead', messages);
 *     }
 *     onGroupMessageRead(groupMessageAcks: ChatGroupMessageAck[]): void {
 *       console.log('ConnectScreen.onGroupMessageRead', groupMessageAcks);
 *     }
 *     onMessagesDelivered(messages: ChatMessage[]): void {
 *       console.log('ConnectScreen.onMessagesDelivered', messages);
 *     }
 *     onMessagesRecalled(messages: ChatMessage[]): void {
 *       console.log('ConnectScreen.onMessagesRecalled', messages);
 *     }
 *     onConversationsUpdate(): void {
 *       console.log('ConnectScreen.onConversationsUpdate');
 *     }
 *     onConversationRead(from: string, to?: string): void {
 *       console.log('ConnectScreen.onConversationRead', from, to);
 *     }
 *   })();
 *   ChatClient.getInstance().chatManager.addListener(msgListener);
 *   ```
 *
 * Removes the message listener:
 *   ```typescript
 *   ChatClient.getInstance().chatManager.delListener(this.msgListener);
 *   ```
 */
export interface ChatManagerListener {
  /**
   * Occurs when a message is received.
   *
   * This callback is triggered to notify the user when a message such as texts or an image, video, voice, location, or file is received.
   *
   * @param messages The received messages.
   */
  onMessagesReceived(messages: Array<ChatMessage>): void;

  /**
   * Occurs when a command message is received.
   *
   * This callback only contains a command message body that is usually invisible to users.
   *
   * @param messages The received command messages.
   */
  onCmdMessagesReceived(messages: Array<ChatMessage>): void;

  /**
   * Occurs when a read receipt is received for a message.
   *
   * @param messages The read message(s).
   */
  onMessagesRead(messages: Array<ChatMessage>): void;

  /**
   * Occurs when a read receipt is received for a group message.
   *
   * @param groupMessageAcks The group message read receipt.
   */
  onGroupMessageRead(groupMessageAcks: Array<ChatGroupMessageAck>): void;

  /**
   * Occurs when a delivery receipt is received.
   *
   * @param messages The delivered message.
   */
  onMessagesDelivered(messages: Array<ChatMessage>): void;

  /**
   * Occurs when a received message is recalled.
   *
   * @param messages The recalled message.
   */
  onMessagesRecalled(messages: Array<ChatMessage>): void;

  /**
   * Occurs when the conversation is updated.
   */
  onConversationsUpdate(): void;

  /**
   * Occurs when received conversation read receipt.
   *
   * This callback occurs in either of the following scenarios:
   * - The message is read by the recipient (The conversation receipt is sent). Upon receiving this event, the SDK sets the `isAcked` property of the message in the conversation to `true` in the local database.
   *
   * - In the multi-device login scenario, when one device sends a conversation receipt,
   * the server will set the number of unread messages to 0, and the callback occurs on the other devices. and sets the `isRead` property of the message in the conversation to `true` in the local database.
   * @param from The user who sends the read receipt.
   * @param to The user who receives the read receipt.
   */
  onConversationRead(from: string, to?: string): void;
}

/**
 * The chat manager class, responsible for sending and receiving messages, loading and deleting conversations, and downloading attachments.
 *
 * The sample code for sending a text message:
 *
 *  ```typescript
 *  let msg = ChatMessage.createTextMessage(
 *    'asteriskhx2',
 *    Date.now().toString(),
 *    ChatMessageChatType.PeerChat
 *  );
 *  let callback = new (class s implements ChatMessageStatusCallback {
 *    onProgress(progress: number): void {
 *      console.log('ConnectScreen.sendMessage.onProgress ', progress);
 *    }
 *    onError(error: ChatError): void {
 *      console.log('ConnectScreen.sendMessage.onError ', error);
 *    }
 *    onSuccess(): void {
 *      console.log('ConnectScreen.sendMessage.onSuccess');
 *    }
 *    onReadAck(): void {
 *      console.log('ConnectScreen.sendMessage.onReadAck');
 *    }
 *    onDeliveryAck(): void {
 *      console.log('ConnectScreen.sendMessage.onDeliveryAck');
 *    }
 *    onStatusChanged(status: ChatMessageStatus): void {
 *      console.log('ConnectScreen.sendMessage.onStatusChanged ', status);
 *    }
 *  })();
 *  ChatClient.getInstance()
 *    .chatManager.sendMessage(msg, callback)
 *    .then((nmsg: ChatMessage) => {
 *      console.log(`${msg}, ${nmsg}`);
 *    })
 *    .catch();
 *  ```
 */
export class ChatManager extends Native {
  static TAG = 'ChatManager';

  private _messageListeners: Set<ChatManagerListener>;
  private _eventEmitter?: NativeEventEmitter;

  constructor() {
    super();
    this._messageListeners = new Set<ChatManagerListener>();
  }

  public setNativeListener(eventEmitter: NativeEventEmitter) {
    this._eventEmitter = eventEmitter;
    eventEmitter.removeAllListeners(MethodTypeonMessagesReceived);
    eventEmitter.addListener(
      MethodTypeonMessagesReceived,
      this.onMessagesReceived.bind(this)
    );
    eventEmitter.removeAllListeners(MethodTypeonCmdMessagesReceived);
    eventEmitter.addListener(
      MethodTypeonCmdMessagesReceived,
      this.onCmdMessagesReceived.bind(this)
    );
    eventEmitter.removeAllListeners(MethodTypeonMessagesRead);
    eventEmitter.addListener(
      MethodTypeonMessagesRead,
      this.onMessagesRead.bind(this)
    );
    eventEmitter.removeAllListeners(MethodTypeonGroupMessageRead);
    eventEmitter.addListener(
      MethodTypeonGroupMessageRead,
      this.onGroupMessageRead.bind(this)
    );
    eventEmitter.removeAllListeners(MethodTypeonMessagesDelivered);
    eventEmitter.addListener(
      MethodTypeonMessagesDelivered,
      this.onMessagesDelivered.bind(this)
    );
    eventEmitter.removeAllListeners(MethodTypeonMessagesRecalled);
    eventEmitter.addListener(
      MethodTypeonMessagesRecalled,
      this.onMessagesRecalled.bind(this)
    );
    eventEmitter.removeAllListeners(MethodTypeonConversationUpdate);
    eventEmitter.addListener(
      MethodTypeonConversationUpdate,
      this.onConversationsUpdate.bind(this)
    );
    eventEmitter.removeAllListeners(MethodTypeonConversationHasRead);
    eventEmitter.addListener(
      MethodTypeonConversationHasRead,
      this.onConversationHasRead.bind(this)
    );
  }

  private onMessagesReceived(messages: any[]): void {
    console.log(`${ChatManager.TAG}: onMessagesReceived: ${messages}`);
    this._messageListeners.forEach((listener: ChatManagerListener) => {
      let list: Array<ChatMessage> = [];
      messages.forEach((message: any) => {
        let m = ChatMessage.createReceiveMessage(message);
        list.push(m);
      });
      listener.onMessagesReceived(list);
    });
  }
  private onCmdMessagesReceived(messages: any[]): void {
    console.log(`${ChatManager.TAG}: onCmdMessagesReceived: ${messages}`);
    this._messageListeners.forEach((listener: ChatManagerListener) => {
      let list: Array<ChatMessage> = [];
      messages.forEach((message: any) => {
        let m = ChatMessage.createReceiveMessage(message);
        list.push(m);
      });
      listener.onCmdMessagesReceived(list);
    });
  }
  private onMessagesRead(messages: any[]): void {
    console.log(`${ChatManager.TAG}: onMessagesRead: ${messages}`);
    this._messageListeners.forEach((listener: ChatManagerListener) => {
      let list: Array<ChatMessage> = [];
      messages.forEach((message: any) => {
        let m = ChatMessage.createReceiveMessage(message);
        list.push(m);
      });
      listener.onMessagesRead(list);
    });
  }
  private onGroupMessageRead(messages: any[]): void {
    console.log(`${ChatManager.TAG}: onGroupMessageRead: ${messages}`);
    this._messageListeners.forEach((listener: ChatManagerListener) => {
      let list: Array<ChatGroupMessageAck> = [];
      messages.forEach((message: any) => {
        let m = new ChatGroupMessageAck(message);
        list.push(m);
      });
      listener.onGroupMessageRead(messages);
    });
  }
  private onMessagesDelivered(messages: any[]): void {
    console.log(`${ChatManager.TAG}: onMessagesDelivered: ${messages}`);
    this._messageListeners.forEach((listener: ChatManagerListener) => {
      let list: Array<ChatMessage> = [];
      messages.forEach((message: any) => {
        let m = ChatMessage.createReceiveMessage(message);
        list.push(m);
      });
      listener.onMessagesDelivered(list);
    });
  }
  private onMessagesRecalled(messages: any[]): void {
    console.log(`${ChatManager.TAG}: onMessagesRecalled: ${messages}`);
    this._messageListeners.forEach((listener: ChatManagerListener) => {
      let list: Array<ChatMessage> = [];
      messages.forEach((message: any) => {
        let m = ChatMessage.createReceiveMessage(message);
        list.push(m);
      });
      listener.onMessagesRecalled(list);
    });
  }
  private onConversationsUpdate(): void {
    console.log(`${ChatManager.TAG}: onConversationsUpdate: `);
    this._messageListeners.forEach((listener: ChatManagerListener) => {
      listener.onConversationsUpdate();
    });
  }
  private onConversationHasRead(params: any): void {
    console.log(`${ChatManager.TAG}: onConversationHasRead: ${params}`);
    this._messageListeners.forEach((listener: ChatManagerListener) => {
      let from = params?.from;
      let to = params?.to;
      listener.onConversationRead(from, to);
    });
  }

  private static handleSendMessageCallback(
    self: ChatManager,
    message: ChatMessage,
    callback?: ChatMessageStatusCallback
  ): void {
    if (callback && self._eventEmitter) {
      const subscription = self._eventEmitter.addListener(
        MethodTypesendMessage,
        (params: any) => {
          const localMsgId: string = params.localTime.toString();
          if (message.localMsgId === localMsgId) {
            const callbackType: String = params.callbackType;
            if (callbackType === MethodTypeonMessageSuccess) {
              const m = params.message;
              callback.onSuccess(new ChatMessage(m));
              subscription.remove();
            } else if (callbackType === MethodTypeonMessageError) {
              const e = params.error;
              callback.onError(localMsgId, new ChatError(e));
              subscription.remove();
            } else if (callbackType === MethodTypeonMessageProgressUpdate) {
              const progress: number = params.progress;
              callback.onProgress(localMsgId, progress);
            }
          }
        }
      );
    }
  }

  /**
   * Adds a message listener.
   * @param listener The message listener.
   */
  public addListener(listener: ChatManagerListener): void {
    this._messageListeners.add(listener);
  }

  /**
   * Removes the message listener.
   * @param listener The message listener.
   */
  public removeListener(listener: ChatManagerListener): void {
    this._messageListeners.delete(listener);
  }

  /**
   * Removes all message listeners.
   */
  public removeAllListener(): void {
    this._messageListeners.clear();
  }

  /**
   * Sends a message.
   *
   * For a voice or image or a message with an attachment, the SDK will automatically upload the attachment.
   * You can determine whether to upload the attachment to the chat sever by setting {@link ChatOptions}.
   * @param message The message object to be sent. It is required.
   * @param callback The listener that listens for message changes.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async sendMessage(
    message: ChatMessage,
    callback?: ChatMessageStatusCallback
  ): Promise<void> {
    console.log(
      `${ChatManager.TAG}: sendMessage: ${message.msgId}, ${message.localTime}`,
      message
    );
    message.status = ChatMessageStatus.PROGRESS;
    ChatManager.handleSendMessageCallback(this, message, callback);
    let r: any = await Native._callMethod(MethodTypesendMessage, {
      [MethodTypesendMessage]: message,
    });
    Native.hasErrorFromResult(r);
  }

  /**
   * Resends a message.
   *
   * @param message The message object to be resent.
   * @param callback The listener that listens for message changes.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async resendMessage(
    message: ChatMessage,
    callback: ChatMessageStatusCallback
  ): Promise<void> {
    console.log(
      `${ChatManager.TAG}: resendMessage: ${message.msgId}, ${message.localTime}`
    );
    if (
      message.msgId !== message.localMsgId &&
      message.status === ChatMessageStatus.SUCCESS
    ) {
      callback.onError(
        message.localMsgId,
        new ChatError({ code: 1, description: 'message has send success' })
      );
    }
    message.status = ChatMessageStatus.PROGRESS;
    ChatManager.handleSendMessageCallback(this, message, callback);
    let r: any = await Native._callMethod(MethodTyperesendMessage, {
      [MethodTypesendMessage]: message,
    });
    Native.hasErrorFromResult(r);
  }

  /**
   * Sends the read receipt to the server.
   *
   * This method applies to one-to-one chats only.
   *
   * **Warning**
   * This method only takes effect if you set {@link ChatOptions#requireAck(bool)} as `true`.
   *
   * **Note**
   * To send the group message read receipt, call {@link #sendGroupMessageReadAck(String, String, String)}.
   *
   * We recommend that you call {@link #sendConversationReadAck(String)} when entering a chat page, and call this method to reduce the number of method calls.
   *
   * @param message The failed message.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async sendMessageReadAck(message: ChatMessage): Promise<void> {
    console.log(
      `${ChatManager.TAG}: sendMessageReadAck: ${message.msgId}, ${message.localTime}`
    );
    let r: any = await Native._callMethod(MethodTypeackMessageRead, {
      [MethodTypeackMessageRead]: {
        to: message.from,
        msg_id: message.msgId,
      },
    });
    Native.hasErrorFromResult(r);
  }

  /**
   * Sends the group message receipt to the server.
   *
   * You can call the method only after setting the following method: {@link ChatOptions#requireAck(bool)} and {@link ChatMessage#needGroupAck(bool)}.
   *
   * **Note**
   * - This method takes effect only after you set {@link ChatOptions#requireAck} and {@link ChatMessage#needGroupAck} as `true`.
   * - This method applies to group messages only. To send a one-to-one chat message receipt, call {@link sendMessageReadAck}; to send a conversation receipt, call {@link sendConversationReadAck}.
   *
   * @param msgId The message ID.
   * @param groupId The group ID.
   * @param opt The extension information, which is a custom keyword that specifies a custom action or command.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async sendGroupMessageReadAck(
    msgId: string,
    groupId: string,
    opt?: { content: string }
  ): Promise<void> {
    console.log(
      `${ChatManager.TAG}: sendGroupMessageReadAck: ${msgId}, ${groupId}`
    );
    let s = opt?.content
      ? {
          msg_id: msgId,
          group_id: groupId,
          content: opt?.content,
        }
      : {
          msg_id: msgId,
          group_id: groupId,
        };
    let r: any = await Native._callMethod(MethodTypeackGroupMessageRead, {
      [MethodTypeackGroupMessageRead]: s,
    });
    Native.hasErrorFromResult(r);
  }

  /**
   * Sends the conversation read receipt to the server. This method is valid only for one-to-one chat conversations.
   *
   * This method informs the server to set the unread messages count of the conversation to `0`. In multi-device scenarios, all the devices receive the {@link ChatManagerListener#onConversationRead(String, String)} callback.
   * @param convId The conversation ID.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async sendConversationReadAck(convId: string): Promise<void> {
    console.log(`${ChatManager.TAG}: sendConversationReadAck: ${convId}`);
    let r: any = await Native._callMethod(MethodTypeackConversationRead, {
      [MethodTypeackConversationRead]: {
        convId: convId,
      },
    });
    Native.hasErrorFromResult(r);
  }

  /**
   * Recalls the sent message.
   *
   * @param msgId The message ID.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async recallMessage(msgId: string): Promise<void> {
    console.log(`${ChatManager.TAG}: recallMessage: ${msgId}`);
    let r: any = await Native._callMethod(MethodTyperecallMessage, {
      [MethodTyperecallMessage]: {
        msg_id: msgId,
      },
    });
    Native.hasErrorFromResult(r);
  }

  /**
   * Loads a message from the local database by message ID.
   *
   * @param msgId The message ID.
   * @returns The message.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async getMessage(msgId: string): Promise<ChatMessage> {
    console.log(`${ChatManager.TAG}: getMessage: ${msgId}`);
    let r: any = await Native._callMethod(MethodTypegetMessage, {
      [MethodTypegetMessage]: {
        msg_id: msgId,
      },
    });
    Native.hasErrorFromResult(r);
    return new ChatMessage(r?.[MethodTypegetMessage]);
  }

  /**
   * Gets the conversation by conversation ID and conversation type.
   *
   * @param convId The conversation ID.
   * @param convType The conversation type: {@link ChatConversationType}.
   * @param createIfNeed Whether to create a conversation if the specified conversation is not found:
   * - `true`: Yes.
   * - `false`: No.
   *
   * @returns The conversation object found according to the conversation ID and type. Returns null if the conversation is not found.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async getConversation(
    convId: string,
    convType: ChatConversationType,
    createIfNeed: boolean = true
  ): Promise<ChatConversation> {
    console.log(
      `${ChatManager.TAG}: getConversation: ${convId}, ${convType}, ${createIfNeed}`
    );
    let r: any = await Native._callMethod(MethodTypegetConversation, {
      [MethodTypegetConversation]: {
        con_id: convId,
        type: convType as number,
        createIfNeed: createIfNeed,
      },
    });
    Native.hasErrorFromResult(r);
    return new ChatConversation(r?.[MethodTypegetConversation]);
  }

  /**
   * Marks all messages as read.
   *
   * This method is for the local conversations only.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async markAllConversationsAsRead(): Promise<void> {
    console.log(`${ChatManager.TAG}: markAllConversationsAsRead: `);
    let r: any = await Native._callMethod(MethodTypemarkAllChatMsgAsRead);
    Native.hasErrorFromResult(r);
  }

  /**
   * Gets the count of the unread messages.
   *
   * @returns The count of the unread messages.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async getUnreadMessageCount(): Promise<number> {
    console.log(`${ChatManager.TAG}: getUnreadMessageCount: `);
    let r: any = await Native._callMethod(MethodTypegetUnreadMessageCount);
    Native.hasErrorFromResult(r);
    return r?.[MethodTypegetUnreadMessageCount] as number;
  }

  /**
   * Updates the local message.
   *
   * @param message The message will be updated both in the cache and local database.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async updateMessage(message: ChatMessage): Promise<void> {
    console.log(
      `${ChatManager.TAG}: updateMessage: ${message.msgId}, ${message.localTime}`
    );
    let r: any = await Native._callMethod(MethodTypeupdateChatMessage, {
      [MethodTypeupdateChatMessage]: {
        message: message,
      },
    });
    Native.hasErrorFromResult(r);
  }

  /**
   * Imports messages to the local database.
   *
   * Before importing, ensure that the message sender or recipient is the current user.
   *
   * @param messages The message list.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async importMessages(messages: Array<ChatMessage>): Promise<void> {
    console.log(`${ChatManager.TAG}: importMessages: ${messages.length}`);
    let r: any = await Native._callMethod(MethodTypeimportMessages, {
      [MethodTypeimportMessages]: {
        messages: messages,
      },
    });
    Native.hasErrorFromResult(r);
  }

  /**
   * Downloads the attachment files from the server.
   *
   * You can call the method again if the attachment download fails.
   *
   * @param message The message with the attachment that is to be downloaded.
   * @param callback The listener that Listen for message changes.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async downloadAttachment(
    message: ChatMessage,
    callback?: ChatMessageStatusCallback
  ): Promise<void> {
    console.log(
      `${ChatManager.TAG}: downloadAttachment: ${message.msgId}, ${message.localTime}`
    );
    ChatManager.handleSendMessageCallback(this, message, callback);
    let r: any = await Native._callMethod(MethodTypedownloadAttachment, {
      [MethodTypedownloadAttachment]: {
        message: message,
      },
    });
    Native.hasErrorFromResult(r);
  }

  /**
   * Downloads the thumbnail.
   *
   * @param message The message object.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async downloadThumbnail(
    message: ChatMessage,
    callback?: ChatMessageStatusCallback
  ): Promise<void> {
    console.log(
      `${ChatManager.TAG}: downloadThumbnail: ${message.msgId}, ${message.localTime}`
    );
    ChatManager.handleSendMessageCallback(this, message, callback);
    let r: any = await Native._callMethod(MethodTypedownloadThumbnail, {
      [MethodTypedownloadThumbnail]: {
        message: message,
      },
    });
    Native.hasErrorFromResult(r);
  }

  /**
   * Gets all conversations from the local database.
   *
   * Conversations will be first loaded from the memory. If no conversation is found, the SDK loads from the local database.
   *
   * @returns All the conversations from the the local memory or local database.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async loadAllConversations(): Promise<Array<ChatConversation>> {
    console.log(`${ChatManager.TAG}: loadAllConversations:`);
    let r: any = await Native._callMethod(MethodTypeloadAllConversations);
    Native.hasErrorFromResult(r);
    let ret = new Array<ChatConversation>(10);
    (r?.[MethodTypeloadAllConversations] as Array<any>).forEach((element) => {
      ret.push(new ChatConversation(element));
    });
    return ret;
  }

  /**
   * Gets the conversation list from the server.
   *
   * To use this function, you need to contact our business manager to activate it.
   * After this function is activated, users can pull 10 conversations within 7 days by default (each conversation contains the latest historical message).
   * If you want to adjust the number of conversations or time limit, please contact our business manager.
   *
   * @returns The conversation list of the current user.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async getConversationsFromServer(): Promise<Array<ChatConversation>> {
    console.log(`${ChatManager.TAG}: getConversationsFromServer:`);
    let r: any = await Native._callMethod(MethodTypegetConversationsFromServer);
    Native.hasErrorFromResult(r);
    let ret = new Array<ChatConversation>(10);
    (r?.[MethodTypegetConversationsFromServer] as Array<any>).forEach(
      (element) => {
        ret.push(new ChatConversation(element));
      }
    );
    return ret;
  }

  /**
   * Deletes a conversation and its related messages from the local database.
   *
   * If you set `deleteMessages` to `true`, the local historical messages are deleted with the conversation.
   *
   * @param convId The conversation ID.
   * @param withMessage Whether to delete the historical messages with the conversation.
   * - (Default) `true`: Yes.
   * - `false`: No.
   * @returns Whether the conversation is successfully deleted.
   * - `true`: Yes.
   * - `false`: No.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async deleteConversation(
    convId: string,
    withMessage: boolean = true
  ): Promise<void> {
    console.log(
      `${ChatManager.TAG}: deleteConversation: ${convId}, ${withMessage}`
    );
    let r: any = await Native._callMethod(MethodTypedeleteConversation, {
      [MethodTypedeleteConversation]: {
        con_id: convId,
        deleteMessages: withMessage,
      },
    });
    Native.hasErrorFromResult(r);
  }

  /**
   * Gets historical messages of the conversation from the server with pagination.
   *
   * @param convId The conversation ID.
   * @param chatType The conversation type. See {@link ChatConversationType}.
   * @param pageSize The number of messages that you expect to get on each page.
   * @param startMsgId The ID of the message from which you start to get the historical messages. If `null` is passed, the SDK gets messages in reverse chronological order.
   * @returns The obtained messages and the cursor for the next query.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async fetchHistoryMessages(
    convId: string,
    chatType: ChatConversationType,
    pageSize: number = 20,
    startMsgId: string = ''
  ): Promise<ChatCursorResult<ChatMessage>> {
    console.log(
      `${ChatManager.TAG}: fetchHistoryMessages: ${convId}, ${chatType}, ${pageSize}, ${startMsgId}`
    );
    let r: any = await Native._callMethod(MethodTypefetchHistoryMessages, {
      [MethodTypefetchHistoryMessages]: {
        con_id: convId,
        type: chatType as number,
        pageSize: pageSize,
        startMsgId: startMsgId,
      },
    });
    Native.hasErrorFromResult(r);
    let ret = new ChatCursorResult<ChatMessage>({
      cursor: r?.[MethodTypefetchHistoryMessages].cursor,
      list: r?.[MethodTypefetchHistoryMessages].list,
      opt: {
        map: (param: any) => {
          return new ChatMessage(param);
        },
      },
    });
    return ret;
  }

  /**
   * Retrieves messages from the database according to the parameters.
   *
   * **Note**
   * Pay attention to the memory usage when the maxCount is large. Currently, a maximum of 400 historical messages can be retrieved each time.
   * @param keywords The keywords in message.
   * @param timestamp The Unix timestamp for search, in milliseconds.
   * @param maxCount The maximum number of messages to retrieve each time.
   * @param from A user ID or group ID at which the retrieval is targeted. Usually, it is the conversation ID.
   * @param direction The message search direction.
   * @returns The list of messages.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async searchMsgFromDB(
    keywords: string,
    timestamp: number = -1,
    maxCount: number = 20,
    from: string = '',
    direction: ChatSearchDirection = ChatSearchDirection.UP
  ): Promise<Array<ChatMessage>> {
    console.log(
      `${ChatManager.TAG}: searchMsgFromDB: ${keywords}, ${timestamp}, ${maxCount}, ${from}`
    );
    let r: any = await Native._callMethod(MethodTypesearchChatMsgFromDB, {
      [MethodTypesearchChatMsgFromDB]: {
        keywords: keywords,
        timestamp: timestamp,
        maxCount: maxCount,
        from: from,
        direction: direction === ChatSearchDirection.UP ? 'up' : 'down',
      },
    });
    Native.hasErrorFromResult(r);
    let ret = new Array<ChatMessage>(10);
    (r?.[MethodTypesearchChatMsgFromDB] as Array<any>).forEach((element) => {
      ret.push(new ChatMessage(element));
    });
    return ret;
  }

  /**
   * Gets read receipts for group messages from the server with pagination.
   *
   * For how to send read receipts for group messages, see {@link {@link #sendConversationReadAck(String)}.
   *
   * @param msgId The message ID.
   * @param startAckId The starting read receipt ID for query. If you set it as null, the SDK retrieves the read receipts in the reverse chronological order of when the server receives the read receipts.
   * @param pageSize The number of read receipts that you expect to get on each page.
   * @returns The list of obtained read receipts and the cursor for the next query.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async fetchGroupAcks(
    msgId: string,
    startAckId?: string,
    pageSize: number = 0
  ): Promise<ChatCursorResult<ChatGroupMessageAck>> {
    console.log(
      `${ChatManager.TAG}: asyncFetchGroupAcks: ${msgId}, ${startAckId}, ${pageSize}`
    );
    let r: any = await Native._callMethod(MethodTypeasyncFetchGroupAcks, {
      [MethodTypeasyncFetchGroupAcks]: {
        msg_id: msgId,
        ack_id: startAckId,
        pageSize: pageSize,
      },
    });
    Native.hasErrorFromResult(r);
    let ret = new ChatCursorResult<ChatGroupMessageAck>({
      cursor: r?.[MethodTypeasyncFetchGroupAcks].cursor,
      list: r?.[MethodTypeasyncFetchGroupAcks].list,
      opt: {
        map: (param: any) => {
          return new ChatGroupMessageAck(param);
        },
      },
    });
    return ret;
  }

  /**
   * Deletes the specified conversation and the related historical messages from the server.
   *
   * @param convId The conversation ID.
   * @param convType The conversation type. See {@link ChatConversationType}.
   * @param isDeleteMessage Whether to delete the historical messages with the conversation.
   * - (Default) `true`: Yes.
   * - `false`: No.
   *
   * @throws A description of the exception. See {@link ChatError}.
   */
  public async deleteRemoteConversation(
    convId: string,
    convType: ChatConversationType,
    isDeleteMessage: boolean = true
  ): Promise<void> {
    console.log(
      `${ChatManager.TAG}: deleteRemoteConversation: ${convId}, ${convType}, ${isDeleteMessage}`
    );
    let ct = 0;
    switch (convType) {
      case ChatConversationType.PeerChat:
        ct = 0;
        break;
      case ChatConversationType.GroupChat:
        ct = 1;
        break;
      case ChatConversationType.RoomChat:
        ct = 2;
        break;
      default:
        throw new Error('no have this type');
    }

    let r = await Native._callMethod(MethodTypedeleteRemoteConversation, {
      [MethodTypedeleteRemoteConversation]: {
        conversationId: convId,
        conversationType: ct,
        isDeleteRemoteMessage: isDeleteMessage,
      },
    });
    Native.hasErrorFromResult(r);
  }
}
