import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';


export default function MyModal({open,setOpen,title, children}) {


  function closeModal() {
    setIsOpen(false)
  }



  return (

      <React.Fragment>
    
   <Modal open={open} onClose={() => setOpen(false)}  >
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only('xs')]: {
              top: 'unset',
              bottom: 0,
              left: 0,
              right: 0,
          
              borderRadius: 5,
              transform: 'translateZ(00.3)',
              maxWidth: 'unset',
            },
          })}
        >
          <Typography  id="nested-modal-title" level="h2" sx={{}}>
          <h2 className='uppercase ml-10'>{title}</h2> 
          </Typography>
          <Typography id="nested-modal-description" textColor="text.tertiary">
           {children}
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
           
          </Box>
        </ModalDialog>
      </Modal>

  
          </React.Fragment>
  

  )
}
