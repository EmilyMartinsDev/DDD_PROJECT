import { Router ,Request, Response} from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductPresenter from "../presenters/product.presenters";

const productRouter = Router();

productRouter.post("/", async (req:Request, res:Response)=>{
  try{
    const createProductUseCase =  new CreateProductUseCase(new ProductRepository());
    const productDto = {
        name: req.body.name,
        price: req.body.price,
        type: req.body.type || undefined
    }
    const output = await createProductUseCase.execute(productDto);

    res.send(output);
  }catch(err){
    res.status(500).send(err);
  }
})

productRouter.get("/", async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());
    const output = await usecase.execute();
  
    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(ProductPresenter.listXML(output)),
    });
});

export default productRouter;