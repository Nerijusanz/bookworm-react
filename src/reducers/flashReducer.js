import shortid from 'shortid';

import { 
    ADD_FLASH_MESSAGE,
    DELETE_FLASH_MESSAGE
} from '../actions/types';

const initialState={
    messages:[]
};

export default function flashMessage(state=initialState,action){
    switch(action.type){
        
        case ADD_FLASH_MESSAGE:
            return {
                ...state,
                messages:[
                    ...state.messages,
                    {
                        id: shortid.generate(),    
                        type: action.payload.type,
                        message: action.payload.message
                    }]
                 
            }

        case DELETE_FLASH_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(msg=>msg.id !== action.payload)
            }

        default:return state;
    }
} 