import express from 'express'
import path from 'path'


export const startServer = (options) => {
    const {port, public_path = 'public'} = options

    const app = express()

    //Para poder usar los middlewares se usa la para "use" (Express)

    app.use(express.static(public_path)) // contenido estatico que ponemos disponible.

    app.get('*',(req, res)=>{
        const indexPath = path.join(__dirname+`../../../${public_path}/index.html`)
        res.sendFile(indexPath)
    })

    app.listen(port,() => {
        console.log(`Escuchando en el puerto ${port}`)
    })
};