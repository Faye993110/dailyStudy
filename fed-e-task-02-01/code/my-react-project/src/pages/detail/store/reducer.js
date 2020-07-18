import * as constants from './constants';

const defaultState = {
    title: '',
    content: ''
}


//纯函数，给定固定的输入，一定有固定的输出，并且不会改变原来的值

export default (state = defaultState, action) => {
	switch(action.type){
	    case constants.CHANGE_DETAIL:
            return {
                ...state,
                title : action.title,
                content : action.content
            }
		default:
			return state
	}
}