const React = require('react');
const ReactDOM = require('react-dom/client');


window.addEventListener('DOMContentLoaded', (event) => {
  const GROUP_ID = window.location.pathname.split('/group/')[1];
  const itemForm = document.getElementById('add-item-form');
  itemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemFormData = new FormData(itemForm);
    fetch(`/item/add/${GROUP_ID}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(itemFormData.entries())),
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.errors) {
        consle.log('errors', data.errors);
      } else {
        window.location.replace(`/item/${data._id}`);
      }
    });
  });

  ReactDOM
  .createRoot(document.getElementById('app'))
  .render(<div>Group page</div>);
});
