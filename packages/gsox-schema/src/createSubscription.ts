import { FIELD_SYMBOL, TYPE_SYMBOL } from "@gsox/core";
import "reflect-metadata";
import { Field, OperationNode, SelectionSet, SubscriptionDocument } from "./grapqlAst";

const messageType = new Field("MessageType");
const subField = new Field("id");
messageType.selectionSet = new SelectionSet([subField]);

const subscription = new OperationNode(
      new SelectionSet([
            new Field("Notification", [
                  new SelectionSet([
                       new Field("id"),
                       new Field("type"),
                       new Field("Message", new SelectionSet([
                             new Field("id"),
                       ])),
                  ]),
            ]),
      ]),
);

const doc = new SubscriptionDocument([subscription]);

function buildAst({name, children}
      : {name: string, children: Field[]}) {
            return new Field(name );
}
function createSubscriptionDocument(T) {
      const obj = new T();
      const fields = Reflect.getMetadata(FIELD_SYMBOL, obj).map((x) => {
            const node = new Field(x.name);
            if (x.children) {
                  new Field(x.name, x.children.map(
                        (y) => {
                              const node = new Field(y.name);

                        },
                  ));
            }
      });
}

function createSubscription(T): string {
      const obj = new T();
      const schemaType = Reflect.get(obj, TYPE_SYMBOL);
      let schema = `subscription {\n\t${schemaType} {\n`;
      const metadata = Reflect.getMetadata(FIELD_SYMBOL, obj);
      metadata.forEach((field) => {
            schema += `\t\t${field.name}\n`;
      });
      schema += `\t}\n}`;
      return schema;
}

export {
      createSubscription,
};
