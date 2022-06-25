import axios from "axios";
import react from "react";
import {Row,Col,Container,Form} from 'react-bootstrap'
import  { withRouter } from 'react-router-dom'

class Preview extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            'form':[],
            'submit':true,
            'company':"",
            'id':'',
            'userEntry':{},
        }
    }
    updateData = (event) => {
        let userEntry = this.state.userEntry;
        userEntry[event.target.name] = event.target.value;
        this.setState({userEntry})
    }
    componentWillMount = async() => {
        if(this.props.form)
            this.setState({'form':this.props.form,submit:this.props.submit})
        let link = this.props.match.params.link;
        if (!link){
            alert("Invalid Link! Please Try Again");
        }
        else{
            let data = {'link':link}
            let driveData = await axios.get('http://localhost:5000/drive/getDrive',{'params':data})
            if(driveData.data.status)
            {
                let userEntry = {}
                let form = driveData.data.data.form
                for(var i=0;i<form.length;i++){
                    let dataPoint = form[i].key;
                    userEntry[dataPoint] = ""
                }
                this.setState({'form':form,userEntry,'company':driveData.data.data.companyName,'id':driveData.data.data._id});
            }
            else{
                alert(driveData.data.message);
            }
        }
    }
    submitData = async(event) => {
        event.preventDefault();
        let data = {
            'registrationData' : this.state.userEntry,
            'company':this.state.id
        }
        console.log(data);
        let response = await axios.post('http://localhost:5000/drive/registerCandidate',data);
        alert(response.data.message);
    }
    render(){
        return(
            <Container>
                <p style={{textAlign:'center',fontSize:"larger",fontFamily:"cursive",margin:"20px"}}>{this.state.company} Registration IIITKottayam</p>
                <Form onSubmit={this.submitData}>
                    <Row>
                        {this.state.form.map((entry,index) => {
                            return <Col key={index} sm="6">
                                <p style={{textAlign:'center',fontSize:"larger",fontFamily:"cursive",margin:"5px"}}>{entry['key']}</p>
                                <input className="form-control" name={entry['key']} type={entry['value']} onChange={this.updateData} value={this.state.userEntry[entry['key']]} required />
                            </Col>
                        })}
                    </Row>
                    <br/>
                    {this.state.submit===true && <input className="btn btn-outline-success" type="submit" value="Register for the Drive" />}
                </Form>
            </Container>
        )
    }
}
export default withRouter(Preview);