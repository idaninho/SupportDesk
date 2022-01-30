import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { reset, getTicket, closeTicket } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import { GoBackButton } from '../components/GoBackButton';
import { useParams } from 'react-router-dom';
import { getNotes, reset as notesReset } from '../features/notes/noteSlice';
import { NoteItem } from '../components/NoteItem';

function Ticket() {
  const { user } = useSelector((state) => state.auth);
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );
  const {
    notes,
    isLoading: notesIsLoading,
    isSuccess: notesIsSuccess,
    isError: notesIsError,
    message: notesMessage,
  } = useSelector((state) => state.notes);

  const { ticketId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [dispatch, isError, ticketId, message]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket Closed');
    navigate('/tickets');
  };
  return (
    <div>
      {(isLoading || notesIsLoading) && <Spinner />}
      <div className="ticket-page">
        <header className="ticket-header">
          <GoBackButton url="/tickets" />
          <h2>
            Ticket ID: {ticket._id}
            <span className={`status status-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
          </h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className="ticket-desc">
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
          </div>
        </header>
        <h2>Notes</h2>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
        {ticket.status !== 'closed' && (
          <button className="btn btn-block btn-danger" onClick={onTicketClose}>
            Close Ticket
          </button>
        )}
      </div>
    </div>
  );
}

export default Ticket;
