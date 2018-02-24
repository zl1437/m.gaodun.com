import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getNav} from '../../redux/store'
import * as postActions from '../../actions/post';
import {post, get} from '../../util/ssrAxios';
class Home extends React.Component{

    constructor(props) {
        super(props)
        /*let res = await get('/test', {});
        console.log(res)*/
    }

    componentWillMount() {
        const {navMain = []} = this.props
        if (navMain.length == 0) {
        }
    }
    test = ()=>{
        this.props.loadExamRoom()
    }
    render() {
        let bgClass = {background: '#00bb9c'}
        const {navMain = []} = this.props;
        //let result = await get('/test', {});
        return (
            <div>
                <p onClick={()=>{
                    this.test();
                }}>home component .{this.props.state.postReducer.number}</p>
                <h2>{this.props.data}</h2>
                <img src={'/static/images/nflwx.png'}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    //...
    return {
        state
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...postActions
    },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)