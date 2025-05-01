import { GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { User } from '../UserModel';
import { userField } from '../userFields';

export type UserUpdateInput = {
  conta: number;
  nome?: string;
  email?: string;
  telefone?: string;
};

const mutation = mutationWithClientMutationId({
  name: 'UserUpdate',
  inputFields: {
    conta: { type: new GraphQLNonNull(GraphQLInt) },
    nome: { type: GraphQLString },
    email: { type: GraphQLString },
    telefone: { type: GraphQLString },
  },
  mutateAndGetPayload: async (args: UserUpdateInput) => {
    const { conta, nome, email, telefone } = args;

    const user = await User.findOne({ conta });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    if (nome) user.nome = nome;
    if (email) user.email = email;
    if (telefone) user.telefone = telefone;

    await user.save();

    return {
      user: user._id.toString(),
    };
  },
  outputFields: {
    ...userField('user'),
  },
});

export const UserUpdateMutation = {
  ...mutation,
};
