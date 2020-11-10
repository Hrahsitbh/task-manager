import React from "react";

function Col(props) {
    const { isOver, children, getValue, addNewTask, id } = props;
    const className = isOver ? " highlight-region" : "";

    return (
        <div className={`col${className}`}>
            {children}
            <div style={{ height: '50px' }}>
                <input type="text" placeholder="+ Add Task" style={{ height: '30px', width: '190px' }} onChange={event => { getValue(event) }} />
                <button id={id} style={{ border: '1px solid', margin: '10px 10px', padding: '10px' }} onClick={addNewTask}>Add Task</button>
            </div>
        </div>
    );
};

export default Col;