import * as types from "./packages/gsox-client/src/types";
import { build } from "./packages/gsox-client/src/typeGraph";
import { Field, SelectionSet, OperationNode, SubscriptionDocument } from "./packages/gsox-schema/src/grapqlAst";

function toGql(fields) {
    const gFields = [];
    for (let i = 0; i < fields.length; i++) {
        const field = new Field(fields[i]);
        if(fields[i].children.length > 0) {
            field.selectionSet = new SelectionSet(toGql(fields[i].children))
        }
        gFields.push(field);
    } 
    return gFields;
}

function traverse(graph) {
    console.log(graph)
    graph.forEach((field:any) => {
        console.log(field.id, field.type)
        if(field.children.length > 0){
            traverse(field.children)
        }
    })
}

const t = [...Object.values(types)]
const typeGraph = build(t);
const { Complex } = typeGraph;

const gqlFields = toGql(Complex);
const gqlSub = new Field("Complex", new SelectionSet(gqlFields));
const op = new OperationNode(new SelectionSet([gqlSub]));
const doc = new SubscriptionDocument(op);

console.log(doc)