import { GraphQLString, GraphQLNonNull, GraphQLFloat } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { redisPubSub } from '../../pubSub/redisPubSub';
import { PUB_SUB_EVENTS } from '../../pubSub/pubSubEvents';

import { User } from '../UserModel';
import { userField } from '../userFields';

export type UserAddInput = {
    nome: string;
    cpf: string;
    email: string;
    telefone?: string;
    saldo: number;
};

const mutation = mutationWithClientMutationId({
    name: 'UserAdd',
    inputFields: {
        nome: { type: new GraphQLNonNull(GraphQLString) },
        cpf: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        telefone: { type: GraphQLString },
        saldo: { type: new GraphQLNonNull(GraphQLFloat) },
    },
    mutateAndGetPayload: async (args: UserAddInput) => {
        
        const cpf = args.cpf

        const findUser = await User.findOne({ cpf });

        if (findUser) {
            throw new Error('Usuário ja cadastrado.');
        }

        const user = await new User({
            nome: args.nome,
            cpf: args.cpf,
            email: args.email,
            telefone: args.telefone,
            saldo: args.saldo,
          }).save();

        redisPubSub.publish(PUB_SUB_EVENTS.USER.ADDED, {
            user: user._id.toString(),
        });

        return {
            user: user._id.toString(),
        };
    },
    outputFields: {
        ...userField('user'),
    },
});

export const UserAddMutation = {
    ...mutation,
};
