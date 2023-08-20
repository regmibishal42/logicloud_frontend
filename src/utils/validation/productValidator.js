
const initialProductState = {
    name:"",
    boughtOn:"",
    units:0,
    categoryID:"",
    costPrice:0,
    sellingPrice:0,
};
export const CreateProductValidator = (product)=>{
    if(product.name.length < 3){
        return "name should be at-least 3 char long"
    }
    if(product.units < 1){
        return "units should be more then 0"
    }
    if(product.costPrice < 1){
        return "costPrice should be more then 0"
    }
    if(product.sellingPrice < 1){
        return "sellingPrice should be more then 0"
    }
    return null

}