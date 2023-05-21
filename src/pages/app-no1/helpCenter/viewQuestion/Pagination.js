import React, { useEffect, useState } from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { isArrayEmpty } from '../../../../ultity'
import { isEmptyObject } from './utility'
import { PAGE_SIZE } from './utility'
const PaginationList = ({ dataSet, setListQuestionPagination ,listSearch , currentPageActive , setCurrentPageActive}) => {
  let currentPage = 0
  const pagesCount = !isArrayEmpty(dataSet)
    ? Math.ceil(dataSet.length / PAGE_SIZE)
    : null
  const handleClick = (e, index) => {
    e.preventDefault()
    currentPage = index
    setCurrentPageActive(index)
    const data = dataSet
      .slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
      .map((data, i) => data)
    setListQuestionPagination(data)
  }
  useEffect(() => {
    const setCurrentData = async () => {
      const data =
        dataSet !== undefined
          ? dataSet
              .slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
              .map((data, i) => data)
          : null
      setListQuestionPagination(data)
    }
    setCurrentData()
  }, [dataSet])
  return (
    <div className='d-flex justify-content-center'>
      <div className='pagination-wrapper'>
        {pagesCount > 1 && isEmptyObject(listSearch) ? (
          <Pagination aria-label='Page navigation example'>
            <div className='d-flex'>
              {[...Array(pagesCount)].map((page, i) => (
                <PaginationItem active={i === currentPageActive} key={i}>
                  <PaginationLink
                    onClick={(e) => {
                      handleClick(e, i)
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </div>
          </Pagination>
        ) : null}
      </div>
    </div>
  )
}

export default PaginationList
