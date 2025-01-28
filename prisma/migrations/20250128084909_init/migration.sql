-- CreateTable
CREATE TABLE "inventory" (
    "product_id" UUID NOT NULL,
    "quantity_available" INTEGER NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("product_id")
);
