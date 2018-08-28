import {
      DocumentNode,
      FieldNode,
      NameNode,
      OperationDefinitionNode,
      SelectionNode,
      SelectionSetNode,
    } from "graphql";

class SubscriptionDocument implements DocumentNode {
      public kind: "Document" = "Document";
      public definitions: OperationDefinitionNode[];
      constructor(definitions) {
            this.definitions = definitions;
            this.kind = "Document";
      }
}

class OperationNode implements OperationDefinitionNode {
      public kind: "OperationDefinition";
      public operation: "subscription";
      public selectionSet: SelectionSetNode;
      constructor(selectionSet) {
            this.selectionSet = selectionSet;
            this.kind = "OperationDefinition";
            this.operation = "subscription";
      }
}

class SelectionSet implements SelectionSetNode {
      public kind: "SelectionSet";
      public selections: FieldNode[];
      constructor(selections: FieldNode[]) {
            this.selections = selections;
            this.kind = "SelectionSet";
      }
}

class NameNodeImp implements NameNode {
      public kind: "Name";
      public value: string;
      constructor(value) {
            this.value = value;
            this.kind = "Name";
      }
}

class Field implements FieldNode {
      public kind: "Field";
      public name: NameNode;
      public selectionSet?: SelectionSetNode;
      constructor(name, selectionSet?) {
            this.name = new NameNodeImp(name);
            this.selectionSet = selectionSet;
            this.kind = "Field";
      }
}

export { Field, SelectionSet, OperationNode, SubscriptionDocument };
