import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { styleValues } from '../__internal__/Css';
import { LeafScreenBase, StateBase } from '../__internal__/LeafScreenBase';
import { metaData, GROUPMN, stateData } from './GroupManagerData';
import type { ApiParams } from '../__internal__/DataTypes';
import type { ChatGroupOptions } from '../../../../src/common/ChatGroup';
import { ChatClient } from 'react-native-chat-sdk';
export interface StateGroupMessage extends StateBase {
  createGroup: {
    groupName: string;
    desc: string;
    inviteMembers: string[];
    inviteReason: string;
    options: ChatGroupOptions;
  };
  addMembers: {
    groupId: string;
    members: Array<string>;
    welcome?: string;
  };
  removeMembers: {
    groupId: string;
    members: Array<string>;
  };
  inviterUser: {
    groupId: string;
    members: Array<string>;
    reason: string;
  };
  acceptInvitation: {
    groupId: string;
    inviter: string;
  };
  declineInvitation: {
    groupId: string;
    inviter: string;
    reason: string;
  };
  getGroupWithId: {
    groupId: string;
  };
  getJoinedGroups: {};
  fetchJoinedGroupsFromServer: {
    pageSize: number;
    pageNum: number;
  };
  fetchPublicGroupsFromServer: {
    pageSize: number;
    cursor?: string;
  };
  fetchGroupInfoFromServer: {
    groupId: string;
  };
  fetchMemberListFromServer: {
    groupId: string;
    pageSize: number;
    cursor?: string;
  };
  fetchMuteListFromServer: {
    groupId: string;
    pageSize: number;
    pageNum: number;
  };
  fetchWhiteListFromServer: {
    groupId: string;
  };
  fetchGroupFileListFromServer: {
    groupId: string;
    pageSize: number;
    pageNum: number;
  };
  isMemberInWhiteListFromServer: {
    groupId: string;
  };
  fetchAnnouncementFromServer: {
    groupId: string;
  };
  blockMembers: {
    groupId: string;
    members: Array<string>;
  };
  unblockMembers: {
    groupId: string;
    members: Array<string>;
  };
  fetchBlockListFromServer: {
    groupId: string;
    pageSize: number;
    pageNum: number;
  };
  changeGroupName: {
    groupId: string;
    name: string;
  };
  changeGroupDescription: {
    groupId: string;
    desc: string;
  };
  joinPublicGroup: {
    groupId: string;
  };
  leaveGroup: {
    groupId: string;
  };
  requestToJoinPublicGroup: {
    groupId: string;
    reason?: string;
  };
  destroyGroup: {
    groupId: string;
  };
  blockGroup: {
    groupId: string;
  };
  unblockGroup: {
    groupId: string;
  };
  changeOwner: {
    groupId: string;
    newOwner: string;
  };
  addAdmin: {
    groupId: string;
    memberId: string;
  };
  removeAdmin: {
    groupId: string;
    memberId: string;
  };
  muteMembers: {
    groupId: string;
    members: Array<string>;
    duration: number;
  };
  unMuteMembers: {
    groupId: string;
    members: Array<string>;
  };
  muteAllMembers: {
    groupId: string;
  };
  unMuteAllMembers: {
    groupId: string;
  };
  addWhiteList: {
    groupId: string;
    members: Array<string>;
  };
  removeWhiteList: {
    groupId: string;
    members: Array<string>;
  };
  uploadGroupSharedFile: {
    groupId: string;
    filePath: string;
  };
  updateGroupAnnouncement: {
    groupId: string;
    announcement: string;
  };
  updateGroupExtension: {
    groupId: string;
    extension: string;
  };
  acceptJoinApplication: {
    groupId: string;
    username: string;
  };
  declineJoinApplication: {
    groupId: string;
    username: string;
    reason?: string;
  };
  downloadGroupSharedFile: {
    groupId: string;
    fileId: string;
    savePath: string;
  };
  removeGroupSharedFile: {
    groupId: string;
    fileId: string;
  };
}
export class GroupManagerLeafScreen extends LeafScreenBase<StateGroupMessage> {
  protected static TAG = 'GroupManagerLeafScreen';
  public static route = 'GroupManagerLeafScreen';
  metaData: Map<string, ApiParams>;
  state: StateGroupMessage;
  constructor(props: { navigation: any }) {
    super(props);
    this.metaData = metaData;
    this.state = stateData;
  }
  protected renderBody(): ReactNode {
    console.log(`${GroupManagerLeafScreen.TAG}: renderBody: `);
    return (
      <View style={styleValues.containerColumn}>
        {this.renderApiDom()}
        {/* {this.createGroup()}
        {this.addMembers()}
        {this.removeMembers()} 
        {this.uploadGroupSharedFile()}
        {this.downloadGroupSharedFile()}
        {this.removeGroupSharedFile()}
        {this.acceptJoinApplication()}
        {this.declineJoinApplication()}
        {this.updateGroupAnnouncement()}
        {this.updateGroupExtension()}
        {this.addWhiteList()}
        {this.removeWhiteList()}
        {this.fetchWhiteListFromServer()}
        {this.muteAllMembers()}
        {this.unMuteAllMembers()}
        {this.fetchMuteListFromServer()}
        {this.muteMembers()}
        {this.unMuteMembers()}
        {this.destroyGroup()}
        {this.blockGroup()}
        {this.unblockGroup()}
        {this.changeOwner()}
        {this.addAdmin()}
        {this.removeAdmin()}
        {this.requestToJoinPublicGroup()}
        {this.joinPublicGroup()}
        {this.leaveGroup()}
        {this.getGroupWithId()}
        {this.addMembers()}
        {this.removeMembers()}
        {this.inviterUser()}
        {this.acceptInvitation()}
        {this.declineInvitation()}
        {this.getJoinedGroups()}
        {this.fetchJoinedGroupsFromServer()}
        {this.fetchPublicGroupsFromServer()}
        {this.fetchGroupInfoFromServer()}
        {this.fetchMemberListFromServer()}
        {this.fetchGroupFileListFromServer()}
        {this.isMemberInWhiteListFromServer()}
        {this.fetchAnnouncementFromServer()}
        {this.blockMembers()}
        {this.unblockMembers()}
        {this.fetchBlockListFromServer()}
        {this.changeGroupName()}
        {this.changeGroupDescription()} */}
      </View>
    );
  }
  protected renderApiDom(): ReactNode[] {
    const apiList = [
      'createGroup',
      'uploadGroupSharedFile',
      'fetchGroupFileListFromServer',
      'downloadGroupSharedFile',
      'removeGroupSharedFile',
      'requestToJoinPublicGroup',
      'joinPublicGroup',
      'leaveGroup',
      'inviterUser',
      'fetchJoinedGroupsFromServer',
      'fetchPublicGroupsFromServer',
      'getJoinedGroups',
      'acceptJoinApplication',
      'declineJoinApplication',
      'updateGroupExtension',
      'acceptInvitation',
      'declineInvitation',
      'blockGroup',
      'unblockGroup',
      'getGroupWithId',
      'fetchGroupInfoFromServer',
      'changeGroupName',
      'changeGroupDescription',
      'fetchBlockListFromServer',
      'blockMembers',
      'unblockMembers',
      'fetchMemberListFromServer',
      'addMembers',
      'removeMembers',
      'isMemberInWhiteListFromServer',
      'updateGroupAnnouncement',
      'fetchAnnouncementFromServer',
      'changeOwner',
      'addAdmin',
      'removeAdmin',
      'muteAllMembers',
      'unMuteAllMembers',
      'fetchMuteListFromServer',
      'muteMembers',
      'unMuteMembers',
      'addWhiteList',
      'removeWhiteList',
      'fetchWhiteListFromServer',
      'destroyGroup',
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
        if (item.paramName === 'filePath') {
          renderDomAry.push(
            this.renderGroupParamWithSelectFile(
              item.paramName,
              itemValue,
              (inputData: { [index: string]: string }) => {
                this.setState({
                  uploadGroupSharedFile: Object.assign(
                    this.state.uploadGroupSharedFile,
                    inputData
                  ),
                });
              }
            )
          );
        } else {
          let value =
            item.paramType === 'object' ? JSON.stringify(itemValue) : itemValue;
          renderDomAry.push(
            this.renderGroupParamWithInput(
              item.paramName,
              item.paramType,
              value,
              (inputData: { [index: string]: string }) => {
                let paramValue: any = {};
                paramValue[apiItem] = Object.assign(
                  {},
                  // eslint-disable-next-line no-undef
                  this.state[apiItem as keyof typeof this.state],
                  inputData
                );
                return this.setState(paramValue);
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
    return renderDomAry;
  }
  protected createGroup(): ReactNode[] {
    const data = this.metaData;
    let domAry = [];
    domAry.push(this.renderParamWithText(data.get('createGroup')!.methodName));
    data.get('createGroup')?.params.forEach((item) => {
      // "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
      let value =
        item.paramType === 'object'
          ? JSON.stringify(item.paramDefaultValue)
          : item.paramDefaultValue;
      domAry.push(
        this.renderGroupParamWithInput(
          item.paramName,
          item.paramType,
          value,
          (inputData: { [index: string]: string }) => {
            this.setState({
              createGroup: Object.assign(this.state.createGroup, inputData),
            });
          }
        )
      );
    });
    domAry.push(
      this.renderButton(data.get('createGroup')!.methodName, () => {
        this.callApi(data.get('createGroup')!.methodName);
      })
    );
    domAry.push(this.renderDivider());
    return domAry;
  }

  private callApi(name: string): void {
    console.log(`${GroupManagerLeafScreen.TAG}: callApi: `);
    switch (name) {
      case GROUPMN.createGroup: {
        const { groupName, desc, inviteMembers, inviteReason, options } =
          this.state.createGroup;
        this.tryCatch(
          ChatClient.getInstance().groupManager.createGroup(
            options,
            groupName,
            desc,
            inviteMembers,
            inviteReason
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.createGroup'
        );
        break;
      }
      case GROUPMN.addMembers: {
        const { groupId, members, welcome } = this.state.addMembers;
        this.tryCatch(
          ChatClient.getInstance().groupManager.addMembers(
            groupId,
            members,
            welcome
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.addMembers'
        );
        break;
      }
      case GROUPMN.removeMembers: {
        const { groupId, members } = this.state.removeMembers;
        this.tryCatch(
          ChatClient.getInstance().groupManager.removeMembers(groupId, members),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.removeMembers'
        );
        break;
      }
      case GROUPMN.inviterUser: {
        const { groupId, members, reason } = this.state.inviterUser;
        this.tryCatch(
          ChatClient.getInstance().groupManager.inviterUser(
            groupId,
            members,
            reason
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.inviterUser'
        );
        break;
      }
      case GROUPMN.acceptInvitation: {
        const { groupId, inviter } = this.state.acceptInvitation;
        this.tryCatch(
          ChatClient.getInstance().groupManager.acceptInvitation(
            groupId,
            inviter
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.acceptInvitation'
        );
        break;
      }
      case GROUPMN.declineInvitation: {
        const { groupId, inviter } = this.state.declineInvitation;
        this.tryCatch(
          ChatClient.getInstance().groupManager.declineInvitation(
            groupId,
            inviter
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.declineInvitation'
        );
        break;
      }
      case GROUPMN.getGroupWithId: {
        const { groupId } = this.state.getGroupWithId;
        this.tryCatch(
          ChatClient.getInstance().groupManager.getGroupWithId(groupId),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.getGroupWithId'
        );
        break;
      }
      case GROUPMN.getJoinedGroups: {
        this.tryCatch(
          ChatClient.getInstance().groupManager.getJoinedGroups(),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.getJoinedGroups'
        );
        break;
      }
      case GROUPMN.fetchJoinedGroupsFromServer: {
        const { pageSize, pageNum } = this.state.fetchJoinedGroupsFromServer;
        this.tryCatch(
          ChatClient.getInstance().groupManager.fetchJoinedGroupsFromServer(
            pageSize,
            pageNum
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.fetchJoinedGroupsFromServer'
        );
        break;
      }
      case GROUPMN.fetchPublicGroupsFromServer: {
        const { pageSize, cursor } = this.state.fetchPublicGroupsFromServer;
        this.tryCatch(
          ChatClient.getInstance().groupManager.fetchPublicGroupsFromServer(
            pageSize,
            cursor
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.fetchPublicGroupsFromServer'
        );
        break;
      }
      case GROUPMN.fetchGroupInfoFromServer: {
        const { groupId } = this.state.fetchGroupInfoFromServer;
        this.tryCatch(
          ChatClient.getInstance().groupManager.fetchGroupInfoFromServer(
            groupId
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.fetchGroupInfoFromServer'
        );
        break;
      }
      case GROUPMN.fetchMemberListFromServer: {
        const { groupId, pageSize, cursor } =
          this.state.fetchMemberListFromServer;
        this.tryCatch(
          ChatClient.getInstance().groupManager.fetchMemberListFromServer(
            groupId,
            pageSize,
            cursor
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.fetchMemberListFromServer'
        );
        break;
      }
      case GROUPMN.fetchBlockListFromServer: {
        const { groupId, pageSize, pageNum } =
          this.state.fetchBlockListFromServer;
        this.tryCatch(
          ChatClient.getInstance().groupManager.fetchBlockListFromServer(
            groupId,
            pageSize,
            pageNum
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.fetchBlockListFromServer'
        );
        break;
      }
      case GROUPMN.fetchMuteListFromServer: {
        const { groupId, pageSize, pageNum } =
          this.state.fetchMuteListFromServer;
        this.tryCatch(
          ChatClient.getInstance().groupManager.fetchMuteListFromServer(
            groupId,
            pageSize,
            pageNum
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.fetchMuteListFromServer'
        );
        break;
      }
      case GROUPMN.fetchWhiteListFromServer: {
        const { groupId } = this.state.fetchWhiteListFromServer;
        this.tryCatch(
          ChatClient.getInstance().groupManager.fetchWhiteListFromServer(
            groupId
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.fetchWhiteListFromServer'
        );
        break;
      }
      case GROUPMN.fetchGroupFileListFromServer: {
        const { groupId, pageSize, pageNum } =
          this.state.fetchGroupFileListFromServer;
        this.tryCatch(
          ChatClient.getInstance().groupManager.fetchGroupFileListFromServer(
            groupId,
            pageSize,
            pageNum
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.fetchGroupFileListFromServer'
        );
        break;
      }
      case GROUPMN.isMemberInWhiteListFromServer: {
        const { groupId } = this.state.isMemberInWhiteListFromServer;
        this.tryCatch(
          ChatClient.getInstance().groupManager.isMemberInWhiteListFromServer(
            groupId
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.fetchGroupFileListFromServer'
        );
        break;
      }
      case GROUPMN.fetchAnnouncementFromServer: {
        const { groupId } = this.state.fetchAnnouncementFromServer;
        this.tryCatch(
          ChatClient.getInstance().groupManager.fetchAnnouncementFromServer(
            groupId
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.fetchGroupFileListFromServer'
        );
        break;
      }
      case GROUPMN.blockMembers: {
        const { groupId, members } = this.state.blockMembers;
        this.tryCatch(
          ChatClient.getInstance().groupManager.blockMembers(groupId, members),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.blockMembers'
        );
        break;
      }
      case GROUPMN.unblockMembers: {
        const { groupId, members } = this.state.unblockMembers;
        this.tryCatch(
          ChatClient.getInstance().groupManager.unblockMembers(
            groupId,
            members
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.unblockMembers'
        );
        break;
      }
      case GROUPMN.changeGroupName: {
        // eslint-disable-next-line no-shadow
        const { groupId, name } = this.state.changeGroupName;
        this.tryCatch(
          ChatClient.getInstance().groupManager.changeGroupName(groupId, name),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.changeGroupName'
        );
        break;
      }
      case GROUPMN.changeGroupDescription: {
        const { groupId, desc } = this.state.changeGroupDescription;
        this.tryCatch(
          ChatClient.getInstance().groupManager.changeGroupDescription(
            groupId,
            desc
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.changeGroupDescription'
        );
        break;
      }
      case GROUPMN.joinPublicGroup: {
        const { groupId } = this.state.joinPublicGroup;
        this.tryCatch(
          ChatClient.getInstance().groupManager.joinPublicGroup(groupId),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.joinPublicGroup'
        );
        break;
      }
      case GROUPMN.leaveGroup: {
        const { groupId } = this.state.leaveGroup;
        this.tryCatch(
          ChatClient.getInstance().groupManager.leaveGroup(groupId),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.leaveGroup'
        );
        break;
      }
      case GROUPMN.requestToJoinPublicGroup: {
        const { groupId, reason } = this.state.requestToJoinPublicGroup;
        this.tryCatch(
          ChatClient.getInstance().groupManager.requestToJoinPublicGroup(
            groupId,
            reason
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.requestToJoinPublicGroup'
        );
        break;
      }
      case GROUPMN.destroyGroup: {
        const { groupId } = this.state.destroyGroup;
        this.tryCatch(
          ChatClient.getInstance().groupManager.destroyGroup(groupId),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.destroyGroup'
        );
        break;
      }
      case GROUPMN.blockGroup: {
        const { groupId } = this.state.destroyGroup;
        this.tryCatch(
          ChatClient.getInstance().groupManager.blockGroup(groupId),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.blockGroup'
        );
        break;
      }
      case GROUPMN.unblockGroup: {
        const { groupId } = this.state.destroyGroup;
        this.tryCatch(
          ChatClient.getInstance().groupManager.unblockGroup(groupId),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.unblockGroup'
        );
        break;
      }
      case GROUPMN.changeOwner: {
        const { groupId, newOwner } = this.state.changeOwner;
        this.tryCatch(
          ChatClient.getInstance().groupManager.changeOwner(groupId, newOwner),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.changeOwner'
        );
        break;
      }
      case GROUPMN.addAdmin: {
        const { groupId, memberId } = this.state.addAdmin;
        this.tryCatch(
          ChatClient.getInstance().groupManager.addAdmin(groupId, memberId),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.addAdmin'
        );
        break;
      }
      case GROUPMN.removeAdmin: {
        const { groupId, memberId } = this.state.removeAdmin;
        this.tryCatch(
          ChatClient.getInstance().groupManager.removeAdmin(groupId, memberId),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.removeAdmin'
        );
        break;
      }
      case GROUPMN.muteMembers: {
        const { groupId, members, duration } = this.state.muteMembers;
        this.tryCatch(
          ChatClient.getInstance().groupManager.muteMembers(
            groupId,
            members,
            duration
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.muteMembers'
        );
        break;
      }
      case GROUPMN.unMuteMembers: {
        const { groupId, members } = this.state.unMuteMembers;
        this.tryCatch(
          ChatClient.getInstance().groupManager.unMuteMembers(groupId, members),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.unMuteMembers'
        );
        break;
      }
      case GROUPMN.muteAllMembers: {
        const { groupId } = this.state.muteAllMembers;
        this.tryCatch(
          ChatClient.getInstance().groupManager.muteAllMembers(groupId),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.muteAllMembers'
        );
        break;
      }
      case GROUPMN.unMuteAllMembers: {
        const { groupId } = this.state.unMuteAllMembers;
        this.tryCatch(
          ChatClient.getInstance().groupManager.unMuteAllMembers(groupId),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.unMuteAllMembers'
        );
        break;
      }
      case GROUPMN.addWhiteList: {
        const { groupId, members } = this.state.addWhiteList;
        this.tryCatch(
          ChatClient.getInstance().groupManager.addWhiteList(groupId, members),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.addWhiteList'
        );
        break;
      }
      case GROUPMN.removeWhiteList: {
        const { groupId, members } = this.state.removeWhiteList;
        this.tryCatch(
          ChatClient.getInstance().groupManager.removeWhiteList(
            groupId,
            members
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.removeWhiteList'
        );
        break;
      }
      case GROUPMN.uploadGroupSharedFile: {
        const { groupId, filePath } = this.state.uploadGroupSharedFile;
        this.tryCatch(
          ChatClient.getInstance().groupManager.uploadGroupSharedFile(
            groupId,
            filePath
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.uploadGroupSharedFile'
        );
        break;
      }
      case GROUPMN.updateGroupAnnouncement: {
        const { groupId, announcement } = this.state.updateGroupAnnouncement;
        this.tryCatch(
          ChatClient.getInstance().groupManager.updateGroupAnnouncement(
            groupId,
            announcement
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.updateGroupAnnouncement'
        );
        break;
      }
      case GROUPMN.updateGroupExtension: {
        const { groupId, extension } = this.state.updateGroupExtension;
        this.tryCatch(
          ChatClient.getInstance().groupManager.updateGroupExtension(
            groupId,
            extension
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.updateGroupExtension'
        );
        break;
      }
      case GROUPMN.acceptJoinApplication: {
        const { groupId, username } = this.state.acceptJoinApplication;
        this.tryCatch(
          ChatClient.getInstance().groupManager.acceptJoinApplication(
            groupId,
            username
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.acceptJoinApplication'
        );
        break;
      }
      case GROUPMN.declineJoinApplication: {
        const { groupId, username, reason } = this.state.declineJoinApplication;
        this.tryCatch(
          ChatClient.getInstance().groupManager.declineJoinApplication(
            groupId,
            username,
            reason
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.acceptJoinApplication'
        );
        break;
      }
      case GROUPMN.downloadGroupSharedFile: {
        const { groupId, fileId, savePath } =
          this.state.downloadGroupSharedFile;
        this.tryCatch(
          ChatClient.getInstance().groupManager.downloadGroupSharedFile(
            groupId,
            fileId,
            savePath
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.downloadGroupSharedFile'
        );
        break;
      }
      case GROUPMN.removeGroupSharedFile: {
        const { groupId, fileId } = this.state.removeGroupSharedFile;
        this.tryCatch(
          ChatClient.getInstance().groupManager.removeGroupSharedFile(
            groupId,
            fileId
          ),
          GroupManagerLeafScreen.TAG,
          'GROUPMN.removeGroupSharedFile'
        );
        break;
      }
      default:
        console.log('error name');
        break;
    }
  }
  protected renderResult(): ReactNode {
    return (
      <View style={styleValues.containerColumn}>
        {this.renderSendResult()}
        {this.renderRecvResult()}
      </View>
    );
  }
  protected addListener?(): void {
    console.log('addListener');
  }

  protected removeListener?(): void {
    console.log('addListener');
  }
}
