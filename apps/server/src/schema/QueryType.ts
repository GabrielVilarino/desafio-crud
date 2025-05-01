import { GraphQLObjectType } from 'graphql';

import { messageConnectionField } from '../modules/message/messageFields';
import { userConnectionField } from '../modules/message/userFields';

export const QueryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		...userConnectionField('users'),
	}),
});
