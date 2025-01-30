import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { PrismaService } from 'src/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class InventoryService {
	constructor(private readonly prisma:PrismaService){}
	async create(createInventoryDto: CreateInventoryDto) {
		const {product_id,quantity_available}= createInventoryDto
		const createIneventory = await this.prisma.inventory.create( {data:{product_id:product_id,quantity_available:quantity_available}})
		return createIneventory


	}

	async findAll(paginationDto:PaginationDto) {
	const {limit,page} = paginationDto
	const findInventory = await this.prisma.inventory.findMany({take:limit,where:{quantity_available:{gt:0}}})
	return findInventory
	}

 async findOneById(product_id: string) {
	 const findById= await this.prisma.inventory.findUnique({where: {product_id: product_id}})
	 if(!findById){
		throw new RpcException({statusCode:HttpStatus.NOT_FOUND,message:"Producto no encontrado",microservice:"Inventory"})
	 }
	 return findById				
	}

	async update(product_id:string,quantity_available:number) {
	
	 await this.findOneById(product_id)

	const updateInventory = await this.prisma.inventory.update({
		data:{quantity_available:quantity_available},
		where:{product_id:product_id

		}
	}
)
 
	return {message:"Inventario actualizado correctamente", 
		product_id: updateInventory.product_id,
		quantity_available:updateInventory.quantity_available
	
	}
	}

 async  removeInventory(product_id:string) {
		const findById = await this.findOneById(product_id)

		if(!findById){
			throw new RpcException({statusCode:HttpStatus.NOT_FOUND,message:"Producto no encontrado",microservice:"Inventory"})
		}
		const deleteInventory = await this.prisma.inventory.update({data: {quantity_available: 0},where:{product_id:product_id}})        
		return {message:"Inventario elimido correctamente", data: deleteInventory}



	}
}
