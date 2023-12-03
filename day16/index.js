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
const upload = require('./src/middlewares/uploadFile')


app.set('view engine', 'hbs')
// app.set = buat setting varible global, configuratoin, dll
app.set("views", path.join(__dirname, 'src/view'))


app.use('/assets', express.static(path.join(__dirname,'src/assets')))
app.use('/uploads', express.static(path.join(__dirname,'src/uploads')))
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
app.post('/myprojek', upload.single('image') , addmyprojek)

app.get('/updeteProjek/:id', updateProjekView)  
app.post('/updateProjek',upload.single('image'), updateProjek)

app.post('/deProjek/:id', deleteProjek)
app.get('/projectDetail/:id', detailProjek)
app.get('/error', error)
app.get('/logout', logout)
// const dataView = []


 async function home(req, res) {
    const query = `SELECT projects.id, projects.title, projects.star_date, projects.end_date, projects.pesan, projects.node_js, projects.next_js, projects.react_js, projects.typescript, projects.image,
    users.name AS autor,projects."createdAt",projects."updatedAt" FROM projects LEFT JOIN users ON projects."autorId" = users.id`
    const obj = await sequelize.query(query, { type:QueryTypes.SELECT })
    // console.log('obj', obj)
    
    const user = req.session.user
    const isLogin = req.session.isLogin
    // console.log('objtes:',obj);
    req.flash('sussces',`login sussces, Welcome`)
    res.render('index', {data: obj, user:user,isLogin:isLogin});
    
  }
 
  function contak(req, res) {
    const isLogin = req.session.isLogin
      const user = req.session.user
    res.render('contak', {user,isLogin})
  }
  function testimonial(req, res) {
    const isLogin = req.session.isLogin
      const user = req.session.user
    res.render('testimonial', {user,isLogin})
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
        id: obj[0].id,
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
        id : obj[0].id,
        name : obj[0].name,
        email : obj[0].email
      }
      res.redirect('/home')
    })
  }
  function myprojek(req, res) {
  const user = req.session.user
  const isLogin = req.session.isLogin
  if(!isLogin){
    return res.redirect('home')
  }else{
    res.render('myprojek', {user:user,isLogin:isLogin})
  }
  
  
    
   }
  async function addmyprojek(req, res) {
   
  const {projekName, starDate, endDate,pesan} = req.body
  const nodeJs = req.body.nodeJs === 'true' ? true : false;
  const nextJs = req.body.nextJs === 'true' ? true : false;
  const reactJs = req.body.reactJs === 'true' ? true : false;
  const typescript = req.body.typescript === 'true' ? true : false;
  const image = req.file.filename
  // console.log('filename', image)
  const autorId = req.session.user.id

  const query = `INSERT INTO projects(title,star_date,end_date,pesan,node_js,next_js,react_js,typescript,image,"autorId") VALUES ('${projekName}','${starDate}','${endDate}','${pesan}','${nodeJs}','${nextJs}','${reactJs}','${typescript}','${image}','${autorId}')`
    const obj = await sequelize.query(query, { type: QueryTypes.INSERT })
  
    console.log(`tambahdata, ${obj}`)
    // ambil waktu durasi
    // let durasi = durasihari(inputStart,inputEnd);


    res.redirect('/home')
  }
 async function updateProjekView(req, res) {
    const { id } = req.params;
    const userid = req.session.user.id
    const user = req.session.user
    const isLogin = req.session.isLogin
  
    const query = `SELECT * FROM projects WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
  // console.log('userlogin',user)

     // Apakah tidak ada proyek yang ditemukan dari hasil query
     if(!obj.length){
      // Jika tidak ada proyek dengan ID yang ditemukan
     return res.render('error')
   }
   const cariautor = obj[0].autorId;
    if (userid != cariautor) {
      console.log('salah')
      req.flash('danger', 'anda tidak bisa edit karna bukan artikel anda')
      return res.redirect('/home');
    } 
    res.render('updateProjek', { data: obj[0], isLogin,user })
  }
  
 async function updateProjek(req, res) {
    const {projekName, starDate, endDate,pesan,id} = req.body
    const nodeJs = req.body.nodeJs === 'true' ? true : false;
    const nextJs = req.body.nextJs === 'true' ? true : false;
    const reactJs = req.body.reactJs === 'true' ? true : false;
    const typescript = req.body.typescript === 'true' ? true : false;
    let imageF = ""
    if(req.file){
      imageF = req.file.filename
      // console.log('filename:', image)
    }
    if (!imageF) {
      const query = `SELECT projects.id, projects.title, projects.star_date, projects.end_date, projects.pesan, projects.node_js, projects.next_js, projects.react_js, projects.typescript, projects.image,
    users.name AS autor,projects."createdAt",projects."updatedAt" FROM projects LEFT JOIN users ON projects."autorId" = users.id`
    const obj = await sequelize.query(query, { type:QueryTypes.SELECT })
    imageF = obj[0].image
    }
    const query = `UPDATE projects SET title='${projekName}',star_date='${starDate}',end_date='${endDate}',pesan='${pesan}',node_js='${nodeJs}',next_js='${nextJs}',react_js='${reactJs}',typescript='${typescript}',image='${imageF}' WHERE id=${id}`;
    const obj = await sequelize.query(query, {type: QueryTypes.UPDATE})
    console.log('berhasil update data:', obj)
    
    
    // console.log('update: ', dataView)
    res.redirect('/home');
  }
  

  async function deleteProjek(req, res) {
    const { id } = req.params;
    const user = req.session.user.id;
  
    const query = `SELECT "autorId" FROM projects WHERE id=${id}`;
    const result = await sequelize.query(query, { type: QueryTypes.SELECT });
  
    if (result.length > 0) {
      const autorId = result[0].autorId;
  
      if (user == autorId) {
        const deleteQuery = `DELETE FROM projects WHERE id=${id}`;
        await sequelize.query(deleteQuery, { type: QueryTypes.DELETE });
        console.log('Data berhasil dihapus');
        res.redirect('/home');
      } else {
        console.log('Anda tidak bisa menghapus proyek ini karena bukan proyek Anda');
        req.flash('danger', 'Anda tidak bisa menghapus proyek ini karena bukan proyek Anda');
        res.redirect('/home');
      }
    } else {
      console.log('Proyek tidak ditemukan');
      req.flash('danger', 'Proyek tidak ditemukan');
      res.redirect('/home');
    }
  }
  
 
  
    async function detailProjek(req, res) {
      const { id } = req.params;
      // const dataIndex = parseInt(id);
      const isLogin = req.session.isLogin
      const user = req.session.user
      const query = `SELECT projects.id, projects.title, projects.star_date, projects.end_date, projects.pesan, projects.node_js, projects.next_js, projects.react_js, projects.typescript, projects.image,
      users.id,users.name AS autor,projects."createdAt",projects."updatedAt" FROM projects LEFT JOIN users ON projects."autorId" = users.id WHERE projects.id=${id}`;
      const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

      // Apakah tidak ada proyek yang ditemukan dari hasil query
      if (!obj.length) {
        // Jika tidak ada proyek dengan ID yang ditemukan
        res.render('error');
      } else {
        // Jika proyek dengan ID yang diminta ditemukan
        res.render('detailProjek', { data: obj[0],isLogin,user });
      }
  
    }
  function error(req, res) {
    res.render('error')
  }
  function logout(req, res) {
    req.session.destroy((err) => {
      res.redirect('/home') // will always fire after session is destroyed
    })
  }
//   function durasihari(inputStart, inputEnd) {
//     const dataStart = new Date(inputStart);
//     const dataEnd= new Date(inputEnd);

//   // buat data satu haru
//   const oneDay = 24 * 60 * 60 * 1000;
//   //   mengembalikan nilai absolut dari suatu angka
//   const time = Math.abs(dataEnd - dataStart);
//   // console.log(time)
//   //   pembulatan keatas
//   const days = Math.round(time / oneDay);
//     const months = Math.floor(days / 30)
//     const years = Math.floor(months / 12)
    
//     if (years > 0) {
//         return `${years} tahun`;
//     } else if (months > 0) {
//         return `${months} bulan`;
//     } else if (days <= 30) {
//         return `${days} hari`;
//     } else {
//         return "Kurang dari 1 hari";
//     }
    
    
// }


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })