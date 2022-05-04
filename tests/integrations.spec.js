import app from "../src/app";
import request from "supertest";

describe("Testing success cases in the routes", () => {
  let testCategory = {
    name: `Categoria Teste ${Math.floor(Math.random() * 10001)}`,
  };

  let testProduct = {
    name: `Produto Teste ${Math.floor(Math.random() * 10001)}`,
    price: `${Math.floor(Math.random() * 1001)}.${
      Math.floor(Math.random() * 90) + 10
    }`,
  };

  it("Should be able to create a new category", async () => {
    const response = await request(app).post("/categories").send(testCategory);

    testCategory.id = response.body.category.id;
    testProduct.category_id = response.body.category.id;

    expect(response.status).toBe(201);
    expect(response.body.message).toBeDefined();
    expect(response.body.category.id).toBeDefined();
    expect(response.body.category.name).toContain("Categoria Teste");
  });

  it("Should be able to list all the categories", async () => {
    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toContain("Categoria Teste");
  });

  it("Should be able to list one category", async () => {
    const response = await request(app).get(`/categories/${testCategory.id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toContain("Categoria Teste");
  });

  it("Should be able to update one category", async () => {
    const response = await request(app)
      .patch(`/categories/${testCategory.id}`)
      .send({
        name: `${testCategory.name} Atualizada`,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.category.name).toContain("Atualizada");
  });

  it("Should be able to create a product", async () => {
    const response = await request(app).post("/products").send(testProduct);

    testProduct.id = response.body.product.id;

    expect(response.status).toBe(201);
    expect(response.body.message).toBeDefined();
    expect(response.body.product.id).toBeDefined();
    expect(response.body.product.name).toContain("Produto Teste");
  });

  it("Should be able to list all the products", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toContain("Produto Teste");
  });

  it("Should be able to list one product", async () => {
    const response = await request(app).get(`/products/${testProduct.id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toContain("Produto Teste");
  });

  it("Should be able to update one product", async () => {
    const response = await request(app)
      .patch(`/products/${testProduct.id}`)
      .send({
        name: `${testProduct.name} Atualizado`,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.product.name).toContain("Atualizado");
  });

  it("Should be able to list products by categories", async () => {
    const response = await request(app).get(
      `/products/category/${testCategory.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("category");
  });

  it("Should be able to delete one product", async () => {
    const response = await request(app).delete(`/products/${testProduct.id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
  });

  it("Should be able to delete one category", async () => {
    const response = await request(app).delete(
      `/categories/${testCategory.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
  });
});

describe("Testing error cases in the routes", () => {
  afterAll(async () => {
    await request(app).delete(`/products/${testProduct.id}`);
    await request(app).delete(`/categories/${testCategory.id}`);
  });

  let testCategory = {
    name: `Categoria Teste`,
  };

  let testProduct = {
    name: `Produto Teste ${Math.floor(Math.random() * 10001)}`,
    price: `${Math.floor(Math.random() * 1001)}.${
      Math.floor(Math.random() * 90) + 10
    }`,
  };

  it("Should not be able to create two categories with the same name", async () => {
    const successResponse = await request(app)
      .post("/categories")
      .send(testCategory);

    const errorResponse = await request(app)
      .post("/categories")
      .send(testCategory);

    testCategory.id = successResponse.body.category.id;
    testProduct.category_id = successResponse.body.category.id;

    expect(errorResponse.status).toBe(400);
    expect(errorResponse.body.message).toBeDefined();
  });

  it("Should not be able to create a products without sending a name", async () => {
    const response = await request(app)
      .post("/products")
      .send({ price: "1000.00", category_id: Number(testCategory.id) });

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  it("Should not be able to create a products without sending a price", async () => {
    const response = await request(app)
      .post("/products")
      .send({ name: "Produto teste", category_id: Number(testCategory.id) });

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  it("Should not be able to list one unexisting category", async () => {
    const response = await request(app).get("/categories/id_test");

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  it("Should not be able to update an unexisting category", async () => {
    const response = await request(app)
      .patch("/categories/id_test")
      .send({ name: "Teste" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  it("Should not be able to list one unexisting product", async () => {
    const response = await request(app).get("/products/id_test");

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  it("Should not be able to update an unexisting product", async () => {
    const response = await request(app)
      .patch("/products/id_test")
      .send({ name: "Teste" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  it("Should not be able to delete an unexisting category", async () => {
    const response = await request(app).delete("/categories/id_test");

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  it("Should not be able to delete an unexisting product", async () => {
    const response = await request(app).delete("/products/id_test");

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });
});
