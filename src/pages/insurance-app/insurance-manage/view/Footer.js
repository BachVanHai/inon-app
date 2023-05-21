import React from 'react'
import styled from 'styled-components'
import { FormattedMessage, goBackHomePage } from 'base-app'
import { Button } from 'reactstrap'
import {
  addAppContextPath,
  getKeyLang,
  PATH_CONTRACTS_MANAGE,
  ROLE_PERSONAL
} from '../../../../configs/insurance-app'
import { CardFooter } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const StyledButton = styled(Button)`
    margin-bottom: .5rem;
`

const Footer = ({ role }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const back = () => {
        let _role = role
        if (role === ROLE_PERSONAL) {
            _role = ROLE_PERSONAL
        }
        history.push(addAppContextPath(PATH_CONTRACTS_MANAGE + "/" + _role))
    }

    const homePage = () => {
        dispatch(goBackHomePage())
    }

    return (
        <CardFooter className="d-flex flex-wrap justify-content-end align-items-center">
            <StyledButton
                color='primary'
                disabled={false}
                className='mr-2'
                onClick={back}
            >
                <FormattedMessage id={getKeyLang(`Back`)} />
            </StyledButton>

            <StyledButton
                color='primary'
                disabled={false}
                onClick={homePage}
            >
                <FormattedMessage id={getKeyLang(`HomePage`)} />
            </StyledButton>
        </CardFooter>
    )
}

export default Footer