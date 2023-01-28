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

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
};

const tailLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const CustomizedForm = ({ fields, mat, btnDisabled, onFinish }) => (
    <Form
        {...layout}
        name="global_state"
        layout="horizontal"
        fields={fields}
        disabled={!btnDisabled}
        onFinish={onFinish}
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
                {mat.map(item  => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
        </Form.Item>
        <Form.Item
            name="select-product"
            label="Продукт"
            >
            <Select placeholder="Продукт">
                {mat.map(item  => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
        </Form.Item>
        <Form.Item
            {...tailLayout} 
            name="status" 
            valuePropName="checked" 
            >
            <Checkbox>Завершен</Checkbox>
        </Form.Item>
        <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
        </Form.Item>
    </Form>
);

class Order extends Component {
    constructor(props) {
        super(props);
        this.prodID = window.location.pathname.replace('/order/','');
        this.state = {
            order: [],
            disabled: false,
            material: [],
            orderPut: false,
        };

        this.orderUpdate = this.orderUpdate.bind(this);
    }

    componentDidMount() {
        workorders.getOrderById(this.prodID).then((data) => {
            this.setState({
                order: data, 
            });
        });

        nomenclatures.getNomenclatures().then((data) => {
            for (let i=1; i <= Math.ceil(data.count / 10); i++) {
                nomenclatures.getNomenclaturesByURL(`?page=${i}`).then((data) => {
                    this.setState({
                        material: this.state.material.concat(data.results), 
                    });
                });
            } 
        }); 
    }

    formDisabled(disabled) {
        this.setState({disabled: disabled});
    }

    orderUpdate(data) {
        workorders.updateOrder(data);
    }
    
    render() {
        return (
            <>
                <Row justify="center">
                    <Col span={12}>
                        <Card
                            title={!this.state.order.number?"":this.state.order.number}
                            extra={<Link to={'/'}>Список наряд-заказов</Link>}
                            style={{
                                width: "auto",
                            }}
                        >
                            <Row gutter={4}>

                                <Col span={24}>
                                    {
                                        this.state.orderPut?<Alert message="Наряд обновлен" type="success" style={{marginBottom: "20px"}}/>:<span></span>
                                    }
                                    <CustomizedForm
                                        fields={
                                            [
                                                {
                                                  name: 'number',
                                                  value: !this.state.order.number?"":this.state.order.number,
                                                },
                                                {
                                                    name: 'date-picker',
                                                    value: !this.state.order.start_date?null:dayjs(this.state.order.start_date, 'YYYY-MM-DD'),
                                                },
                                                {
                                                    name: 'select-material',
                                                    value: !this.state.order.material?null:this.state.order.material.id,
                                                },
                                                {
                                                    name: 'select-product',
                                                    value: !this.state.order.product?null:this.state.order.product.id,
                                                },
                                                {
                                                    name: 'status',
                                                    value: !this.state.order.is_finished?null:this.state.order.is_finished,
                                                }
                                              ]
                                        }
                                        mat={this.state.material}
                                        btnDisabled={this.state.disabled}
                                        onFinish={(value) => {
                                            let newOrder = {
                                                "id": this.state.order.id,
                                                "number": value.number,
                                                "start_date": value['date-picker'].format('YYYY-MM-DD'),
                                                "material": value['select-material'],
                                                "product": value['select-product'],
                                                "is_finished": value.status
                                            };
                                            this.orderUpdate(newOrder);
                                            this.setState({orderPut: true});
                                            this.setState({disabled: false});
                                            this.componentDidMount();
                                        }}
                                    />
                                </Col>
                                <Col span={4}>
                                    {
                                        this.prodID === 'add' ? this.setState({disabled: true}) :
                                        
                                            <Checkbox
                                                checked={this.state.disabled}
                                                onChange={(e) => this.formDisabled(e.target.checked)}
                                            >
                                                Редактировать
                                            </Checkbox>
                                    }
                                </Col>
                            </Row> 
                        </Card>
                    </Col>
                </Row>
            </>
        );
    }

}

export default Order;