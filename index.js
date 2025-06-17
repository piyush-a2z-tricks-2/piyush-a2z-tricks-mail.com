
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Mail = require('./models/Mail');
const app = express();
app.get('/', (req, res) => {
  res.send('✅ Piyush Mail Server is Live!');
});
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/temp-mail', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/send', async (req, res) => {
    const { to, subject, content } = req.body;
    const mail = new Mail({ to, subject, content, time: new Date() });
    await mail.save();
    res.send({ success: true });
});

app.get('/api/inbox/:to', async (req, res) => {
    const inbox = await Mail.find({ to: req.params.to }).sort({ time: -1 });
    res.json(inbox);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
