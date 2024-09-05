import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser } from './store';
import Pagination from 'react-js-pagination';
import Paginate from './pagenate.js'


function App() {

	const userArray = useSelector((state) => { return state })
	let dispatch = useDispatch()

	//redux에 보내버릴 state
	const [newName, setNewName] = useState('')
	const [newEmail, setNewEmail] = useState('')
	const [newNickName, setNewNickName] = useState('')
	const [newGender, setNewGender] = useState('select')


	//state를 통한 add버튼 활성화
	const [validName, setValidName] = useState(0)
	const [validEmail, setValidEmail] = useState(0)
	const [validNickName, setValidNickName] = useState(0)
	const [validGender, setValidGender] = useState(0)

	const regExName = /^[가-힣a-zA-Z\s\d]{3,15}$/;
	const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	//이름, 이메일, 닉네임 정규식 체크
	const checkName = (name) => {
		let result = regExName.test(name)
		console.log('name', result)
		if (result === true) {
			setValidName(1)
		} else {
			setValidName(0)
		}
	}

	const checkEmail = (valEmail) => {
		let result = regExEmail.test(valEmail)
		//console.log('email', result)

		let emailData = userArray.users.map((a, i) => { //배열의 이메일 값만 뽑아서 다시 배열 만들기
			return userArray.users[i].email
		})
		//console.log('emaildata', emailData)
		let duplication = emailData.includes(valEmail) //이메일 비교해서 중복이면 true 반환하기
		//console.log('duple', duplication)

		if (result === true) {
			if (duplication === false) {
				setValidEmail(1) //중복 false일때 이메일 등록 허용시키기
			}
		} else {
			setValidEmail(0)
		}
	}

	const checkNickName = (name) => {
		let result = regExName.test(name)
		console.log('nickname', result)
		if (result === true) {
			setValidNickName(1)
		} else {
			setValidNickName(0)
		}
	}

	const onChangeSelect = (e) => {
		console.log(e.target.value)
		setNewGender(e.target.value)
		if (e.target.value === 'male' || e.target.value === 'female') {
			setValidGender(1)
		} else {
			setValidGender(0)
		}
	}

	const addBtn = () => {
		console.log('clean')
		setNewName(''); setNewEmail(''); setNewNickName(''); setNewGender('select')
		setValidName(0); setValidEmail(0); setValidNickName(0); setValidGender(0);
	}

	return (
		<div className='Container'>
			<div className='addContainer'>
				<div className='title'>Add user</div>
				<div className='addContent'>
					<div className='inputContent'>
						<div>username</div>
						<input className='input' name="username" type='text' value={newName}
							onChange={(e) => { checkName(e.target.value); setNewName(e.target.value); }}
							style={{ borderColor: validName === 1 ? null : "red" }}
						></input>
					</div>
					<div className='inputContent'>
						<div>email</div>
						<input className='input' name='email' type='text' value={newEmail}
							onChange={(e) => { checkEmail(e.target.value); setNewEmail(e.target.value) }}
							style={{ borderColor: validEmail === 1 ? null : "red" }}
						></input>
					</div>
					<div className='inputContent'>
						<div>nickname</div>
						<input className='input' name='nickname' type='text' value={newNickName}
							onChange={(e) => { checkNickName(e.target.value); setNewNickName(e.target.value) }}
							style={{ borderColor: validNickName === 1 ? null : "red" }}
						></input>
					</div>
					<div className='inputContent'>
						<div>gender</div>
						<select className='input' name='gender' defaultValue='select' onChange={onChangeSelect} value={newGender}>
							<option value='select' disabled>select</option>
							<option value='male'>male</option>
							<option value='female'>female</option>
						</select>
					</div>
				</div>
				<div>
					{
						validName === 1 && validEmail === 1 && validNickName === 1 && validGender === 1
							? <button onClick={() => {
								dispatch(addUser(
									{ username: newName, email: newEmail, nickname: newNickName, gender: newGender, checked: false }
								))
								addBtn();
							}}>add</button>
							: <button onClick={() => { dispatch(addUser()) }} disabled={true}>add</button>
					}
				</div>
			</div>
			<div className='userContainer'>
				<Paginate />
			</div>
		</div>
	);
}

export default App;
