import React, {Component} from 'react';
import Layout from "./hoc/Layout/Layout";
import {Redirect, Route, Switch} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import {connect} from "react-redux";
import AddWeight from "./containers/AddWeight/AddWeight";
import TableWeight from "./containers/TableWeight/TableWeight";
import {authSuccess} from "./store/actions/auth";


class App extends Component {
    render() {
        if (!this.props.auth) {
            const token = localStorage.getItem('token');
            if(token){
                this.props.setAuth(token)
            }
        }
        return (
            <Layout>
                {
                    this.props.auth || this.props.weight_is ?
                        <Switch>
                            <Route path="/add" component={AddWeight}/>
                            <Route path="/auth" component={Auth}/>
                            <Route path="/" exact component={TableWeight}/>
                            <Route path="*" render={() => (<Redirect to="/"/>)}/>
                        </Switch>
                        :
                        <Switch>
                            <Route path="/" exact component={Auth}/>
                            <Route path="*" render={() => (<Redirect to="/"/>)}/>
                        </Switch>
                }
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth.auth,
        weight_is:state.add.weight_is
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAuth: (token) => dispatch(authSuccess(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



