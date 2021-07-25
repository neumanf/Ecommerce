import { toast } from "react-toastify";
import { observer } from "mobx-react";
import axios from "axios";
import { useEffect, useState } from "react";
import cartStore from "../stores/cartStore";

function Home() {
    const [products, setProducts] = useState({});
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(15000);
    const [selectedCategories, setCategories] = useState([
        { name: "Processador", checked: true },
        { name: "Placa de Video", checked: true },
        { name: "Fonte", checked: true },
        { name: "Placa Mae", checked: true },
        { name: "RAM", checked: true },
        { name: "HDD", checked: true },
        { name: "SSD", checked: true },
        { name: "Cooler", checked: true },
        { name: "Gabinete", checked: true },
    ]);

    function handleChange(name) {
        let newCategories = selectedCategories.map((category) => {
            if (category.name === name) return { ...category, checked: !category.checked };
            else return category;
        });
        setCategories(newCategories);
    }

    useEffect(async () => {
        try {
            const { data } = await axios.get("/api/products");

            setProducts(data);
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <div className="container h-full flex flex-col">
            <div className="flex">
                <div className="flex flex-col mx-10 ">
                    <div className="w-48 my-10 ">
                        <h3 className="text-2xl text-purpled">Categorias</h3>

                        <div className="flex my-2 ">
                            <input
                                type="checkbox"
                                className=" h-5 w-5 text-purpled checked:border-transparent"
                                defaultChecked={true}
                                onChange={() => handleChange("Processador")}
                            ></input>
                            <p className="text-purpled ml-2">Processador</p>
                        </div>
                        <div className="flex my-2">
                            <input
                                type="checkbox"
                                className=" h-5 w-5 text-purpled checked:border-transparent"
                                defaultChecked={true}
                                onChange={() => handleChange("Placa de Video")}
                            ></input>
                            <p className="text-purpled ml-2">Placa de vídeo</p>
                        </div>
                        <div className="flex my-2">
                            <input
                                type="checkbox"
                                className=" h-5 w-5 text-purpled checked:border-transparent"
                                defaultChecked={true}
                                onChange={() => handleChange("Fonte")}
                            ></input>
                            <p className="text-purpled ml-2">Fonte</p>
                        </div>
                        <div className="flex my-2">
                            <input
                                type="checkbox"
                                className=" h-5 w-5 text-purpled checked:border-transparent"
                                defaultChecked={true}
                                onChange={() => handleChange("Placa Mae")}
                            ></input>
                            <p className="text-purpled ml-2">Placa Mãe</p>
                        </div>
                        <div className="flex my-2">
                            <input
                                type="checkbox"
                                className=" h-5 w-5 text-purpled checked:border-transparent"
                                defaultChecked={true}
                                onChange={() => handleChange("RAM")}
                            ></input>
                            <p className="text-purpled ml-2">Memória RAM</p>
                        </div>
                        <div className="flex my-2">
                            <input
                                type="checkbox"
                                className=" h-5 w-5 text-purpled checked:border-transparent"
                                defaultChecked={true}
                                onChange={() => handleChange("HDD")}
                            ></input>
                            <p className="text-purpled ml-2">HDD</p>
                        </div>
                        <div className="flex my-2">
                            <input
                                type="checkbox"
                                className=" h-5 w-5 text-purpled checked:border-transparent"
                                defaultChecked={true}
                                onChange={() => handleChange("SSD")}
                            ></input>
                            <p className="text-purpled ml-2">SSD</p>
                        </div>
                        <div className="flex my-2">
                            <input
                                type="checkbox"
                                className=" h-5 w-5 text-purpled checked:border-transparent"
                                defaultChecked={true}
                                onChange={() => handleChange("Cooler")}
                            ></input>
                            <p className="text-purpled ml-2">Cooler</p>
                        </div>
                        <div className="flex my-2">
                            <input
                                type="checkbox"
                                className=" h-5 w-5 text-purpled checked:border-transparent"
                                defaultChecked={true}
                                onChange={() => handleChange("Gabinete")}
                            ></input>
                            <p className="text-purpled ml-2">Gabinete</p>
                        </div>
                    </div>
                    <div className="w-48">
                        <h3 className="text-2xl text-purpled">Filtros</h3>
                        <p className="text-purpled my-2">Min</p>
                        <div className="flex">
                            <div className="px-2 py-1 bg-purpled text-white rounded-tl rounded-bl flex items-center">R$</div>

                            <div className="flex">
                                <input
                                    type="number"
                                    className="w-32 rounded-tr rounded-br outline-none text-center text-purpled"
                                    placeholder="00,00"
                                    min="0"
                                    step="100"
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    value={minPrice}
                                ></input>
                            </div>
                        </div>
                        <p className="text-purpled my-2">Max</p>
                        <div className="flex">
                            <div className="px-2 py-1 bg-purpled text-white rounded-tl rounded-bl flex items-center">R$</div>

                            <div className="flex">
                                <input
                                    type="number"
                                    className="w-32 rounded-tr rounded-br outline-none text-center text-purpled"
                                    placeholder="00,00"
                                    min="0"
                                    step="100"
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    value={maxPrice}
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-10">
                    <label className="ml-10 relative text-gray-700  block">
                        <i className="flex items-center pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3 fa fa-search text-purpled" />
                        <input
                            type="text"
                            className="rounded h-10 pl-10 border-none"
                            placeholder="Procurar por produto..."
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                    </label>

                    <div className="grid grid-cols-3 flex-auto">
                        {Object.entries(products).length !== 0 ? (
                            products.map((product) =>
                                selectedCategories.map((category) => {
                                    if (product.categories[0] === category.name) {
                                        if (
                                            category.checked &&
                                            product.title.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
                                            product.price <= maxPrice &&
                                            product.price >= minPrice
                                        ) {
                                            return (
                                                <div key={product._id} className="grid grid-cols-3 ml-6 flex-auto">
                                                    <div className="bg-white rounded px-6 py-4 m-8 w-72">
                                                        <img className="w-96" src={product.image_url} alt="" />
                                                        <h1 className="text-purpled">{product.title}</h1>
                                                        <div className="flex justify-between items-center mt-4">
                                                            <p className="text-purpled font-bold">R$ {product.price}</p>
                                                            <button
                                                                className="bg-yellowish h-10 text-white px-2 rounded-lg"
                                                                onClick={() => {
                                                                    if (cartStore.cart.some((item) => item._id === product._id)) {
                                                                        toast.error("O produto já foi adicionado ao carrinho");
                                                                    } else {
                                                                        cartStore.addProduct(product);
                                                                        toast.success("Produto adicionado ao carrinho");
                                                                    }
                                                                }}
                                                            >
                                                                <i className=" mr-2 fa fa-shopping-cart text-white" />
                                                                Comprar
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    }
                                })
                            )
                        ) : (
                            <div />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default observer(Home);
