import React, {Component} from 'react'
import classes from './Auth.scss'
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";


class Auth extends Component {

    state = {
        formControls: {
            username: {
                value: '',
                type: 'text',
                label: 'Login',
                touched: false,
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                touched: false,
            }
        }
    };

    // onClikHendler = event => {
    //     event.preventDefault();
    //     console.log('lllol');
    //     const autData = {
    //         username: this.state.formControls.username.value,
    //         password: this.state.formControls.password.value
    //     };
    //     console.log(autData)
    // };

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.username.value,
            this.state.formControls.password.value
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
            formControls
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
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {this.renderInputs()}
                    <Button
                        value="Войти"
                        onClick={this.loginHandler}

                    />
                </form>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        auth: (username, password) => dispatch(auth(username, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);

