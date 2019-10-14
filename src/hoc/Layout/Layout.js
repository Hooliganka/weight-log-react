import React, {Component} from 'react'
import classes from './Layout.scss'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {logOut} from "../../store/actions/auth";

class Layout extends Component {
    render() {
        return (
            <div className={classes.Layout}>
                {this.props.is_musk ? <div className={classes.Musk}/> : null}
                <div>
                    <nav className={classes.Nav}>
                        <h2>Контроль веса мурки</h2>
                        {
                            this.props.auth ?
                                <ul>
                                    <li>
                                        <NavLink
                                            to={'/add'}
                                            exact={true}
                                        >Добавить вес</NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={'/'}
                                            exact={true}
                                        >Таблица веса</NavLink>
                                    </li>
                                </ul> : null
                        }
                        {
                            this.props.auth ?
                                <p onClick={this.props.logOut} className={classes.Exit}>Выйти</p> : null
                        }
                    </nav>
                </div>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth.auth,
        is_musk: state.auth.is_musk || state.add.is_musk,
        weight_is: state.add.weight_is,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => dispatch(logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)