const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.set('view engine', 'hbs')
// app.set = buat setting varible global, configuratoin, dll
app.set("views", path.join(__dirname, 'src/view'))

app.use('/assets', express.static(path.join(__dirname,'src/assets')))
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send('hallo word');
  });

app.get('/about', (req, res) => {
    res.send('hallo ini about');
  });

app.get('/testimonial', (req,res) => {
    res.json( [
        {
            nama : "Dimas",
            conten : "Saya puas dengan servisnya ",
            Image : "https://images.unsplash.com/photo-1514052010593-e2fe7393521d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            reting : 5
        },
        {
            nama : "Sandika",
            conten : "Saya bangga dengan Projek nya",
            Image : "https://images.unsplash.com/photo-1513959663939-eb7424f0e121?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            reting : 5
        },
        {
            nama : "Dody",
            conten : "Saya malu dangan dia karna fans barca",
            Image : "https://images.unsplash.com/photo-1507438222021-237ff73669b5?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            reting : 1
        },
        {
            nama : "Ronny",
            conten : "Lumayan cepat dan sesuai applikasi",
            Image : "https://images.unsplash.com/photo-1519456264917-42d0aa2e0625?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            reting : 4
        },
        ])
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })