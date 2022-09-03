import React, { useEffect, useState } from 'react';
import './Todolist.css';
import logo from '../images/TodoLogo.png';
import List from '../components/List';


const getLocalItems = () => {
    let getData = localStorage.getItem('data');
    if(getData) {
        return JSON.parse(getData);
    }
    else {
        return [];
    }
}

const Todolist = () => {
    const [input, setInput] = useState('');
    const [items, setItems] = useState(getLocalItems);
    const [isToggle, setIsToggle] = useState(true);
    const [editItemId, setEditItemId] = useState(null);
    const [completedItems, setCompletedItems] = useState([]);


    useEffect(()=> {
        localStorage.setItem('data',JSON.stringify(items));
    },[items]);


    const addItem = () => {
        if (!input) {
            alert('Please enter the text first!');
        }
        else if (items.find(ele => ele.name === input)) {
            alert('This list already exists.')
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
        else if(input && input.trim()) {
            const nameId = { id: new Date().getTime().toString(), name: input }
            setItems([...items, nameId]);
        }
        setInput('');
        setIsToggle(true);
    }

    const deleteItem = (id) => {
        setItems(items.filter(ele => ele.id !== id));
        setCompletedItems(completedItems.filter(ele => ele.id !== id));
        setInput('');
        setIsToggle(true);
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
                        type="text" autoFocus
                        placeholder='Enter Text Here..'
                        value={input}
                        onChange={(evt) => setInput(evt.target.value)}
                    />
                    {
                        isToggle ?
                            <button className='addBtn' onClick={addItem}>Add</button>
                            :
                            <div className='ucBtn-div'>
                                <button onClick={addItem}>Update</button>
                                <button onClick={cancelUpdate}>Cancel</button>
                            </div>
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
                        items.length > 0 ? <button onClick={remove}>Remove All</button> : <p>Your added items will appear here!</p>
                    }
                </div>

            </div>
        </>
    )
}

export default Todolist;
