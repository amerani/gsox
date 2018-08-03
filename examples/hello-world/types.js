import { Type, Field } from '@gsox/schema';

@Type()
class Ping {
    @Field('id', 'Int')
    id
}

export {
      Ping
}