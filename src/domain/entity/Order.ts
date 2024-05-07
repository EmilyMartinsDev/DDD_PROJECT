import OrderItem from "./OrderItem";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._customerId.length === 0) {
      throw new Error("CustomerId is required");
    }
    if (this._items.length === 0) {
      throw new Error("Items are required");
    }

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than 0");
    }

    return true;
  }

  alterItens(action: string, item: OrderItem): void {
    if (action === 'adicionar') {
      this._items.push(item);
      this._total = this.total();
    } else if (action === 'excluir') {
      const index = this._items.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        this._items.splice(index, 1);
        this._total = this.total();
      } else {
        throw new Error('Item não encontrado na lista.');
      }
    } else if (action === 'atualizar') {
      const index = this._items.findIndex((i) => i.id === item.id);

      if (index !== -1) {
        this._items.splice(index, 1, item);
        this._total = this.total(); // Substitui o item antigo pelo novo
      } else {
        throw new Error('Item não encontrado na lista.');
      }
    } else {
      throw new Error('Ação inválida. Use "adicionar", "excluir" ou "atualizar".');
    }
  }
  
  
  

  total(): number {
    return this._items.reduce((acc, item) => acc + item.total(), 0);
  }
}