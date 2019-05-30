import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import router from 'umi/router';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Menu ,Layout,List,Input,Button,Card,Row,Col} from 'antd';
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
      <div className={styles.extraContent}>
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
             <Button icon="plus" >创建数据集</Button>
           </Button.Group>
         </Col>

         <Col span={8} offset={10}>
             <Input.Search placeholder="请输入" onSearch={() => ({})} style={{ marginRight: 8 ,width:200 }}/>
             <Button icon="redo" />
         </Col>
    </Row>);

    return (

      <PageHeaderWrapper title="数据管理">
        
        <Layout style={{ background: '#fff' }}>
        <Layout.Sider width={300} style={{ padding: '24px',background: '#fff' }}>
        <Card
            className={styles.listCard}
            title='数据集'
            bordered={false}
            bodyStyle={{ padding: '0 10px 10px 10px' }}
            extra={extraContent}


          >
            <List
              size="small"
              split='false'
              rowKey="id"
              loading={loading}
              dataSource={list}
              renderItem={item => (
                <List.Item>
                    <a href={item.href}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Layout.Sider>
        <Layout.Content style={{ padding: '24px 0', minHeight: 280 }}>
          <CommonTable
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





