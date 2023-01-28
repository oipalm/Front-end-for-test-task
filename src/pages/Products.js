import React, { Component } from  'react';
import { Link } from "react-router-dom";
import Workorders from "../components/Workorders";
import {  
    Col, 
    Row, 
    Card,
    Table,
    Form,
    Input,
    Button
} from 'antd';

const workorders = new Workorders();

class Products extends Component {
    constructor(props){
        super(props);
        this.prodID = window.location.pathname.replace(/\D/g,'');
        this.tableColumns = [
            {
                title: 'Номер',
                dataIndex: 'serial',
                key: 'id',
              },
              {
                title: 'Масса, кг',
                dataIndex: 'weight',
                key: 'id',
              },
              {
                title: 'Дата',
                dataIndex: 'date',
                key: 'id',
              },
        ];
        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        workorders.getProducts(this.prodID).then((data) => {
            this.setState({
                products: data, 
            });
        });
    }

    addProduct(id, data) {
        workorders.postProducts(id, data);
    }

    render() {
        console.log(this.prodID);
        return (
            <>
                <Row justify="center">
                    <Col span={12}>
                        <Card
                            title={"Продукция"}
                            extra={<Link to={'/'}>Список наряд-заказов</Link>}
                            style={{
                                width: "auto",
                            }}
                        >
                            <Row>
                                <Col span={24}>
                                    <Table
                                        rowKey={(record) => record.id}
                                        size='small'
                                        dataSource={this.state.products} 
                                        columns={this.tableColumns} 
                                    />
                                </Col>
                                <Col span={24}>
                                    <Form 
                                        layout="inline"
                                        onFinish={(value) => {
                                            this.addProduct(Number(this.prodID), {weight: Number(value.weight)});
                                        }}
                                    >
                                        <Form.Item
                                            name="weight"
                                            label="Масса, кг"
                                            type='number'
                                        >
                                            <Input style={{
                                                width: 100,
                                                }}
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Добавить
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </>
        );
    }
}

export default Products;