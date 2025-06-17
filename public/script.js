
async function loadInbox() {
  const mailbox = document.getElementById('mailbox').value;
  const res = await fetch(`/api/inbox/${mailbox}`);
  const mails = await res.json();
  const list = document.getElementById('mail-list');
  list.innerHTML = '';
  mails.forEach(mail => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${mail.subject}</strong>: ${mail.content}`;
    list.appendChild(li);
  });
}
