import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function Admin() {
    const [title, setTitle] = useState("");
    const [image_url, setImageURL] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

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

            console.log(data);

            if (data && !data.error) {
                toast.success("Produto adicionado com sucesso!");
            } else {
                toast.error(`Erro: ${data.error}`);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <div className="flex flex-col container py-6 h-full">
                <h1 className="text-2xl font-bold mb-4">Adicione um produto</h1>
                <form
                    action="#"
                    method="POST"
                    className="flex flex-1 mt-20 justify-center items-center"
                    onSubmit={addProduct}
                >
                    <div className="shadow overflow-hidden sm:rounded-md w-2/3">
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
            </div>
        </div>
    );
}

export default Admin;
