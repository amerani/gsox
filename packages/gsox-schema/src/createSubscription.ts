import "reflect-metadata";
import { FIELD_SYMBOL, TYPE_SYMBOL } from "./constants";

function createSubscription(T): string {
      const obj = new T();
      const type = Reflect.get(obj, TYPE_SYMBOL);
      let schema = `subscription {\n\t${type} {\n`;
      const metadata = Reflect.getMetadata(FIELD_SYMBOL, obj);
      metadata.forEach((field) => {
            schema += `\t\t${field.name}\n`;
      });
      schema += `\t}\n}`;
      return schema;
}

export {
      createSubscription,
};
