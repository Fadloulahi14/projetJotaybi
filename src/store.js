export const state = {
  selectedContact: null,
  messages: [],
  onContactSelected: null
};

export const selectContact = (contact) => {
  state.selectedContact = contact;
  updateHeader();
  if (state.onContactSelected) {
    state.onContactSelected(contact);
  }
};

export const updateHeader = () => {
  const headerName = document.querySelector('#contact-header-name');
  if (headerName && state.selectedContact) {
    headerName.textContent = state.selectedContact.nom;
  }
};