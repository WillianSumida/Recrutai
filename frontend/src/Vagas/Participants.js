import * as React from 'react';
import { DataGrid } from  '@mui/x-data-grid';
import {Modal} from 'react-bootstrap';

export default function Participants(props) {

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Nome', headerName: 'Nome', width: 150 },
        { field: 'Cidade', headerName: 'Cidade', width: 150 },
        { field: 'Estado', headerName: 'Estado', width: 70 },
        {
        field: 'Nivel',
        headerName: 'Nível',
        type: 'text',
        width: 130,
        },
        {
          field: 'Tag1',
          headerName: 'Tag1',
          type: 'text',
          width: 130,
        },
        {
        field: 'Tag2',
        headerName: 'Tag2',
        type: 'text',
        width: 130,
        },
        {
        field: 'Tag3',
        headerName: 'Tag3',
        type: 'text',
        width: 130,
        },
        {
        field: 'Porcentagem',
        headerName: 'Porcentagem',
        type: 'number',
        width: 135,
        valueFormatter: (params) => {
            if (params.value == null) {
              return '';
            }

            const valueFormatted = Number(params.value * 100).toLocaleString();
            return `${valueFormatted}%`;
          },
        },
      ];
      
      const rows = [
        { id: 1, Nome: "Alex Silva", Cidade: 'São Paulo', Estado: 'SP', Nivel: "Pleno" ,Tag1: "C#", Tag2: "JavaScript", Tag3: "Node", Porcentagem: 0.87 },
        { id: 10,Nome: "Daniel Breno", Cidade: 'São Carlos', Estado: 'AM', Nivel: "Senior" ,Tag1: "PHP", Tag2: "CSS", Tag3: "Oracle" , Porcentagem: 0.24},
        { id: 11,Nome: "Henrique Mario", Cidade: 'São José', Estado: 'SP', Nivel: "Junior" ,Tag1: "C#", Tag2: "React", Tag3: "Node" , Porcentagem: 0.94 },
        { id: 12,Nome: "Marcelo Mauro", Cidade: 'São Carlos', Estado: 'BA', Nivel: "Junior" ,Tag1: "PHP", Tag2: "Angular", Tag3: "MySQL" , Porcentagem: 0.22 },
        { id: 13,Nome: "Larissa Manuela", Cidade: 'São Bernardo', Estado: 'SP', Nivel: "Pleno" ,Tag1: "C++", Tag2: "HTML", Tag3: "Node" , Porcentagem: 0.44 },
        { id: 14,Nome: "Fabio Porchat", Cidade: 'São Carlos', Estado: 'SP', Nivel: "Estagiario" ,Tag1: "C", Tag2: "JavaWeb", Tag3: "MySQL" , Porcentagem: 0.20 },
        { id: 15, Nome: "Zuleide do Carmo", Cidade: 'São Roque', Estado: 'PE', Nivel: "Pleno" ,Tag1: "C++", Tag2: "Python", Tag3: "Oracle" , Porcentagem: 0.12 },
        { id: 16, Nome: "Nelson Perereira", Cidade: 'São Carlos', Estado: 'SP', Nivel: "Senior" ,Tag1: "Ruby", Tag2: "JavaScript", Tag3: "Node" , Porcentagem: 0.98 },
        { id: 17, Nome: "Sonia Paula", Cidade: 'São Paulo', Estado: 'SP', Nivel: "Estagiario" ,Tag1: "Java", Tag2: "JavaScript", Tag3: "Oracle" , Porcentagem: 0.14 },
      ];

    return (  
        <>
        <Modal.Header closeButton>
          <Modal.Title>Candidatos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableColumnFilter
                disableColumnSelector
                disableColumnMenu
                />
            </div>
        </Modal.Body>
        </>
    );

}