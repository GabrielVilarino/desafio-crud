import { UserAddMutation } from './UserAddMutation';
import { UserSendValueMutation } from './UserSendMutation';
import { UserReceiveValueMutation } from './UserReceiveMutation';
import { UserDeleteMutation } from './UserDeleteMutation';
import { UserUpdateMutation } from './UserUpdateMutation';

export const userMutations = {
    UserAdd: UserAddMutation,
    UserSendValue: UserSendValueMutation,
    UserReceiveValue: UserReceiveValueMutation,
    UserDelete: UserDeleteMutation,
    UserUpdate: UserUpdateMutation,
};
