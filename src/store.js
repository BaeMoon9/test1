import { configureStore, createSlice } from '@reduxjs/toolkit'

const userData = [
	{username : 'John', email : 'john@thyroscope.com', nickname : 'moderator', gender : 'male', checked : false},
	{username : 'Steve', email : 'steve@thyroscope.com', nickname : 'civilian1', gender : 'male', checked : false},
	{username : 'Julie', email : 'julie@thyroscope.com', nickname : 'civilian2', gender : 'female', checked : false},
	{username : 'Frank', email : 'frank@thyroscope.com', nickname : 'mafia1', gender : 'male', checked : false},
]

const user = createSlice({
	name : 'user',
	initialState: userData,
	reducers: {
		addUser(state, action) { //등록 함수
			state.push(action.payload)
			console.log(state)
		},
		deleteBtn(state, action) { // 삭제 함수
			console.log('deleteBtn parameter', action.payload)
			 state.splice(action.payload, 1)
		},
		checkBtn(state, action) { //체크 확인 여부 :수정,삭제버튼
			console.log('checkBtn parameter', action.payload)
			//console.log(state[action.payload.value].checked)
			if(action.payload.checked === true){
				state[action.payload.checkedID].checked = true // 체크값 true로 변경
			}else if(action.payload.checked === false) {
				state[action.payload.checkedID].checked = false
			}
 		},
		editBtn(state, action) {
			console.log('before', userData[action.payload.checkedID])
			console.log(action.payload.arr)
			state.splice(action.payload.checkedID, 1, action.payload.arr)
			console.log('after', userData[action.payload.checkedID])
		}
	}
})

export let {addUser, deleteBtn, checkBtn, editBtn} = user.actions




export default configureStore({

  reducer: {
		users : user.reducer,
		
	}
}) 