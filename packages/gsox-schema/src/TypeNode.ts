export class TypeNode {
      public name: string;
      public fields: FieldNode[];
}

export class FieldNode {
      public name: string;
      public children: FieldNode[];
}
