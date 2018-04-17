const config=require("./db_config")
const mysql=require("mysql")
const moment = require('moment'); //数据库时间转js时间格式

//// promise
let connection=mysql.createPool(config.dev_db)

// 正常数据库操作
const query=(sql)=>{
  return new Promise((resolve,reject)=>{
    connection.getConnection((err,connect)=>{
      connect.query(sql,(sqlerr,rows,fields)=>{
        if(err){
          console.log(err) 
          reject(err)
          return
        }
        resolve(rows)
        connect.release()    //释放数据库链接
      })
    })
  })
}

// 读取操作
const readHandle=(sql)=>{
  return new Promise((resolve,reject)=>{
    query(sql).then((data)=>{
        // 转换时间；
        if(data[0].time!=undefined){
          data=data.map((i)=>{
            i.time=moment(i.time).format('YYYY-MM-DD HH:mm:ss')
            return i
          })
        }
        
         resolve(data)
      }).catch((err)=>{
        console.log(err)
        reject(err)
      })
  })
}
// 检索判断数据库是否有此值(有值为false)
const searchHandle=(sql)=>{
  return new Promise((resolve,reject)=>{
    query(sql).then((data)=>{
        // 转换时间；
        if(data.length>0){
          reject("有值")
        }else{
          resolve("无值")
        }
      }).catch((err)=>{
        console.log(err)
        reject(err)
      })
  })
}
// 检索判断数据库是否有此值(有值为true)
const searchHandleNormal=(sql)=>{
  return new Promise((resolve,reject)=>{
    query(sql).then((data)=>{
        // 转换时间；
        if(data.length>0){
         resolve("有值")
        }else{
          reject("无值")
        }
      }).catch((err)=>{
        console.log(err)
        reject(err)
      })
  })
}

// 其他数据库操作
const sqlHandle=(sql)=>{
  return new Promise((resolve,reject)=>{
    query(sql).then((data)=>{
        // 转换时间；
        if(data.affectedRows>0){
          resolve("ok")
        }else{
          reject("err")
        }
      }).catch((err)=>{
        console.log(err)
        reject(err)
      })
  })
}
module.exports={
  sqlHandle,
  readHandle,
  searchHandle,
  searchHandleNormal,
  query
}