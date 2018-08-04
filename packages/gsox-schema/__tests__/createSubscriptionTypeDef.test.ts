import { createSubscriptionType } from '../src/createSubscriptionTypeDef';
import { Type, Field } from '../src';

@Type()
class Ping {
      @Field('Int')
      id:number;
}

@Type()
class Message {
      @Field()
      content: string;
}

test('should output subscription type', () => {
      const res = createSubscriptionType([Ping, Message]);
      console.log(res);
})
