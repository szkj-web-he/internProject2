export type ItemData = {
    id: number;
    msg: string;
    show?: undefined | Boolean;
    ipt?: undefined | Boolean;
};

export type TodoAction = {
    type: string;
    data: never[] | ItemData[];
};

export type SagaActionItem = {
    type: string;
    data: ItemData;
};
export type SagaActionChange = {
    type: string;
    data: {
        value: string;
    };
};

type Focus = {
    focus: () => void;
};

export type ListInput = {
    [key: string]: HTMLInputElement & Focus;
};
