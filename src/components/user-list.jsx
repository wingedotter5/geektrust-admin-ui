import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import userApi, { useGetUsersQuery } from '../redux/user-api'
import Checkbox from './checkbox'
import Pagination from './pagination'
import Search from './search'
import UserListItem from './user-list-item'

const rowsPerPage = 10

const UserList = () => {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState('unchecked')
  const { data: users = [], isLoading, error } = useGetUsersQuery()
  const [searchParams, setSearchParams] = useSearchParams()

  const page = parseInt(searchParams.get('page')) || 1
  const query = searchParams.get('query') || ''

  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const filteredUsersIndexes = []
  const filteredUsers = users.filter((user, index) => {
    if (
      user.name.toLowerCase().includes(query) ||
      user.email.includes(query) ||
      user.role.includes(query)
    ) {
      filteredUsersIndexes.push(index)
      return true
    }

    return false
  })
  const usersToRender = filteredUsers.slice(startIndex, endIndex)

  useEffect(() => {
    const usersOnPage = filteredUsers.slice(startIndex, endIndex)
    const checkedCount = usersOnPage.filter((user) => user.checked).length

    if (checkedCount === 0) {
      setChecked('unchecked')
    } else if (checkedCount === usersOnPage.length) {
      setChecked('checked')
    } else {
      setChecked('indeterminate')
    }
  }, [page, filteredUsers, startIndex, endIndex])

  const onChange = () => {
    dispatch(
      userApi.util.updateQueryData('getUsers', undefined, (draftUsers) => {
        for (const index of filteredUsersIndexes.slice(startIndex, endIndex)) {
          draftUsers[index].checked = checked === 'unchecked'
        }
      }),
    )
  }

  const handleSelect = (_, userId) => {
    dispatch(
      userApi.util.updateQueryData('getUsers', undefined, (draftUsers) => {
        const user = draftUsers.find((user) => user.id === userId)
        user.checked = !user.checked
      }),
    )
  }

  const changePage = (page) => {
    setSearchParams((params) => {
      params.set('page', page)
      return params
    })
  }

  const deleteSelected = () => {
    dispatch(
      userApi.util.updateQueryData('getUsers', undefined, (draftUsers) => {
        draftUsers = draftUsers.filter((user) => !user.checked)
        return draftUsers
      }),
    )
    setSearchParams((params) => {
      params.set('page', 1)
      return params
    })
  }

  const deleteUser = (userId) => {
    dispatch(
      userApi.util.updateQueryData('getUsers', undefined, (draftUsers) => {
        draftUsers = draftUsers.filter((user) => user.id !== userId)
        return draftUsers
      }),
    )
  }

  const onSearch = (query) => {
    setSearchParams((params) => {
      params.set('page', 1)
      query ? params.set('query', query) : params.delete('query')
      return params
    })
  }

  const updateUser = (userId, fields) => {
    dispatch(
      userApi.util.updateQueryData('getUsers', undefined, (draftUsers) => {
        const user = draftUsers.find((user) => user.id === userId)
        Object.assign(user, fields)
      }),
    )
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>{error.error}</h1>
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-screen-lg flex-col gap-2 p-2">
      <Search onSearch={onSearch} />
      <p>
        total({filteredUsers.length}) selected(
        {users.filter((user) => user.checked).length})
      </p>
      <div className="overflow-x-auto">
        <table className="w-full table-auto divide-y border">
          <thead>
            <tr className="text-left">
              <th className="p-3">
                <Checkbox value={checked} onChange={onChange} />
              </th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {usersToRender.map((user) => (
              <UserListItem
                key={user.id}
                user={user}
                handleSelect={handleSelect}
                checked={
                  usersToRender.find((_user) => _user.id === user.id).checked
                }
                deleteUser={deleteUser}
                updateUser={updateUser}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 p-4">
        <button
          onClick={deleteSelected}
          className="bg-red-500 px-4 py-2 rounded-full text-white"
        >
          Delete Selected
        </button>
        <Pagination
          totalRows={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          currentPage={page}
          onChange={changePage}
        />
      </div>
    </div>
  )
}

export default UserList
