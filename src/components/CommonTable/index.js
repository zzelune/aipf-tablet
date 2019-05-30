import React, { PureComponent, Fragment } from 'react';
import { Row,Col,Table, Button,Radio,Input } from 'antd';
import styles from './index.less';

class CommonTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const { operator } = props ;
    this.state = {
      selectedRowKeys: [],
    };
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys});
  };



  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };


  render() {
    const { selectedRowKeys } = this.state;
    const { data = {}, rowKey, operator,...rest} = this.props;
    const { list = [], pagination } = data;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableListOperator}>
           {operator}
        </div>
        <Table
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

export default CommonTable;
