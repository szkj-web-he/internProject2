/**
 * @file
 * @date 2020-12-01
 * @author xuejie.he
 * @lastModify  2020-12-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */

import React, { useRef, useEffect } from 'react';
import "./style.scss";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../Store/rootReducer"
import actionTypes from "../../Store/moduleA/actionTypes"
import { ItemData, ListInput } from "./custom-type";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const HomePage = (): JSX.Element => {
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */

    const dispatch = useDispatch();
    const inputEl: React.MutableRefObject<null | HTMLInputElement> = useRef(null);
    const liIpt: React.MutableRefObject<ListInput | null> = useRef(null);
    const list: ItemData[] = useSelector((state: RootState) => state.todoList);
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */

    // 初始化todoList
    useEffect(() => {
        dispatch({
            type: actionTypes.moduleA.init.saga,
        });
    }, [dispatch]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    // 反选item
    const toggleItem = function (data: ItemData): void {
        dispatch({
            type: actionTypes.moduleA.toggleCheck.saga,
            data: JSON.parse(JSON.stringify(data)),
        });
    };

    // 反选输入框
    const toggleInput = function (res: ItemData): void {
        dispatch({
            type: actionTypes.moduleA.toggleInput.saga,
            data: JSON.parse(JSON.stringify(res)),
        });
        setTimeout((): void => {
            if (liIpt.current)
                liIpt.current[res.id.toString()].focus();
        });
    };
    // 新增todoList
    function addTodoList(): void {
        if (inputEl.current) {
            if (inputEl.current.value) {
                dispatch({
                    type: actionTypes.moduleA.add.saga,
                    data: {
                        value: inputEl.current.value,
                    },
                });
                inputEl.current.value = "";
            } else {
                alert("请输入内容");
            }
        }
    }
    // 获取文本框的值
    function getInputValue(e: React.ChangeEvent<HTMLInputElement>): void {
        const _target = e.target;
        dispatch({
            type: actionTypes.moduleA.changeItem.saga,
            data: {
                value: _target.value,
            },
        });
        _target.value = "";
    }

    // 表格内容
    const tableContent: JSX.Element[] = list.map((index: ItemData) => {
        return (
            <ul key={index.id}>
                <li
                    onClick={() => {
                        toggleItem(index);
                    }}
                    className={
                        "component_main__check" +
                        (index.show
                            ? " component_main__active"
                            : " component_main__inactive")
                    }></li>
                <li className="component_main__tableText">
                    <input
                        type="text"
                        style={index.ipt ? {} : { display: "none" }}
                        ref={(item: HTMLInputElement) => {
                            if (liIpt.current) {
                                liIpt.current[index.id.toString()] = item;
                            } else {
                                liIpt.current = {
                                    [index.id.toString()]: item
                                }
                            }
                        }}
                        onClick={(e: React.MouseEvent<Element>) => e.stopPropagation()}
                        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                            getInputValue(e);
                        }}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement> & React.ChangeEvent<HTMLInputElement>) => {
                            if (
                                e.keyCode === 13
                            ) {
                                getInputValue(e);
                            }
                        }}
                    />
                    <div
                        style={index.ipt ? { display: "none" } : {}}
                        onClick={(e: React.MouseEvent<Element>) => e.stopPropagation()}
                        onDoubleClick={() => {
                            toggleInput(index);
                        }}>
                        {index.msg}
                    </div>
                </li>
            </ul>
        );
    });
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (<div className="component_main__wrap">
        <div className="component_main__tableRequirement">
            <input
                type="text"
                placeholder="请输入新增内容"
                ref={inputEl}

                onKeyDown={

                    (e: React.KeyboardEvent<HTMLInputElement>) => {

                        if (e.keyCode === 13) {
                            addTodoList();
                        }
                    }}
            />
            <button className={"component_main__add"} onClick={addTodoList}>
                添加
            </button>
            <button
                className={"component_main__remove"}
                onClick={() =>
                    dispatch({
                        type: actionTypes.moduleA.remove.saga,
                        data: null,
                    })
                }>
                删除
            </button>
        </div>
        <div className="component_main__tableContent">{tableContent}</div>
    </div>);
};
export default HomePage;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
