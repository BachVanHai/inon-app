import React, { useEffect, useState } from 'react'
import TreeNode from './TreeNode'

const Tree = ({list}) => {

  const [data, setData] = useState([])

  useEffect(() => {
    setData(getDisplayList())
  }, [list])

  const getDisplayList = () => {
    const listDisplay = list.map(item => {
      const parent = list.find(i => i.id === parseInt(item.parentId))
      if(!parent)  {
        item.isRoot = true
      }
      return item
    })
    return listDisplay
  }

  const getRootNodes = () => {
    return data.filter(node => node.isRoot === true)
  }

  const getChildNodes = (node) => {
    return data.filter(item => parseInt(item.parentId) === node.id)
  }

  const onToggle = (node) => {
    let dataAlt = data.map(item => {
      let returnValue = {...item}
      if(node.id === item.id) {
        returnValue.isOpen = !item.isOpen
      }
      return returnValue
    })
    setData(dataAlt)
  }

  return (
    <div>
      {
        data.length > 0 ? (
          getRootNodes().map(node => (
            <TreeNode node={node} getChildNodes={(node) => getChildNodes(node)}
                      onToggle={(node) => onToggle(node)}/>
          ))
        ) : null
      }
    </div>
  )
}

export default Tree
