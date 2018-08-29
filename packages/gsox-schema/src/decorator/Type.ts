import { FIELD_SYMBOL, TYPE_SYMBOL } from "@gsox/core";
import "reflect-metadata";

function Type(value?: string) {
      return function classDecorator<T extends {new(...args: any[]): {}}>(constructor: T) {
            console.log('type decorator', value || constructor.name);
            let fieldsMetadata = [];
            if(value) {
                  const obj = new constructor();
                  const fields = Reflect.getMetadata(FIELD_SYMBOL, obj).map(field => {
                        if(field.typeId == constructor.name) {
                              field.type = field.type.replace(field.typeId, value);
                              field.children = Reflect.getMetadata(FIELD_SYMBOL, obj)
                                    .filter(f => f.typeId != constructor.name);
                        }
                        return field;
                  });
                  Reflect.defineMetadata(FIELD_SYMBOL, fields, obj);
                  fieldsMetadata = fields;
            }
            return class extends constructor {
                  public [TYPE_SYMBOL] = value || constructor.name;
                  public [FIELD_SYMBOL] = fieldsMetadata;
            };
        };
}

export { Type };
