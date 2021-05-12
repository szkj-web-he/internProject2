/**
 * @file actions file  指定 to saga,to Redux的 actionType
 * @date 2021/05/12
 * @author xuejie.he
 * @lastModify xuejie.he 2021/05/12 17:21
 */

export default {
    moduleA: {
        remove: {
            // to saga  type
            saga: "RemoveItem",
            // to redux  type
            redux: "setTodoList",
        },
        add: {
            saga: "AddItem",
            redux: "setTodoList",
        },
        init: {
            saga: "InitTodo",
            redux: "setTodoList",
        },
        toggleCheck: {
            saga: "ToggleItem",
            redux: "setTodoList",
        },
        toggleInput: {
            saga: "ToggleInput",
            redux: "setTodoList",
        },
        changeItem: {
            saga: "changeItem",
            redux: "setTodoList",
        },
    },
};
