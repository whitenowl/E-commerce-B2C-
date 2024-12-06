const Brand= require("./../db/brand");

async function getBrands(){
    let brands=await Brand.find();
    return brands.map(x=>x.toObject())
}

async function getBrand(id){
    let brands=await Brand.findById(id);
    return brands.toObject();
}

async function addBrand(model){
    let brand= new Brand({
        name: model.name,
    });
    await brand.save();
    return brand.toObject();
}

async function updateBrand(id,model){
    await Brand.findByIdAndUpdate({_id:id},model);
    return;
}

async function deleteBrand(id){
    await Brand.findByIdAndDelete(id);
    return;
}

module.exports= {getBrands,getBrand,addBrand,updateBrand,deleteBrand};