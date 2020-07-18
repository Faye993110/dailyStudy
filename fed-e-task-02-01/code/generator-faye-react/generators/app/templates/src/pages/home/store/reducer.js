import * as constants from './constants';

const defaultState = {
	topicList: [],
	articleList: [],
	recommendList:[],
	articlePage: 1,
	showScroll: false
};


//纯函数，给定固定的输入，一定有固定的输出，并且不会改变原来的值

export default (state = defaultState, action) => {
	switch(action.type){
	  case constants.CHANGE_HOME_DATA:
			return{
				...state,
				topicList: action.topicList,
				articleList: action.articleList,
				recommendList: action.recommendList
			}	
		case constants.ADD_ARTICLE_LIST:{
			let list = state.articleList;
			return{
				...state,
				articleList: list.concat(action.articleList),
				articlePage: action.nextPage
			}
		}
		case constants.TOGGLE_TOP_SHOW: {
			return {
				...state,
				showScroll : action.show
			}
		}
		default:
			return state
	}
}