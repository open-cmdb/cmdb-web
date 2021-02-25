

import store from "@/store"


const init_item = (schema, name) => {
    var field = schema[name].default != undefined ? schema[name].default : null;
    if (
        (typeof schema[name].default) === "string" &&
        schema[name].default.startsWith("__user_info.")
    ) {
        field =
            store.state.user_info[
            schema[name].default.split("__user_info.")[1]
            ];
    }
    if (schema[name].type === "Group") {
        field = {};
        for (let n in schema[name].childs) {
            field[n] = schema[name].childs[n].default != undefined ? schema[name].childs[n].default : null;
            console.log("group.....")
            if (
                (typeof schema[name].childs[n].default) === "string" &&
                schema[name].childs[n].default.startsWith("__user_info.")
            ) {
                console.log("default....")
                field[n] =
                    store.state.user_info[
                    schema[name].childs[n].default.split("__user_info.")[1]
                    ];
            }
        }
    }
    return field;
}

const init_form_data = (schema) => {
    var form_data = {};
    if (!schema) {
        return form_data;
    }
    for (let name in schema) {
        if (schema[name].many) {
            form_data[name] = []
            if (schema[name].default_number) {
                for (let i = 0; i < schema[name].default_number; i++) {
                    form_data[name].push(init_item(schema, name));
                }
                continue;
            }
        } else {
            form_data[name] = init_item(schema, name);
        }
    }
    return form_data;
}

// const init_form_data = (schema) => {
//     var form_data = {};
//     if (!schema) {
//         return;
//     }
//     for (let name in schema) {
//         var field = schema[name].default != undefined ? schema[name].default : null;
//         if (
//             (typeof schema[name].default) === "string" &&
//             schema[name].default.startsWith("__user_info.")
//         ) {
//             field =
//                 store.state.user_info[
//                 schema[name].default.split("__user_info.")[1]
//                 ];
//         }
//         if (schema[name].type === "Group") {
//             field = {};
//             for (let n in schema[name].childs) {
//                 field[n] = schema[name].childs[n].default != undefined ? schema[name].childs[n].default : null;
//                 if (
//                     (typeof schema[name].childs[n].default) === "string" &&
//                     schema[name].childs[n].default.startsWith("__user_info.")
//                 ) {
//                     console.log("default....")
//                     field[n] =
//                         store.state.user_info[
//                         schema[name].childs[n].default.split("__user_info.")[1]
//                         ];
//                 }
//             }
//         }
//         form_data[name] = field;
//         if (schema[name].many) {
//             form_data[name] = [];
//             if (schema[name].default_number) {
//                 for (let i = 0; i < schema[name].default_number; i++) {
//                     // form_data[name].push(Object.assign({}, field));

//                 }
//             }
//         }
//     }
//     return form_data;
// }


export default {
    init_form_data,
    init_item
}