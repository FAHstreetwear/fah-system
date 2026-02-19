require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// LOGIN ADMIN
app.post('/api/login', (req,res)=>{

  const {email,password}=req.body;

  db.get(
    "SELECT * FROM admins WHERE email=?",
    [email],
    async (err,user)=>{

      if(!user) return res.status(401).json({error:"No user"});

      const ok = await bcrypt.compare(password,user.password);

      if(!ok) return res.status(401).json({error:"Wrong pass"});

      const token = jwt.sign(
        {id:user.id},
        process.env.JWT_SECRET,
        {expiresIn:'2h'}
      );

      res.json({token});
    }
  );
});

// AUTH MIDDLEWARE
function auth(req,res,next){

  const token=req.headers.authorization;

  if(!token) return res.sendStatus(403);

  try{
    jwt.verify(token,process.env.JWT_SECRET);
    next();
  }catch{
    res.sendStatus(403);
  }
}

// UPDATE COUNTDOWN
app.post('/api/drop',auth,(req,res)=>{

  db.run(
    "UPDATE settings SET value=? WHERE key='drop'",
    [req.body.date],
    ()=>res.json({ok:true})
  );

});

// ADD PRODUCT
app.post('/api/product',auth,(req,res)=>{

  const {name,price,img}=req.body;

  db.run(
    "INSERT INTO products VALUES(NULL,?,?,?)",
    [name,price,img],
    ()=>res.json({ok:true})
  );
});

app.listen(process.env.PORT||3000);
