
import {Divider, Row, Col, Card} from 'antd';
import 'antd/dist/antd.css';
import '../pages/main.css';

export default function Menu(props){
    return (
        <div id="menu-container">
            <Row id="Coffee-Row">
                <Divider orientation="left" style={{borderWidth:2, borderColor: '#593e34' }} plain>
                    <h2>Snacks - Le Sillage</h2>
                </Divider>
            {props.snacks.map((snack, index) =>(
                <Col span={8}>
                <Card id="coffeemenu" hoverable
                        cover={<img alt="" src={snack.image} ></img>} >
                        <Card title={snack.name + "    " + snack.price}/>
                    </Card>
                </Col>
            ))}
            </Row>
        </div>
    )
}