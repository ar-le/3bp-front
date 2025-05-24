import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { TeamsApi } from "../../features/teams/teamsApi";
import {  ITeam } from "../../types/GeneralTypes";

function TeamsPanel() {
  const [teams, setTeams] = useState<ITeam[]>([]);


  useEffect(() => {
    TeamsApi.getAll().then(response => {
      setTeams(response.data.data);
   
    });
  });

 

  return (
    <div className="full-width">
      <div className="d-flex m-4">
        <h2>Teams</h2>
      
      </div>
      <Table striped bordered hover className="m-4" responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Password</th>
            <th>Options</th>
        
          </tr>
        </thead>
        <tbody>
          {teams.map(team=> (
            <tr key={team.id} className="div-bg-dark">
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{team.password}</td>
             
              <td>
                <Link to={`update/${team.id}`}>
                  <Button>Edit</Button>
                </Link>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    
   
    </div>
  );
}

export default TeamsPanel;
