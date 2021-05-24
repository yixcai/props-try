import {Component, useState, useEffect} from 'react';
import {Image, Button} from 'react-bootstrap';
import {Row, Col, Card, Input,Rate} from 'antd';
import {CoffeeOutlined} from '@ant-design/icons';
import { FrownOutlined, MehOutlined, SmileOutlined} from '@ant-design/icons';
import '../pages/main.css';
import Header from '../components/header';
import Footer from '../components/Footer';

export default function CustomerRate(props) {
    const customIcons = {
        1: <FrownOutlined  color="#2f76c7"/>,
        2: <FrownOutlined />,
        3: <MehOutlined />,
        4: <SmileOutlined />,
        5: <SmileOutlined />,
      };
    
    const { TextArea } = Input;
    
    return (
        <>
            <Header/>
            <div id="menu-container" style={{ padding: 24}}>
                <Row>
                    <Row gutter={{ xs:8, sm:16, md:24, lg:32 }} wrap="true">
                        <Col span={2}></Col>
                        <Col span={12}>
                            <Image src="https://images.unsplash.com/photo-1499744937866-d7e566a20a61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" fluid />
                        </Col>
                        <Col span={8} id="rating">
                            <br />
                            <h3>How was your Experience with our service?</h3>
                            <Rate defaultValue={5} character={({ index }) => customIcons[index + 1]} align="center" />                                <br />
                            <br />
                            <h3>How was your Experience with our foods?</h3>
                            <Rate character={<CoffeeOutlined />} allowHalf defaultValue={5} />
                            <br />
                            <br />
                            <h3>Leave some commemts if you want : )</h3>
                            <TextArea rows={6} />
                            <br />
                            <br />
                            <Button id="ratebtn" variant="outline-dark" size="lg" block>
                                Submit
                            </Button>
                        </Col>
                        <Col span={2}></Col>
                    </Row> 
                </Row>
            </div>
            <Footer />
        </>
    )
}


