import * as constants from './constants';
import axios from 'axios';

const changeList = (data) => {
  return {
    type: constants.CHANGE_LIST,
    data: data,
    totalPage: Math.ceil(data.length /10),
  }
}

export const searchFocus = () => ({
  type: constants.SEARCH_FOCUS
})

export const searchBlur = () => ({
	type: constants.SEARCH_BLUR
})

export const mouseEnter = () => ({
  type: constants.MOUSE_ENTER
})
export const mouseLeave = () => ({
  type: constants.MOUSE_LEAVE
})
export const getList = () => {
  return (dispatch) => {
    axios.get('/api/headerList.json').then((res) => {
    const data = res.data;
    dispatch(changeList(data.data));
   // console.log(data);
    }).catch(() => {
      console.log('error');
    })   
  }
}

export const changePage = (page)=>({
  type:constants.CHANGE_PAGE,
  page: page
})