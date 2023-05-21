import React from 'react'
import { Input } from 'reactstrap'
import DropdownListFilter from './DropdownListFilter'

const SeachBoxMobile = ({
  data,
  setRequestDefault,
  availableData,
  searchKey,
  setSearchKey,
  showFilter,
  availablePermission
}) => {
  const handleFilterSearchKey = (e) => {
    e.preventDefault()
    const resultFilter = availableData.filter((_elt) => {
      const filterLowerCase = _elt.title
      const filterCode = _elt.code.toLowerCase()
      const filterCreator = _elt.supporterInOnIdName.toLowerCase()
      const filterRegex = new RegExp(searchKey.replace(/\s*/g, '.*?'))
      return filterLowerCase.match(filterRegex) || filterCode.match(filterRegex)  || filterCreator.match(filterRegex)
    })
    setRequestDefault(resultFilter)
  }
  return (
    <form onSubmit={handleFilterSearchKey}>
      <div className='d-flex align-items-center mb-2 box-search-mobile'>
          <Input
            value={searchKey}
            className=' shadow-lg bg-white rounded-lg'
            placeholder={'Tìm kiếm ...'}
            onChange={(e) => {
              if (e.target.value === '') {
                setRequestDefault(availableData)
                setSearchKey('')
              } else return setSearchKey(e.target.value)
            }}
          />
          {
            showFilter ?   <DropdownListFilter data={data} availableData={availableData} setRequest={setRequestDefault} availablePermission={availablePermission} /> : null
          }
      </div>
    </form>
  )
}

export default SeachBoxMobile
