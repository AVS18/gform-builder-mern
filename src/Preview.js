import react from "react";
import {Row,Col,Container,Form} from 'react-bootstrap'
class Preview extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            'form':[],
            'submit':true
        }
    }
    componentWillMount(){
        this.setState({'form':this.props.form,submit:this.props.submit})
        console.log(this.state.form)
    }
    render(){
        return(
            <Container>
                <Form onSubmit={this.submitData}>
                    <Row>
                        {this.state.form.map((entry,index) => {
                            return <Col key={index} sm="6">
                                <p style={{textAlign:'center',fontSize:"larger",fontFamily:"cursive",margin:"5px"}}>{entry['key']}</p>
                                <input className="form-control" name={entry['key']} type={entry['value']} required />
                            </Col>
                        })}
                    </Row>
                    {this.state.submit===true && <input className="btn btn-outline-success" type="submit" value="Register for the Drive" />}
                </Form>
            </Container>
        )
    }
}
export default Preview;