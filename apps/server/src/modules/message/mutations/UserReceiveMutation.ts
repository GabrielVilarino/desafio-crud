import { GraphQLNonNull, GraphQLFloat, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { User } from '../UserModel';
import { userField } from '../userFields';

export type UserReceiveValueInput = {
  cpf: string;
  valor: number;
};

const mutation = mutationWithClientMutationId({
  name: 'UserReceiveValue',
  inputFields: {
    cpf: { type: new GraphQLNonNull(GraphQLString) },
    valor: { type: new GraphQLNonNull(GraphQLFloat) },
  },
  mutateAndGetPayload: async ({ cpf, valor }: UserReceiveValueInput) => {
    const user = await User.findOne({ cpf });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    user.saldo += valor;
    await user.save();

    return { user: user._id.toString() };
  },
  outputFields: {
    ...userField('user'),
  },
});

export const UserReceiveValueMutation = {
  ...mutation,
};
