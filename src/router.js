import react from 'react';
import { BrowserRouter as Router, Switch as Routes, Route } from "react-router-dom";
import Input from './Input';
import Preview from './Preview';

class AppRouter extends react.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(
            <Router>
                <Routes>
                    <Route exact path='/'  component={Input} />
                    <Route exact path='/register/:link'  component={Preview} />
                </Routes>
            </Router>
        )
    }
}

export default AppRouter;