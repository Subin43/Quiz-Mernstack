const express = require('express');
const Quiz = require('../models/quizModels');

const router = express.Router();

// Get all the Quizzes or filter by division
router.get('/', async (req, res) => {
    const division = req.query.division;
    try {
        const query = division ? { division } : {};
        const allQuiz = await Quiz.find(query);
        if (!allQuiz.length) {
            return res.status(400).json({ error: 'No quizzes were found' });
        }
        res.status(202).json({ allQuiz });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log("Error:", error.message);
    }
});

// Create new quiz
router.post('/new', async (req, res) => {
    try {
        const { s_No, question, option, answer, division } = req.body;
        if (!s_No || !question || !answer || !division) {
            return res.status(400).json({ error: "Send all the required fields" });
        }

        const newQuiz = await Quiz.create({
            s_No,
            question,
            option,
            answer,
            division
        });
        res.status(201).json({ message: 'Quiz created successfully', data: newQuiz });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Edit quiz
router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateQuiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateQuiz) {
            return res.status(401).json({ error: "Requested quiz not found" });
        }
        res.status(201).json({ message: "Quiz updated successfully", data: updateQuiz });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log("Error:", error.message);
    }
});

// Get a single quiz
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Corrected line
        console.log("Received ID:", id);
        // Ensure ID is present
        if (!id) {
            return res.status(400).json({ error: "Quiz ID required" });
        }

        // Check if the ID is a valid MongoDB ObjectID
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Quiz ID" });
        }

        // Find the quiz by ID
        const singleQuiz = await Quiz.findById(id);
        if (!singleQuiz) {
            return res.status(404).json({ error: "No quiz found for the given ID" });
        }

        res.status(200).json(singleQuiz);
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Delete quiz
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteQuiz = await Quiz.findByIdAndDelete(id);
        if (!deleteQuiz) {
            return res.status(401).json({ error: "Requested quiz not found" });
        }
        res.status(201).json({ message: "Quiz deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log("Error:", error.message);
    }
});

module.exports = router;
