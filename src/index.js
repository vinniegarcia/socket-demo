import app from './server/'

const PORT = process.env.PORT || 1337

app.listen(PORT, (err) => {
    if (err) {
        throw err
    }
    console.log(`app listening on port ${PORT}`)
})