import React from 'react'
import * as Icon from 'react-feather'
import { Input } from 'reactstrap'
import styled from 'styled-components'
import HelpcenterService from '../../../../services/elite-app/helpCenter'

const IconSearchStyled = styled.span`
button{
  background : none;
  border : none;
  outline : none;
}
margin-left: -50px;
svg{
  transition : all .4s ease-in-out;
}
svg:hover{
  transform : scale(1.2);
}

`
const SearchBox = ({ searchKey, setSearchKey, setListSearch }) => {
  const handleOnchangeSearch = async (e) => {
    e.preventDefault()
    const resSearch = await HelpcenterService.SearchQuestion(searchKey)
    if (resSearch.status === 200) {
      setListSearch(resSearch.data)
    }
  }
  const handleEmptySearchBox = () =>{
    setListSearch({})
    setSearchKey('')
  }
  return (
    <form onSubmit={handleOnchangeSearch}>
    <div
      className='d-flex align-items-center mb-3'>
      <Input
      className=" shadow-lg bg-white rounded-lg"
        placeholder={'Đặt câu hỏi hoặc nhập từ khoá'}
        onChange={(e) => {
          if (e.target.value === '') {
            setListSearch({})
            setSearchKey('')
          } else return setSearchKey(e.target.value)
        }}
        value={searchKey}
      />
        <IconSearchStyled>
        <span className='cursor-pointer'>
            <button type="submit" disabled={searchKey === ''} ><Icon.Search aria-disabled='true' size={25} color='#626262' /></button>
        </span>
        </IconSearchStyled>
 
    </div>
    </form>
  )
}

export default SearchBox
