import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import Layout from '../components/MyLayout'
import { initStore } from '../redux/store'
import store from '../store/configureStore'
import * as postActions from '../actions/post';
import 'isomorphic-fetch'
import Home from '../components/home'
import {post, get} from '../util/ssrAxios';
/*@connect(
    (state) => {
        return {
            state,
        }
    },
    (dispatch) => bindActionCreators({...postActions}, dispatch)
)*/
class Post extends Component {
    static async getInitialProps ({req,resp}) {
        const res = await fetch('http://localhost:3000/test')
        const data = await res.json();
        return { data1:data }
    }
    constructor(props) {
        super(props)
    }

    test = () => {
        this.props.getData()
        /*Router.push({
            pathname: '/about',
            query: {
                name: 'leo'
            }
        })*/
    }

    render() {
        console.log(this.props)
        return (
            <Layout>
                <h1>{this.props.url.query.title}</h1>
                <p onClick={() => {
                    this.test()
                }}>This is the blog post content.</p>

                <i>{this.props.data1.msg}</i>

                {
                    do{
                        if(this.props.data1.status===200){
                            <Home></Home>
                        }else{
                            <b>ssss</b>
                        }
                    }
                }


            </Layout>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...postActions
    },dispatch)
    /*return {
        //addCount: bindActionCreators(addCount, dispatch),
        //startClock: bindActionCreators(startClock, dispatch)
    }*/
}
function mapStateToProps(state) {
    //...
    return {
        state
    }
}
export default withRedux(store,null, mapDispatchToProps)(Post)