import {
      DocumentNode,
      FieldNode,
      NameNode,
      OperationDefinitionNode,
      SelectionNode,
      SelectionSetNode,
    } from "graphql";

class SubscriptionDocument implements DocumentNode {
      public kind: "Document";
      public definitions: OperationDefinitionNode[];
      constructor(definitions) {
            this.definitions = definitions;
      }
}

class OperationNode implements OperationDefinitionNode {
      public kind: "OperationDefinition";
      public operation: "subscription";
      public selectionSet: SelectionSetNode;
      constructor(selectionSet) {
            this.selectionSet = selectionSet;
      }
}

class SelectionSet implements SelectionSetNode {
      public kind: "SelectionSet";
      public selections: FieldNode[];
      constructor(selections: FieldNode[]) {
            this.selections = selections;
      }
}

class NameNodeImp implements NameNode {
      public kind: "Name";
      public value: string;
      constructor(value) {
            this.value = value;
      }
}

class Field implements FieldNode {
      public kind: "Field";
      public name: NameNode;
      public selectionSet?: SelectionSetNode;
      constructor(name, selectionSet?) {
            this.name = new NameNodeImp(name);
            this.selectionSet = selectionSet;
      }
}

export { Field, SelectionSet, OperationNode, SubscriptionDocument };
