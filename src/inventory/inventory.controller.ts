import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException ,EventPattern} from '@nestjs/microservices';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { FindOneByIdInventoryDto } from './dto/findOneById-inventory.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @EventPattern('createProduct')
 async create(@Payload() createInventoryDto: CreateInventoryDto) {
   const result = await this.inventoryService.create(createInventoryDto)
   return result
  }

  @MessagePattern('findAllInventory')
  async findAllInventory(@Payload()payload:PaginationDto) {
   const result= await this.inventoryService.findAll(payload);
   return result;
  } 

  @MessagePattern('findOneInventory')
 async findOneInventory(@Payload() payload: FindOneByIdInventoryDto) {
    const {product_id}= payload
    const result = await this.inventoryService.findOneById(product_id);
    return result;
  }

  @MessagePattern('updateInventory')
  async updateInventory(@Payload() payload:{product_id:FindOneByIdInventoryDto,quantity_available:UpdateInventoryDto}) {
  const {product_id,quantity_available}= payload

  const result = await this.inventoryService.update(product_id.product_id,quantity_available.quantity_available)
  return result
  }

  @EventPattern('deleteProduct')
 async remove(@Payload()payload: UpdateInventoryDto) {
  const result = await this.inventoryService.removeInventory(payload.product_id);
  return result

  }
}
