import { createStore } from 'redux';

const INITIAL_STATE = {
    vagaRecrutador: [],
    user: []
};

function redux(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'AddVagaRecrutador':
            return { ...state.vagaRecrutador, vagaRecrutador: [...state.vagaRecrutador, action.vaga] };
        case 'UpdateVagaRecrutador':
            const ind = (state.vagaRecrutador.findIndex(vaga => vaga.id == action.vaga.id));

            const newArray = [...state.vagaRecrutador]; //copiar array
            console.log(newArray)
            newArray[ind] = action.vaga;//mudar valor no novo array
            return {
                ...state.vagaRecrutador,
                vagaRecrutador: newArray
            };
        case 'DeleteVagaRecrutador':
            const vagas = state.vagaRecrutador.filter(vaga => vaga.id !== action.vaga.id)
            console.log(vagas)
            return {
                ...state.vagaRecrutador,
                vagaRecrutador: vagas
            };
        case 'AddAutenticado':
            return { ...state.user, user: [action.user] };
        case 'Deslogar':
            return {...state, vagaRecrutador: [], user:[]};
        default:
            return state;
    }
}

const store = createStore(redux);

export default store;