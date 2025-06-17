setTimeout(() => document.getElementById("popup-yt").style.display = "block", 2000);
async function loadInbox() {
  const mailbox = document.getElementById('mailbox').value;
  const res = await fetch(`/api/inbox/${mailbox}`);
  const mails = await res.json();
  const list = document.getElementById('mail-list'); list.innerHTML = '';
  mails.forEach(m => { let li = document.createElement('li'); li.textContent = m.subject; list.appendChild(li); });
}
