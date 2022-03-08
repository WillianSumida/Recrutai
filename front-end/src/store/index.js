import {createStore} from 'redux';

const INITIAL_STATE = {
    tipo_tela: true //if true login false cadastro
};

function redux(state = INITIAL_STATE, action){
    switch (action.type){
        case 'MUDAR_TELA':
            return {...state, tipo_tela: !state.tipo_tela};
        default :
            return state;
    }
}

const store = createStore(redux);

export default store;