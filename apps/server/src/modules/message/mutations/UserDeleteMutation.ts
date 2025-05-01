import { GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { User } from '../UserModel';
import { redisPubSub } from '../../pubSub/redisPubSub';
import { PUB_SUB_EVENTS } from '../../pubSub/pubSubEvents';

export type UserDeleteInput = {
  conta: number;
};

const mutation = mutationWithClientMutationId({
  name: 'UserDelete',
  inputFields: {
    conta: { type: new GraphQLNonNull(GraphQLInt) },
  },
  mutateAndGetPayload: async ({ conta }: UserDeleteInput) => {
    const user = await User.findOneAndDelete({ conta });

    if (!user) {
      throw new Error('Conta não encontrada.');
    }

    redisPubSub.publish(PUB_SUB_EVENTS.USER.DELETED, {
        deletedConta: conta,
      });

    return {
      deletedConta: conta,
    };
  },
  outputFields: {
    deletedConta: {
      type: GraphQLString,
      resolve: ({ deletedConta }) => deletedConta,
    },
  },
});

export const UserDeleteMutation = {
  ...mutation,
};
