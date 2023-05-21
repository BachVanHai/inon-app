import "../../../../assets/scss/insurance-app/common/app-todo.scss"
import React from "react"
import { FormGroup, Card, CardBody } from "reactstrap"
import { ArrowLeft, Search } from "react-feather"
import { FormattedMessage, Button } from 'base-app'
import Input from '../../input/Input'
import Service from '../../../../services/insurance-app/buyInsuranceCar'
import { history } from "../../../../history"
import { hasRequestFail, isArrayEmpty } from "../../../../ultity"
import { addAppContextPath, getKeyLang, INSURANCE_TYPE_CAR, PATH_BUY_INSURANCE, PATH_BUY_INSURANCES_CAR, PATH_BUY_INSURANCES_MOTOR } from "../../../../configs/insurance-app"

const TemplateList = () => {
    const [state, setState] = React.useState({
        todos: [],
        renderTodos: [],
        currentLocation: "",
        value: ""
    })

    const handleOnChange = (e) => {
        const _value = e.target.value
        setState(preState => ({ ...preState, value: _value }))

        if (!isArrayEmpty(state.renderTodos)) {
            let filteredTodos = state.renderTodos.filter(query => {
                return (
                    query.templateName.toLowerCase().includes(_value) ||
                    query.vehicles[0].numberPlate.toLowerCase().includes(_value)
                )
            })
            setState((preState) => ({ ...preState, todos: filteredTodos }))
        } else {
            setState((preState) => ({ ...preState, todos: state.renderTodos }))
        }
    }

    React.useEffect(() => {
        const getTemplateVehicle = async () => {
            const res = await Service.getTemplateVehicleList()
            if (hasRequestFail(res.status)) return

            setState((preState) => ({ ...preState, todos: res.data.content, renderTodos: res.data.content }))
        }

        getTemplateVehicle()
    }, []) // eslint-disable-line

    const renderTodos = () => {
        const todosArr = state.todos
        return (
            !isArrayEmpty(todosArr) ? (
                todosArr.map((todo, i) => {
                    return (
                        <li
                            className="todo-task-list-wrapper"
                            key={i}
                        >
                            <div className="todo-title-wrapper d-flex justify-content-between mb-50">
                                <div className="todo-title-area d-flex align-items-center">
                                    <div className="title-wrapper d-flex">
                                        <h6 className="todo-title letter-uppercase">{todo.templateName}</h6>
                                    </div>
                                </div>

                                {
                                    todo.contractType === INSURANCE_TYPE_CAR ?
                                        <Button.Ripple className="d-flex justify-content-end round" size="sm" color="primary" onClick={() => {
                                            history.push({
                                                pathname: addAppContextPath(PATH_BUY_INSURANCES_CAR),
                                                state: {
                                                    data: todo,
                                                    action: "USE_TEMPLATE",
                                                    vehicle: todo.vehicles[0],
                                                    insBBDS: todo.insurances.find(ins => ins.insuranceCode === "CAR_TNDS")
                                                }
                                            })
                                        }}>
                                            <FormattedMessage id={getKeyLang(`UseTemplate`)} />
                                        </Button.Ripple>
                                        :
                                        <Button.Ripple className="mb-1 d-flex justify-content-end round" size="sm" color="primary" onClick={() => {
                                            history.push({
                                                pathname: addAppContextPath(PATH_BUY_INSURANCES_MOTOR),
                                                state: {
                                                    action: "USE_TEMPLATE",
                                                    data: todo
                                                }
                                            })
                                        }}>
                                            <FormattedMessage id={getKeyLang(`UseTemplate`)} />
                                        </Button.Ripple>
                                }
                            </div>

                            <p className="todo-desc truncate mb-0"><FormattedMessage id={getKeyLang(`InsuranceType`)} />
                                :<span>&nbsp;</span>{todo.contractType === 'CC' ? "BH Ô TÔ" : "BH Xe máy"}
                            </p>
                            <p className="todo-desc truncate mb-0"><FormattedMessage id={getKeyLang(`NameOwner`)} />
                                :<span>&nbsp;</span>{todo.customerName}
                            </p>
                            <p className="todo-desc truncate mb-0"><FormattedMessage id={getKeyLang(`LicensePlate`)} />
                                :<span>&nbsp;</span>{todo.vehicles[0].numberPlate}
                            </p>
                        </li>
                    )
                })
            )
                :
                <p className="p-1 text-center mt-2 font-medium-3 text-bold-500">
                    <FormattedMessage id={getKeyLang(`NoTemplate`)} />
                </p>
        )
    }

    return (
        <Card className="todo-application position-relative margin-bottom-100" style={{ backgroundColor: "inherit" }}>
            <CardBody>
                <div className="content-right">
                    <div className="todo-app-list-wrapper">
                        <div className="app-fixed-search">
                            <div
                                className="sidebar-toggle"
                                onClick={() => history.push(addAppContextPath(PATH_BUY_INSURANCE))}
                            >
                                <ArrowLeft size={24} />
                            </div>
                            <FormGroup className="position-relative has-icon-left m-0 d-inline-block">
                                <Input
                                    type="text"
                                    placeholder={getKeyLang(`Search`)}
                                    onChange={e => handleOnChange(e)}
                                    value={state.value}
                                />
                                <div className="form-control-position">
                                    <Search size={15} />
                                </div>
                            </FormGroup>
                        </div>
                        <ul className="todo-task-list">{renderTodos()}</ul>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default TemplateList