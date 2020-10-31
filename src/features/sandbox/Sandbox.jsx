import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react';
import { openModal } from '../../app/commom/modals/modalReducer';
import { decrement, increment } from './testReducer';

export default function Sandbox() {
    const dispatch = useDispatch()
    const data = useSelector(state=> state.test.data);

    return (
        <div>
        <h1>Testing 123</h1>
        <h3>The data is: {data} </h3>
        <Button 
            onClick = {() => dispatch(increment(10))}
            content="Increment" 
            color="green"
        />
        <Button 
            onClick = {() => dispatch(decrement(5))}
            content="Decrement" 
            color="red"
        />

           <Button 
            onClick = {() => dispatch(openModal({modalType: 'TestModal', modalProps:{data}}))}
            content="Open modal" 
            color="teal"
        />
   
        </div>
    )
};
