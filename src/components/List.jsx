import React from 'react';
import { MdDone } from 'react-icons/md';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { GrUndo } from 'react-icons/gr';

const List = ({slNo, listItem, deleteItem, editItem, completedItems, setCompletedItems }) => {
    return (
        <>
            {
                completedItems.includes(listItem) ?
                    <div className='li-div'>
                        <li className='li-text'>{slNo}. {listItem.name}</li>
                        <div className='line'></div>
                        <div className='li-btns'>
                            <button className='undoBtn' onClick={() => setCompletedItems(completedItems.filter(ele => ele.id !== listItem.id))}><GrUndo /></button>
                            <button className='editBtn' onClick={() => editItem(listItem)}><AiOutlineEdit /></button>
                            <button className='deleteBtn' onClick={() => deleteItem(listItem.id)}><AiOutlineDelete /></button>
                        </div>
                    </div>
                    :
                    <div className='li-div'>
                        <li className='li-text'>{slNo}. {listItem.name}</li>
                        <div className='li-btns'>
                            <button className='doneBtn' onClick={() => setCompletedItems([...completedItems, listItem])}><MdDone /></button>
                            <button className='editBtn' onClick={() => editItem(listItem)}><AiOutlineEdit /></button>
                            <button className='deleteBtn' onClick={() => deleteItem(listItem.id)}><AiOutlineDelete /></button>
                        </div>
                    </div>
            }
        </>
    )
}

export default List;
