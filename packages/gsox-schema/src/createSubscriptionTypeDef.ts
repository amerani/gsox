import { TYPE_SYMBOL } from "./constants";

function createSubscriptionType(types) {
      const typeNames = types
            .map((type) => new type())
            .map((instance) => Reflect.get(instance, TYPE_SYMBOL));

      let result = `type Subscription {\n`;
      typeNames.forEach((typeName) => {
            result = result.concat(`${typeName}:${typeName}\n`);
      });
      result = result.concat("}");
      return result;
}

export { createSubscriptionType };
