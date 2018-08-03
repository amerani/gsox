import { Type, Field } from '@gsox/schema';

@Type()
class Ping {
    @Field('Int')
    id
}

export {
      Ping
}