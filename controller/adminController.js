const mongoose = require('mongoose');
const admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.createAdmin = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if (req.body === null)
            return res.status(400).json({error: "Input all fields"})
       
        const existingMail = await admin.findOne({email});
        if (existingMail)
            return res.status(400).json({error: "Email already exists"})

        const passwordHash = await bcrypt.hash(password, 12)

        const newAdmin = await admin.create({
            name,
            email,
            password: passwordHash
        })
            res.status(200).json({message: `${newAdmin.name} Created`})

    } catch (err) {
        res.status(500).json({message: `unable to create`})
        console.log(console.error());
    }

};

//login
exports.loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (req.body === null)
            return res.status(400).json({error: "Input all fields"})

        const adminUser = await admin.findOne({email});
        if (!adminUser)
            return res.status(400).json({error: "Invalid Credentials"})

        const isMatch = await bcrypt.compare(password, adminUser.password);
        if (!isMatch)
            return res.status(400).json({error: "Invalid Credentials"})

     //generate token   
        const token = jwt.sign({
        id: adminUser._id,
        role: adminUser.role
        },
        process.env.JWT_SECRET, 
        {expiresIn: '10h'});

        res.status(200).json({message: "Login successful", 
        token,
        admin: {
        id: adminUser._id,
        name: adminUser.name,
        role: adminUser.role
        }
        });

    } catch (err) {
        res.status(500).json({message: `unable to login`})
        console.log(console.error());
    }
};

module.exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await admin.find();  
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({message: `unable to fetch admins`})
        console.log(console.error());
    }   
};

module.exports.getAdminById = async (req, res) => {
    try {
        const {id} = req.params;
        const adminUser = await admin.findById(id);
        if (!adminUser)
            return res.status(404).json({error: "Admin not found"})
        res.status(200).json(adminUser);
    } catch (err) {
        res.status(500).json({message: `unable to fetch admin`})
        console.log(console.error());
    }
};

module.exports.deleteAdmin = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedAdmin = await admin.findByIdAndDelete(id);
        if (!deletedAdmin)
            return res.status(404).json({error: "Admin not found"})
        res.status(200).json({message: `${deletedAdmin.name} deleted`});
    } catch (err) {
        res.status(500).json({message: `unable to delete admin`})
        console.log(console.error());
    }
};

module.exports.updateAdmin = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, password, role} = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (typeof role !== 'undefined') updateData.role = role;
        if (password) updateData.password = await bcrypt.hash(password, 12);

        const updatedAdmin = await admin.findByIdAndUpdate(id, updateData, {new: true, runValidators: true});
        if (!updatedAdmin)
            return res.status(404).json({error: "Admin not found"});

        res.status(200).json({message: `${updatedAdmin.name} updated`, admin: updatedAdmin});
    } catch (err) {
        res.status(500).json({message: `unable to update admin`});
        console.log(err);
    }
};



    
