import React, { useState } from 'react'
import {
  Collapse,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label
} from "reactstrap"
import classnames from "classnames"
import { ChevronDown } from "react-feather"
const AccordionMargin = ({ props }) => {

  const [show, setShow] = useState(false)
  const [status, setStatus] = useState("Closed")
  const toggleCollapse = () => {
    console.log(show)
    setShow(!show)
  }

  const onEntered = () => {
    setStatus("Opened")
  }
  const onEntering = () => {
    setStatus("Opening...")
  }

  const onExited = () => {
    setStatus("Closed")
  }

  const onExiting = () => {
    setStatus("Closing...")
  }

  const renderInput = () => {
    return (
      <React.Fragment>
        <Label>Hello</Label></React.Fragment>)
  }

  return (
    <React.Fragment>
      <Card>

        <div className="vx-collapse collapse-bordered">

          <Card
            key={1}
           
            className={classnames({
              "collapse-collapsed":
                status === "Closed",
              "collapse-shown":
                status === "Opened",
              closing:
                status === "Closing...",
              opening:
                status === "Opening..."
            })}
          >


            <CardHeader  onClick={() => toggleCollapse()}>
              <CardTitle className="lead collapse-title collapsed" >
                collapseItem.title
            </CardTitle>
              <ChevronDown size={15} className="collapse-icon" />
            </CardHeader>
            <Collapse
              isOpen={show}
              onEntering={() => onEntering()}
              onEntered={() => onEntered()}
              onExiting={() => onExiting()}
              onExited={() => onExited()}
            >
              <CardBody>
                {renderInput()}
              </CardBody>
            </Collapse>

          </Card>
        </div>

      </Card>
    </React.Fragment >
  )

}
export default AccordionMargin

