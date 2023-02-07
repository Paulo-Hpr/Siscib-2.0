const connection = require('./connection')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET

const getAllUserRanking = async () => {
  const querry = 'SELECT COUNT(t.userId) as total, u.firtname as nome FROM tagsAndDprs t INNER JOIN user u ON t.userId = u.userId GROUP BY t.userId ORDER BY total DESC'
  const [ranking] = await connection.execute(querry)
  return ranking
}


const insertTag = async (tag) => {
  const { ciaId, dprs, liderId, numberTag, userId, vooId } = tag;

  const dateUTC = new Date(Date.now()).toLocaleString();

  const query = 'INSERT INTO tagsAndDprs(numberTag,dprs,ciaId,userId,vooId,liderId,creat_at ) VALUES (?, ?, ?, ?, ?, ?, ?)';

  const [createdTag] = await connection.execute(query, [numberTag, dprs, ciaId, userId, vooId, liderId, dateUTC]);
  return { insertId: createdTag };
};

const deleteTag = async (numberTag, voo) => {
  const data = new Date(Date.now()).toLocaleDateString();
  const removedTag = await connection.execute('DELETE FROM tagsAndDprs WHERE numberTag = ? AND vooId = ? AND creat_at LIKE ?', [numberTag, voo, `${data}%`]);
  return { responseTag: removedTag };
}


const getAllCias = async () => {
  const [cias] = await connection.execute('SELECT * FROM ciaAerea')
  return cias;
}


const getAllUserLider = async () => {
  const [users] = await connection.execute('SELECT userId,firtname,matricula FROM user WHERE cargo = "lider"')
  return users;
}

const getAllVoos = async (idd) => {
  const { id } = idd;
  const query = 'SELECT * FROM voo WHERE ciaId = ? ';
  const [voos] = await connection.execute(query, [id]);
  return voos;
}
const getAllTagsFilter = async (idd) => {
  const { ciaId, vooId, dateNow } = idd;
  const query = 'SELECT ciaId,dprs,liderId,numberTag,userId,vooId FROM tagsAndDprs WHERE ciaId = ? AND vooId = ? AND creat_at LIKE ?';
  const [tagsAndDprs] = await connection.execute(query, [ciaId, vooId, `${dateNow}%`]);
  return tagsAndDprs;
}

const getTagSearch = async (tagInf) =>{
  const {vooId,numberTag} = tagInf
  let querry;
  let tag;
  if (vooId == 0 )  { 
     querry= 'SELECT t.numberTag,t.dprs,ul.firtname as lider,t.creat_at, u.firtname as nome,v.numvoo,v.origem,v.destino,c.name as cia FROM tagsAndDprs t INNER JOIN user u ON u.userId = t.userId INNER JOIN user ul ON t.liderId = ul.userId INNER JOIN voo v ON v.vooId = t.vooId INNER JOIN ciaAerea c ON c.ciaId = t.ciaId WHERE numberTag LIKE ?'
    tag = await connection.execute(querry,[`${numberTag}%`]);

  } else{
   querry= 'SELECT t.numberTag,t.dprs,ul.firtname as lider,t.creat_at, u.firtname as nome,v.numvoo,v.origem,v.destino,c.name as cia FROM tagsAndDprs t INNER JOIN user u ON u.userId = t.userId INNER JOIN user ul ON t.liderId = ul.userId INNER JOIN voo v ON v.vooId = t.vooId INNER JOIN ciaAerea c ON c.ciaId = t.ciaId WHERE numberTag LIKE ? AND t.vooId = ?'
  tag= await connection.execute(querry,[`${numberTag}%`,vooId]);
  }
  return tag[0]
}

const authentication = async (body) => {
  const { user, password } = body;
  let token;
  const query = 'SELECT userId,firtname,matricula FROM user WHERE name = ? AND password = ?';

  const [loginUser] = await connection.execute(query, [user, password]);

  if (loginUser.length > 0) {
    loginUser.forEach((el) => {
      token = jwt.sign({ userID: el.matricula }, secret, { expiresIn: 3600 })
    })

    return { user: loginUser, auth: true, token }
  } else {

    return { auth: false }
  }

};

module.exports = {
  getAllUserRanking,
  getAllCias,
  getAllUserLider,
  getAllVoos,
  insertTag,
  deleteTag,
  getTagSearch,
  getAllTagsFilter,
  authentication
}
