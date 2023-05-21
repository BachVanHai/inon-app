import {FormattedMessage, useIntl} from "react-intl";
import React from "react";
import {Info} from "react-feather";
import {PopoverBody, PopoverHeader, UncontrolledPopover} from "reactstrap";
import {getKeyLang} from "../../../../../configs/app-no1";
import PerfectScrollBar from "react-perfect-scrollbar";

const InsuranceInfo = ({insuranceSetting, userId}) => {
    const intl = useIntl()
    return (
        <React.Fragment>
            <Info
                size={16}
                className='cursor-pointer ml-1'
                id={'uncontrolledPopover-' + insuranceSetting.id}
            />
            <UncontrolledPopover
                placement='top'
                target={'uncontrolledPopover-' + insuranceSetting.id}
            >
                <PopoverHeader>
                    <FormattedMessage
                        id={getKeyLang(`account.insurance.${insuranceSetting.keyLang}`)}
                    />
                </PopoverHeader>
                <PopoverBody>
                    <PerfectScrollBar>
                        <div
                            style={{maxHeight: '400px'}}
                            dangerouslySetInnerHTML={{
                                __html: intl.formatMessage({
                                    id: getKeyLang(
                                        `account.insurance.${insuranceSetting.keyLang}.info`
                                    )
                                })
                            }}
                        />
                    </PerfectScrollBar>
                </PopoverBody>
            </UncontrolledPopover>
        </React.Fragment>
    )
}

export default InsuranceInfo
