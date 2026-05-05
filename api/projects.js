// api/projects.js — Returns projects by branch
const projectData = {
  cs: {
    label: "Computer Science",
    projects: [
      { id: 1, name: "AI Chatbot with NLP", difficulty: "Hard", tech: ["Python", "TensorFlow", "Flask"] },
      { id: 2, name: "E-Commerce Platform", difficulty: "Medium", tech: ["React", "Node.js", "MongoDB"] },
      { id: 3, name: "Student Management System", difficulty: "Easy", tech: ["PHP", "MySQL"] },
      { id: 4, name: "Face Recognition Attendance", difficulty: "Hard", tech: ["Python", "OpenCV", "ML"] },
      { id: 5, name: "Online Voting System", difficulty: "Medium", tech: ["React", "Node.js", "PostgreSQL"] },
    ]
  },
  mech: {
    label: "Mechanical",
    projects: [
      { id: 1, name: "Robotic Arm with 6DOF", difficulty: "Hard", tech: ["SolidWorks", "Arduino", "C++"] },
      { id: 2, name: "Automated Gear Mechanism", difficulty: "Medium", tech: ["AutoCAD", "MATLAB"] },
      { id: 3, name: "Heat Exchanger Design", difficulty: "Medium", tech: ["ANSYS", "Fusion 360"] },
      { id: 4, name: "Solar Powered Vehicle", difficulty: "Hard", tech: ["CAD", "3D Printing"] },
      { id: 5, name: "Pneumatic Conveyor System", difficulty: "Easy", tech: ["AutoCAD", "SolidWorks"] },
    ]
  },
  civil: {
    label: "Civil",
    projects: [
      { id: 1, name: "Smart Bridge Monitoring", difficulty: "Hard", tech: ["IoT", "AutoCAD", "Sensors"] },
      { id: 2, name: "Earthquake Resistant Structure", difficulty: "Medium", tech: ["STAAD Pro", "AutoCAD"] },
      { id: 3, name: "Rainwater Harvesting System", difficulty: "Easy", tech: ["AutoCAD", "Design"] },
      { id: 4, name: "Green Building Design", difficulty: "Medium", tech: ["Revit", "AutoCAD"] },
      { id: 5, name: "Water Quality Monitoring", difficulty: "Hard", tech: ["IoT", "Arduino"] },
    ]
  },
};

export default async function handler(req, res) {
  const { branch } = req.query;

  if (branch && projectData[branch]) {
    return res.status(200).json({ success: true, data: projectData[branch] });
  }

  return res.status(200).json({ success: true, data: projectData });
}
