import { FIELD_SYMBOL, TYPE_SYMBOL } from "@gsox/core";
import "reflect-metadata";

function Type(value?: string) {
      return function classDecorator<T extends {new(...args: any[]): {}}>(constructor: T) {
            return class extends constructor {
                  public [TYPE_SYMBOL] = value || constructor.name;
            };
        };
}

function Field<T extends {new(...args: any[]): {}}>(type?: T|string, name?) {
      return function(obj, prop) {
            let typeName = type || Reflect.getMetadata("design:type", obj, prop).name;
            const id = prop;
            name = name || prop;
            let children = [];
            if (type && typeof type != "string") {
                  typeName = type.name;
                  const instance = new type();
                  if (instance) {
                        typeName = Reflect.get(instance, TYPE_SYMBOL);
                        children = children.concat(Reflect.getMetadata(FIELD_SYMBOL, instance));
                  }
            }
            const entry = {id, name, type: typeName, children};
            if (Reflect.hasMetadata(FIELD_SYMBOL, obj)) {
                  const cur = Reflect.getMetadata(FIELD_SYMBOL, obj);
                  Reflect.defineMetadata(FIELD_SYMBOL, [entry, ...cur], obj);
            } else {
                  Reflect.defineMetadata(FIELD_SYMBOL, [entry], obj);
            }
      };
}

class FieldMetadata {
      // ts identifier
      public id: string;
      // user input id override
      public name: string;
      // grapql type
      public type: string;
      // subfield metadata
      public children: FieldMetadata[];
}

export {
      Type,
      Field,
};
