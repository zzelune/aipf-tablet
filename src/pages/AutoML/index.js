import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Input,
  Icon,
  Button,
  Modal,
  Badge,
  Divider,
  Radio,
  List,
  Form,
  Steps,
  Select,
  Tooltip,
  Avatar,
} from 'antd';
import CommonTable from '@/components/CommonTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];



/* eslint react/no-multi-comp:0 */
@connect(({ autolist, auto, loading }) => ({
  autolist,
  auto,
  loading: loading.models.auto 
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  columns = [
    {
      title: ' 项目名称',
      dataIndex: 'name',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '项目类型',
      dataIndex: 'type',
    },
    {
      title: '训练状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
        {
          text: status[2],
          value: 2,
        },
        {
          text: status[3],
          value: 3,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '训练数据集',
      dataIndex: 'sourcedata',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a href="">编辑</a>
        </Fragment>
      ),
    },
  ];
 
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'auto/fetch',
    });

    dispatch({
      type: 'autolist/fetch',
      payload: {
        count: 4,
      },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'auto/fetch',
      payload: params,
    });

  };


  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

 
  render() {
    const {
      auto: { data },
      autolist: { autolist },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;

    const operator = (
      <Row>
         <Col span={6}>
           <Button.Group>
             <Button icon="plus" >新建</Button>
             {selectedRows.length > 0 && <Button icon="delete">删除</Button>}
           </Button.Group>
         </Col>
         <Col span={6} offset={6}>
           <Radio.Group defaultValue="all">
           <Radio.Button value="all">全部</Radio.Button>
           <Radio.Button value="progress">进行中</Radio.Button>
           <Radio.Button value="waiting">等待中</Radio.Button>
           </Radio.Group>
         </Col>
         <Col span={5}>
             <Input.Search placeholder="请输入" onSearch={() => ({})} style={{ marginRight: 8 }}/>
         </Col>
         <Col span={1}>
             <Button icon="redo" />
         </Col>
    </Row>);
    
    return (
      <PageHeaderWrapper title="自动学习">
        <List
          rowKey="id"
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
          dataSource={autolist}
          renderItem={item => (
            <List.Item key={item.key}>
              <Card
                hoverable
                bodyStyle={{ paddingBottom: 20 }}
                cover={<div style={{textAlign:'center'}}><img src={item.img} className={styles.img}/></div>}
                actions={[
                  　<Button>创建工程</Button>,
                    <Button type= 'dashed'>视频教程</Button>,
                ]}
              >
                <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} description = {item.desc}/>
              </Card>
            </List.Item>
          )}
        />
        <Card bordered={false}>
          <div className={styles.tableList}>
            <CommonTable
              operator = {operator}
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
