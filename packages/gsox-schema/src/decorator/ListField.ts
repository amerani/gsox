import "reflect-metadata";
import { FIELD_SYMBOL, TYPE_SYMBOL } from "@gsox/core";

function ListField<T extends {new():{}}>(type: T, name?) {
    return function(obj, prop) {
        console.log("fields run first bro")
        const id = prop;
        name = name || prop;
        let typeName, children = []

        const listType = type as T;
        const instance = new listType();
        console.log('type decorator must have set type name???')
        if(instance) {
            typeName = `[${Reflect.get(instance, TYPE_SYMBOL) || listType.name}]`;
            children = children.concat(Reflect.getMetadata(FIELD_SYMBOL, instance));
        }

        const entry = { id, typeId: listType.name, name, type: typeName, children };

        if (Reflect.hasMetadata(FIELD_SYMBOL, obj)) {
            const cur = Reflect.getMetadata(FIELD_SYMBOL, obj);
            Reflect.defineMetadata(FIELD_SYMBOL, [entry, ...cur], obj);
        } else {
            Reflect.defineMetadata(FIELD_SYMBOL, [entry], obj);
        }
    };
}

export { ListField };