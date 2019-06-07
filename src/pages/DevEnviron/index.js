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
  Radio,
  Form,
  Dropdown,
  Steps,
  Select,
  Menu
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
@connect(({datalabel, loading }) => ({
  datalabel,
  loading: loading.models.datalabel 
}))


class DataLabeling extends PureComponent {
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
      type: 'datalabel/fetch',
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
      type: 'datalabel/fetch',
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
      datalabel: { list },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="a">图像分类</Menu.Item>
        <Menu.Item key="b">物体检测</Menu.Item>
        <Menu.Item key="c">文本分类</Menu.Item>
        <Menu.Item key="d">命名实体</Menu.Item>
        <Menu.Item key="e">声音分类</Menu.Item>
        <Menu.Item key="f">语音内容</Menu.Item>
      </Menu>
    );

    const operator = (
      <Row type="flex" justify="space-between">
         <Col span={6}>
           <Button.Group>
             <Button icon="plus" >创建数据集</Button>
             {selectedRows.length > 0 && <Button icon="delete">删除</Button>}
           </Button.Group>
         </Col>
         <Col span={12} offset={6}>
           <Row type="flex" justify="end">
             <Col>
              <Dropdown overlay={menu}>
              <Button>
                  所有类型 <Icon type="down" />
              </Button>
              </Dropdown>
              <Input.Search placeholder="请输入" onSearch={() => ({})} style={{ width:200 }}/>
              <Button icon="redo" />
              </Col>
            </Row>
         </Col>
    </Row>);
    
    return (
      <PageHeaderWrapper title="数据标注">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <CommonTable
              operator = {operator}
              selectedRows={selectedRows}
              loading={loading}
              data={list}
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

export default DataLabeling;

