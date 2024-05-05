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
        const todos = await datamodal.find();
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
    res.send("data deleted sucessfully");

    
})

app.put('/data/:id', async (req, res) => {
    const taskId = req.params.id; // Get the task ID from the request parameters
    const updatedData = req.body; // Get the updated data from the request body
    console.log(taskId);
    console.log(updatedData);

    // Validate if taskId is provided and valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }

    try {
        const updatedTodo = await datamodal.findByIdAndUpdate(taskId, updatedData, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(updatedTodo); // Send back the updated todo item as a response
        console.log("Todo updated successfully:", updatedTodo);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



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
