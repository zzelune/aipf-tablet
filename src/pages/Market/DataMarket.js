import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';

import TagSelect from '@/components/TagSelect';
import AvatarList from '@/components/AvatarList';
import Ellipsis from '@/components/Ellipsis';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './DataMarket.less';

const { Option } = Select;
const FormItem = Form.Item;

/* eslint react/no-array-index-key: 0 */

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    // 表单项变化时请求数据
    // eslint-disable-next-line
    console.log(changedValues, allValues);
    // 模拟查询表单生效
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  },
})
class CoverCardList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const {
      list: { list = [] },
      loading,
      form,
    } = this.props;
    const { getFieldDecorator } = form;

    const cardList = list ? (
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.title} src={item.cover} />}
            >
              <Card.Meta
                title={<a>{item.title}</a>}
                description={<Ellipsis lines={2}>{item.subDescription}</Ellipsis>}
              />
              <div className={styles.cardItemContent}>
                <span>{moment(item.updatedAt).fromNow()}</span>
                <div className={styles.avatarList}>
                  <AvatarList size="mini">
                    {item.members.map((member, i) => (
                      <AvatarList.Item
                        key={`${item.id}-avatar-${i}`}
                        src={member.avatar}
                        tips={member.name}
                      />
                    ))}
                  </AvatarList>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    ) : null;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const actionsTextMap = {
      expandText: <FormattedMessage id="component.tagSelect.expand" defaultMessage="Expand" />,
      collapseText: (
        <FormattedMessage id="component.tagSelect.collapse" defaultMessage="Collapse" />
      ),
      selectAllText: <FormattedMessage id="component.tagSelect.all" defaultMessage="All" />,
    };

    return (
      <div className={styles.coverCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="主题" block style={{ paddingBottom: 8 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect actionsText={actionsTextMap}>
                    <TagSelect.Option value="cat1">物体分类</TagSelect.Option>
                    <TagSelect.Option value="cat2">物体检测</TagSelect.Option>
                    <TagSelect.Option value="cat3">回归</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="数据类型" block style={{ paddingBottom: 8 }}>
              <FormItem>
                {getFieldDecorator('data')(
                  <TagSelect actionsText={actionsTextMap}>
                    <TagSelect.Option value="cat1">文本</TagSelect.Option>
                    <TagSelect.Option value="cat2">图片</TagSelect.Option>
                    <TagSelect.Option value="cat3">视频</TagSelect.Option>
                    <TagSelect.Option value="cat4">音频</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="领域" block style={{ paddingBottom: 8 }}>
              <FormItem>
                {getFieldDecorator('Industry')(
                  <TagSelect actionsText={actionsTextMap}>
                    <TagSelect.Option value="cat1">农业</TagSelect.Option>
                    <TagSelect.Option value="cat2">教育</TagSelect.Option>
                    <TagSelect.Option value="cat3">医疗</TagSelect.Option>
                    <TagSelect.Option value="cat4">自动驾驶</TagSelect.Option>
                    <TagSelect.Option value="cat5">能源</TagSelect.Option>
                    <TagSelect.Option value="cat6">互联网</TagSelect.Option>
                    <TagSelect.Option value="cat7">航天</TagSelect.Option>
                    <TagSelect.Option value="cat8">工业</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="引擎" block style={{ paddingBottom: 8 }}>
              <FormItem>
                {getFieldDecorator('engine')(
                  <TagSelect actionsText={actionsTextMap}>
                    <TagSelect.Option value="cat1">Tensorflow</TagSelect.Option>
                    <TagSelect.Option value="cat2">PyTorch</TagSelect.Option>
                    <TagSelect.Option value="cat3">Mxnet</TagSelect.Option>
                    <TagSelect.Option value="cat4">Spark</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="作者" grid last>
                  <FormItem {...formItemLayout} >
                    {getFieldDecorator('author', {})(
                      <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                        <Option value="lisa">王昭君</Option>
                      </Select>
                    )}
                  </FormItem>
            </StandardFormRow>
          </Form>
        </Card>
        <div className={styles.cardList}>{cardList}</div>
      </div>
    );
  }
}

export default CoverCardList;

