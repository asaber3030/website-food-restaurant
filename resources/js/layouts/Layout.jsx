import Navbar from "@/navs/Navbar";

import { usePage } from "@inertiajs/react";
import { useState } from "react";
import {Alert, Snackbar} from "@mui/material";

const Layout = ({ children }) => {

  const { flash } = usePage().props
  const [flashMessageState, setFlashState] = useState(true)

  return (
    <div className="app-layout">
      {flash.message && (
        <Snackbar
          ContentProps={{
            sx: { backgroundColor: '#407221', color: '#fff' }
          }}
          open={flashMessageState}
          autoHideDuration={4000}
          onClose={ () => setFlashState(false) }
          message={flash.message}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        />
      )}
      <Navbar />
      <div className="page-content">
        {children}
      </div>
    </div>
  )
}

export default Layout
