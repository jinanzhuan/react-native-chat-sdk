import type { NativeEventEmitter } from 'react-native';
import {
  ChatMessage,
  ChatMessageStatusCallback,
  ChatGroupFileStatusCallback,
  ChatError,
} from 'react-native-chat-sdk';
import {
  MTonMessageError,
  MTonMessageProgressUpdate,
  MTonMessageSuccess,
} from './Consts';
import { Native } from './Native';

export class BaseManager extends Native {
  protected static TAG = 'BaseManager';
  protected _eventEmitter?: NativeEventEmitter;
  constructor() {
    super();
  }
  public setNativeListener(_eventEmitter: NativeEventEmitter) {
    throw new Error('Please subclass to implement.');
  }
  protected static handleMessageCallback(
    methodName: string,
    self: BaseManager,
    message: ChatMessage,
    callback?: ChatMessageStatusCallback
  ): void {
    if (callback && self._eventEmitter) {
      const subscription = self._eventEmitter.addListener(
        methodName,
        (params: any) => {
          const localMsgId: string = params.localTime.toString();
          console.log(
            `${BaseManager.TAG}: handleMessageCallback: ${methodName}: ${localMsgId}`
          );
          if (message.localMsgId === localMsgId) {
            const callbackType: String = params.callbackType;
            if (callbackType === MTonMessageSuccess) {
              const m = params.message;
              callback.onSuccess(new ChatMessage(m));
              subscription.remove();
            } else if (callbackType === MTonMessageError) {
              const e = params.error;
              callback.onError(localMsgId, new ChatError(e));
              subscription.remove();
            } else if (callbackType === MTonMessageProgressUpdate) {
              const progress: number = params.progress;
              callback.onProgress(localMsgId, progress);
            }
          }
        }
      );
    }
  }

  protected static handleGroupFileCallback(
    methodName: string,
    self: BaseManager,
    groupId: string,
    filePath: string,
    callback?: ChatGroupFileStatusCallback
  ): void {
    if (callback && self._eventEmitter) {
      const subscription = self._eventEmitter.addListener(
        methodName,
        (params: any) => {
          const gid = params.groupId;
          const fp = params.filePath;
          console.log(
            `${BaseManager.TAG}: handleGroupFileCallback: ${gid}: ${fp}`
          );
          if (gid === groupId && fp === filePath) {
            const callbackType: String = params.callbackType;
            if (callbackType === MTonMessageSuccess) {
              callback.onSuccess(gid, fp);
              subscription.remove();
            } else if (callbackType === MTonMessageError) {
              const e = params.error;
              callback.onError(gid, fp, new ChatError(e));
              subscription.remove();
            } else if (callbackType === MTonMessageProgressUpdate) {
              const progress: number = params.progress;
              callback.onProgress(gid, fp, progress);
            }
          }
        }
      );
    }
  }
}
