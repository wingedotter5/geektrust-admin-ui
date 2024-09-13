import { useEffect, useState } from 'react'

import Checkbox from './checkbox'
import Pagination from './pagination'
import Search from './search'
import UserListItem from './user-list-item'

const rowsPerPage = 10

const UserList = () => {
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState([])
  const [searchText, setSearchText] = useState('')
  const [checked, setChecked] = useState('unchecked')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true)
        const res = await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
        )
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`)
        }
        const data = await res.json()
        setUsers(data.map((user) => ({ ...user, checked: false })))
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const startIndex = (page - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const usersOnPage = users.slice(startIndex, endIndex)
    const checkedCount = usersOnPage.filter((user) => user.checked).length

    if (checkedCount === 0) {
      setChecked('unchecked')
    } else if (checkedCount === usersOnPage.length) {
      setChecked('checked')
    } else {
      setChecked('indeterminate')
    }
  }, [page, users])

  const onChange = () => {
    const startIndex = (page - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage

    setUsers((users) =>
      users.map((user, index) => {
        if (index >= startIndex && index < endIndex) {
          if (checked === 'unchecked') {
            return { ...user, checked: true }
          } else {
            return { ...user, checked: false }
          }
        }
        return user
      }),
    )
    setChecked(checked === 'unchecked' ? 'checked' : 'unchecked')
  }

  const handleSelect = (_, userId) => {
    setUsers((users) =>
      users.map((user) => {
        if (user.id === userId) {
          return { ...user, checked: !user.checked }
        }
        return user
      }),
    )
  }

  const changePage = (page) => {
    setPage(page)
  }

  const deleteSelected = () => {
    setUsers((users) => users.filter((user) => !user.checked))
    setPage(1)
  }

  const deleteUser = (userId) => {
    setUsers((users) => users.filter((user) => user.id !== userId))
  }

  const onSearch = (query) => {
    setSearchText(query.toLowerCase())
    setPage(1)
  }

  const updateUser = (userId, fields) => {
    setUsers((users) =>
      users.map((user) => {
        if (user.id === userId) {
          return { ...user, ...fields }
        }
        return user
      }),
    )
  }

  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText) ||
      user.email.includes(searchText) ||
      user.role.includes(searchText),
  )
  const usersToRender = filteredUsers.slice(startIndex, endIndex)

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-screen-lg flex-col gap-2 p-2">
      <Search onSearch={onSearch} />
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
