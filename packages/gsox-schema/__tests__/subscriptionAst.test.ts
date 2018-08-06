import { FieldNode } from "graphql";
import { DoublyLinkedList } from "struct-ts";
import { Field, OperationNode, SelectionSet, SubscriptionDocument } from "../src/grapqlAst";

const subscription = new OperationNode(
      new SelectionSet([
            new Field("Notification", [
                  new SelectionSet([
                       new Field("id"),
                       new Field("type"),
                       new Field("Message", new SelectionSet([
                             new Field("id"),
                             new Field("data"),
                             new Field("SpaceTime", new SelectionSet([
                                    new Field("id"),
                                    new Field("time"),
                                    new Field("timezone"),
                                    new Field("location"),
                             ])),
                       ])),
                  ]),
            ]),
      ]),
);

test("sub", () => expect(subscription).not.toBeNull());

// const stack = new DoublyLinkedList<Field>();
// stack.push(subscription.selectionSet.selections[0] as any)
// while(stack.length > 0){
//       const node = stack.pop();
//       console.log(node.name.value);
//       if(!node.selectionSet) continue;
//       console.log(node.selectionSet);
//       (node.selectionSet.selections as Array<Field>).forEach(child => {
//             stack.push(child)
//       });
// }
