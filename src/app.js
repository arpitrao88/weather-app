const express = require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')
const request=require('postman-request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')



const templatePath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views',templatePath)
hbs.registerPartials(partialsPath)



app.use(express.static('public'))
const port=process.env.PORT || 3000



app.get('',(req,res)=>{

    res.render('index',
    {
        weather:'Weather',
        name:'Arpit'
    })
})
app.get('/about',(req,res)=>
{
    res.render('about',{
        aboutTitle:"About",
        name:'Arpit'

    })
})

app.get('/help',(req,res)=>
{
    res.render('help',{
        helpMessage:"Help",
        name:'Arpit'

    })
})

app.get('/products',(req,res)=>
{
    if(!req.query.search)
    {
        return res.send({
            error:"Please provide the search"
        })
    }

    res.send({
        products:[]
    })


})

app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
       return res.send({
            error:"Please provide the address"
        })
    }

    geocode(req.query.address,(error,data)=>
    {
        if(error)
        {
            res.send({
                error:error
            })
        }
        else
        {
            forecast(data.latitude,data.longitude,(error,data)=>
            {
                if(error)
                {
                    res.send({
                        error:error
                    })
                }
                else
                {
                    res.send({
                        forecast:data.forecast,
                        location:data.location,
                        address:req.query.address
                    })
                }
            })
        }

    })
})








app.get('/:anything',(req,res)=>
{
    res.render('404',{
        errorMessage:'we are sorry, but the page you requested was not found'
    })
})

app.get('/help/:anything',(req,res)=>
{
    res.render('404',{

        errorMessage:'Help article not found'
    })
})

app.listen(PORT,()=>
{
    console.log('Server is running on port '+PORT);
    
})


