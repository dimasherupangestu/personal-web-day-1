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

app.get('/updeteProjek/:id', updateProjekView)  
app.post('/updateProjek', updateProjek)

app.post('/deProjek/:id', deleteProjek)
app.get('/projectDetail/:id', detailProjek)

const dataView = []


  function home(req, res) {
    
    res.render('index', {dataView})
  }

  function contak(req, res) {
    res.render('contak')
  }
  function testimonial(req, res) {
    res.render('testimonial')
  }
  function myprojek(req, res) {
      res.render('myprojek')
   }
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
    let durasi = durasihari(inputStart,inputEnd);
    // console.log('durasi', durasi)
    
    // console.log('checkboxes', checkboxes)
    
    const dataProjek = {projekName, inputStart, inputEnd,durasi,pesan,checkboxes,nodeJs, nextJs, reactJs, typescript};
    
    dataView.unshift(dataProjek)
  //  console.log('dataview', dataView)
  //   console.log('dataprojek', dataProjek)

    res.redirect('/home')
  }
  function updateProjekView(req, res) {
    const { id } = req.params;
    const dataIndex = parseInt(id);
    
    if (dataView.length > dataIndex && dataIndex >= 0) {
      const dataEdit = dataView[dataIndex];
      dataEdit.id = dataIndex;
      
      res.render('updateProjek', {
        data: dataEdit
      });
    } else{
      res.send('<h2 class="fw-bold m-3 text-center">Data Not Found</h2>')
    }
    console.log('datates:', dataView)
  }
  
  function updateProjek(req, res) {
    const { projekName,
       inputStart,
      inputEnd,
      durasi,
      pesan,
      nodeJs,
      nextJs,
      reactJs,
      typescript, id } = req.body;
      
      const checkboxes = {
        nodeJs: nodeJs === 'on',
        reactJs: reactJs === 'on',
        nextJs: nextJs === 'on',
        typescript: typescript === 'on',
      };
      // const dataProjek = {id,durasi,projekName, inputStart, inputEnd,pesan,checkboxes,nodeJs, nextJs, reactJs, typescript};
      // console.log('reqwes',dataProjek)
    // Mendapatkan nilai dataEdit dari pemanggilan fungsi updateProjekView
    dataView[parseInt(id)] = {
      projekName, 
      inputStart,
      inputEnd,
      durasi,
      pesan,
      checkboxes,
      nodeJs,
      nextJs,
      reactJs,
      typescript
    };
    
    console.log('update: ', dataView)
    res.redirect('/home');
  }
  

  function deleteProjek (req,res){
    const {id} = req.params
    
    dataView.splice(id, 1)
    // console.log(dataView)
    res.redirect('/home')

  }
 
  
    function detailProjek(req, res) {
      const { id } = req.params
      const dataFilter = dataView[parseInt(id)]
      dataFilter.id = parseInt(id)

    console.log(id)
    console.log('datafilter',dataFilter)
    res.render('detailProjek', {data: dataFilter})

  }
  
  function durasihari(inputStart, inputEnd) {
    const dataStart = new Date(inputStart);
    const dataEnd= new Date(inputEnd);

  // buat data satu haru
  const oneDay = 24 * 60 * 60 * 1000;
  //   mengembalikan nilai absolut dari suatu angka
  const time = Math.abs(dataEnd - dataStart);
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