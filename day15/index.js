const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')


app.set('view engine', 'hbs')
// app.set = buat setting varible global, configuratoin, dll
app.set("views", path.join(__dirname, 'src/view'))


app.use('/assets', express.static(path.join(__dirname,'src/assets')))
app.use(express.urlencoded({ extended: false }))
app.use(session({
  name: 'token',
  secret: 'rahasia',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge : 1000 * 60 * 60 * 24
  }
}));
app.use(flash());

app.get('/home', home)
app.get('/contak', contak)
app.get('/testimonial', testimonial)

app.get('/registerUsers', registerView)
app.post('/registerUsers', registerAdd)

app.get('/login', loginView)
app.post('/login', loginAdd)

app.get('/myprojek', myprojek)
app.post('/myprojek', addmyprojek)

app.get('/updeteProjek/:id', updateProjekView)  
app.post('/updateProjek', updateProjek)

app.post('/deProjek/:id', deleteProjek)
app.get('/projectDetail/:id', detailProjek)
app.get('/error', error)
app.get('/logout', logout)
// const dataView = []


 async function home(req, res) {
    const query = 'SELECT * FROM projects'
    const obj = await sequelize.query(query, { type:QueryTypes.SELECT })
    // console.log('obj', obj)
    req.flash('sussces',`login sussces`)
    const user = req.session.user
    const isLogin = req.session.isLogin
    console.log('isLogin:',obj);
    res.render('index', {data: obj, user,isLogin});
    
    
  }
 
  function contak(req, res) {
    res.render('contak')
  }
  function testimonial(req, res) {
    res.render('testimonial')
  }
  function registerView(req, res) {
    res.render('register')
  }
  async function registerAdd(req, res) {
    const {name,email,password} = req.body
    if(!name){
       req.flash('danger', 'masukan name kamu');
       return res.redirect('/registerUsers')
    }
    if(!email){
      req.flash('danger', 'masukan email kamu');
      return res.redirect('/registerUsers')
    }
    if(!password){
      req.flash('danger', 'masukan password kamu');
      return res.redirect('/registerUsers')
    }
    const cariEmail = `SELECT * FROM users WHERE email='${email}'`
    const objEmail = await sequelize.query(cariEmail, {type: QueryTypes.SELECT})
    // Jika tidak ada hasil dari query yang cocok
    if(objEmail.length > 0){
      req.flash('danger', 'Email sudah terdaftar');
      return res.redirect('/registerUsers')
    }else{
    const salt = 10
    bcrypt.hash(password,salt,async (err,hash) => {
      if(err){
        return console.error("Password failed to be encrypted")
      }
      console.log('hash', hash)
      const query = `INSERT INTO users(name,email,password) VALUES ('${name}','${email}','${hash}')`
      const obj = await sequelize.query(query, { type: QueryTypes.INSERT })
    //  console.log('register:',obj)
    req.session.isLogin = true
      req.session.user = {
        name : obj[0].name,
        email : obj[0].email
      }
      res.redirect('/home')
    })
   }
  }
  function loginView(req, res) {
    res.render('login')
  }
 async function loginAdd(req, res) {
    const {email,password} = req.body
    const query = `SELECT * FROM users WHERE email='${email}'`
    const obj = await sequelize.query(query, {type: QueryTypes.SELECT})
    if (!obj.length) {
      console.error("user not register")
      req.flash('danger', 'user not register')
      return res.redirect('/login')
    }
    bcrypt.compare(password, obj[0].password, (err,resault) =>{
      if (err) {
       return console.error('login internal server error')
      }
      if(!resault){
        console.log('email or password is wrong!')
        req.flash('danger', 'email or password wrong')
        return res.redirect('/login')
      }
      console.log('login success')
      req.session.isLogin = true
      req.session.user = {
        name : obj[0].name,
        email : obj[0].email
      }
      res.redirect('/home')
    })
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
    if (!obj.length) {
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
  function logout(req, res) {
    req.session.destroy((err) => {
      res.redirect('/home') // will always fire after session is destroyed
    })
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