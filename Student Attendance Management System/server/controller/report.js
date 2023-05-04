import AttendanceModel from "../schema/attendance.js";
import BooastupModel from "../schema/schema.js";

const getReport=async(req, res)=>{
    let department=req.body.department;
    let batch =req.body.batch;
    let section=req.body.section;
    let date=req.body.date;
   

    try {
     let result=await AttendanceModel.find({department:department,batch:batch,section:section,date:date});
     console.log("2"+result);
     if(!result[0]){
       return res.status(200).json({message:"Dosn't exist Attendance"})
     }
     res.status(200).json({data:result,message:"Report Fetch Successfully"})
    } catch (error) {
     res.status(400).send(error.message)
    }
}

const getmonthReport=async(req, res)=>{
    let department=req.body.department;
    let batch =req.body.batch;
    let section=req.body.section;
    let mon=new Date(req.body.month);
    let month=mon.getMonth()+1;
console.log(month);
    
    try {
     let result=await AttendanceModel.find({department:department,batch:batch,section:section,month:month});
     let attendance=[];
     let monthlyreport =[];
     let monthlypercentage=[];
     console.log(result);
     console.log(result.length);
     result.map((item,index)=>{
        console.log(item.attendance);
        item.attendance.map((value,i)=>{
            attendance.push(value);
        });
        console.log(attendance);
     })
     attendance.map((item,index)=>{
            let value= monthlyreport.find(value=> item == value.regno);
            if(value == undefined){
                let report={
                    "regno":item,"count":1
                }
                monthlyreport.push(report)
            }
            else{
                value.count++;
            }  
     })
     console.log(monthlyreport);
     monthlyreport.map((item,index)=>{
         if(item){
          let percentage =Math.round((item.count*100)/result.length);
          console.log(percentage);
          let report={
            "regno":item.regno,"count":item.count,"percentage":percentage,
            "department":result[0].department,
            "section":result[0].section,"batch":result[0].batch,
            "semester":result[0].semester,"month":req.body.month
        }
          monthlypercentage.push(report)
        }
     })
     console.log(monthlypercentage);
     if(!monthlypercentage[0]){
        return res.status(200).json({message:"Dosn't exist Attendance"})
      }
     res.status(200).json({data:monthlypercentage,message:"Report Fetch Successfully"})
    } catch (error) {
     res.status(400).send(error.message)
    }
}

const getsemesterReport=async(req, res)=>{
    let department=req.body.department;
    let batch =req.body.batch;
    let section=req.body.section;
    let semester=req.body.semester;
    
    try {
     let result=await AttendanceModel.find({department:department,batch:batch,section:section,semester:semester});
     let attendance=[];
     let semesterreport =[];
     let semesterpercentage=[];
     console.log(result);
     result.map((item,index)=>{
        console.log(item.attendance);
        item.attendance.map((value,i)=>{
            attendance.push(value);
        });
        console.log(attendance);
     })
     attendance.map((item,index)=>{
        let value= semesterreport.find(value=> item == value.regno);
        if(value == undefined){
            let report={
                "regno":item,"count":1
            }
            semesterreport.push(report)
        }
        else{
            value.count++;
        }
        
 })
 console.log(semesterreport);
 semesterreport.map((item,index)=>{
    if(item){
     let percentage =Math.round((item.count*100)/result.length);
     console.log(percentage);
     let report={
       "regno":item.regno,"presentdays":item.count,"percentage":percentage,
       "department":result[0].department,
       "section":result[0].section,"batch":result[0].batch,
       "semester":result[0].semester,"workingdays":result.length
   }
     semesterpercentage.push(report)
   }
})      
 console.log(semesterpercentage);
        
 if(!semesterpercentage[0]){
    return res.status(200).json({message:"Dosn't exist Attendance"})
  }

  
    semesterpercentage.map(async(item,index)=>{
        const exist_data = await BooastupModel.findOne({ regno: item.regno })
        if (exist_data) {
            return ;
        
        }
  const data = await BooastupModel.insertMany({
     regno:item.regno,
     presentdays:item.presentdays,
     workingdays:item.workingdays,
     percentage:item.percentage,
     department:item.department,
     section:item.section,
     batch:item.batch,
     semester:item.semester

})
console.log(data);

})
let report=await BooastupModel.find({department:department,batch:batch,section:section,semester:semester});
console.log("report"+report);
  res.status(200).json({data:report,message:"Report Fetch Successfully"})
    } catch (error) {
     res.status(400).send(error.message)
    }
}

export default {getReport,getmonthReport,getsemesterReport};