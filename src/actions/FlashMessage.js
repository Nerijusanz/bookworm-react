import { 
    ADD_FLASH_MESSAGE,
    DELETE_FLASH_MESSAGE 
} from './types';

// ---------------FLASH_MESSAGE_USAGE-------------
/*
import {addFlashMessage} from '../../../actions/FlashMessage';
prop-type: addFlashMessage: propTypes.func.isRequired,

// usage in function
this.props.addFlashMessage({
    type:'success',
    message:'account has been success verified
}); */
// -----------------------------------------

export const addFlashMessage = (message) => (dispatch) => {

    dispatch({
        type: ADD_FLASH_MESSAGE,
        payload: message
    });

}

export const deleteFlashMessage = (id) => (dispatch) => {

    dispatch({
        type: DELETE_FLASH_MESSAGE,
        payload:id
    })

}