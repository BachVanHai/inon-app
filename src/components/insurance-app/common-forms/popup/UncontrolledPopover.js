import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Table, PopoverBody, PopoverHeader, UncontrolledPopover } from "reactstrap"
import { getKeyLang } from '../../../../configs/insurance-app'
import { TEXT_NO_VALUE } from '../../buy-insurances-page/formik-config'
import * as Icon from 'react-feather'

/**
 * @example 
    <UncontrolledPopover
        targetId={"unique-popover-id-01"}
        contents={[""]}
        positionStyle={{ top: "-25px", left: "130px" }}
        msgField={<FormattedMessage id={getKeyLang("Detail")} />}
    />
 */

const PopoverComp = ({ targetId = "unique-popover-id-01", contents = [TEXT_NO_VALUE],
    positionStyle = { top: "-25px", left: "135px" },
    msgField = <FormattedMessage id={getKeyLang(`Detail`)} />,
    ...p }) => {

    return (
        <div {...p} className="position-relative">
            <div id={targetId}
                color="primary"
                className="position-absolute"
                style={positionStyle}
            >
                <Icon.Info className='vx-icon' size={18} color="green" />
            </div>
            <UncontrolledPopover
                trigger="legacy" placement="top" target={targetId}
            >
                <PopoverHeader>
                    {
                        msgField
                    }
                </PopoverHeader>
                <PopoverBody>
                    <Table className="custom-padding-table margin-bottom-14" borderless responsive>
                        <tbody>
                            {
                                contents.map((elt, index) => {
                                    return (
                                        <tr key={index}>
                                            <td style={{padding : "0px"}}>
                                                {
                                                    elt
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    )
}

export default PopoverComp