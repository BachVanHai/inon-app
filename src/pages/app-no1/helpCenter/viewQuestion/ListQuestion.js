import { FormattedMessage } from 'base-app'
import React, { useEffect, useState } from 'react'
import * as Icon from 'react-feather'
import {
  Button,
  Card,
  CardBody,
  Collapse,
  UncontrolledCollapse
} from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../configs/app-no1'
import { isArrayEmpty } from '../../../../ultity'
import ModalPlayerVideo from './ModalPlayerVideo'
import { isEmptyObject, CHTG, HDSD, TLNV } from './utility'
const CollaspeItem = styled.div`
   .card {
    box-shadow: none;
    background: none;
    border-radius: 1px;
    border-bottom: 1px solid #e7ebeb;
  }
  .card .card-header {
    box-shadow: none;
    background: none;
  }
`
const ListQuestion = ({ questions, listSearch, listFilter }) => {
  const [isOpenModalVideo, setIsOpenModalVideo] = useState(false)
  const [linkVideoSelect, setLinkVideoSelect] = useState('')
  const [collapse, setCollapse] = useState(0)
  const [collapseChild, setCollapseChild] = useState(0)
  const handleOpenModalVideo = () => {
    setIsOpenModalVideo(true)
  }
  const handleCloseModalVideo = () => {
    setIsOpenModalVideo(false)
  }
  const toggle = (e) => {
    let event = e.target.dataset.event
    setCollapse(collapse === Number(event) ? 0 : Number(event))
  }
  const toggleCollapseChild = (e) => {
    let event = e.target.dataset.event
    setCollapseChild(collapseChild === Number(event) ? 0 : Number(event))
  }
  useEffect(() => {}, [listSearch])
  return (
    <div>
    {!isEmptyObject(listSearch) ? (
      <div>
        <div className='d-flex justify-content-center'>
          <h4>
            {listSearch.CHTG.length === 0 &&
            listSearch.HDSD.length === 0 &&
            listSearch.TLNV.length === 0 ? (
              <p className='d-flex justify-content-center'>
                <FormattedMessage
                  id={getKeyLang('helpcenter.resultSearch.notfound')}
                />
              </p>
            ) : (
              <p>
                <FormattedMessage
                  id={getKeyLang('helpcenter.resultSearch.found')}
                />
              </p>
            )}{' '}
          </h4>
        </div>
        {Object.keys(listSearch).map((key,index) => (
         
          <div key={index}>
            <p className='font-weight-bold' style={{ color: '#106d5a' }}>
              <FormattedMessage
                id={
                  key === CHTG && !isArrayEmpty(listSearch.CHTG)
                    ? getKeyLang('helpcenter.create.askedQuestion')
                    : key === HDSD && !isArrayEmpty(listSearch.HDSD)
                    ? getKeyLang('helpcenter.create.userManual')
                    : key === TLNV &&  !isArrayEmpty(listSearch.TLNV)
                    ? getKeyLang('helpcenter.create.document')
                    : ' '
                }
              />
            </p>
            {listSearch[key].map((questionSearch,index) => (
              <CollaspeItem key={index}>
                {isArrayEmpty(questionSearch) ? (
                  <Card key={questionSearch.id}>
                    <div
                      onClick={(e) => toggleCollapseChild(e)}
                      data-event={questionSearch.id}
                      className='d-flex justify-content-between cursor-pointer'
                      style={{
                        color:
                          collapseChild === questionSearch.id &&
                          questionSearch.categoryQuestionType === CHTG
                            ? '#73C14F'
                            : '#003300'
                      }}
                    >
                      {questionSearch.question}
                      <div>
                        {questionSearch.categoryQuestionType === CHTG ? (
                          collapseChild === questionSearch.id ? (
                            <Icon.Minus  onClick={(e) => toggleCollapseChild(e)}
                            data-event={questionSearch.id} />
                          ) : (
                            <Icon.Plus  onClick={(e) => toggleCollapseChild(e)}
                            data-event={questionSearch.id} />
                          )
                        ) : questionSearch.categoryQuestionType !== CHTG ? (
                          <>
                            <span className='cursor-pointer'>
                              {questionSearch.rsLinkYT === '' ||
                              questionSearch.rsLinkYT === null ? (
                                ''
                              ) : (
                                <span
                                  onClick={() => {
                                    setLinkVideoSelect(
                                      questionSearch.rsLinkYT
                                    )
                                    handleOpenModalVideo()
                                  }}
                                >
                                  <Icon.PlayCircle color='#73C14F' />
                                </span>
                              )}
                            </span>
                            <span className='cursor-pointer'>
                              {questionSearch.rsLinkPDF === '' ||
                              questionSearch.rsLinkPDF === null ? (
                                ''
                              ) : (
                                <a
                                  href={questionSearch.rsLinkPDF}
                                  target='_blank'
                                >
                                  {' '}
                                  <Icon.FileText color='#73C14F' />
                                </a>
                              )}
                            </span>
                          </>
                        ) : null}
                      </div>
                    </div>
                    {questionSearch.categoryQuestionType === CHTG ? (
                      <Collapse isOpen={collapseChild === questionSearch.id}>
                        <CardBody>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: questionSearch.resultText
                            }}
                          ></span>
                        </CardBody>
                      </Collapse>
                    ) : null}
                  </Card>
                ) : null}
              </CollaspeItem>
            ))}
          </div>
        ))}
      </div>
    ) : (
      <CollaspeItem>
        {!isArrayEmpty(listFilter)
          ? listFilter.map((question,index) => (
              <Card key={index}>
                <div
                  onClick={(e) => toggle(e)}
                  data-event={question.id}
                  style={{ backgroundColor: 'none' }}
                  className='d-flex justify-content-between cursor-pointer'
                >
                  <div style={{ color: '#003300' }}>{question.question}</div>
                  <div>
                    {collapse === question.id ? (
                      <Icon.ArrowDown  onClick={(e) => toggle(e)}
                      data-event={question.id} />
                    ) : (
                      <Icon.ArrowRight  onClick={(e) => toggle(e)}
                      data-event={question.id} />
                    )}
                  </div>
                </div>
                <Collapse isOpen={collapse === question.id}>
                  <CardBody style={{ backgroundColor: '#fbfbfb' }}>
                    <div class='d-flex justify-content-between'>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: question.resultText
                        }}
                      ></p>
                      <div>
                        {question.categoryQuestionType !== CHTG ? (
                          <>
                            <span className='cursor-pointer'>
                              {question.rsLinkYT === '' ||
                              question.rsLinkYT === null ? null : (
                                <span
                                  onClick={() => {
                                    setLinkVideoSelect(question.rsLinkYT)
                                    handleOpenModalVideo()
                                  }}
                                >
                                  <Icon.PlayCircle color='#73C14F' />
                                </span>
                              )}
                            </span>
                            <span className='cursor-pointer'>
                              {question.rsLinkPDF === '' ||
                              question.rsLinkPDF === null ? null : (
                                <a href={question.rsLinkPDF} target='_blank'>
                                  {' '}
                                  <Icon.FileText color='#73C14F' />
                                </a>
                              )}
                            </span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </CardBody>
                </Collapse>
              </Card>
            ))
          : questions.map((question,index) =>
              question.questionDTOList.length !== 0 ? (
                <Card key={index}>
                  <div
                    onClick={(e) => toggle(e)}
                    data-event={question.id}
                    style={{
                      backgroundColor: 'none',
                      color: '#003300',
                      fontSize: '16px'
                    }}
                    className='d-flex justify-content-between cursor-pointer'
                  >
                    {question.name}
                    <div>
                      {collapse === question.id ? (
                        <Icon.ArrowDown onClick={(e) => toggle(e)}
                        data-event={question.id} />
                      ) : (
                        <Icon.ArrowRight onClick={(e) => toggle(e)}
                        data-event={question.id} />
                      )}
                    </div>
                  </div>
                  <Collapse isOpen={collapse === question.id}>
                    <div style={{ backgroundColor: '#fbfbfb' , paddingLeft : "1.5rem" , paddingRight : "1.5rem" , paddingBottom : "5px" , paddingTop : "20px"}}>
                      {question.questionDTOList.map((questionChild,index) => (
                        <Card key={index}>
                          <div
                            onClick={(e) => toggleCollapseChild(e)}
                            data-event={questionChild.id}
                            className='d-flex justify-content-between cursor-pointer'
                            style={{
                              color:
                                collapseChild === questionChild.id &&
                                questionChild.categoryQuestionType === CHTG
                                  ? '#73C14F'
                                  : '#003300'
                            }}
                          >
                            {questionChild.question}
                            <div>
                              {questionChild.categoryQuestionType === CHTG ? (
                                collapseChild === questionChild.id ? (
                                  <Icon.Minus onClick={(e) => toggleCollapseChild(e)}
                                  data-event={questionChild.id} />
                                ) : (
                                  <Icon.Plus onClick={(e) => toggleCollapseChild(e)}
                                  data-event={questionChild.id} />
                                )
                              ) : questionChild.categoryQuestionType !==
                                CHTG ? (
                                <>
                                  <span className='cursor-pointer'>
                                    {questionChild.rsLinkYT === '' ||
                                    questionChild.rsLinkYT === null ? (
                                      ''
                                    ) : (
                                      <span
                                        onClick={() => {
                                          setLinkVideoSelect(
                                            questionChild.rsLinkYT
                                          )
                                          handleOpenModalVideo()
                                        }}
                                      >
                                        <Icon.PlayCircle color='#73C14F' />
                                      </span>
                                    )}
                                  </span>
                                  <span className='cursor-pointer'>
                                    {questionChild.rsLinkPDF === '' ||
                                    questionChild.rsLinkPDF === null ? (
                                      ''
                                    ) : (
                                      <a
                                        href={questionChild.rsLinkPDF}
                                        target='_blank'
                                      >
                                        {' '}
                                        <Icon.FileText color='#73C14F' />
                                      </a>
                                    )}
                                  </span>
                                </>
                              ) : null}
                            </div>
                          </div>
                          {questionChild.categoryQuestionType === CHTG ? (
                            <Collapse
                              isOpen={collapseChild === questionChild.id}
                            >
                              <CardBody>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: questionChild.resultText
                                  }}
                                ></span>
                              </CardBody>
                            </Collapse>
                          ) : null}
                        </Card>
                      ))}
                    </div>
                  </Collapse>
                </Card>
              ) : null
            )}
      </CollaspeItem>
    )}
    <ModalPlayerVideo
      isOpen={isOpenModalVideo}
      closeModal={handleCloseModalVideo}
      original={linkVideoSelect}
    />
  </div>
  )
}

export default ListQuestion
