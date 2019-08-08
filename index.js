const Joi = require('joi');
const express = require('express');
const app = express(); //create a object of express
app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.use(express.json()); //call a middleware and use it

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
    {id: 4, name: 'course4'},
];



app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//api/courses/1

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});

app.post('/api/courses', (req, res) => {

    /*if(!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name is required and should be minimum of 3 characters.');
        return ;
    }*/

    const { error } = validateCourse(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');

    const { error } = validateCourse(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

//PORT

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}....`));