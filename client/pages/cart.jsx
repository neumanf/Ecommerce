import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import cartStore from "stores/cartStore";

function Cart() {
    const [quantities, setQuantities] = useState({});
    const [total, setTotal] = useState(0);

    function handleChange(e, price) {
        setQuantities({
            ...quantities,
            [e.target.name]: { price, quantity: e.target.value },
        });
    }

    // Inicializa quantities com o conteúdo do carrinho ao carregar a página
    useEffect(() => {
        let newQuantities = {};

        cartStore.cart.forEach((product) => {
            newQuantities = {
                ...newQuantities,
                [product._id]: { price: product.price, quantity: "1" },
            };
        });

        setQuantities(newQuantities);
    }, []);

    // Calcula um novo total ao modificar a quantidade de um produto
    useEffect(() => {
        let newTotal = 0;

        for (const [id, info] of Object.entries(quantities)) {
            newTotal += info.price * Number(info.quantity);
        }

        setTotal(newTotal);
    }, [quantities]);

    return (
        <div className="container py-10">
            <h1 className="text-2xl font-bold">Carrinho</h1>

            <div className="principal">
                <div className="lista-produtos">
                    {Object.entries(cartStore.cart).length !== 0 ? (
                        cartStore.cart.map((product) => (
                            <div key={product._id} className="produto">
                                <div className="imagem-produto">
                                    <img src={product.image_url} alt="produto selecionado" />
                                </div>
                                <div className="descricao-produto">
                                    <h4 className="produto-titulo text-purpled">{product.title}</h4>
                                    <p className="produto-preco text-purpled">
                                        <span className="text-gray-400 mr-2 font-medium">Preço</span>
                                        R$ {product.price}
                                    </p>
                                </div>
                                <div className="quantidade">
                                    <div className="quantidade-text">Quantidade</div>
                                    <div className="quantidade-box">
                                        <input
                                            type="number"
                                            name={product._id}
                                            className="w-32 rounded outline-none text-center text-purpled"
                                            defaultValue="1"
                                            min="1"
                                            onChange={(e) => handleChange(e, product.price)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p>Seu carrinho está vazio.</p>
                        </div>
                    )}
                </div>

                <div className="compras-dados">
                    <div className="cep">
                        <div className="text-cep">CEP</div>
                        <input className="cep-input" placeholder="00000-000" type="text" />
                    </div>
                    <div className="total">
                        <div className="text-total">Total</div>
                        <div className="valor-total">R$ {total}</div>
                    </div>
                    <div className="finalizar">
                        <button type="button" className="button-finalizar" onClick={() => toast.success("Compra finalizada")}>
                            {" "}
                            Finalizar Compra{" "}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default observer(Cart);
