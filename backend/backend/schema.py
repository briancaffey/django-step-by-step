import graphene
import graphql_jwt

import apps.blog.schema
import apps.accounts.schema


class Query(apps.accounts.schema.Query, apps.blog.schema.Query, graphene.ObjectType):
    pass


class Mutation(
    apps.accounts.schema.Mutation,
    apps.blog.schema.Mutation,
    graphene.ObjectType,
):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
