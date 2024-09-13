import PropTypes from 'prop-types'
import { useState } from 'react'

import Checkbox from './checkbox'

const UserListItem = ({
  user,
  handleSelect,
  checked,
  deleteUser,
  updateUser,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [role, setRole] = useState(user.role)

  const onSave = () => {
    updateUser(user.id, {
      name,
      email,
      role,
    })
    setIsEditing(false)
  }

  return (
    <>
      {isEditing ? (
        <tr>
          <td className="p-3"></td>
          <td className="p-3">
            <input
              className="w-full border focus:border-blue-500 focus:outline-none"
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </td>
          <td className="p-3">
            <input
              className="w-full border focus:border-blue-500 focus:outline-none"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </td>
          <td className="p-3">
            <select
              name="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
          </td>
          <td className="flex items-center gap-2 p-3">
            <button
              onClick={onSave}
              className="save rounded-full bg-green-500 px-3 text-white"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="cancel rounded-full bg-gray-500 px-3 text-white"
            >
              Cancel
            </button>
          </td>
        </tr>
      ) : (
        <tr>
          <td className="p-3">
            <Checkbox
              onChange={(event) => handleSelect(event, user.id)}
              value={checked ? 'checked' : 'unchecked'}
            />
          </td>
          <td className="p-3">{user.name}</td>
          <td className="p-3">{user.email}</td>
          <td className="p-3">{user.role}</td>
          <td className="p-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="edit rounded-full border bg-blue-500 px-3 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                className="delete rounded-full border bg-red-500 px-3 text-white"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

UserListItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }),
  handleSelect: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
}

export default UserListItem
