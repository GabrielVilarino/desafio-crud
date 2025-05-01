import { GraphQLObjectType } from 'graphql';

import { messageMutations } from '../modules/message/mutations/messageMutations';
import { userMutations } from '../modules/message/mutations/userMutation';

export const MutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		...userMutations
	}),
});
