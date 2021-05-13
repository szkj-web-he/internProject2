/**
 * @file homePage,store/moduleA 类型文件
 * @date 2021/5/12
 * @author xuejie.he
 * @lastModify xuejie.he 2021/05/12 16:56
 */

/**
 * moduleA里的 state Item类型说明
 * @param {number} id 每个item的唯一id,
 * @param {string} msg 每个item的内容
 * @param {Boolean} show 每个item的选中状态
 * @param {Boolean} ipt 每个item的input展示状态
 */
export type ItemData = {
    id: number;
    msg: string;
    show?: Boolean;
    ipt?: Boolean;
};

/**
 * 触发redux的action
 * @param {string} type 行为类型,
 * @param {never[] | ItemData[]} data 给redux的数据
 */
export type TodoAction = {
    type: string;
    data: never[] | ItemData[];
};

/**
 * 触发saga的action  反选
 * @param {string} type 行为类型,
 * @param {never[] | ItemData[]} data itemData
 */
export type SagaActionItem = {
    type: string;
    data: ItemData;
};

/**
 * 触发saga的action  新增 或 修改
 * @param {string} type 行为类型,
 * @param {value: string} data input值
 */
export type SagaActionChange = {
    type: string;
    data: {
        value: string;
    };
};

type Focus = {
    focus: () => void;
};

/**
 * list inputElement存储类型 ref
 * @param {string} key key值,
 * @param {HTMLInputElement & Focus} keyValue 具有value的 eventTarget
 */
export type ListInput = {
    [key: string]: HTMLInputElement & Focus;
};
