import React, { useState } from 'react';
import './Todolist.css';
import logo from '../images/TodoLogo.png';
import List from '../components/List';

const Todolist = () => {
    const [input, setInput] = useState('');
    const [items, setItems] = useState([]);
    const [isToggle, setIsToggle] = useState(true);
    const [editItemId, setEditItemId] = useState(null);
    const [completedItems, setCompletedItems] = useState([]);


    const addItem = () => {
        if (!input) {
            alert('Please enter the text first!');
        }
        else if (items.find(ele => ele.name === input)) {
            alert('This list is already exist.')
        }
        else if (input && !isToggle) {
            setItems(
                items.map(ele => {
                    if (ele.id === editItemId) {
                        return { ...ele, name: input }
                    }
                    return ele;
                }
                )
            )
            setEditItemId(null);
        }
        else {
            const nameId = { id: new Date().getTime().toString(), name: input }
            setItems([...items, nameId]);
        }
        setInput('');
        setIsToggle(true);
    }

    const deleteItem = (id) => {
        setItems(items.filter(ele => ele.id !== id));
        setCompletedItems(completedItems.filter(ele => ele.id !== id));
    }

    const editItem = (item) => {
        setInput(item.name);
        setIsToggle(false);
        setEditItemId(item.id);
    }

    const cancelUpdate = ()=> {
        setInput('');
        setIsToggle(true);
    }


    const remove = () => {
        setInput('');
        setItems([]);
        setIsToggle(true);
        setCompletedItems([]);
    }

    return (
        <>
            <header>
                <img src={logo} alt="logo" />
                <h1>Todo List</h1>
            </header>
            <div className='container'>
                <div className='todolist'>
                    <input
                        style={isToggle? {width:'88%'}: {width:'77%'}}
                        type="text" autoFocus
                        placeholder='Enter Text Here..'
                        value={input}
                        onChange={(evt) => setInput(evt.target.value)}
                    />
                    {
                        isToggle ?
                            <button className='addBtn' onClick={addItem}>Add</button>
                            :
                            <>
                                <button className='addBtn' onClick={addItem}>Update</button>
                                <button className='addBtn cancelBtn' onClick={cancelUpdate}>Cancel</button>
                            </>
                    }
                </div>

                <div className='list'>
                    <ul>
                        {
                            items.map((ele, index) => {
                                return <List
                                    key={ele.id}
                                    slNo={index+1}
                                    listItem={ele}
                                    deleteItem={deleteItem}
                                    editItem={editItem}
                                    completedItems={completedItems}
                                    setCompletedItems={setCompletedItems}
                                />
                            }
                            )

                        }
                    </ul>
                </div>

                <div className='remove'>
                    {
                        items.length > 0 ? <button onClick={remove}>Remove All</button> : null
                    }
                </div>

            </div>
        </>
    )
}

export default Todolist;