import PropTypes from 'prop-types'
import { useState } from 'react'

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    onSearch(query)
  }

  const onChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="text"
        name="search"
        placeholder="Search by name, email or role"
        value={query}
        onChange={onChange}
        className="w-full rounded border p-2 focus:border-blue-500 focus:outline-none"
      />
      <button
        className="bg-blue-500 px-4 rounded py-2 text-white"
        type="submit"
      >
        Search
      </button>
    </form>
  )
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default Search
