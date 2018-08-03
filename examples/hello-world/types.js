import { Type, Field } from '@gsox/schema';

@Type('ping')
class Ping {
    @Field('id', 'Int')
    id
}

export {
      Ping
}