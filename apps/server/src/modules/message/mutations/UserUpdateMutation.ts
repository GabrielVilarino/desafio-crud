import { GraphQLNonNull, GraphQLString, GraphQLFloat } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { User } from '../UserModel';
import { userField } from '../userFields';

export type UserUpdateInput = {
  cpf: string;
  nome?: string;
  email?: string;
  telefone?: string;
};

const mutation = mutationWithClientMutationId({
  name: 'UserUpdate',
  inputFields: {
    cpf: { type: new GraphQLNonNull(GraphQLString) },
    saldo: { type: GraphQLFloat },
    nome: { type: GraphQLString },
    email: { type: GraphQLString },
    telefone: { type: GraphQLString },
  },
  mutateAndGetPayload: async (args: UserUpdateInput) => {
    const { cpf, nome, email, telefone } = args;

    const user = await User.findOne({ cpf });

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
