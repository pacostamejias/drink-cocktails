import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

global.currentYear = new Date().getFullYear();

// Get main page with a list of Cocktails with Gin as ingredient
app.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin");
        //console.log(result.data.drinks);
        res.render("index.ejs", { cocktailList: result.data.drinks });
      } catch (error) {
        console.log("Error: ", error);
        res.status(500);
      }
});

//View detail information for a specific cocktail
app.get("/view-detail/:id", async (req, res) => {
    var cocktailId = req.params["id"];
    const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + cocktailId);
    
    //Create lists of ingredients and measures
    var ingredients = [result.data.drinks[0].strIngredient1, result.data.drinks[0].strIngredient2, result.data.drinks[0].strIngredient3, result.data.drinks[0].strIngredient4, result.data.drinks[0].strIngredient5,
    result.data.drinks[0].strIngredient6, result.data.drinks[0].strIngredient7, result.data.drinks[0].strIngredient8, result.data.drinks[0].strIngredient9, result.data.drinks[0].strIngredient10,
    result.data.drinks[0].strIngredient11, result.data.drinks[0].strIngredient12, result.data.drinks[0].strIngredient13, result.data.drinks[0].strIngredient14, result.data.drinks[0].strIngredient15]

    var measures = [result.data.drinks[0].strMeasure1, result.data.drinks[0].strMeasure2, result.data.drinks[0].strMeasure3, result.data.drinks[0].strMeasure4, result.data.drinks[0].strMeasure5,
    result.data.drinks[0].strMeasure6, result.data.drinks[0].strMeasure7, result.data.drinks[0].strMeasure8, result.data.drinks[0].strMeasure9, result.data.drinks[0].strMeasure10,
    result.data.drinks[0].strMeasure11, result.data.drinks[0].strMeasure12, result.data.drinks[0].strMeasure13, result.data.drinks[0].strMeasure14, result.data.drinks[0].strMeasure15]

    res.render("viewDetail.ejs", { cocktailInfo: result.data.drinks[0], ingredients: ingredients, measures: measures }); 
});

//Get a random cocktail
app.get("/get-random", async (req, res) => {
    const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    
    //Create lists of ingredients and measures
    var ingredients = [result.data.drinks[0].strIngredient1, result.data.drinks[0].strIngredient2, result.data.drinks[0].strIngredient3, result.data.drinks[0].strIngredient4, result.data.drinks[0].strIngredient5,
    result.data.drinks[0].strIngredient6, result.data.drinks[0].strIngredient7, result.data.drinks[0].strIngredient8, result.data.drinks[0].strIngredient9, result.data.drinks[0].strIngredient10,
    result.data.drinks[0].strIngredient11, result.data.drinks[0].strIngredient12, result.data.drinks[0].strIngredient13, result.data.drinks[0].strIngredient14, result.data.drinks[0].strIngredient15]

    var measures = [result.data.drinks[0].strMeasure1, result.data.drinks[0].strMeasure2, result.data.drinks[0].strMeasure3, result.data.drinks[0].strMeasure4, result.data.drinks[0].strMeasure5,
    result.data.drinks[0].strMeasure6, result.data.drinks[0].strMeasure7, result.data.drinks[0].strMeasure8, result.data.drinks[0].strMeasure9, result.data.drinks[0].strMeasure10,
    result.data.drinks[0].strMeasure11, result.data.drinks[0].strMeasure12, result.data.drinks[0].strMeasure13, result.data.drinks[0].strMeasure14, result.data.drinks[0].strMeasure15]

    res.render("viewDetail.ejs", { cocktailInfo: result.data.drinks[0], ingredients: ingredients, measures: measures }); 
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});