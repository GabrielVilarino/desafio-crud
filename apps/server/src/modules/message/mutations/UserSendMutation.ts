import { GraphQLNonNull, GraphQLFloat, GraphQLInt } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { User } from '../UserModel';
import { userField } from '../userFields';
import { redisLock } from '../../redisLock/redisLock';
export type UserSendValueInput = {
  conta: number;
  valor: number;
};

const mutation = mutationWithClientMutationId({
  name: 'UserSendValue',
  inputFields: {
    conta: { type: new GraphQLNonNull(GraphQLInt) },
    valor: { type: new GraphQLNonNull(GraphQLFloat) },
  },
  mutateAndGetPayload: async ({ conta, valor }: UserSendValueInput) => {
    const user = await User.findOne({ conta });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const lockKey = `saldo:${conta}`;
    let lock;
    try{
      lock = await redisLock.acquire([lockKey], 10000);

      if (!lock) {
        throw new Error('Não foi possível adquirir o bloqueio.');
      }

      if (user.saldo < valor) {
        throw new Error('Saldo insuficiente.');
      }

      user.saldo -= valor;
      await user.save();

    }catch(err){
      throw err;
    } finally {
      if (lock) {
        await lock.release();
      }
    }

    return { user: user._id.toString() };
  },
  outputFields: {
    ...userField('user'),
  },
});

export const UserSendValueMutation = {
  ...mutation,
};
