import React from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPE from "../data/type";
import { statuses } from "../data";

function DropWrapper(props) {
    const { onDrop, children, status } = props;
    const [{ isOver }, drop] = useDrop({
        accept: ITEM_TYPE,
        canDrop: (item) => {
            const itemIndex = statuses.findIndex(si => si.status === item.status);
            const statusIndex = statuses.findIndex(si => si.status === status);
            return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
        },
        drop: (item, monitor) => {
            onDrop(item, monitor, status);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop} className="drop-wrapper">
            {React.cloneElement(children, { isOver })}
        </div>
    )
};

export default DropWrapper;