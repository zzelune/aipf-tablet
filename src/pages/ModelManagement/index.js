import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import router from 'umi/router';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Menu ,Layout,List,Input,Button,Card,Row,Col,Divider,Icon} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CommonTable from '@/components/CommonTable';


import styles from './index.less';

const { Item } = Menu;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
class DataManagement extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

 
  render() {
    const {
      list: { list },
      loading,
    } = this.props;

    const columns = [
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

    const extraContent = (
      <div style={{marginBottom:16}}>
        
        <Input.Search style={{width: '100px'}} placeholder="请输入" onSearch={() => ({})} />
        <Button
              icon="plus"
              ref={component => {
                /* eslint-disable */
                this.addBtn = ReactDOM.findDOMNode(component);
                /* eslint-enable */
              }}
            >
        </Button>
      </div>
    );


    const operator = (
      <Row type="flex" justify="space-between">
         <Col span={6}>
           <Button.Group>
             <Button icon="plus" >添加文件</Button>
           </Button.Group>
         </Col>
         <Col span={12} offset={6}>
           <Row type="flex" justify="end">
             <Col>
              <Input.Search placeholder="请输入" onSearch={() => ({})} style={{ width:200 }}/>
              <Button icon="redo" />
              </Col>
            </Row>
         </Col>
    </Row>);

    return (

      <PageHeaderWrapper title="数据管理">
        
        <Layout style={{ background: '#fff',padding :'24px' }}>

        <Layout.Sider width={240} style={{ background: '#fff',marginRight:'24px' }}>
        {extraContent}
        <div style={{/*border:'0.5px solid #e8e8e8',*/height:222, overflow: 'scroll'}}>
        <List
              size="small"
              split={false}
              rowKey="id"
              loading={loading}
              dataSource={list}
              renderItem={item => (
                <List.Item 
                  actions={[<div className={styles.action} ><a><Icon type="edit"></Icon></a> <a><Icon type="delete"></Icon></a></div> ]} 
                  className={styles.item} 
                  onClick={e=>{console.log(e)}}>
                     {item.title}
                </List.Item>
              )}
            />
        </div>
        </Layout.Sider>
        <Layout.Content>
          <CommonTable
              bordered
              operator = {operator}
              loading={loading}
              columns={columns}
            />
        </Layout.Content>
        </Layout>

      </PageHeaderWrapper>

     
    );
  }
}

export default DataManagement;





