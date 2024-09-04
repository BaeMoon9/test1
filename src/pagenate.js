import './App.css';
import React from "react";
import { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBtn, checkBtn, editBtn, } from './store.js';

function Paginate() {

	const userArray = useSelector((state) => { return state })
	let dispatch = useDispatch()

	//pagination
	const [page, setPage] = useState(1) //페이지
	const limit = 5 //1페이지당 데이터 5개 제한하기
	const lastData = page * limit
	const firstData = lastData - limit
	const slicedID = 5 * (page - 1)


	const [slicedData, setSlicedData] = useState([]) //5개씩 나열할 userArray.users 데이터들

	useEffect(() => {
		setSlicedData(userArray.users.slice(firstData, lastData))
		//setSlicedData(userArray.users)

	}, [userArray.users, page])

	const handleNextPage = (page) => { //페이지 이동 onchange
		setPage(page)
	}

	const onChecked = (value, checked) => {
		console.log('checked', value)
		console.log('id값', Number(value) + Number(slicedID)) //5개씩 slice된 sliceData 배열때문에 pagination을 해서 2페이지로가면 i값이 다시 0부터 시작한다
		let checkedID = Number(value) + Number(slicedID) //그래서 숫자를 더해서 store.js에 있는 배열 순서랑 맞춰서 삭제한다.
		
		// if(checked === true) { //수정버튼 누를시 그 배열 값 그대로 가져오기
		// 	//error 문제는 여러개 선택하면 모두 같은 값이 되어버린다
		//	//user 추가할때는 input칸을 하나밖에 안써서 이렇게해도되지만 수정은 input이 여러개가 가능해서 안된다.
		// 	setNewName(userArray.users[checkedID].username)
		// 	setNewEmail(userArray.users[checkedID].email)
		// 	setNewNickName(userArray.users[checkedID].nickname)
		// 	setNewGender(userArray.users[checkedID].gender)
		// }

		dispatch(checkBtn({ checkedID, checked }))

		if(checked === false) { //체크 해제시 input값 비우기
			setNewName('')
			setNewEmail('')
			setNewNickName('')
			setNewGender('')
		}
		
	}

	const [newName, setNewName] = useState('')
	const [newEmail, setNewEmail] = useState('')
	const [newNickName, setNewNickName] = useState('')
	const [newGender, setNewGender] = useState('')


	const handleEdit = (value, arr) => {
		let checkedID = Number(value) + Number(slicedID)
		//console.log('handleEdit', checkedID, arr)
		dispatch(editBtn(({ checkedID, arr })))

	}

	const [validName, setValidName] = useState(0)
	const [validEmail, setValidEmail] = useState(0)
	const [validNickName, setValidNickName] = useState(0)
	const [validGender, setValidGender] = useState(0)

	const regExName = /^[가-힣a-zA-Z\s\d]{3,15}$/;
	const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	//이름, 이메일, 닉네임 정규식 체크
	const checkName = (name) => {
		let result = regExName.test(name)
		//console.log('name', result)
		if (result === true) {
			setValidName(1)
		} else {
			setValidName(0)
		}
	}
	const checkEmail = (email) => {
		let result = regExEmail.test(email)
		//console.log('inputemail', result)

		//email 중복 확인 여부
		let emailSame = userArray.users.map((a, i) => {
			if(userArray.users[i].email === result) {
				return false
			}else {
				return true
			}
		})

		if (result === true) {
			if(emailSame === true) {
				setValidEmail(1)
			}else {
				setValidEmail(0)
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


	//search by username : map함수 처리를 어떻게 해야하나
	const [searchUser, setSearchUser] = useState('')
	const [searchData, setSearchData] = useState([])
	const onChangeSearch = (e) => {
		console.log('찾기', e)
		setSearchUser(e)
		
		let result = userArray.users.map((a, i) => {
			if(userArray.users[i].username.includes(searchUser)) {
				console.log(userArray.users[i].username)
				return userArray.users[i]
			}else {
				console.log('x')
			}
		})
		setSearchData(result)
		console.log(searchData)
		
	}

// ↓
	return (
		<>
			<div className='userContainer'>
				<div>
					<div className='title'>Users</div>
					<div>{userArray.users.length} users</div>
					<input className='input' placeholder='Search by username'
						onChange={(e) => { onChangeSearch(e.target.value) }}></input>
				</div>
				<Table striped bordered hover variant="light">
					<thead>
						<tr>
							<th></th>
							<th>
								<div className='thContent'>
									<div className='thTitle'>username</div>
									<div className='sort'>↑</div>
								</div>
							</th>
							<th>
								<div className='thContent'>
									<div className='thTitle'>email</div>
									<div className='sort'>↑</div>
								</div></th>
							<th>
								<div className='thContent'>
									<div className='thTitle'>nickname</div>
									<div className='sort'>↑</div>
								</div>
							</th>
							<th>
								<div className='thContent'>
									<div className='thTitle'>gender</div>
									<div className='sort'>↑</div>
								</div>
							</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{
							slicedData
								.map((a, i) => {
									//console.log(editUser)
									return (
										<tr key={i}>
											<td>
												<input type='checkbox' value={i} onChange={(e) => { onChecked(e.target.value, e.target.checked) }} />
											</td>
											<>
												{

													a.checked === true
														? <>
															{/* {console.log('a.checked', a)} */}
															<td><input type='text' value={newName} style={{ borderColor: validName === 1 ? null : "red" }}
																onChange={(e) => { checkName(newName); setNewName(e.target.value);}}>
															</input>
															</td>
															<td><input type='text' value={newEmail} style={{ borderColor: validEmail === 1 ? null : "red" }}
																onChange={(e) => { checkEmail(e.target.value); setNewEmail(e.target.value); }}>
															</input>
															</td>
															<td><input type='text' value={newNickName} style={{ borderColor: validNickName === 1 ? null : "red" }}
																onChange={(e) => { checkNickName(e.target.value); setNewNickName(e.target.value) }}>
															</input>
															</td>
															<td>
																<select className='input' name='gender' defaultValue='select' onChange={onChangeSelect}>
																	<option value='select' disabled>select</option>
																	<option value='male'>male</option>
																	<option value='female'>female</option>
																</select>
															</td>
															<td>
																{
																	validName === 1 && validEmail === 1 && validNickName === 1 && validGender === 1
																		? <button value={i} onClick={() => {
																			handleEdit(i, {
																				username: newName, email: newEmail, nickname: newNickName, gender: newGender, checked: false
																			})
																		}}>수정</button>
																		: <button disabled={true} value={i} onClick={() => {
																			handleEdit(i, {
																				username: newName, email: newEmail, nickname: newNickName, gender: newGender, checked: false
																			})
																		}}>수정</button>
																}
																<button value={i} onClick={() => { dispatch(deleteBtn(Number(i) + Number(slicedID))) }}>삭제</button>
															</td>
														</>
														: <>
															<td>{a.username}</td>
															<td>{a.email}</td>
															<td>{a.nickname}</td>
															<td>{a.gender}</td>
															<td>
															</td>
														</>
												}
											</>
										</tr>
									)
								})
						}
					</tbody>
				</Table>
				<div>
					<Pagination
						itemClass="page-item"
						linkClass="page-link"
						activePage={page}
						itemsCountPerPage={limit} //limit
						totalItemsCount={userArray.users.length}
						pageRangeDisplayed={5}
						prevPageText={"< prev"}
						nextPageText={"next >"}
						onChange={handleNextPage}
					/>
				</div>
			</div>
		</>

	)
}

export default Paginate