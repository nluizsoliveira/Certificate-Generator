const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Joi = require('joi');
const fs = require('fs');
const pdf = require('dynamic-html-pdf');


const app = express();
const port = 3000;


app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/', (req, res) => {
    const userSchema = Joi.object({
        name: Joi.string()
            .regex(/^\w+(?:\s+\w+)*$/)
            .min(1)
            .max(30)
            .required(),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } }).required()
    })

    const data = req.body

    const userResult = userSchema.validate({name: data.name, email: data.email});
    if(!userResult.error){
        const codesSchema = Joi.object().keys({
            '1' : Joi.string().alphanum().min(0).max(6).required(),
            '2' : Joi.string().alphanum().min(0).max(6).required(),
            '3' : Joi.string().alphanum().min(0).max(6).required(),
            '4' : Joi.string().alphanum().min(0).max(6).required(),
            '5' : Joi.string().alphanum().min(0).max(6).required()
         });

        const codesResult = codesSchema.validate(data.filledCodeValues);
        if(!codesResult.error){
            const [validValuesData, validValuesQty] = getValidValuesData(data.filledCodeValues)

            if(validValuesQty){
                getCertificatePDF(data.name, validValuesData, validValuesQty)
            }
            
            res.json({validValuesQty: validValuesQty});
        } else{
            res.json({validValuesQty: 0})
        }
        
    } else{
        const badField = userResult.error.details[0].context.key
        console.log(badField)
    }
    
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

const VALID_CODES = {
    1: '1cx8J0',
    2: '2c91j7',
    3: '3c42km',
    4: '4cKv54',
    5: '5cj4xX',
}

const TALKS_DATA = {
    1: 'Palestra 1',
    2: 'Palestra 2',
    3: 'Palestra 3',
    4: 'Palestra 4',
    5: 'Palestra 5',
}

const getValidValuesData = (filledCodeValues) =>{
    validValuesData= []
    for(const [index, value] of Object.entries(filledCodeValues)){
        if (VALID_CODES[index] === value){
            validValuesData.push({
                talk: TALKS_DATA[index]
            })
        }
    }
    const validValuesQty =  getDictLen(validValuesData) 
    return [validValuesData, validValuesQty]
}



const getDictLen = (dict) =>{
    return Object.keys(dict).length 
}


const getCertificatePDF = (name, validValuesData, validValuesQty) => {
    let html = fs.readFileSync('template.html', 'utf8');

    pdf.registerHelper('ifCond', function (v1, v2, options) {
        if (v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    })

    let options = {
        orientation: "portrait",
        width: "30cm",
        height: "21cm"
    };

    const totalHours = validValuesQty * 2;
    let document = {
        type: 'file',     // 'file' or 'buffer'
        template: html,
        context: {
            name: name,
            validValuesData: validValuesData,
            totalHours: totalHours
        },
        path: "./certificate.pdf"    // it is not required if type is buffer
    };
    
    pdf.create(document, options)
        .then(res => {
            // console.log(res)
        })
        .catch(error => {
            console.error(error)
        }).then;
}


