import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 10,
        type: 'a'
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(10);
  });
  it("should list all products as XML", async () => {
    // Cria dois produtos para garantir que a listagem funcione corretamente
    await request(app)
        .post("/product")
        .send({
            name: "Product 1",
            price: 10,
            type: 'a'
        });
    await request(app)
        .post("/product")
        .send({
            name: "Product 2",
            price: 12,
            type: 'a'
        });

    const listResponseXML = await request(app)
        .get("/product")
        .set("Accept", "application/xml")
        .send();

    
    expect(listResponseXML.status).toBe(200);


    expect(listResponseXML.text).toContain(`<name>Product 1</name>`);
    expect(listResponseXML.text).toContain(`<price>10</price>`);
    expect(listResponseXML.text).toContain(`<name>Product 2</name>`);
    expect(listResponseXML.text).toContain(`<price>12</price>`);

    
});

});