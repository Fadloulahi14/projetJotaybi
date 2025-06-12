export const state = {
  selectedContact: null,
  messages: []
};

export const selectContact = (contact) => {
  state.selectedContact = contact;
  updateHeader();
};

export const updateHeader = () => {
  const headerName = document.querySelector('#contact-header-name');
  if (headerName && state.selectedContact) {
    headerName.textContent = state.selectedContact.nom;
  }
};