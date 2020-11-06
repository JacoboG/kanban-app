import React from 'react';
import PropTypes from 'prop-types';
export default (state, actions) => {
    if (typeof state === 'function' ||
        (typeof state === 'object' && Object.keys(state).length)) {
        return target => connect(state, actions, target);
    }
    return target => props => (
        <target {...Object.assign({}, props, actions)} />
    );
}

// Conectar con Alt a través del contexto. Esto no ha sido optimizado
// para nada. Si Alt almacena los cambios se forzará el renderizado.
//
// Ver *AltContainer* y *connect-alt* para encontrar soluciones óptimas

function connect(state = () => { }, actions = {}, target) {
    class Connect extends React.Component {
        componentDidMount() {
            const { flux } = this.context;
            flux.FinalStore.listen(this.handleChange);
        }

        componentWillUnmount() {
            const { flux } = this.context;
            flux.FinalStore.unlisten(this.handleChange);
        }

        render() {
            const { flux } = this.context;
            const stores = flux.stores;
            const composedStores = composeStores(stores);
            return React.createElement(target,
                {
                    ...Object.assign(
                        {}, this.props, state(composedStores), actions
                    )
                }
            );
        }

        handleChange = () => {
            this.forceUpdate();
        }
    }
    Connect.contextTypes = {
        flux: PropTypes.object.isRequired
    }
    return Connect;
}

// Convierte {store: <AltStore>} en {store: store.getState()} 
function composeStores(stores) {
    let ret = {};
    Object.keys(stores).forEach(key => {
        const store = stores[key];
        // COnbina el estado del almacén
        ret = Object.assign({}, ret, store.getState());
    });
    return ret;
} 