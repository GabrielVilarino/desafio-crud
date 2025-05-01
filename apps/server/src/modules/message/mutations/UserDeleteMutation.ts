import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { User } from '../UserModel';
import { redisPubSub } from '../../pubSub/redisPubSub';
import { PUB_SUB_EVENTS } from '../../pubSub/pubSubEvents';

export type UserDeleteInput = {
  cpf: string;
};

const mutation = mutationWithClientMutationId({
  name: 'UserDelete',
  inputFields: {
    cpf: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ cpf }: UserDeleteInput) => {
    const user = await User.findOneAndDelete({ cpf });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    redisPubSub.publish(PUB_SUB_EVENTS.USER.DELETED, {
        deletedCpf: cpf,
      });

    return {
      deletedCpf: cpf,
    };
  },
  outputFields: {
    deletedCpf: {
      type: GraphQLString,
      resolve: ({ deletedCpf }) => deletedCpf,
    },
  },
});

export const UserDeleteMutation = {
  ...mutation,
};
