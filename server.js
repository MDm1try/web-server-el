import app from './app';

app.listen(process.env.PORT, () => {
  console.log(`Express server is running on localhost: ${process.env.PORT}`);
});
