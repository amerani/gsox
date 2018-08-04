import { FIELD_SYMBOL, TYPE_SYMBOL } from "@gsox/core";
import "reflect-metadata";

function Type(value?) {
      return function classDecorator<T extends {new(...args: any[]): {}}>(constructor: T) {
            return class extends constructor {
                  public [TYPE_SYMBOL] = value || constructor.name;
            };
        };
}

function Field(type?, name?) {
      return function(obj, prop) {
            const id = prop;
            name = name || prop;
            type = type || Reflect.getMetadata("design:type", obj, prop).name;
            const entry = {id, name, type};
            if (Reflect.hasMetadata(FIELD_SYMBOL, obj)) {
                  const cur = Reflect.getMetadata(FIELD_SYMBOL, obj);
                  Reflect.defineMetadata(FIELD_SYMBOL, [entry, ...cur], obj);
            } else {
                  Reflect.defineMetadata(FIELD_SYMBOL, [entry], obj);
            }
      };
}

export {
      Type,
      Field,
};
