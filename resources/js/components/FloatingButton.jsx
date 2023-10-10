import { Link } from "@inertiajs/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {Tooltip} from "@mui/material";

const FloatingButton = ({ url, icon  = faShoppingCart, badge }) => {
  return (
    <Tooltip title='Continue Shopping' followCursor>
      <Link className='floating-button' href={url}>
        <FontAwesomeIcon icon={icon} />
        {badge && (
          <span>{badge}</span>
        )}
      </Link>
    </Tooltip>
  )
}

export default FloatingButton
