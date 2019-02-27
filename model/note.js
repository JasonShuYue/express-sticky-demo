const Sequelize = require('sequelize');
var path = require('path');



const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    // SQLite only
    storage: path.join(__dirname, '../database/database.sqlite'),
});


const Note = sequelize.define('note', {
    content: {
        type: Sequelize.STRING
    },
});

// 测试数据库连接
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });


// 测试数据创建和获取
// Note.sync().then(function() {
//     Note.create({
//         content: 'hello world!'
//     })
// }).then(function() {
//     Note.findAll({raw: true}).then(function(notes) {
//         console.log(notes)
//     })
// });

// Note.findAll({
//     where: {id: 2},
//     raw: true
// }).then(function(note) {
//     console.log(note)
// })

module.exports = Note;


