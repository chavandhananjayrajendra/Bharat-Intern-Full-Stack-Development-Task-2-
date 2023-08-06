import { Component } from "react";
import ProjectItem from "../ProjectItem";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

class App extends Component {
  state = {
    title: "",
    description: "",
    projectsList: [],
    displayErrMsg: false,
  };

  submitForm = (event) => {
    event.preventDefault();
    const { title, description } = this.state;
    if (title === "" || description === "") {
      this.setState({
        displayErrMsg: true,
      });
    } else {
      const userDetails = {
        id: uuidv4(),
        title,
        description,
      };
      this.setState((prevState) => ({
        projectsList: [...prevState.projectsList, userDetails],
        title: "",
        description: "",
        displayErrMsg: false,
      }));
    }
  };

  changeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  changeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  deleteProject = (id) => {
    const { projectsList } = this.state;
    const filterData = projectsList.filter((eachItem) => eachItem.id !== id);
    this.setState({
      projectsList: filterData,
    });
  };

  render() {
    const { title, description, projectsList, displayErrMsg } = this.state;
    // console.log(projectsList);
    return (
      <div className="app-container" align = "center">
        <nav className="nav-container">
          <h1 className="title"> Task-2:Project Management Tool</h1>
          <h2 className = "title">BHARAT INTERN </h2>
        </nav>
        <h1 className="create-task-heading">CREATE PROJECT</h1>
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="input-label-container">
            <label htmlFor="title" align = "center" text = "bold">TITLE</label>
            <center><input
              id="title"
              type="text"
              placeholder="PROJECT TITLE"
              onChange={this.changeTitle}
              value={title}
              align = "center"

            />
            </center>
          </div>
          <div className="input-label-container" >
            <label htmlFor="description" align = "center" text = "bold">DESCRIPTION</label>
            <center>
            <textarea
              id="description"
              type="text"
              placeholder="PROJECT DESCRIPTION"
              rows="6"
              onChange={this.changeDescription}
              value={description}
            />
            </center>
          </div>
          <button type="submit" className="save-btn">
            Save
          </button>
          {displayErrMsg && (
            <p className="error-msg">PLEASE WRITE SOMETHING</p>
          )}
        </form>
        <div className="projects-details-section">
          <h1 className="create-task-heading" align = "center">PROJECTS</h1>
          <ul className="projects-container" align = "center">
            {projectsList.map((eachProjectItem) => (
              <ProjectItem
                key={eachProjectItem.id}
                projectItemDetails={eachProjectItem}
                deleteProject={this.deleteProject}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default App;
