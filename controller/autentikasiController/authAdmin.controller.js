const bcrypt = require("bcrypt");
const db = require('../../models');
const Admin = db.admin;
const Alumni = db.alumni;
const Formulir_Alumni = db.formulir_alumni;
const Pengajuan_Event = db.pengajuan_event;
const Artikel = db.artikel;
const PeriodeTracerStudy = db.periode_tracer_study;
require('dotenv').config();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { Sequelize } = require('../../models');
const { Op } = Sequelize;



const form = (req, res) => {
  if (req.session.user) {
  
    if (req.session.user.roleId === 1) {
      return res.redirect("/admin/dashboard");
    } else if (req.session.user.roleId === 2) {
      return res.redirect("/alumni/home");
    } else {
      return res.redirect("/home");
    }
  }

  res.render("admin/login", { title: "Login" });
};

const checklogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await Admin.findOne({ where: { email } });
    if (!foundUser) {
      req.flash('error', 'Username atau Password Invalid');
      res.render('admin/login', {  title: 'Login Error', messages: req.flash() });
    }
    else {
      const isValidPassword = await bcrypt.compare(password, foundUser.password);
      
      
      if (isValidPassword == true) {
          
          req.session.user = {
            id: foundUser.id,
            email: foundUser.email,
            roleId: foundUser.roleId,
          };

      if (foundUser.roleId === 1) {
        return res.redirect("/admin/dashboard");
        } else if (foundUser.roleId === 2) {
          return res.redirect("/alumni/home");
        } else {
          return res.redirect("/home");
        }
      }
      else {
        req.flash('error', 'Username atau Password Invalid');
        res.render('admin/login', { title: 'Login Error', messages: req.flash() });
      }
    }
  } catch (err) {
    console.error("Error during login: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

function logout(req, res) {
  
  req.session.destroy((err) => {
    if (err) {
      console.error('Error ketika logout:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    
    return res.redirect('/auth/login/admin');
  });
}


const getProfile = async (req, res, next, user) => {
  try {
    const { roleId, email, id } = user;

    if (roleId !== 1) {
      req.flash('Unauthorized', 'Pengguna Tidak Izinkan');
      return res.render('admin/profile', { title: 'Unauthorized', messages: req.flash() });
    }

    
    const foundUser = await Admin.findOne({ where: { email } });

    if (!foundUser) {
      req.flash('error', 'Username atau Password Invalid');
      return res.render('alumni/profile', { title: 'Unauthorized', messages: req.flash() });
    }

    const filepath = foundUser.gambar;

    
    return res.render('admin/profile', {
      userID: id,
      path: filepath,
      admin: foundUser,
      user: foundUser,
      title: 'Profile',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

  

  const changePassword = async (req, res, next) => {
    const { email } = req.session.user;
    const {oldpassword, newpassword } = req.body;
    
    try {

      const user = await Admin.findOne({ where: { email } });
  

      if (!user) {
      req.flash('notfound', 'Username tidak ditemukan');
      return res.render('admin/profile', {  title: 'Unauthorized', messages: req.flash() });
      }
  
    
      
      const isMatch = await bcrypt.compare(oldpassword, user.password);
  
        if (!isMatch) {
        req.flash('error', 'Username atau Password Invalid');
        return res.render('admin/profile', {  title: 'Unauthorized', messages: req.flash() });
        }
    
        
  
        await user.update({ password: await bcrypt.hash(newpassword, 10), });
        next();
      
    } catch (error) {
      console.error("Error changing password:", error);
      return res.status(500).send("Internal server error");
    }
  };

const renderDashboard = async (req, res) => {
  const menuItems = [
    
    {
      icon: '<svg class="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      title: "Alumni",
      href: "/admin/lihat/alumni",
      subItems: []
    },
    {
      icon: '<svg class="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      title: "Tracer Study",
      href: "#",
      subItems: [
        { title: "Formulir Alumni", href: "/admin/form" },
        { title: "Periode Tracer Study", href: "/admin/tracerstudy" }
      ]
    },
    {
      icon: '<svg class="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
      title: "Lowongan",
      href: "#",
      subItems: [
        { title: "Input Lowongan", href: "/admin/lowongan/tambah" },
        { title: "Lihat Lowongan", href: "/admin/lowongan" }
      ]
    },
    {
      icon: '<svg class="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M216,44H40A12.01312,12.01312,0,0,0,28,56V200a12.01312,12.01312,0,0,0,12,12H216a12.01312,12.01312,0,0,0,12-12V56A12.01312,12.01312,0,0,0,216,44Zm4,156a4.004,4.004,0,0,1-4,4H40a4.004,4.004,0,0,1-4-4V56a4.004,4.004,0,0,1,4-4H216a4.004,4.004,0,0,1,4,4ZM184,96a4.0002,4.0002,0,0,1-4,4H76a4,4,0,0,1,0-8H180A4.0002,4.0002,0,0,1,184,96Zm0,32a4.0002,4.0002,0,0,1-4,4H76a4,4,0,0,1,0-8H180A4.0002,4.0002,0,0,1,184,128Zm0,32a4.0002,4.0002,0,0,1-4,4H76a4,4,0,0,1,0-8H180A4.0002,4.0002,0,0,1,184,160Z"/></svg>',
      title: "Artikel",
      href: "#",
      subItems: [
        { title: "Manajemen Artikel", href: "/admin/artikel" },
        { title: "Input Artikel", href: "/admin/artikel/tambah" }
      ]
    },
    {
      icon: '<svg class="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>',
      title: "Pengajuan Event",
      href: "/admin/event",
      subItems: []
    },
    {
      icon: '<svg class="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
      title: "Laporan",
      href: "#",
      subItems: [
        { title: "Laporan Website", href: "/admin/report/website" },
        { title: "Laporan Tracer Study", href: "/admin/report/tracerstudy" },
        { title: "Laporan Sebaran Alumni", href: "/admin/report/sebaranalumni" }
      ]
    }
  ];

  const counts = await Promise.all([
    Alumni.count(),
    Formulir_Alumni.count(),
    Pengajuan_Event.count(),
    Artikel.count()
  ]);

  const adminEmail = req.session.user.email
  const adminInstance = await Admin.findOne({ where: { email: adminEmail } });
  res.render('admin/dashboard', {
    alumni: counts[0],
    formulir_alumni: counts[1],
    pengajuan_event: counts[2],
    artikel: counts[3],
    admin: adminInstance,
    menuItems 
  });
}



module.exports = {
  form,
  checklogin,
  logout,
  getProfile,
  changePassword,
  renderDashboard,
};
