/**
 * @file redux
 * @date 2021/05/12 17:13
 * @author xuejie.he
 * @lastModify xuejie.he 2021/05/12 17:13
 */

import { ItemData, TodoAction } from "../../Pages/HomePage/custom-type";

const List: never[] | ItemData[] = [];

export function todoList(
    state = List,
    action: TodoAction
): never[] | ItemData[] {
    let arr: never[] | ItemData[] = [];
    switch (action.type) {
        case "setTodoList":
            arr = action.data;
            break;
        default:
            arr = state;
            break;
    }
    return [...arr];
}
