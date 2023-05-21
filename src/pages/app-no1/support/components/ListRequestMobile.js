import React from 'react'
import * as Icon from 'react-feather'
import { FormattedMessage } from 'react-intl'
import { Col, ListGroup, Row } from 'reactstrap'
import ListGroupItem from 'reactstrap/lib/ListGroupItem'
import { getKeyLang } from '../../../../configs/app-no1'
import { isArrayEmpty } from '../../../../ultity'
import { DROP, HIGH, MEDIUM } from '../utility'
import SeachBoxMobile from './SearchBoxMobile'

const ListRequestMobile = ({title , data,getStatusRequest , setRequestDefault , availableData , searchKey , setSearchKey , showFilter ,handleReaderMessage , availablePermission}) => {
  const isMention = /@\[[0-9\u00E0\u00E1\u00E2\u00E3\u00E8\u00E9\u00EA\u00EC\u00ED\u00F2\u00F3\u00F4\u00F5\u00F9\u00FA\u00FD\u00E5\u0111\u0123\u0169\u01A1\u01B0\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9abcdefghiklmnopqrstuvxy0123456789_\s]*\]*/gi
  //find userId in mention => remove
  const isUserId = /userId:[0-9a-z]*|[(]|[)]|[@[]|\]/g
  return (
    <div className='list-request'>
      <div>
        <h3 className="mb-2 text-uppercase">
            <FormattedMessage id={getKeyLang(title)} />
        </h3>
      </div>
      <SeachBoxMobile data={data} setRequestDefault={setRequestDefault} availableData={availableData} searchKey={searchKey} setSearchKey={setSearchKey} showFilter={showFilter} availablePermission={availablePermission}/>
      <ListGroup>
      {
       !isArrayEmpty(data) ?  data.map((_elt,index) =>(
        
          <ListGroupItem key={index} className='cursor-pointer' style={{backgroundColor : !_elt?.statusReader  ? "#F4F9F9" :  "#e2f0d9" , marginBottom : "10px"}} onClick={()=>handleReaderMessage(_elt.id, _elt.roomId , _elt.hCUserId)}>
            {
              console.log()
            }
          <Row className='pl-1'>
            <Col xs={8} md={8}>
              <Row>
                <p className={`cursor-pointer ${!_elt?.statusReader  ? "font-weight-bold" : ""} `}  style={{width:"170px" ,textOverflow  : "ellipsis" , whiteSpace: "nowrap" , overflow: "hidden"} } >{_elt.title}</p>
              </Row>
              <Row><p className={`cursor-pointer ${!_elt?.statusReader  ? "font-weight-bold" : ""} `}  style={{width:"170px" ,textOverflow  : "ellipsis" , whiteSpace: "nowrap" , overflow: "hidden"}}>{_elt?.hcMessageDTOList.length > 0 ?  <span>
                {
                  isMention.test(_elt?.hcMessageDTOList[0]?.content) ? <span dangerouslySetInnerHTML={{__html :  _elt?.hcMessageDTOList[0]?.content.replace(isUserId, '')}}></span> : <span dangerouslySetInnerHTML={{__html : _elt?.hcMessageDTOList[0]?.content}}></span>
                }

              </span>  : null}</p></Row>
            </Col>
            <Col xs={4} md={4}>
              <Row>
                <div className="d-flex justify-content-end">
                  <p className={` ${!_elt?.statusReader  ? "font-weight-bold" : ""} `}>{_elt.code}</p>
                  <span style={{marginTop : "-2px" , marginLeft : "5px"}}>{_elt.priority === DROP ? "" : _elt.priority === MEDIUM ? <Icon.Star size="12" color="#ff9f43" fill="#ff9f43" /> : _elt.priority === HIGH ? <Icon.Star fill="#ea5455" size="12" color="#ea5455" /> : null}</span>
                </div>
              </Row>
              <Row style={{marginLeft : "2px"}}>
                {getStatusRequest(_elt.status).component}
              </Row>
            </Col>
          </Row>
        </ListGroupItem>
        )) : null
      }
      </ListGroup>
    </div>
  )
}

export default ListRequestMobile
