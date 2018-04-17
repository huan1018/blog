var express = require('express');
var router = express.Router();
var {
  sqlHandle,  //除查询外的其他操作
  readHandle,  //读取操作
  searchHandle,  //检测有无某条数据，有为false
  searchHandleNormal,  //检测有无某条数据，有为true
  query             // //基本操作
}=require("../../config/db_connect")


/* GET home page. */
router.get('/', function(req, res, next) {
  var sql=`select * from blogtest`
  readHandle(sql).then((data)=>{
    res.send(data)
  })
  
});
router.post('/every', function(req, res, next) {
  let arg=req.body.id
  console.log(arg)
  if(arg!=undefined){
    var sql=`select * from blogtest where id='${arg}'`
    readHandle(sql).then((data)=>{
      res.send(data)
    })
  }else{
    res.send("参数未正确传入")
  }
 
  
});
module.exports = router;
