import { useState } from "react";
import ProjectsSidebar from "./Components/ProjectsSidebar.jsx";
import NoProjectSelected from "./Components/NoProjectSelected.jsx";
import NewProject from "./Components/NewProject.jsx";
import SelectedProject from "./Components/SelectedProject.jsx";



function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,                               // undefine means we are not adding any project
    projects: [],
    tasks: []
  });

function hanldeAddTask(text){
  setProjectState((prevState)=> {
    const taskId = Math.random();
    const newTask = {
   text: text,
   projectId: prevState.selectedProjectId,
   id: taskId,
    };

    return {
      ...prevState,
      
      tasks: [newTask, ...prevState.tasks]

    };
  });

}
function handledeleteTask(id){
  setProjectState((prevState) => {
    return {
      ...prevState,    
      tasks: prevState.tasks.filter((task) => task.id !== id),                         
    };
  });
}

  function handleSelecteProject(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,                                  // null means we're adding new project
      }
    })
  }

  function handleStartAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,                                  // null means we're adding new project
      }
    })
  }

  function handleCancelProject()
  {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,                                  // null means we're adding new project
      }
    })
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: Math.random()
      };
      
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]

      };
    });
  }

  function handleDeletePtoject(){
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,    
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId
        ),                         
      };
    });
  }




const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)
  let content= (
     <SelectedProject 
  project={selectedProject} 
  onDelete={handleDeletePtoject}
  onAddTask={hanldeAddTask}  
  onDeleteTask={handledeleteTask}
  tasks={projectState.tasks}
  />
  );

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject}  onCancel={handleCancelProject}/>
  }
  else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
      onStartAddProject={handleStartAddProject} 
      projects={projectState.projects} 
      onSelectProject={handleSelecteProject}
      selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
