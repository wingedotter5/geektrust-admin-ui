import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

const Checkbox = ({ value, onChange }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (value === 'checked') {
      ref.current.checked = true
      ref.current.indeterminate = false
    } else if (value === 'unchecked') {
      ref.current.checked = false
      ref.current.indeterminate = false
    } else if (value === 'indeterminate') {
      ref.current.checked = false
      ref.current.indeterminate = true
    }
  }, [value])

  return (
    <input
      ref={ref}
      onChange={onChange}
      checked={value === 'checked'}
      type="checkbox"
      className="grid h-[1em] w-[1em] appearance-none place-content-center border-2 text-current before:hidden before:h-[0.60em] before:w-[0.60em] before:bg-blue-500 checked:border-blue-500 checked:before:block indeterminate:border-black indeterminate:before:block indeterminate:before:h-[0.1em] indeterminate:before:bg-black"
    />
  )
}

Checkbox.propTypes = {
  value: PropTypes.oneOf(['checked', 'unchecked', 'indeterminate']).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Checkbox
