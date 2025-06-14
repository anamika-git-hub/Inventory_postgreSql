import { NextFunction, Request, Response } from "express";
import InventoryService from "../services/InventoryService";
import asyncHandler from "../utils/asyncHandler";

class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  createInventory = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const inventory = await this.inventoryService.createInventory(req.body);
      res.redirect("/");
    }
  );

  newInventory = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      res.render("form", { inventory: null });
    }
  );

  getAllInventory = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const search = (req.query.search as string) || "";

      const { inventories, totalItems } =
        await this.inventoryService.getAllInventories(page, limit, search);
      const totalPages = Math.ceil(totalItems / limit);
      res.render("index", {
        inventories,
        currentPage: page,
        totalPages,
        searchQuery: search,
      });
    }
  );

  getInventory = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const inventory = await this.inventoryService.getInventory(req.params.id);
      res.render("form", { inventory });
    }
  );

  updateInventory = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const inventory = await this.inventoryService.updateInventory(
        req.params.id,
        req.body
      );
      res.redirect("/");
    }
  );

  deleteInventory = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      await this.inventoryService.deleteInventory(req.params.id);
      res.redirect("/");
    }
  );
}

export default InventoryController;
