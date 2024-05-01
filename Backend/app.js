const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser middleware
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json()); // Use JSON body parser middleware

app.post('/data', (req, res) => { // Change the route to accept POST requests
    const data = req.body; // Get the data from the request body
    console.log('Received data:', data); // Print the data in the console
    res.send('Data received successfully!'); // Send a response back to the frontend
    const newTodoData = new datamodal({
        task:req.body.task,
        description:req.body.description,
        done:req.body.done
    })

    newTodoData.save()
        .then(()=> {
            console.log("data saved sucessfully");
        }).
        catch((err)=> {
            console.log(err);
        })
});

const todoSchema = new mongoose.Schema({
    task: String,
    description: String,
    done: Boolean
});

const datamodal = mongoose.model('Data', todoSchema);

async function main() {
    await mongoose.connect('mongodb://localhost:27017/myTodoData')
}

app.get('/data', async (req, res) => {
    try {
        const todos = await datamodal.find(); // Fetch all documents from the Data collection
        console.log(todos)
        res.json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/data/delete',async (req, res)=> {
    const deletedDataId = req.query.deletedData;
    try {
        const dData = await datamodal.findByIdAndDelete(deletedDataId);
    }
    catch(err) {
        console.log(err);
    }
    console.log(deletedDataId);

    
})

main()
    .then(()=>{
        console.log("connected sucessfully");
    })
    .catch((err)=> {
        console.log(err);
    })

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
