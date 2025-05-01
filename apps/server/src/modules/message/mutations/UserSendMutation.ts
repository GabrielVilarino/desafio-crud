import { GraphQLNonNull, GraphQLFloat, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { User } from '../UserModel';
import { userField } from '../userFields';

export type UserSendValueInput = {
  cpf: string;
  valor: number;
};

const mutation = mutationWithClientMutationId({
  name: 'UserSendValue',
  inputFields: {
    cpf: { type: new GraphQLNonNull(GraphQLString) },
    valor: { type: new GraphQLNonNull(GraphQLFloat) },
  },
  mutateAndGetPayload: async ({ cpf, valor }: UserSendValueInput) => {
    const user = await User.findOne({ cpf });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    if (user.saldo < valor) {
      throw new Error('Saldo insuficiente.');
    }

    user.saldo -= valor;
    await user.save();

    return { user: user._id.toString() };
  },
  outputFields: {
    ...userField('user'),
  },
});

export const UserSendValueMutation = {
  ...mutation,
};
