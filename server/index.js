const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const FoodModel =require("./models/Food");


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://duvini:1234@crud.jppk0jj.mongodb.net/food?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.post('/insert',async(req,res)=>{
    const foodName=req.body.foodName;
    const days=req.body.days;

    const food=new FoodModel({foodName:foodName,daysSinceIAte:days});

    try {
        await food.save();
        res.send("inserted data");
    } catch (err) {
        console.log(err)
    }
});

app.get('/read', async (req, res) => {
    try {
        const result = await FoodModel.find({});
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

app.put('/update',async(req,res)=>{
    const newFoodName=req.body.newFoodName;
    const id=req.body.id;

    try {
        const updatedFood = await FoodModel.findById(id);
        updatedFood.foodName = newFoodName;
        await updatedFood.save();
        res.send("update");
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
    
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await FoodModel.findByIdAndDelete(id).exec();
    res.send("deleted");
});





app.listen(3001,()=>{
    console.log('Server running on port 3001...');
});