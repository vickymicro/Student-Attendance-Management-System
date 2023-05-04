import express from 'express';
import AdminModel from '../schema/admin.js';
import Admin from '../controller/admin.js'
import Staff from '../controller/staff.js';
import Student from '../controller/student.js';
import Report from '../controller/report.js';
import auth from '../auth/auth.js';
import authStaff from '../auth/auth2.js';
import Adminauth from '../auth/admin.js';
import Staffauth from '../auth/staff.js';

const router=express.Router();

router.post('/register/admin',Admin.Register);
router.post('/login/admin',Admin.Login);
router.get('/login/admin/authenticate',[auth,Adminauth],Admin.Authenticate);
router.post('/login/admin/getprofile',[auth,Adminauth],Admin.getProfile);

router.post('/admin/addemployee',[auth,Adminauth],Staff.Register);
router.post('/admin/addstudent',[auth,Adminauth],Student.Register);
router.post('/admin/adddepartment',[auth,Adminauth],Admin.Adddepartment);

router.get('/admin/employee',[auth,Adminauth],Staff.getAllstaff);
router.get('/admin/student',[auth,Adminauth],Student.getAllstudent);
router.get('/admin/department',[auth],Admin.getAlldepartment);

router.post('/admin/faculty/search',[auth,Adminauth],Admin.facultySearch);
router.post('/admin/student/search',[auth,Adminauth],Admin.studentSearch);
router.post('/admin/department/search',[auth,Adminauth],Admin.departmentSearch);

router.post('/admin/delete',[auth,Adminauth],Admin.Delete);
router.post('/admin/studentdelete',[auth,Adminauth],Admin.studentDelete);
router.post('/admin/departmentdelete',[auth,Adminauth],Admin.departmentDelete);

router.get('/admin/booastupapproval',[auth,Adminauth],Admin.getBooastupapproval);
router.put('/admin/addbooastup',[auth,Adminauth],Admin.addBooastup);
router.post('/admin/booastupapproval/delete',[auth,Adminauth],Admin.booastupapprovalDelete);




router.post('/login/staff',Staff.Login);
router.get('/login/staff/authenticate',[authStaff,Staffauth],Staff.Authenticate);
router.post('/login/staff/getprofile',[authStaff,Staffauth],Staff.getProfile);
router.post('/staff/getstudent',[auth],Staff.getStudent);
router.post('/staff/addattendance',[authStaff,Staffauth],Staff.addAttendance);
router.post('/staff/mlodstudent',[authStaff,Staffauth],Staff.mlodStudent);
router.put('/staff/updateattendance',[authStaff,Staffauth],Staff.updateAttendance);
router.post('/staff/booastupreport',[authStaff,Staffauth],Staff.BooastupReport);
router.post('/staff/booastuprequest',[authStaff,Staffauth],Staff.BooastupRequest);







router.post('/report/daily',[auth],Report.getReport);
router.post('/report/month',[auth],Report.getmonthReport);
router.post('/report/semester',[auth],Report.getsemesterReport);


export default router;