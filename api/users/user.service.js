const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');
var flash = require('connect-flash');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user._id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}


  

// async function authenticate({username, req, res, next }) {
//     const user = await User.findOne({ username });
//     if (user!=null) {
//         user = user.toJSON();
//         if(!bcrypt.compareSync(req.body.hash, user.hash)){						
//             res.status(200).send({ message: "password wrong" });
//         } else {					
//             if (req.body.username == user.username) {						
//                 req.session.user=user;    
//                 var token = jwt.sign({sub: user._id }, config.secret, { expiresIn: 18000 });
//                 req.session.token=token;
//             }else{							
//                 res.status(200).send({ message: "No user found" });						
//             }
//         } 	
//         // const { hash, ...userWithoutHash } = user.toObject();
//         // const token = jwt.sign({ sub: user._id }, config.secret);
//         // return {
//         //     ...userWithoutHash,
//         //     token
//         }else{				
//             res.status(200).send({ message: "No user found" });
//     }
// }



async function getAll() {

    // var token=req.headers['token'];    
    // jwt.verify(token, SECRET, function(err, decoded) {
    //     if (err) {
    //       res.json('Invalid Token');
    //     }else{
            return await User.find().select('-hash');
    //     }
    // });
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}




async function _delete(id) {
    await User.findByIdAndRemove(id);
}

