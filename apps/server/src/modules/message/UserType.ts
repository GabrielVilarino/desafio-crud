import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInt } from 'graphql';
import { globalIdField, connectionDefinitions } from 'graphql-relay';
import type { ConnectionArguments } from 'graphql-relay';

import { IUser } from './UserModel';
import { nodeInterface } from '../node/typeRegister';
import { registerTypeLoader } from '../node/typeRegister';
import { UserLoader } from './UserLoader';

const UserType = new GraphQLObjectType<IUser>({
    name: 'User',
    description: 'Representa um usuário do banco',
    fields: () => ({
      id: globalIdField('User'),
      nome: {
        type: GraphQLString,
        resolve: (user) => user.nome,
      },
      cpf: {
        type: GraphQLString,
        resolve: (user) => user.cpf,
      },
      conta: {
        type: GraphQLInt,
        resolve: (user) => user.conta,
      },
      email: {
        type: GraphQLString,
        resolve: (user) => user.email,
      },
      telefone: {
        type: GraphQLString,
        resolve: (user) => user.telefone,
      },
      saldo: {
        type: GraphQLFloat,
        resolve: (user) => user.saldo,
      },
      createdAt: {
        type: GraphQLString,
        resolve: (user) => user.createdAt.toISOString(),
      },
      updatedAt: {
        type: GraphQLString,
        resolve: (user) => user.updatedAt.toISOString(),
      },
    }),
    interfaces: () => [nodeInterface],
  });
  
  const UserConnection = connectionDefinitions({
    name: 'User',
    nodeType: UserType,
  });
  
  registerTypeLoader(UserType, UserLoader.load);
  
  export { UserType, UserConnection };

