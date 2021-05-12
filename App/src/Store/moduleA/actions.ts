import actionTypes from "./actionTypes";
import { ItemData, TodoAction } from "../../Pages/HomePage/custom-type";
import rowData from "../../Pages/HomePage/data.json";

// 新增
export function addTodo(value: string, state: ItemData[]): TodoAction {
    state.push({
        id: state.length + 1,
        show: false,
        msg: value,
        ipt: false,
    });
    return {
        type: actionTypes.moduleA.add.redux,
        data: [...state],
    };
}

// 删除行   支持多个
export function removeTodo(state: ItemData[]): TodoAction {
    const selectList = state.filter((index: ItemData) => index.show);
    if (selectList.length > 0) {
        selectList.forEach((index: ItemData) => {
            const n = state.findIndex((item: ItemData) => item.id === index.id);
            state.splice(n, 1);
        });
        state.forEach((index: ItemData, n: number) => (index.id = n + 1));
    } else {
        alert("请选择要删除的内容");
    }
    return {
        type: actionTypes.moduleA.add.redux,
        data: [...state],
    };
}

// 初始化
export function initTodo(): TodoAction {
    const List: ItemData[] = rowData.map((index: ItemData) => {
        const item: ItemData = JSON.parse(JSON.stringify(index));
        item.show = false;
        item.ipt = false;
        return item;
    });
    return {
        type: actionTypes.moduleA.init.redux,
        data: [...List],
    };
}

// 反选 输入框展示
export function toggleInput(id: number, state: ItemData[]): TodoAction {
    const data = state.find((index: ItemData) => index.id === id);
    if (data) {
        data.ipt = !data.ipt;
    }
    return {
        type: actionTypes.moduleA.toggleInput.redux,
        data: [...state],
    };
}

//反选行  支持多个同时选中
export function toggleCheck(id: number, state: ItemData[]): TodoAction {
    const data = state.find((index: ItemData) => index.id === id);
    if (data) {
        data.show = !data.show;
    }
    return {
        type: actionTypes.moduleA.toggleCheck.redux,
        data: [...state],
    };
}

// 改变行
export function changeItem(value: string, state: ItemData[]): TodoAction {
    const data = state.find((index: ItemData) => index.ipt);
    if (data) {
        if (value) {
            data.msg = value;
        }
        data.ipt = !data.ipt;
    }
    return {
        type: actionTypes.moduleA.changeItem.redux,
        data: [...state],
    };
}
