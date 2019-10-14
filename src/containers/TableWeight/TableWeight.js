import React, {Component} from 'react'
import classes from './TableWeight.scss'
import {connect} from "react-redux";
import {REMOVE} from "../../store/actions/actionsTypes";
import {logOut} from "../../store/actions/auth";

class TableWeight extends Component {

    state = {
        loading: true,
        data: []
    };

    componentDidMount() {
        fetch('https://api.murka.mr-earnest.ru/get_weight', {
            // headers: {'Content-Type': 'application/x-www-form-urlencoded', 'auth-token': localStorage.getItem('token')}
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')}
        }).then(response => response.json()).then((data) => {
            if (data.status === "ok") {
                const new_data = data.data;
                this.setState({data: new_data, loading: false})
            }else{
                this.props.logout()
            }
        })
    }

    renderInfo = () => {
        return this.state.data.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.user}</td>
                    <td>{item.date}</td>
                    <td>{item.weight}</td>
                    <td>{item.comment}</td>
                </tr>
            )
        });
    };

    render() {
        this.props.remove();
        console.log(this.state);
        return (
            <div className={classes.TableWeight}>
                {this.state.loading ?
                    <div className={classes.ldsEllipsis}>
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                    </div>
                    :
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Кто добавил</th>
                            <th scope="col">Дата взвешивания</th>
                            <th scope="col">Вес(кг)</th>
                            <th scope="col">Комметратий</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderInfo()}
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        remove: () => dispatch({type: REMOVE}),
        logout: () => dispatch(logOut())
    }
}

export default connect(null, mapDispatchToProps)(TableWeight);
