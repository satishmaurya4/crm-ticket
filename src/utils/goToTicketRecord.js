export const goToTicketRecord = (ticketRef) => {
    window.scrollTo({
      top: ticketRef.current.offsetTop,
      behavior: "smooth",
    })
  }