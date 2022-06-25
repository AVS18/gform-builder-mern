import react from 'react'
import { Row,Col,Button,Form } from 'react-bootstrap';
import Preview from './Preview'
import axios from 'axios'
class InputForm extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            'form': [],
            'newEntry':false,
            'key':'',
            'value':'',
            'preview':false,
            'cname':'',
            'link':''
        }
    }
    updateFormElement = (index,attribute,event) => {
        let oldForm = this.state.form;
        oldForm[index][attribute] = event.target.value;
        this.setState({'form':oldForm})
    }
    showFormForNewEntry = () => {
        this.setState({'newEntry':true,key:"",value:""});
    }
    addNewEntry = (event) =>{
        event.preventDefault();
        let newEntryObject = {'key':this.state.key,'value':this.state.value}
        let oldForm = this.state.form;
        oldForm.push(newEntryObject)
        this.setState({'form':oldForm,'newEntry':false})
    }
    updateNewEntry = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }
    showPreview = () => {
        this.setState({'preview':true})
    }
    handleSubmit = async(event) => {
        event.preventDefault();
        let newDrive = {
            'form':this.state.form,
            'companyName':this.state.cname,
            'link':this.state.link
        }
        let response = await axios.post('http://localhost:5000/drive/createDrive',newDrive);
        alert(response.data.message);
    }
    render(){
        return(
            <div style={{padding:"20px"}}>
                <Row>
                    <Col sm="6">
                        <div>
                            <p style={{textAlign:'center',fontSize:"larger",fontFamily:"cursive",margin:"20px"}}>Create a New Form</p>
                            <Row>
                                <Col sm="6">
                                    <p style={{textAlign:'center',fontSize:"larger",fontFamily:"cursive"}}>Company Name</p>
                                    <input className='form-control' value={this.state.cname} name="cname" onChange={this.updateNewEntry} />
                                </Col>
                                <Col sm="6">
                                    <p style={{textAlign:'center',fontSize:"larger",fontFamily:"cursive"}}>Access Link Name</p>
                                    <input className='form-control' value={this.state.link} name="link" onChange={this.updateNewEntry} />
                                </Col>
                            </Row>
                            <p style={{textAlign:'center',fontSize:"larger",fontFamily:"cursive",margin:"20px"}}>From Attributes</p>
                            {this.state.form.map((entry,index)=>{
                                return <Row key={index}>
                                    <Col sm="3" style={{margin:"20px"}}>
                                        <input className='form-control' value={entry['key']} onChange={(event) => this.updateFormElement(index,"key",event)} />
                                    </Col>
                                    <Col sm="3" style={{margin:"20px"}}>
                                        <input className='form-control' value={entry['value']} onChange={(event) => this.updateFormElement(index,"value",event)} />
                                    </Col>
                                </Row>
                            })}
                            <Button onClick={this.showFormForNewEntry}>Add New Attribute</Button>
                            {this.state.newEntry===true && <div>
                                <Form onSubmit={this.addNewEntry}>
                                    <Row>
                                        <Col sm="3">
                                            <div style={{margin:"20px"}}>
                                                <input name="key" onChange={this.updateNewEntry} value={this.state.key} className='form-group form-control' required/>
                                            </div>
                                        </Col>    
                                        <Col sm="3">
                                            <div style={{margin:"20px"}}>
                                                <input name="value" onChange={this.updateNewEntry} value={this.state.value} className='form-group form-control' required />
                                            </div>
                                        </Col>
                                    </Row>
                                    <input type="submit" className='btn btn-outline-primary' value="Add Entry" />
                                </Form>
                            </div>}
                            <Button onClick={this.handleSubmit} className="btn btn-danger">Create Drive</Button>
                        </div>
                    </Col>
                    <Col sm="6" style={{marginTop:"20px"}}>
                        <Button className='btn btn-success' onClick={this.showPreview}>Show Preview</Button>
                        {this.state.preview===true && <Preview form={this.state.form} submit={false} />}
                    </Col>
                </Row>                
            </div>
        )
    }
}

export default InputForm;