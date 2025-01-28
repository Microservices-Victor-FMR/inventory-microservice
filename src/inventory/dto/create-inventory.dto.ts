import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsUUID } from "class-validator";

export class CreateInventoryDto {

    @IsNotEmpty()
    @IsUUID()
    product_id : string


    @Type(() => Number)
    @IsInt()
    quantity_available: number 
}
