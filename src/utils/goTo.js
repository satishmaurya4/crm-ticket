export const goToTicketRecord = (ticketRef) => {
    window.scrollTo({
      top: ticketRef.current.offsetTop,
      behavior: "smooth",
    })
  }
export const goToTop = (topRef) => {
    window.scrollTo({
      top: topRef.current.offsetTop,
      behavior: "smooth",
    })
  }