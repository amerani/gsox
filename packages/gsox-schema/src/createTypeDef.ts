import "reflect-metadata";
import { FIELD_SYMBOL, TYPE_SYMBOL } from "@gsox/core";

function createTypeDef(T): string {
      const obj = new T();
      const type = Reflect.get(obj, TYPE_SYMBOL);
      let schema = `type ${type} {\n`;
      const metadata = Reflect.getMetadata(FIELD_SYMBOL, obj);
      metadata.forEach((field) => {
            schema += `\t${field.name}: ${field.type}\n`;
      });
      schema += `}`;
      return schema;
}

function createTypeDefs(types): string {
      return types.reduce(
            (acc, cur) => {
                  const typeStr = createTypeDef(cur);
                  return acc.concat([typeStr, "\n"]);
            },
            "");
}

export {
      createTypeDef,
      createTypeDefs,
};
