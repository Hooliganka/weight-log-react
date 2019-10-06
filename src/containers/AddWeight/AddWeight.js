import React, {Component} from 'react'
import classes from './AddWeight.scss'
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {connect} from "react-redux";
import {add} from "../../store/actions/addWeight";
import {Redirect} from "react-router-dom";


class AddWeight extends Component {

    state = {
        formControls: {
            weight_cat: {
                value: '',
                type: 'text',
                label: 'Вес(кг)',
                touched: false,
            },
            comments: {
                value: '',
                type: 'text',
                label: 'Комметратий',
                touched: false,
            }
        }
    };

    weightHandler= async () => {
        this.props.add(
            this.state.formControls.weight_cat.value,
            this.state.formControls.comments.value
        )
};

    submitHandler = event => {
        event.preventDefault()
    };

    onChangeHandler = (event, controlName) => {
        // console.log(`${controlName}:`, event.target.value);

        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        formControls[controlName] = control;

        this.setState({
            formControls,
        })
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    touched={control.touched}
                    label={control.label}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        });
    }

    render() {
        if (this.props.weight_is) {
            console.log('?????');
            return (
                <Redirect to="/"/>
            )
        }
        return (
            <div className={classes.AddWeight}>
                <form onSubmit={this.submitHandler}>
                    {this.renderInputs()}
                    <Button
                        value="Сохранить"
                        onClick={this.weightHandler}
                    />
                </form>
                {
                    this.props.message ? <p className={classes.Error}>Ошибка! {this.props.message}</p> : null
                }
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        add: (weight_cat, comments) => dispatch(add(weight_cat, comments))
    }
}

function mapStateToProps(state) {
    return {
        message: state.add.error_message,
        weight_is: state.add.weight_is,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWeight);