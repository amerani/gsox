import { Field, OperationNode, SelectionSet, SubscriptionDocument } from "./ast";

function toGql(fields) {
    const gFields = [];
    for (let i = 0; i < fields.length; i++) {
        const field = new Field(fields[i].name);
        if (fields[i].children.length > 0) {
            field.selectionSet = new SelectionSet(toGql(fields[i].children));
        }
        gFields.push(field);
    }
    return gFields;
}

function build(typeName, fields) {
    const gqlFields = toGql(fields);
    const gqlSub = new Field(typeName, new SelectionSet(gqlFields));
    const op = new OperationNode(new SelectionSet([gqlSub]));
    const doc = new SubscriptionDocument([op]);
    return doc;
}

export { build };
