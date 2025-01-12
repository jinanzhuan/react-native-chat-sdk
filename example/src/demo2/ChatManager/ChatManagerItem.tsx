import React, { ReactNode } from 'react';
import { View } from 'react-native';
import {
  ChatClient,
  ChatMessage,
  ChatMessageStatusCallback,
  ChatMessageTypeFromString,
  ChatConversationTypeFromNumber,
} from 'react-native-chat-sdk';
import { styleValues } from '../__internal__/Css';
import {
  LeafScreenBase,
  StateBase,
  StatelessBase,
} from '../__internal__/LeafScreenBase';
import {
  ChatManagerCache,
  metaDataList,
  MN,
  stateDataValue,
  statelessDataValue,
} from './ChatManagerData';
import type { ApiParams } from '../__internal__/DataTypes';

export interface StateChatMessage extends StateBase {
  resendMessage: {
    message: ChatMessage;
  };
  sendMessageReadAck: {
    message: ChatMessage;
  };
  sendGroupMessageReadAck: {
    msgId: string;
    groupId: string;
    opt?: { content: string };
  };
  sendConversationReadAck: {
    convId: string;
  };
  recallMessage: {
    msgId: string;
  };
  getMessage: {
    msgId: string;
  };
  markAllConversationsAsRead: {};
  getUnreadMessageCount: {};
  updateMessage: {
    message: ChatMessage;
  };
  importMessages: {
    message: ChatMessage;
  };
  downloadAttachment: {
    message: ChatMessage;
    callback: ChatMessageStatusCallback;
  };
  downloadThumbnail: {
    message: ChatMessage;
    callback: ChatMessageStatusCallback;
  };
  fetchHistoryMessages: {
    convId: string;
    chatType: number;
    pageSize: number;
    startMsgId: string;
  };
  searchMsgFromDB: {
    keywords: string;
    timestamp: number;
    maxCount: number;
    from: string;
    direction: number;
  };
  fetchGroupAcks: {
    msgId: string;
    startAckId: string;
    pageSize: number;
    groupId: string;
  };
  deleteRemoteConversation: {
    convId: string;
    convType: number;
    isDeleteMessage: boolean;
  };
  getConversation: {
    convId: string;
    convType: number;
    createIfNeed: boolean;
  };
  loadAllConversations: {};
  getConversationsFromServer: {};
  deleteConversation: {
    convId: string;
    withMessage: boolean;
  };
  getLatestMessage: {
    convId: string;
    convType: number;
  };
  getLastReceivedMessage: {
    convId: string;
    convType: number;
  };
  unreadCount: {
    convId: string;
    convType: number;
  };
  markMessageAsRead: {
    convId: string;
    convType: number;
    msgId: string;
  };
  markAllMessagesAsRead: {
    convId: string;
    convType: number;
  };
  insertMessage: {
    convId: string;
    convType: number;
    msg: ChatMessage;
  };
  appendMessage: {
    convId: string;
    convType: number;
    msg: ChatMessage;
  };
  updateConversationMessage: {
    convId: string;
    convType: number;
    msg: ChatMessage;
  };
  deleteMessage: {
    convId: string;
    convType: number;
    msgId: string;
  };
  deleteAllMessages: {
    convId: string;
    convType: number;
  };
  getMessageById: {
    convId: string;
    convType: number;
    msgId: string;
  };
  getMessagesWithMsgType: {
    convId: string;
    convType: number;
    msgType: string;
    direction: number;
    timestamp: number;
    count: number;
    sender: string;
  };
  getMessages: {
    convId: string;
    convType: number;
    direction: number;
    startMsgId: string;
    loadCount: number;
  };
  getMessagesWithKeyword: {
    convId: string;
    convType: number;
    keywords: string;
    direction: number;
    timestamp: number;
    count: number;
    sender: string;
  };
  getMessagesFromTime: {
    convId: string;
    convType: number;
    startTime: number;
    endTime: number;
    direction: number;
    count: number;
  };
}

export interface StatelessChatMessage extends StatelessBase {
  sendMessage: {
    message?: ChatMessage;
    callback?: ChatMessageStatusCallback;
    lastMessage?: ChatMessage;
  };
  resendMessage: {
    message?: ChatMessage;
  };
  sendMessageReadAck: {
    message?: ChatMessage;
  };
}

export class ChatManagerLeafScreen extends LeafScreenBase<StateChatMessage> {
  protected static TAG = 'ChatManagerLeafScreen';
  public static route = 'ChatManagerLeafScreen';
  metaData: Map<string, ApiParams>;
  statelessData: StatelessChatMessage;
  constructor(props: { navigation: any }) {
    super(props);
    this.metaData = metaDataList;
    this.state = stateDataValue;
    this.statelessData = statelessDataValue;
  }

  protected renderResult(): ReactNode {
    return (
      <View style={styleValues.containerColumn}>
        {this.renderSendResult()}
        {this.renderRecvResult()}
        {this.renderExceptionResult()}
      </View>
    );
  }

  protected addListener?(): void {
    console.log(`${ChatManagerLeafScreen.TAG}: addListener`);
  }

  protected removeListener?(): void {
    console.log(`${ChatManagerLeafScreen.TAG}: removeListener`);
  }

  protected renderBody(): ReactNode {
    console.log(`${ChatManagerLeafScreen.TAG}: renderBody: `);
    return (
      <View style={styleValues.containerColumn}>{this.renderApiDom()}</View>
    );
  }
  protected renderApiDom(): ReactNode[] {
    const apiList = [
      'resendMessage',
      'sendMessageReadAck',
      'sendGroupMessageReadAck',
      'sendConversationReadAck',
      'recallMessage',
      'getMessage',
      'markAllConversationsAsRead',
      'getUnreadMessageCount',
      'updateMessage',
      'importMessages',
      'downloadAttachment',
      'downloadThumbnail',
      'fetchHistoryMessages',
      'searchMsgFromDB',
      'fetchGroupAcks',
      'deleteRemoteConversation',
      'getConversation',
      'loadAllConversations',
      'getConversationsFromServer',
      'deleteConversation',
      'getLatestMessage',
      'getLastReceivedMessage',
      'unreadCount',
      'markMessageAsRead',
      'markAllMessagesAsRead',
      'insertMessage',
      'appendMessage',
      'updateConversationMessage',
      'deleteMessage',
      'deleteAllMessages',
      'getMessageById',
      'getMessagesWithMsgType',
      'getMessages',
      'getMessagesWithKeyword',
      'getMessagesFromTime',
    ];
    let renderDomAry: ({} | null | undefined)[] = [];
    const data = this.metaData;
    apiList.forEach((apiItem) => {
      this.setKeyPrefix(apiItem);
      renderDomAry.push(
        this.renderParamWithText(data.get(apiItem)!.methodName)
      );
      data.get(apiItem)?.params.forEach((item) => {
        let currentData = data.get(apiItem);
        let itemValue =
          // eslint-disable-next-line no-undef
          this.state[apiItem as keyof typeof this.state][
            item.paramName as keyof typeof currentData
          ];
        if (item.domType && item.domType === 'select') {
          if (item.paramType === 'boolean') {
            renderDomAry.push(
              this.renderParamWithEnum(
                item.paramName,
                ['true', 'false'],
                itemValue ? 'true' : 'false',
                (index: string, option: any) => {
                  let inputData = option === 'true' ? true : false;
                  let pv: any = {};
                  pv[apiItem] = Object.assign(
                    {},
                    // eslint-disable-next-line no-undef
                    this.state[apiItem as keyof typeof this.state],
                    inputData
                  );
                  return this.setState(pv);
                }
              )
            );
          }
        } else {
          let value =
            item.paramType === 'object' ? JSON.stringify(itemValue) : itemValue;
          if (item.paramValue) {
            value = JSON.stringify({ key: 'value' });
            const v = item.paramValue();
            if (v instanceof ChatMessage) {
              value = JSON.stringify(v);
            }
          }
          renderDomAry.push(
            this.renderGroupParamWithInput(
              item.paramName,
              item.paramType,
              value,
              (inputData: { [index: string]: string }) => {
                let pv: any = {};
                pv[apiItem] = Object.assign(
                  {},
                  // eslint-disable-next-line no-undef
                  this.state[apiItem as keyof typeof this.state],
                  inputData
                );
                return this.setState(pv);
              }
            )
          );
        }
      });
      renderDomAry.push(
        this.renderButton(data.get(apiItem)!.methodName, () => {
          this.callApi(data.get(apiItem)!.methodName);
        })
      );
      renderDomAry.push(this.renderDivider());
    });
    renderDomAry.push(this.addSpaces());
    return renderDomAry;
  }

  private callApi(name: string): void {
    console.log(`${ChatManagerLeafScreen.TAG}: callApi: `);
    if (name === MN.resendMessage) {
      const message = ChatManagerCache.getInstance().getLastSendMessage();
      if (message) {
        this.tryCatch(
          ChatClient.getInstance().chatManager.resendMessage(
            message,
            ChatManagerCache.getInstance().createCallback()
          ),
          ChatManagerLeafScreen.TAG,
          this.metaData.get(MN.resendMessage)!.methodName
        );
      }
    } else if (name === MN.sendMessageReadAck) {
      const lastMessage = ChatManagerCache.getInstance().getLastSendMessage();
      if (lastMessage) {
        this.tryCatch(
          ChatClient.getInstance().chatManager.sendMessageReadAck(lastMessage),
          ChatManagerLeafScreen.TAG,
          this.metaData.get(MN.sendMessageReadAck)!.methodName
        );
      }
    } else if (name === MN.sendGroupMessageReadAck) {
      const { msgId, groupId, opt } = this.state.sendGroupMessageReadAck;
      this.tryCatch(
        ChatClient.getInstance().chatManager.sendGroupMessageReadAck(
          msgId,
          groupId,
          opt
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.sendGroupMessageReadAck)!.methodName
      );
    } else if (name === MN.sendConversationReadAck) {
      const { convId } = this.state.sendConversationReadAck;
      this.tryCatch(
        ChatClient.getInstance().chatManager.sendConversationReadAck(convId),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.sendConversationReadAck)!.methodName
      );
    } else if (name === MN.recallMessage) {
      const { msgId } = this.state.recallMessage;
      this.tryCatch(
        ChatClient.getInstance().chatManager.recallMessage(msgId),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.recallMessage)!.methodName
      );
    } else if (name === MN.getMessage) {
      const { msgId } = this.state.getMessage;
      this.tryCatch(
        ChatClient.getInstance().chatManager.getMessage(msgId),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.getMessage)!.methodName
      );
    } else if (name === MN.markAllConversationsAsRead) {
      this.tryCatch(
        ChatClient.getInstance().chatManager.markAllConversationsAsRead(),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.markAllConversationsAsRead)!.methodName
      );
    } else if (name === MN.getUnreadMessageCount) {
      this.tryCatch(
        ChatClient.getInstance().chatManager.getUnreadMessageCount(),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.getUnreadMessageCount)!.methodName
      );
    } else if (name === MN.updateMessage) {
      const { message } = this.state.updateMessage;
      this.tryCatch(
        ChatClient.getInstance().chatManager.updateMessage(message),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.updateMessage)!.methodName
      );
    } else if (name === MN.importMessages) {
      const { message } = this.state.importMessages;
      this.tryCatch(
        ChatClient.getInstance().chatManager.importMessages([message]),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.importMessages)!.methodName
      );
    } else if (name === MN.downloadAttachment) {
      const { message, callback } = this.state.downloadAttachment;
      this.tryCatch(
        ChatClient.getInstance().chatManager.downloadAttachment(
          message,
          callback
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.downloadAttachment)!.methodName
      );
    } else if (name === MN.downloadThumbnail) {
      const { message, callback } = this.state.downloadThumbnail;
      this.tryCatch(
        ChatClient.getInstance().chatManager.downloadThumbnail(
          message,
          callback
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.downloadThumbnail)!.methodName
      );
    } else if (name === MN.fetchHistoryMessages) {
      const { convId, chatType, pageSize, startMsgId } =
        this.state.fetchHistoryMessages;
      this.tryCatch(
        ChatClient.getInstance().chatManager.fetchHistoryMessages(
          convId,
          ChatConversationTypeFromNumber(chatType),
          pageSize,
          startMsgId
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.fetchHistoryMessages)!.methodName
      );
    } else if (name === MN.searchMsgFromDB) {
      const { keywords, timestamp, maxCount, from, direction } =
        this.state.searchMsgFromDB;
      this.tryCatch(
        ChatClient.getInstance().chatManager.searchMsgFromDB(
          keywords,
          timestamp,
          maxCount,
          from,
          direction
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.searchMsgFromDB)!.methodName
      );
    } else if (name === MN.fetchGroupAcks) {
      const { msgId, startAckId, pageSize, groupId } =
        this.state.fetchGroupAcks;
      this.tryCatch(
        ChatClient.getInstance().chatManager.fetchGroupAcks(
          msgId,
          groupId,
          startAckId,
          pageSize
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.fetchGroupAcks)!.methodName
      );
    } else if (name === MN.deleteRemoteConversation) {
      const { convId, convType, isDeleteMessage } =
        this.state.deleteRemoteConversation;
      this.tryCatch(
        ChatClient.getInstance().chatManager.deleteRemoteConversation(
          convId,
          convType,
          isDeleteMessage
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.deleteRemoteConversation)!.methodName
      );
    } else if (name === MN.getConversation) {
      const { convId, convType, createIfNeed } = this.state.getConversation;
      this.tryCatch(
        ChatClient.getInstance().chatManager.getConversation(
          convId,
          convType,
          createIfNeed
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.getConversation)!.methodName
      );
    } else if (name === MN.loadAllConversations) {
      this.tryCatch(
        ChatClient.getInstance().chatManager.loadAllConversations(),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.loadAllConversations)!.methodName
      );
    } else if (name === MN.getConversationsFromServer) {
      this.tryCatch(
        ChatClient.getInstance().chatManager.getConversationsFromServer(),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.getConversationsFromServer)!.methodName
      );
    } else if (name === MN.deleteConversation) {
      const { convId, withMessage } = this.state.deleteConversation;
      this.tryCatch(
        ChatClient.getInstance().chatManager.deleteConversation(
          convId,
          withMessage
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.deleteConversation)!.methodName
      );
    } else if (name === MN.getLatestMessage) {
      const { convId, convType } = this.state.getLatestMessage;
      this.tryCatch(
        ChatClient.getInstance().chatManager.fetchLatestMessage(
          convId,
          ChatConversationTypeFromNumber(convType)
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.getLatestMessage)!.methodName
      );
    } else if (name === MN.getLastReceivedMessage) {
      const { convId, convType } = this.state.getLastReceivedMessage;
      this.tryCatch(
        ChatClient.getInstance().chatManager.fetchLastReceivedMessage(
          convId,
          ChatConversationTypeFromNumber(convType)
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.getLastReceivedMessage)!.methodName
      );
    } else if (name === MN.unreadCount) {
      const { convId, convType } = this.state.unreadCount;
      this.tryCatch(
        ChatClient.getInstance().chatManager.unreadCount(
          convId,
          ChatConversationTypeFromNumber(convType)
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.unreadCount)!.methodName
      );
    } else if (name === MN.markMessageAsRead) {
      const { convId, convType, msgId } = this.state.markMessageAsRead;
      this.tryCatch(
        ChatClient.getInstance().chatManager.markMessageAsRead(
          convId,
          ChatConversationTypeFromNumber(convType),
          msgId
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.markMessageAsRead)!.methodName
      );
    } else if (name === MN.markAllMessagesAsRead) {
      const { convId, convType } = this.state.markAllMessagesAsRead;
      this.tryCatch(
        ChatClient.getInstance().chatManager.markAllMessagesAsRead(
          convId,
          ChatConversationTypeFromNumber(convType)
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.markAllMessagesAsRead)!.methodName
      );
    } else if (name === MN.insertMessage) {
      const { convId, convType, msg } = this.state.insertMessage;
      this.tryCatch(
        ChatClient.getInstance().chatManager.insertMessage(
          convId,
          ChatConversationTypeFromNumber(convType),
          msg
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.insertMessage)!.methodName
      );
    } else if (name === MN.appendMessage) {
      const { convId, convType, msg } = this.state.appendMessage;
      this.tryCatch(
        ChatClient.getInstance().chatManager.appendMessage(
          convId,
          ChatConversationTypeFromNumber(convType),
          msg
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.appendMessage)!.methodName
      );
    } else if (name === MN.updateConversationMessage) {
      const { convId, convType, msg } = this.state.updateConversationMessage;
      this.tryCatch(
        ChatClient.getInstance().chatManager.updateConversationMessage(
          convId,
          ChatConversationTypeFromNumber(convType),
          msg
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.updateConversationMessage)!.methodName
      );
    } else if (name === MN.deleteMessage) {
      const { convId, convType, msgId } = this.state.deleteMessage;
      this.tryCatch(
        ChatClient.getInstance().chatManager.deleteMessage(
          convId,
          ChatConversationTypeFromNumber(convType),
          msgId
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.deleteMessage)!.methodName
      );
    } else if (name === MN.deleteAllMessages) {
      const { convId, convType } = this.state.deleteAllMessages;
      this.tryCatch(
        ChatClient.getInstance().chatManager.deleteAllMessages(
          convId,
          ChatConversationTypeFromNumber(convType)
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.deleteAllMessages)!.methodName
      );
    } else if (name === MN.getMessageById) {
      const { convId, convType, msgId } = this.state.getMessageById;
      this.tryCatch(
        ChatClient.getInstance().chatManager.getMessageById(
          convId,
          ChatConversationTypeFromNumber(convType),
          msgId
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.getMessageById)!.methodName
      );
    } else if (name === MN.getMessagesWithMsgType) {
      const { convId, convType, msgType, direction, timestamp, count, sender } =
        this.state.getMessagesWithMsgType;
      this.tryCatch(
        ChatClient.getInstance().chatManager.getMessagesWithMsgType(
          convId,
          ChatConversationTypeFromNumber(convType),
          ChatMessageTypeFromString(msgType),
          direction,
          timestamp,
          count,
          sender
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.getMessagesWithMsgType)!.methodName
      );
    } else if (name === MN.getMessages) {
      const { convId, convType, startMsgId, direction, loadCount } =
        this.state.getMessages;
      this.tryCatch(
        ChatClient.getInstance().chatManager.getMessages(
          convId,
          ChatConversationTypeFromNumber(convType),
          startMsgId,
          direction,
          loadCount
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.getMessages)!.methodName
      );
    } else if (name === MN.getMessagesWithKeyword) {
      const {
        convId,
        convType,
        keywords,
        direction,
        timestamp,
        count,
        sender,
      } = this.state.getMessagesWithKeyword;
      this.tryCatch(
        ChatClient.getInstance().chatManager.getMessagesWithKeyword(
          convId,
          ChatConversationTypeFromNumber(convType),
          keywords,
          direction,
          timestamp,
          count,
          sender
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.getMessagesWithKeyword)!.methodName
      );
    } else if (name === MN.getMessagesFromTime) {
      const { convId, convType, startTime, endTime, direction, count } =
        this.state.getMessagesFromTime;
      this.tryCatch(
        ChatClient.getInstance().chatManager.getMessagesFromTime(
          convId,
          ChatConversationTypeFromNumber(convType),
          startTime,
          endTime,
          direction,
          count
        ),
        ChatManagerLeafScreen.TAG,
        this.metaData.get(MN.getMessagesFromTime)!.methodName
      );
    }
  }
}
