import { Link } from "@inertiajs/react";

const Pagination = ({ links }) => {

  if (links.length <= 3) {
    return null;
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {links.map(link => (
          <>
            {link.url != null && (
              <li className={`page-item ${link.active ? 'active' : ''}`}><Link className="page-link" href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} /></li>
            )}
          </>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
