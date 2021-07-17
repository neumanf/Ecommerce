import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Admin() {
    const [title, setTitle] = useState("");
    const [image_url, setImageURL] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    const [products, setProducts] = useState({});
    const [productsChanged, setProductsChange] = useState(false);

    const addProduct = async (e) => {
        e.preventDefault();

        if (category.length === 0 || category === "Nenhuma") {
            return toast.error(`Erro: Categoria inválida.`);
        }

        try {
            const _price = parseFloat(price.replace(",", "."));

            const { data } = await axios.post("/api/products", {
                title,
                image_url,
                price: _price,
                category,
            });

            if (data && data.ok) {
                toast.success("Produto adicionado com sucesso!");
            } else {
                toast.error(`Erro: ${data.error}`);
            }

            setProductsChange(!productsChanged);
        } catch (e) {
            console.error(e);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const { data } = await axios.delete("/api/products", {
                data: { id },
            });

            if (data && data.ok) {
                toast.success("Produto deletado com sucesso!");
            } else {
                toast.error(`Erro: ${data.error}`);
            }

            setProductsChange(!productsChanged);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(async () => {
        try {
            const { data } = await axios.get("/api/products");

            setProducts(data);
        } catch (e) {
            console.error(e);
        }
    }, [productsChanged]);

    return (
        <div>
            <div className="flex flex-col container py-6 h-full justify-center">
                <h1 className="text-2xl font-bold my-8">Adicione um produto</h1>
                <form
                    action="#"
                    method="POST"
                    className="flex flex-1 justify-center items-center"
                    onSubmit={addProduct}
                >
                    <div className="w-full shadow overflow-hidden sm:rounded-md w-2/3">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-6">
                                    <label
                                        htmlFor="product-title"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Título
                                    </label>
                                    <input
                                        type="text"
                                        name="product-title"
                                        id="product-title"
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        required
                                        min="1"
                                        max="64"
                                        className="px-4 py-2 mt-1 focus:outline-none border  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-6">
                                    <label
                                        htmlFor="product-image"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Imagem (URL)
                                    </label>
                                    <input
                                        type="text"
                                        name="product-image"
                                        id="product-image"
                                        onChange={(e) =>
                                            setImageURL(e.target.value)
                                        }
                                        required
                                        pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
                                        className="px-4 py-2 mt-1 focus:outline-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="https://website.com/image.png"
                                    />
                                </div>

                                <div className="col-span-3 sm:col-span-3">
                                    <label
                                        htmlFor="product-price"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Preço
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <span className="px-4 py-2 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                            R$
                                        </span>
                                        <input
                                            type="text"
                                            name="product-price"
                                            id="product-price"
                                            onChange={(e) =>
                                                setPrice(e.target.value)
                                            }
                                            required
                                            min="1"
                                            max="20"
                                            pattern="^\d+,\d+$"
                                            className="px-4 py-2 focus:outline-none border focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                            placeholder="00,00"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="product-category"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Categoria
                                    </label>
                                    <select
                                        id="product-category"
                                        name="product-category"
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                        required
                                    >
                                        <option>Nenhuma</option>
                                        <option>Processador</option>
                                        <option>Placa de Video</option>
                                        <option>Fonte</option>
                                        <option>Placa Mae</option>
                                        <option>Memoria RAM</option>
                                        <option>HDD</option>
                                        <option>SSD</option>
                                        <option>Cooler</option>
                                        <option>Gabinete</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellowish hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellowish"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                </form>
                <h1 className="text-2xl font-bold my-8">Remova um produto</h1>
                <div className="flex">
                    <div className="grid grid-cols-2 ml-6 flex-auto">
                        {Object.entries(products).length !== 0 ? (
                            products.map((product) => (
                                <div
                                    key={product._id}
                                    className="flex justify-center ml-6 flex-auto"
                                >
                                    <div className="flex justify-between items-center rounded-lg px-6 py-4 m-8 w-5/6 h-32 bg-white">
                                        <div className="flex items-center">
                                            <img
                                                className="w-24"
                                                src={product.image_url}
                                                alt=""
                                            />
                                            <div className="flex flex-col pl-4">
                                                <h1 className="text-purpled overflow-ellipsis overflow-hidden">
                                                    {product.title}
                                                </h1>
                                                <p className="text-yellowish">
                                                    {product.categories[0]}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                deleteProduct(product._id)
                                            }
                                        >
                                            <div className="flex cursor-pointer rounded-full w-10 h-10 bg-red-500 justify-center items-center p-2 mx-4">
                                                <i className="fa fa-trash text-white" />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>
                                <p>Loading...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
