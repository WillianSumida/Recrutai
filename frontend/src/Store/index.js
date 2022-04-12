import {createStore} from 'redux';

const INITIAL_STATE = {
    vagaRecrutador : [],
};

function redux(state = INITIAL_STATE, action){
    switch (action.type){
        case 'AddVagaRecrutador':
            return {...state, vagaRecrutador:[...state.vagaRecrutador, action.vaga]};
        case 'UpdateVagaRecrutador':

            const ind = ( state.vagaRecrutador.findIndex(vaga => vaga.id == action.vaga.id))

            state.vagaRecrutador[ind] = action.vaga;
            /* state.vagaRecrutador.forEach((vagaObjeto) => {
                if(vagaObjeto.id == action.vaga.id){
                    console.log(action.vaga);
                    vagaObjeto.id = action.id;
                    vagaObjeto.cargo = action.cargo;
                    vagaObjeto.descricao = action.id;
                    vagaObjeto.salario = action.salario;
                    vagaObjeto.tipo = action.tipo;
                    vagaObjeto.tag1 = action.tag1;
                    vagaObjeto.tag2 = action.tag2;
                    vagaObjeto.tag3 = action.tag3;
                    vagaObjeto.cidade = action.cidade;
                    vagaObjeto.estado = action.estado;
                    vagaObjeto.ativo = action.ativo;
                    vagaObjeto.quantidade = action.quantidade;
                    console.log(vagaObjeto.cargo);
                }}
            ); */

            /* state.vagaRecrutador.map((vagaObjeto) => console.log(vagaObjeto)); */
            return {...state};
           
        default :
            return state;
    }
}

const store = createStore(redux);

export default store;