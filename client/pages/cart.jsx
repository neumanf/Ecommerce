import { observer } from "mobx-react";
import {CartStore} from "stores/cartStore"


function Cart() {
    return (
        

        <div className="container">
            <h1>Carrinho</h1>

            <div className="principal">
                <div className="lista-produtos">
                    <div className="produto">
                        <div className="imagem-produto"><img src="" alt="" srcset="" /></div>
                        <div className="descricao-produto">
                            <h4 id="produto-titulo">Titulo</h4>
                            <p id="produto-preco">R$</p>
                        </div>
                        <div className="quantidade">
                            <div className="quantidade-text">Quantidade</div>
                            <div className="quantidade-box">
                                <p>00</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="compras-dados">
                    <div className="cep">
                        <div className="text-cep">CEP</div>
                        <input className="cep-input" type="text" />
                    </div>
                    <div className="total">
                        <div className="text-total">Total</div>
                        <div className="valor-total">R$ 0.0</div>
                    </div>
                    <div className="finalizar">
                        <button type="button" className="button-finalizar"> Finalizar Compras </button>
                    </div>
                </div>
            </div>



        </div>

        
    );
}

export default observer(Cart);
