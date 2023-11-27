const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.set('view engine', 'hbs')
// app.set = buat setting varible global, configuratoin, dll
app.set("views", path.join(__dirname, 'src/view'))

app.use('/assets', express.static(path.join(__dirname,'src/assets')))
app.use(express.urlencoded({ extended: false }))

app.get('/home', home)
app.get('/contak', contak)
app.get('/testimonial', testimonial)

app.get('/myprojek', myprojek)
app.post('/myprojek', addmyprojek)

app.get('/projectDetail/:id', detailProjek)

const dataView = []
let durasi = '' 

  function home(req, res) {

   
    res.render('index', {dataView})
  };

  function contak(req, res) {
    res.render('contak')
  };
  function testimonial(req, res) {
    res.render('testimonial')
  };
  function myprojek(req, res) {
      res.render('myprojek')
   };
   function addmyprojek(req, res) {
    const projekName = req.body.projekName;
    const pesan = req.body.pesan;
    const inputStart = req.body.starDate;
    const inputEnd = req.body.endDate;
    let {nodeJs, reactJs, nextJs, typescript} = req.body
    
    nodeJs = nodeJs === 'on';
    reactJs = reactJs === 'on';
    nextJs = nextJs === 'on';
    typescript = typescript === 'on';
    const checkboxes = [nodeJs, nextJs, reactJs, typescript]
      
    if( nodeJs == 'on' ){
      nodeJs = true
    }
    if( reactJs == 'on' ){
      reactJs = true
    }
    if( nextJs == 'on' ){
      nextJs = true
    }
    if( typescript == 'on' ){
      typescript = true
    }
    // ambil waktu durasi
    durasi += durasihari(inputStart,inputEnd);
    // console.log('durasi', durasi)
    
    // console.log('checkboxes', checkboxes)
    
    const dataProjek = {projekName, inputStart, inputEnd,durasi,pesan,checkboxes,nodeJs, nextJs, reactJs, typescript};
    
    dataView.unshift(dataProjek)
  //  console.log('dataview', dataView)
    console.log('dataprojek', dataProjek)

    res.redirect('/home')
  };
    function detailProjek(req, res) {
    const id = req.params.id
    const title = 'title 1'
    const conten = 'conten1'
     
    const data = {
      id,title,conten
    }
    console.log(id)
    res.render('detailProjek', {data})

  };

  function durasihari(inputStart, inputEnd) {
    const dateOne = new Date(inputStart);
  const dateTwo = new Date(inputEnd);

  // buat data satu haru
  const oneDay = 24 * 60 * 60 * 1000;
  //   mengembalikan nilai absolut dari suatu angka
  const time = Math.abs(dateTwo - dateOne);
  // console.log(time)
  //   pembulatan keatas
  const days = Math.round(time / oneDay);
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)
    
    if (years > 0) {
        return `${years} tahun`;
    } else if (months > 0) {
        return `${months} bulan`;
    } else if (days <= 30) {
        return `${days} hari`;
    } else {
        return "Kurang dari 1 hari";
    }
    
    
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })