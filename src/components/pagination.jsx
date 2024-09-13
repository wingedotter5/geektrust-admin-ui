import PropTypes from 'prop-types'

const Pagination = ({ totalRows, rowsPerPage, currentPage, onChange }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage)

  const otherButtons = Array(totalPages)
    .fill(null)
    .map((_, index) => (
      <Button
        active={currentPage === index + 1}
        key={index}
        onClick={() => onChange(index + 1)}
      >
        {index + 1}
      </Button>
    ))

  return (
    <div className="flex flex-wrap gap-4 p-2">
      <Button
        className="first-page"
        disabled={currentPage === 1}
        onClick={() => onChange(1)}
      >
        &lt;&lt;
      </Button>
      <Button
        className="previous-page"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        &lt;
      </Button>
      {otherButtons}
      <Button
        className="next-page"
        disabled={totalPages < 2 || currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        &gt;
      </Button>
      <Button
        className="last-page"
        disabled={totalPages < 2 || currentPage === totalPages}
        onClick={() => onChange(totalPages)}
      >
        &gt;&gt;
      </Button>
    </div>
  )
}

const Button = ({ children, onClick, disabled, active, className }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`${active ? 'border border-blue-500 bg-white text-blue-500' : 'bg-blue-500 text-white'} flex h-6 w-6 items-center justify-center rounded-full disabled:opacity-[0.5] ${className ?? ''}`}
  >
    {children}
  </button>
)

Pagination.propTypes = {
  totalRows: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  className: PropTypes.string,
}

export default Pagination
