
import React, { useState, useCallback } from "react";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";
import Col from "../components/Col";
import { data, statuses } from "../data";

function Homepage() {
  const [items, setItems] = useState(data);
  const [allStatuses, setStatus] = useState(statuses);
  const [inputVal, getInput] = useState('');
  const onDrop = (item, monitor, status) => {

    setItems(prevState => {
      const newItems = prevState
        .filter(i => i.id !== item.id)
        .concat({ ...item, status });
      return [...newItems];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems(prevState => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  const getValue = useCallback(event => {
    getInput(event.target.value)
  }, [getInput]);

  const addNewList = useCallback(() => {
    setStatus([...allStatuses, { status: inputVal }])
  }, [inputVal, allStatuses]);

  const addNewTask = useCallback(event => {
    setItems([...items, { content: inputVal, id: (items.length + 1), status: event.target.id || 'open' }])
  }, [items, inputVal]);
  
  return (
    <div className="row column-grid">
      {allStatuses.map((s, i) => {
        return (
          <div key={s.status} className="col-wrapper">
            <h2 className="col-header">{s.status.toUpperCase()}</h2>
            <DropWrapper onDrop={onDrop} status={s.status}>
              <Col getValue={getValue} addNewTask={addNewTask} id={s.status}>
                {items
                  .filter(i => i.status === s.status)
                  .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} />)
                }
              </Col>
            </DropWrapper>
          </div>
        );
      })}
      <div className="col-wrapper" style={{ height: '50px' }}>
        <input type="text" placeholder="+ Add List" onChange={getValue} style={{ height: '22px' }} />
        <button onClick={addNewList} style={{ border: '1px solid', margin: '10px 0 0' }}>Add List</button>
      </div>
    </div>
  );
};

export default Homepage;