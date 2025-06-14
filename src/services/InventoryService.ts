import pool from "../config/db";
import {
  CreateInventoryRequest,
  updateInventoryRequest,
  InventoryResponse,
} from "../interfaces/Inventory";

class InventoryService {
  async createInventory(
    data: CreateInventoryRequest
  ): Promise<InventoryResponse> {
    const { name, price, quantity, description } = data;
    const savedInventory = await pool.query(
      "INSERT INTO products (name, price, quantity, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, price, quantity, description]
    );

    return this.toResponseModel(savedInventory.rows[0]);
  }

  async getAllInventories(
    page: number,
    limit: number,
    search: string
  ): Promise<{ inventories: InventoryResponse[]; totalItems: number }> {
    const offset = (page - 1) * limit;
    const searchQuery = `%${search}%`;

    const inventoryData = await pool.query(
      `SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1 ORDER BY id LIMIT $2 OFFSET $3`,
      [searchQuery, limit, offset]
    );

    const countData = await pool.query(
      `SELECT COUNT(*) FROM products WHERE name ILIKE $1 OR description ILIKE $1`,
      [searchQuery]
    );

    return {
      inventories: inventoryData.rows.map(this.toResponseModel),
      totalItems: parseInt(countData.rows[0].count),
    };
  }

  async getInventory(id: string): Promise<InventoryResponse> {
    const inventory = await pool.query("SELECT * FROM products where id = $1", [
      id,
    ]);
    if (!inventory) throw new Error("Inventory not found");
    return this.toResponseModel(inventory.rows[0]);
  }

  async updateInventory(
    id: string,
    data: updateInventoryRequest
  ): Promise<InventoryResponse> {
    const { name, quantity, price, description } = data;
    const inventory = await pool.query(
      "UPDATE products SET name=$1, quantity=$2, price=$3, description=$4 WHERE id=$5 RETURNING *",
      [name, quantity, price, description, id]
    );
    if (!inventory) throw new Error("Inventory not found");
    return this.toResponseModel(inventory.rows[0]);
  }

  async deleteInventory(id: string): Promise<void> {
    const inventory = await pool.query("DELETE FROM products WHERE id=$1", [
      id,
    ]);
    if (!inventory) throw new Error("Inventory not found");
  }

  private toResponseModel(inventory: any): InventoryResponse {
    return {
      id: inventory.id.toString(),
      name: inventory.name,
      quantity: inventory.quantity,
      price: inventory.price,
      description: inventory.description,
    };
  }
}

export default InventoryService;
