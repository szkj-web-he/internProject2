/**
 * @file sagas
 * @date 2021/05/12 17:16
 * @author xuejie.he
 * @lastModify xuejie.he 2021/05/12 17:16
 */

import { takeEvery, throttle, put, select, fork } from "redux-saga/effects";
import {
    addTodo,
    removeTodo,
    initTodo,
    toggleCheck,
    toggleInput,
    changeItem,
} from "./actions";

import {
    ItemData,
    SagaActionItem,
    SagaActionChange,
} from "../../Pages/HomePage/custom-type";
import { RootState } from "../rootReducer";
import actionTypes from "./actionTypes";

// 监听新增事件
function* handlerAdd(res: SagaActionChange) {
    const arr = yield select((state: RootState) => state.todoList);
    yield put(addTodo(res.data.value, arr));
}

// 监听移除事件
function* handlerRemove() {
    const arr: ItemData[] = yield select((state: RootState) => state.todoList);
    yield put(removeTodo(arr));
}

// 监听 行输入框展示
function* handlerToggleInput(res: SagaActionItem) {
    const arr: ItemData[] = yield select((state: RootState) => state.todoList);
    yield put(toggleInput(res.data.id, arr));
}

// 监听反选
function* handlerToggleCheck(res: SagaActionItem) {
    const arr: ItemData[] = yield select((state: RootState) => state.todoList);
    yield put(toggleCheck(res.data.id, arr));
}

// 监听初始化事件
function* handlerInit() {
    yield put(initTodo());
}

// 监听改变item事件
function* handlerChangeItem(res: SagaActionChange) {
    const arr = yield select((state: RootState) => state.todoList);
    yield put(changeItem(res.data.value, arr));
}

function* allSagas() {
    // 模拟axios  请求
    yield takeEvery(actionTypes.moduleA.init.saga, handlerInit);

    // 控制频率  1秒内  只能新增一个
    yield throttle(1000, actionTypes.moduleA.add.saga, handlerAdd);

    // 控制频率  1秒内  不可以多次删除
    yield throttle(1000, actionTypes.moduleA.remove.saga, handlerRemove);

    // 反选记录行
    yield takeEvery(actionTypes.moduleA.toggleCheck.saga, handlerToggleCheck);

    // 反选  可输入行
    yield takeEvery(actionTypes.moduleA.toggleInput.saga, handlerToggleInput);

    // 监听 改变item事件
    yield takeEvery(actionTypes.moduleA.changeItem.saga, handlerChangeItem);
}
// 启线程 单独跑
export default [fork(allSagas)];
