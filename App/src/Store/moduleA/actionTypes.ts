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
