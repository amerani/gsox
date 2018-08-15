import { FIELD_SYMBOL, TYPE_SYMBOL } from "@gsox/core";
import "reflect-metadata";

function build(types) {
      const map: any = {};
      const typeDefs = [...Object.values(types)];
      typeDefs.forEach((type: any) => {
            const inst = new type();
            const typeName = Reflect.get(inst, TYPE_SYMBOL);
            const fields = Reflect.getMetadata(FIELD_SYMBOL, inst);
            map[typeName] = fields;
      });
      return map;
}

export { build };
