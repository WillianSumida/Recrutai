import * as React from 'react';
import { DataGrid } from  '@mui/x-data-grid';
import Stack from  '@mui/material/Stack';
import {Modal} from 'react-bootstrap';
import Button from '@mui/material/Button';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useEffect, useState } from 'react';

export default function Participants(props) {
  const [rows, setRows] = useState();

  useEffect(()=>{
    fetch("http://localhost:8080/listarProcessosRecrutador", {
          method: "POST",
          headers: {"content-Type": "application/json", 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6InJlY3J1dGFkb3IiLCJpYXQiOjE2NDkxMTEzMTQsImV4cCI6MTE4NzM2MDE0NjA4MDB9.JmIy-uYFEP9kxNHgphTTG4X-CHhXFPGQSdOIfcASM74'},
          body : JSON.stringify({id: sessionStorage.getItem('usuario'), vaga: props.vaga.id}),
        }).then(res=> {
        return res.json();
      }).then(data=>{
        if(!data.error){
          let row = [];
          var counter = 0;
          data.mensagem.map((candidatoVaga) => {

            function Compatibilidade(vagaTags, vagaNivel) {
              var tags = [candidatoVaga.tag1,candidatoVaga.tag2, candidatoVaga.tag3];
              var nivel = candidatoVaga.nivel;
              var percent = 0;
              vagaTags.forEach(element => {
                tags.forEach(el => {
                  if (element == el) percent += 1
                })
              });
          
              if (vagaNivel.toUpperCase() === nivel.toUpperCase() ) percent+=1
              
              var result = Math.round((percent/(vagaTags.length+1))*100)
              return result + '%';

            }

            row.push({id: counter ,nome: candidatoVaga.nome, localizacao: candidatoVaga.localizacao, dataNascimento: candidatoVaga.dataNascimento,
                          email: candidatoVaga.login, telefone: candidatoVaga.telefone, portfolio: candidatoVaga.portfolio,
                          instituicao: candidatoVaga.instituicao_ensino, nivel: candidatoVaga.nivel,
                          tag1: candidatoVaga.tag1, tag2: candidatoVaga.tag2, tag3: candidatoVaga.tag3,
                          porcentagem: Compatibilidade([props.vaga.tag1, props.vaga.tag2, props.vaga.tag3], props.vaga.nivel),
                          devolutiva: candidatoVaga.devolutiva,
                          idVerdadeiro: candidatoVaga.id
                        });
            
            counter++;
          });
          setRows(row);
        }
      })
  }, []);

  function iconColor(dado){
    if(dado == 1) return <FavoriteOutlinedIcon id="icon" color="error"></FavoriteOutlinedIcon>
    else return <FavoriteOutlinedIcon id="icon" color="disabled"></FavoriteOutlinedIcon>
  }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nome', headerName: 'Nome', width: 250 },
        { field: 'localizacao', headerName: 'Localização', width: 250 },
        { field: 'dataNascimento', headerName: 'Data de Nascimento', width: 200 },
        {
          field: 'email',
          headerName: 'Email',
          type: 'text',
          width: 200,
        },
        {
          field: 'telefone',
          headerName: 'Telefone',
          type: 'text',
          width: 150,
        },
        {
          field: 'portfolio',
          headerName: 'GitHub',
          type: 'text',
          width: 150,
        },
        {
          field: 'instituicao',
          headerName: 'Última Instituição',
          type: 'text',
          width: 400,
        },
        {
          field: 'nivel',
          headerName: 'Nível',
          type: 'text',
          width: 130,
        },
        {
          field: 'tag1',
          headerName: 'Habilidade 1',
          type: 'text',
          width: 150,
        },
        {
        field: 'tag2',
        headerName: 'Habilidade 2',
        type: 'text',
        width: 150,
        },
        {
        field: 'tag3',
        headerName: 'Habilidade 3',
        type: 'text',
        width: 150,
        },
        {
        field: 'porcentagem',
        headerName: 'Porcentagem',
        type: 'text',
        width: 135,
        },
        {
          field: "Interesse",
          headerName: "Interesse",
          sortable: false,
          renderCell: (params) => {
            const onClick = async (e) => {
              const retorno = await fetch("http://localhost:8080/trocarDevolutiva", {
                  method: "POST",
                  headers: {"content-Type": "application/json", 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6InJlY3J1dGFkb3IiLCJpYXQiOjE2NDkxMTEzMTQsImV4cCI6MTE4NzM2MDE0NjA4MDB9.JmIy-uYFEP9kxNHgphTTG4X-CHhXFPGQSdOIfcASM74'},
                  body : JSON.stringify({devolutiva: !params.row.devolutiva, id: sessionStorage.getItem('usuario'), vaga: props.vaga.id, candidato: params.row.idVerdadeiro}),
              })

              const resposta = await retorno.json();
              if(await resposta.error){ 
                alert("Erro! Tente novamente mais tarde");
                location.reload();
              }
              else{
                params.row.devolutiva = !params.row.devolutiva;
              }
            };
            return <Button onClick={onClick}>{iconColor(params.row.devolutiva)}</Button>;
          }
        },
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
                disableSelectionOnClick
                components={{
                  NoRowsOverlay: () => (
                    <Stack height="100%" alignItems="center" justifyContent="center">
                      Sem candidatos até o momento.
                    </Stack>
                  ),
                }}
                />
            </div>
        </Modal.Body>
        </>
    );

}