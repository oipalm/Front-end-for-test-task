import React, { Component } from  'react';
import { Link } from "react-router-dom";
import Workorders from '../components/Workorders';
import Nomenclatures from '../components/Nomenclatures';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import {  
    Col, 
    Row, 
    Card,  
    Form,
    Checkbox,
    Input,
    DatePicker,
    Select,
    Button,
    Alert
} from 'antd';

const { Option } = Select;

const workorders = new Workorders();

const nomenclatures = new Nomenclatures();

class AddOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: [],
            disabled: false,
            material: [],
            orderPut: false,
        };
        
        this.layout = {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
        };

        this.tailLayout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };
    }

    componentDidMount() {
        
        nomenclatures.getNomenclatures().then((data) => {
            if (this.state.material.length < data.count) {

                for (let i=1; i <= Math.ceil(data.count / 10); i++) {
                    nomenclatures.getNomenclaturesByURL(`?page=${i}`).then((data) => {
                        this.setState({
                            material: this.state.material.concat(data.results), 
                        });
                    });
                } 
            }
        }); 
    }

    addOrder(order) {
        workorders.createOrder(order);
    }

    render() {
        return (
            <>
                <Row justify="center">
                    <Col span={12}>
                    <Card
                        title={"Новый заказ-наряд"}
                        extra={<Link to={'/'}>Список наряд-заказов</Link>}
                        style={{
                            width: "auto",
                        }}
                        >
                            <Row gutter={4}>
                                <Col span={24}>
                                    {
                                        this.state.orderPut?<Alert message="Наряд добавлен" type="success" style={{marginBottom: "20px"}}/>:<span></span>
                                    }
                                    <Form
                                        {...this.layout}
                                        name="Новый заказ-наряд"
                                        layout="horizontal"
                                        onFinish={(value) => {
                                            let newOrder = {
                                                "number": value.number,
                                                "start_date": dayjs(value['date-picker']).format('YYYY-MM-DD'),
                                                "material": value['select-material'],
                                                "product": value['select-product'],
                                                "is_finished": value.status
                                            };
                                            this.addOrder(newOrder);
                                            this.setState({orderPut: true});
                                        }}
                                    >
                                        <Form.Item
                                            name="number"
                                            label="Номер"
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item 
                                            name="date-picker" 
                                            label="Дата начала">
                                            <DatePicker locale={locale}/>
                                        </Form.Item>
                                        <Form.Item
                                            name="select-material"
                                            label="Сырье"
                                            >
                                            <Select placeholder="Сырье">
                                                {this.state.material.map(item  => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            name="select-product"
                                            label="Продукт"
                                            >
                                            <Select placeholder="Продукт">
                                                {this.state.material.map(item  => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...this.tailLayout} 
                                            name="status" 
                                            valuePropName="checked" 
                                            >
                                            <Checkbox>Завершен</Checkbox>
                                        </Form.Item>
                                        <Form.Item {...this.tailLayout}>
                                                <Button type="primary" htmlType="submit">
                                                    Сохранить
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

export default AddOrder;