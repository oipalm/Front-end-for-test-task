import React, { Component } from  'react';
import { Link } from "react-router-dom";
import Workorders from "../components/Workorders";
import { v4 as uuidv4 } from 'uuid';
import { 
    Layout, 
    Col, 
    Row, 
    Card, 
    Input, 
    Table, 
    Select,
    Pagination,
    Space
} from 'antd';

const { Content } = Layout;

const { Search } = Input;

const workorders = new Workorders();

const orderColumns = [
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'id',
    },
    {
      title: 'Дата',
      dataIndex: 'start_date',
      key: 'id',
    },
    {
      title: 'Статус',
      dataIndex: 'is_finished',
      key: 'id',
      render: (status) => (
        !status?
        <span style={{color: "green"}}>Незавершен</span>:
        <span style={{color: "red"}}>Завершен</span>
        ), 
    },
    {
        title: '',
        key: uuidv4(),
        render: (_, record) => (
            
            <Space size="middle">
                <Link to={`order/${record.id}`}>Открыть</Link>
                <Link to={`order/${record.id}/products`}>Продукция</Link>
            </Space>
        ),
    },
];

const materialColumns = [
    {
        title: 'Код материала',
        dataIndex: 'code',
        key: 'id',
        width: '200px',
      },
      {
        title: 'Имя материала',
        dataIndex: 'name',
        key: 'id',
      },
];

const productColumns = [
    {
        title: 'Код продукта',
        dataIndex: 'code',
        key: 'id',
        width: '200px',
      },
      {
        title: 'Имя продукта',
        dataIndex: 'name',
        key: 'id',
      },
];

class OrdersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            nextPageURL:  '',
            prevPageURL:  '',
            count: 1,
            current: 0,
            filtered: false,
            filterKey: '?',
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.prevPage  =  this.prevPage.bind(this);
        this.onSearch  =  this.onSearch.bind(this);
        this.filterMenuClick = this.filterMenuClick.bind(this);

    }

    componentDidMount() {
        workorders.getOrders().then((data) => {
            this.setState({
                orders: data.results, 
                nextPageURL: data.next, 
                prevPageURL: data.previous, 
                count: data.count, 
                current: 1,
            });
        });
    }

    nextPage(page) {
        
        workorders.getOrdersByURL(this.state.filterKey+'page='+page).then((data) => {
            this.setState({
                orders: data.results, 
                nextPageURL: data.next, 
                prevPageURL: data.previous, 
                count: data.count
            });
        });
    }

    prevPage() {
        workorders.getOrdersByURL(this.state.prevPageURL.replace("http://127.0.0.1:8000/", "")).then((data) => {
            this.setState({orders: data.results, nextPageURL: data.next, prevPageURL: data.previous, count: data.count});
        });
    }

    onSearch(value) {
        workorders.getOnSearch(value).then((data) => {
            this.setState({
                orders: data.results, 
                nextPageURL: data.next, 
                prevPageURL: data.previous, 
                count: data.count
            });
        });
    }

    filterMenuClick(key) {
        workorders.getOrderByFilter(key).then((data) => {
            this.setState({
                orders: data.results, 
                nextPageURL: data.next, 
                prevPageURL: data.previous, 
                count: data.count, 
                filterKey: '?ordering=' + key + '&'
            });
        });
    }

    render() {
        return (
            <>
                <Layout>
                    <Content>
                        <Row justify="center"> 
                            <Col span={12}>
                                <Card
                                    title="Заказ-наряд"
                                    extra={<Link to={'add'}>Добавить заказ</Link>}
                                    style={{
                                        width: "auto",
                                    }}
                                >
                                    <Row justify="center">
                                        <Col span={12}>
                                            <Search
                                                placeholder="Поиск заказа"
                                                onSearch={this.onSearch}
                                                allowClear
                                                style={{
                                                    width: "100%",
                                                    marginBottom: "20px",
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row justify="center" gutter={5} style={{marginBottom: "15px"}}>
                                        <Col>
                                                <Select
                                                    size='small'
                                                    placeholder="По номеру:"
                                                    style={{
                                                        width: 140,
                                                    }}
                                                    allowClear
                                                    onChange={this.filterMenuClick}
                                                    options={[
                                                        {
                                                        value: 'number',
                                                        label: 'По возрастанию',
                                                        },
                                                        {
                                                        value: '-number',
                                                        label: 'По убыванию',
                                                        },
                                                    ]}
                                                />
                                        </Col>
                                        <Col>
                                                <Select
                                                    size='small'
                                                    placeholder="По дате:"
                                                    style={{
                                                        width: 140,
                                                    }}
                                                    allowClear
                                                    onChange={this.filterMenuClick}
                                                    options={[
                                                        {
                                                        value: 'start_date',
                                                        label: 'По возрастанию',
                                                        },
                                                        {
                                                        value: '-start_date',
                                                        label: 'По убыванию',
                                                        },
                                                    ]}
                                                />
                                        </Col>
                                        <Col>
                                                <Select
                                                    size='small'
                                                    placeholder="По статусу:"
                                                    style={{
                                                        width: 140,
                                                    }}
                                                    allowClear
                                                    onChange={this.filterMenuClick}
                                                    options={[
                                                        {
                                                        value: 'is_finished',
                                                        label: 'По возрастанию',
                                                        },
                                                        {
                                                        value: '-is_finished',
                                                        label: 'По убыванию',
                                                        },
                                                    ]}
                                                />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Table
                                                rowKey={(record) => record.id}
                                                size='small'
                                                dataSource={this.state.orders} 
                                                columns={orderColumns} 
                                                pagination={false} 
                                                align={"center"}
                                                expandable={{
                                                    expandedRowRender: (record) => (
                                                      <>
                                                        <Table 
                                                            size='small' 
                                                            columns={materialColumns} 
                                                            dataSource={[record.material]} 
                                                            pagination={false} 
                                                            rowKey={() => uuidv4()} />
                                                        <Table 
                                                            size='small' 
                                                            columns={productColumns} 
                                                            dataSource={[record.product]} 
                                                            pagination={false} 
                                                            rowKey={(record) => uuidv4()} />
                                                      </>
                                                    ),
                                                }}
                                            />
                                            <Row justify="center" gutter={5} style={{marginTop: "15px"}}>
                                                <Col>
                                                    <Pagination 
                                                        defaultCurrent={1} 
                                                        total={this.state.count}
                                                        onChange={(page) => this.nextPage(page)}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </>
        );    
    }

}

export  default  OrdersList;