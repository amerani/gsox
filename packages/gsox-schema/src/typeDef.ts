import "reflect-metadata";
import { FIELD_SYMBOL, TYPE_SYMBOL } from "./constants";

function typeDef(obj: Object): string {
      const type = Reflect.get(obj, TYPE_SYMBOL);
      let schema = `type ${type} {\n`;
      const metadata = Reflect.getMetadata(FIELD_SYMBOL, obj);
      metadata.forEach((field) => {
            schema += `\t${field.name}: ${field.type}\n`;
      });
      schema += `}`;
      return schema;
}

export {
      typeDef
};
