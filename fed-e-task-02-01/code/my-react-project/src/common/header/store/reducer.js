import * as constants from './constants';

const defaultState = {
    focused: false,
		list: [],
		page: 1,
		totalPage: 1,
		mouseIn : false
};


//纯函数，给定固定的输入，一定有固定的输出，并且不会改变原来的值

export default (state = defaultState, action) => {
	switch(action.type){
		case constants.SEARCH_FOCUS:
			return {
				...state,
				focused:true};
		case constants.SEARCH_BLUR:
			return {...state,
				focused: false};
		case constants.CHANGE_LIST:
			return {
				  ...state,
					list: action.data,
					totalPage: action.totalPage
			}
		case constants.MOUSE_ENTER:
			return {
				...state,
				mouseIn: true
			
			}
		case constants.MOUSE_LEAVE:
			return {
				...state,
				mouseIn: false
			}
		case constants.CHANGE_PAGE:
			return{
				...state,
        page: action.page
			}
		default:
			return state
	}
}