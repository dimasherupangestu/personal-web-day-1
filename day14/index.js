const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const { type } = require('os')
const sequelize = new Sequelize(config.development)

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
app.get('/error', error)
const dataView = []


 async function home(req, res) {
    const query = 'SELECT * FROM projects'
    const obj = await sequelize.query(query, { type:QueryTypes.SELECT })
    console.log('obj', obj)
    res.render('index', {dataView: obj})
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
  async function addmyprojek(req, res) {
  const {projekName, starDate, endDate,pesan} = req.body
  const nodeJs = req.body.nodeJs === 'true' ? true : false;
  const nextJs = req.body.nextJs === 'true' ? true : false;
  const reactJs = req.body.reactJs === 'true' ? true : false;
  const typescript = req.body.typescript === 'true' ? true : false;

  const image = '3.jpg'
  const query = `INSERT INTO projects(title,star_date,end_date,pesan,node_js,next_js,react_js,typescript,image) VALUES ('${projekName}','${starDate}','${endDate}','${pesan}','${nodeJs}','${nextJs}','${reactJs}','${typescript}','${image}')`

    const obj = await sequelize.query(query, { type: QueryTypes.INSERT })
  
    console.log(`tambahdata, ${obj}`)
    // ambil waktu durasi
    // let durasi = durasihari(inputStart,inputEnd);


    res.redirect('/home')
  }
 async function updateProjekView(req, res) {
    const { id } = req.params;
    const dataIndex = parseInt(id);  
    const query = `SELECT * FROM projects WHERE id=${dataIndex}`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
      // Apakah tidak ada proyek yang ditemukan dari hasil query
    if(obj.length === 0){
       // Jika tidak ada proyek dengan ID yang ditemukan
      res.render('error')
    }else{
         // Jika proyek dengan ID yang diminta ditemukan
      res.render('updateProjek', { data: obj[0] })
      console.log('updateProjek',obj)
    }
    // console.log('datates:', dataView)
  }
  
 async function updateProjek(req, res) {
    const {projekName, starDate, endDate,pesan,id} = req.body
    const nodeJs = req.body.nodeJs === 'true' ? true : false;
    const nextJs = req.body.nextJs === 'true' ? true : false;
    const reactJs = req.body.reactJs === 'true' ? true : false;
    const typescript = req.body.typescript === 'true' ? true : false;

    const query = `UPDATE projects SET title='${projekName}',star_date='${starDate}',end_date='${endDate}',pesan='${pesan}',node_js='${nodeJs}',next_js='${nextJs}',react_js='${reactJs}',typescript='${typescript}' WHERE id=${id}`
    const obj = await sequelize.query(query, {type: QueryTypes.UPDATE})
    console.log('berhasil update data:', obj)
    
    
    // console.log('update: ', dataView)
    res.redirect('/home');
  }
  

 async function deleteProjek (req,res){
    const {id} = req.params
   const query = `DELETE FROM projects WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.DELETE })
    // dataView.splice(id, 1)
    console.log('data berhasil di delete',obj)
    res.redirect('/home')

  }
 
  
   async function detailProjek(req, res) {
    const { id } = req.params;
    const dataIndex = parseInt(id);
  
    const query = `SELECT * FROM projects WHERE id = ${dataIndex}`;
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
  
    // Apakah tidak ada proyek yang ditemukan dari hasil query
    if (obj.length === 0) {
      // Jika tidak ada proyek dengan ID yang ditemukan
      res.render('error');
    } else {
      // Jika proyek dengan ID yang diminta ditemukan
      res.render('detailProjek', { data: obj[0] });
    }
    
      // const dataFilter = dataView[parseInt(id)]
      // dataFilter.id = parseInt(id)

    // console.log(id)
    // console.log('datafilter',dataFilter)
    // res.render('detailProjek', {data: obj[0]})

  }
  function error(req, res) {
    res.render('error')
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