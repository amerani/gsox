import { Type, ListField } from '../src/decorator';
import { Field } from '../src/decorators';
import { createSchemaString } from '../src/createSchema';

@Type()
class AlertType {
    @Field()
    name:string;
}

@Type()
class Message {
    @Field()
    text: string;
}

@Type('OnCallAlert')
class Alert {
    @ListField(Alert)
    previous: Alert[];
    @Field('Int')
    id:number;
    @Field(AlertType)
    type: AlertType;
    @ListField(Message)
    messages: Message[]
}

test('should create schema', () => {
    const schema = createSchemaString([Alert, AlertType, Message]);
    expect(schema).toMatchSnapshot();
})