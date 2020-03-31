import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const MOCK_PAGE_RESULTS = 88

const uri = 'https://randomuser.me/api'

const DataTable = () => {
  const [state, setState] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: MOCK_PAGE_RESULTS,
    },
    loading: false,
  })

  const fetch = (params = {}) => {
    setState(prev => ({ ...prev, loading: true }))

    axios
      .get(uri, {
        params: {
          results: 10, 
          ...params
        }
      })
      .then(response => {
        setState(prev => ({
          ...prev,
          loading: false,
          data: response.data.results,
          pagination: {
            ...response.data.info,
            // mock 
            total: MOCK_PAGE_RESULTS,
          }
        }))
      })
  }

  const handleTableChange = (pagination, filters, sorter) => {
    console.log({pagination, filters, sorter})
    setState(prev => ({ 
      ...prev, 
      loading: true,
      pagination: { 
        ...prev.pagination, 
        current: pagination.current,
        total: MOCK_PAGE_RESULTS,
      }
    }))

    fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    })
  }

  const columnFilter = {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              // ใช้อ้างอิงตอนแสดง droopdown
              this.searchInput = node;
            }}
            placeholder={`Search`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => console.log('enter: ', {selectedKeys, confirm})}
          />
          <Button
            type="primary"
            onClick={() => {
              console.log('click:', {selectedKeys})
              confirm()
            }}
            icon={<SearchOutlined />}
            size="small"
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      )
    },
    filterIcon: filtered => (
      <div>ค้นหาฉันสิ</div>
    ),
    onFilter: (value, record) => {
      console.log('Please filter with value:', value)
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  }


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    ...columnFilter,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  }
]

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div>
      <Table
        columns={columns}
        rowKey={record => record.login.uuid}
        dataSource={state.data}
        pagination={state.pagination}
        loading={state.loading}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default DataTable
