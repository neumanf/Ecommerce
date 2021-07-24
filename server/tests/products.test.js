const request = require("supertest");

const app = require("../app");
const mongoose = require("../db/connect");

const {
    getProductsFromDB,
    addProductToDB,
    deleteProductFromDB,
} = require("../services/products.service");

describe("Products Service Test", () => {
    let id;

    it("should return all products from the database", async () => {
        const products = await getProductsFromDB();

        expect(products).toStrictEqual(expect.any(Array));

        for (let product of products) {
            expect(product.title).toEqual(expect.any(String));
            expect(product.image_url).toEqual(expect.any(String));
            expect(product.price).toEqual(expect.any(Number));
            expect(product.categories).toEqual(expect.any(Array));
        }
    });

    it("should add a product to the database", async () => {
        const product = await addProductToDB({
            title: "Test",
            image_url: "facebook.github.io/jest/img/opengraph.png",
            price: 0,
            category: "test",
        });

        expect(product.title).toEqual(expect.any(String));
        expect(product.image_url).toEqual(expect.any(String));
        expect(product.price).toEqual(expect.any(Number));
        expect(product.categories).toEqual(expect.any(Array));

        id = product._id;
    });

    it("should delete a product from the database", async () => {
        const res = await deleteProductFromDB(id);

        expect(res.ok).toBe(1);
    });
});

describe("Products Controller Test", () => {
    let id;

    it("should return 200 and all the products", async () => {
        const res = await request(app).get("/api/products");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toStrictEqual(expect.any(Array));
    });

    it("should return 200 and add a product", async () => {
        const res = await request(app).post("/api/products").send({
            title: "Test",
            image_url: "facebook.github.io/jest/img/opengraph.png",
            price: 0,
            category: "test",
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.ok).toBe(true);
        expect(res.body.product._id).toBeDefined();

        id = res.body.product._id;
    });

    it("should return 200 and delete a product", async () => {
        const res = await request(app).delete("/api/products").send({
            id,
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.ok).toBe(true);
    });

    // Price as string instead of number
    it("should return 400 and an error", async () => {
        const res = await request(app).post("/api/products").send({
            title: "Test",
            image_url: "facebook.github.io/jest/img/opengraph.png",
            price: "20,00",
            category: "test",
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
    });

    // Product does not exists
    it("should return 400 and an error", async () => {
        const res = await request(app).delete("/api/products").send({
            id: "123456",
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBeDefined();
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
