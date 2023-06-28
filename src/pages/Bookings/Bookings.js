import React, { useEffect, useContext, useState } from 'react'
import { PageContainer } from '../../components/GlobalStyles/PageStyles'
import BookingsList from './BookingsList'
import { GlobalContext } from "../../utils/Context"
import { useQuery } from '@apollo/client'
import { GET_USER_BOOKINGS } from '../../graphql/queries/bookingQueries'
import PageLoader from "../../components/Loaders/PageLoader.js"
import PageError from '../../components/Error/PageError'
import BookingModal from '../../components/Modals/BookingModal'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';

function LockButton() {
    const [dialogOpen, setDialogOpen] = useState(false);
  
    const handleButtonClick = () => {
      setDialogOpen(true);
    };
  
    const handleDialogClose = () => {
      setDialogOpen(false);
    };
  
    return (
      <>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Lock
        </Button>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>{"Door Locked"} <FontAwesomeIcon icon={faLock} />
</DialogTitle>
          <DialogContent>
            <p>The door has been locked.</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  function UnlockButton() {
    const [dialogOpen, setDialogOpen] = useState(false);
  
    const handleButtonClick = () => {
      setDialogOpen(true);
    };
  
    const handleDialogClose = () => {
      setDialogOpen(false);
    };
  
    return (
      <>
        <Button variant="contained" color="secondary" onClick={handleButtonClick}>
          Unlock
        </Button>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>{"Door UnLocked"}<FontAwesomeIcon icon={faUnlock} />
</DialogTitle>
          <DialogContent>
            <p>The door has been unlocked.</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
const Bookings = (props) => {

    const { style, bookingsData } = props

    const { setPage } = useContext(GlobalContext)

    useEffect(() => {
        setPage("Bookings")
    }, [])

    const [modal, setModal] = useState({
        state: false,
        title: '',
        param: null,
        action: ''
    })

    const user = JSON.parse(localStorage.getItem('user'))

    const { data, loading, error } = useQuery(GET_USER_BOOKINGS,{variables: {id: user.id}})

    if (loading) return <PageLoader />
    if (error) return <PageError error={error} />

    const bookings = bookingsData ? bookingsData : data.getUserBookings

    return (
        <PageContainer style={style}>
           
            {modal.state ? <BookingModal
                booking={modal.param}
                setModal={setModal}
                title={modal.title} /> : null}
            <form style={{display:"flex",margin:"320px 0",position:"absolute",marginLeft:"70px"}}>
             <LockButton />
            <UnlockButton />
            </form>
            <BookingsList
                bookings={bookings}
                setModal={setModal}
                modal={modal} />
          
        </PageContainer>
    )
}

export default Bookings
