import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'antd'

const MOCK_PAGE_RESULTS = 88

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
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
