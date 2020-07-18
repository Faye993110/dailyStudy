import Axios from "axios";
import * as constants from './constants'

const changeLogin = () => ({
	type: constants.CHANGE_LOGIN,
	value: true
})
export const login = (account, password) => {
	return (dispatch) => {
		Axios.get('/api/login.json?account=' + account + '&password=' + password).then((res) => {
			const result = res.data.data;
			if(result){
        dispatch(changeLogin())
			}else{
					alert('login failed!')
			}
		})
	}
}

export const logout = () => ({
	type: constants.LOGOUT,
	value: false
})
